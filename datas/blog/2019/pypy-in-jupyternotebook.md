---
title: "jupyter notebook에서 pypy사용하기"
date: "2019-06-01"
tags: ["python", "pypy", "jupyter notebook"]
category: "dev"
published: true
---

### 시작하기 전에

- pyenv를 사용중이고 pyenv virtualenv 를 쓴다고 가정한다.
- jupyter notebook 설치관련해서는 따로 다루지 않는다.

### 들어가기

1. 파이썬의 `Future`를 공부하는 중에 `pypy`를 쓰면 성능이 올라간다고 해서 테스트 해보고 싶어졌다.
2. 평소에 `jupyter notebook` 을 열심히 사용하는 편인데, pyenv의 환경을 갈아타면서 jupyter를 기동시키고 싶지는 않았다.
3. 그래서 pyenv를 안바꾸고 커널 바꾸는 방법을 찾아봤는데, [스택오버플로우](https://stackoverflow.com/questions/33850577/is-it-possible-to-run-a-pypy-kernel-in-the-jupyter-notebook) 에 있길래 따라해봤다. up vote는 0개인데 질문과 무관한 거라 그런것 같지만, 내 질문에는 답이 되었다.

이제 시작해보자.

### pyenv 로 pypy 설치

뭐 이건 별거 없다.

```bash
$ pyenv install pypy3.6-7.1.1
$ pyenv virtualenv pypy3.6-7.1.1 pypy3
$ pyenv activate pypy3
```

여기까지 하면 쉘이 `(pypy3) $` 요런식으로 변경되어야한다. 이상태에서 `ipykernel` 이라는 걸 설치하자.

```bash
$ pypy3 -m pip install ipykernel
$ ipython kernel install --user --name=pypy3
```

위의 코드를 실행하면 뭔가 많이 설치를 하게된다.

jupyter 노트북에서 아래의 사진과 같이 pypy3 설정이 추가가 되어 나오면 성공이다.

![img1](../../images/20190601/img1.png)

### 확인해보기

진짜 `pypy` 가 맞는지 확인해보자. pypy를 선택해서 jupyter notebook 파일을 하난 만들고 아래와 같이 버전을 확인하는 코드를 작성하자.

```python
import sys
sys.version
```

실행후에 아래와 같이 pypy 정보가 나오면 성공이다. python3.6.1 과 호환되는 pypy7.1.1 버전을 쓰고 있음을 알 수 있다.

```
'3.6.1 (784b254d6699, Apr 14 2019, 10:22:55)
[PyPy 7.1.1-beta0 with GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)]'
```
