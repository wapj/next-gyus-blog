---
title: "장고에서 C mysql 이 임포트 되지 않는 문제 해결하기"
date: "2020-12-20"
tags: ["python", "django", "mysql"]
category: dev
featured: "images/20201220.jpg"
draft: false
---

## `_mysql` 이 없다는 에러 발생

장고에서 mysqlclient를 사용하고 있는데, 쓰다보면 아래와 같은 에러를 만나는 경우가 종종있다.

```
ImportError: dlopen(..._mysql.cpython-38-darwin.so, 2): Library not loaded: @rpath/libmysqlclient.21.dylib
  Referenced from: .../site-packages/_mysql.cpython-38-darwin.so
  Reason: image not found
NameError: name '_mysql' is not defined
```

에러를 보면 `_mysql` 이 정의되지 않았다고 한다.
또 그 녀석은 cpython-38-darwin.so 이라는 파일에 있는 것 같다. 그렇다는 얘기는 `cpython-38-darwin.so` 이 잘못되었다는 것 같은데, 사실 파이썬만 보면 저 파일이 잘못됐는지 아닌지 알 수가 없다.

문제를 좀 더 쉽게 재현해 보자.

## 문제 재현

문제를 재현하는것은 의외로 쉬운데 `MySQLdb` 모듈을 임포트 해보면 된다.

```
python -c "import MySQLdb"
```

그러면 아래와 같이 \_mysql 이 없다고 에러가 난다. ImportError 쪽을 보면 Library not loaded: @rpath/libmysqlclient.21.dylib 라고 위에 나왔던 에러가 그대로 나오게 된다.

```
Traceback (most recent call last):
  File "/Users/gyus/.pyenv/versions/py38/lib/python3.8/site-packages/MySQLdb/__init__.py", line 18, in <module>
    from . import _mysql
ImportError: dlopen(/Users/gyus/.pyenv/versions/py38/lib/python3.8/site-packages/MySQLdb/_mysql.cpython-38-darwin.so, 2):
Library not loaded: @rpath/libmysqlclient.21.dylib
  Referenced from: /Users/gyus/.pyenv/versions/py38/lib/python3.8/site-packages/MySQLdb/_mysql.cpython-38-darwin.so
  Reason: image not found

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/Users/gyus/.pyenv/versions/py38/lib/python3.8/site-packages/MySQLdb/__init__.py", line 24, in <module>
    version_info, _mysql.version_info, _mysql.__file__
NameError: name '_mysql' is not defined
```

## 원인

brew 로 mysql-client 를 설치한 경우 `/usr/local/mysql/bin/mysql/lib`의 경로에 `cpython-38-darwin.so` 파일이 위치해 있는데, 파이썬에서 찾지 못해서 에러가 난다. 간단하게는 심볼릭 링크를 만들어주면 해결이 된다.

## 해결하기

아래 두가지중에 한 가지를 해주면 된다.

1. 심볼릭 링크를 만들어 주자.

```bash
sudo ln -s /usr/local/mysql/lib/libmysqlclient.21.dylib /usr/local/lib/libmysqlclient.21.dylib
```

2. DYDL 라이브러리 패스에 `/usr/local/mysql/lib/` 를 추가해존다.

```bash
export DYLD_LIBRARY_PATH=/usr/local/mysql/lib/:$DYLD_LIBRARY_PATH
```

둘다 C의 동적라이브러리 패스를 파이썬이 알 수 있도록 잡아주는 것이다. 원인은 별거가 아니었지만, 잘쓰다가 mysql 을 업그레이드하거나 할 때 나오면 당황하게 마련이므로 알아두면 좋다.

이것을 몰라서 python 으로 된 mysql-connector 를 사용하는 경우도 있는데, 문제는 없지만, 성능이 문제가 되는 어플리케이션이라면 위의 방법으로 해결하는 것이 좋다.
