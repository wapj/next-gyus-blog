---
title: 윈도우에 파이썬을 설치하는 방법 5가지
date: "2020-06-22"
tags: ["python", "python install", "windows"]
category: dev
featured: /images/2020/0622/featured.jpg
draft: false
---

## 첫번째 [python.org](http://python.org) 에서 다운받아서 설치

모두가 알고 있는 방법이지만, 공식사이트에서 패키지를 받아서 설치하는 방법이 있다.

파이썬 공식사이트의 다운로드 탭에서 파이썬을 다운로드 받을 수 있다. 2020년 6월 기존 3.8.3이 최신 버전이다. 각 운영체제에 맞는 파일을 다운받도록 하자.

[https://www.python.org/](https://www.python.org/)

![images/featured.png](/images/2020/0622/featured.png)

다운로드 받은 파일을 클릭해서 설치를 진행해보도록 하자.
![이미지1](/images/2020/0622/img1.png)

클릭 하면 아래와 같은 창이 뜨게 된다.

![/images/2020/0622/2.png](/images/2020/0622/2.png)

- 여기서 귀찮은 사람은 Install Now 를 선택하여 바로 설치를 하자.
- 조금 더 알아볼 사람은 아래의 Customize installation 을 눌러서 어떤것이 있는지 살펴보자.

![/images/2020/0622/3.png](/images/2020/0622/3.png)

- Documentation 에 체크를 하면 문서가 함께 설치된다.
- pip는 파이썬 패키지를 관리하는 프로그램인데 무조건 설치해야한다.
- tcl/tk 는 gui 개발을 할때 필요한 녀석이고 IDLE 는 개발을 위한 편집기이다. 필요하면 설치하도록하자.
- Python test suite 는 테스트를 위한 라이브러리가 함께 설치되는데 설치하는 것이 좋다.
- py launcher 는 .py 파일을 클릭시 파이썬이 실행되게 하는 것이다. 이 또한 필요하면 선택하자.
- for all users는 모든 유저가 파이썬을 사용할 수 있게 하는녀석인데, 필요하지 않으면 체크를 해제하도록하자. (나는 필요가 없어서 체크 해지했다)

이제 Next를 눌러서 설치를 계속 진행하자.

![/images/2020/0622/4.png](/images/2020/0622/4.png)

- Associate file with Python 은 이전에 설정했던 py launcher 와 같은 내용이다.
- Create shortcut 은 파이썬 숏컷을 만들것이다라는 것인데, 안해도 크게 관련이 없다.
- Add Python to environment variables 는 파이썬 환경변수를 추가할 것인가에 대한 것인데 안하면 귀찮아지니 꼭 체크 하도록하자.
- Download debugging symbols, Download debug binaries 는 비주얼 스튜디오로 파이썬을 코딩하는 사람이라면 체크를 하도록하자. 비주얼 스튜디오에서 파이썬 디버깅을 지원해준다.
- Customize install location 은 파이썬이 설치되는 경로이다. 잘 기억해두도록 하자.

이제 **install** 을 클릭하면 설치가된다. 머신에 따라 시간이 좀 걸릴 수 있으니 물한잔 마시고 오면 좋을 것 같다.

![/images/2020/0622/5.png](/images/2020/0622/5.png)

close 를 누르면 완료이다.

![/images/2020/0622/6.png](/images/2020/0622/6.png)

명령프롬프트를 켜서 파이썬의 버전을 확인해보자.

`python -V` 를 치고 엔터키를 누르면 `Python 3.8.3` 이라는 메세지가 나오면 잘 설치가 된것이다.

![/images/2020/0622/7.png](/images/2020/0622/7.png)

## 두번째, 마이크로소프트 스토어 사용하기

마이크로소프트 스토어 앱을 켜고 파이썬으로 검색을 합시다.

![/images/2020/0622/8.png](/images/2020/0622/8.png)

이중에 원하는 것을 골라서 설치하면 된다. 나는 파이썬3.8을 설치할것이다.

![/images/2020/0622/9.png](/images/2020/0622/9.png)

무료 버튼 클릭!

설치가 끝나고 쉘에서 확인을 해보자.

![/images/2020/0622/10.png](/images/2020/0622/10.png)

정말 설치가 쉽게 끝나서 놀랍다!

## 세번째, 아나콘다 사용하기

아나콘다는 데이터과학자를 위한 패키지 프로그램인데, 파이썬이 포함되어 있다. 데이터과학쪽에 관심이 있는 사람은 아나콘다를 설치하는 것이 편리할 것이다.

[https://www.anaconda.com/products/individual#Downloads](https://www.anaconda.com/products/individual#Downloads)

아나콘다 다운로드 페이지로 가서 다운로드 링크를 클릭하자.

![/images/2020/0622/11.png](/images/2020/0622/11.png)

다운로드받은 후 파일을 실행해서 설치하자. 특별한 설정없이 `next` 만 계속 클릭하면 된다.

![/images/2020/0622/12.png](/images/2020/0622/12.png)

![/images/2020/0622/13.png](/images/2020/0622/13.png)

![/images/2020/0622/14.png](/images/2020/0622/14.png)

![/images/2020/0622/15.png](/images/2020/0622/15.png)

![/images/2020/0622/16.png](/images/2020/0622/16.png)

![/images/2020/0622/17.png](/images/2020/0622/17.png)

![/images/2020/0622/18.png](/images/2020/0622/18.png)

설치 완료시까지 시간이 좀 걸리니 잠깐 쉬고 오도록 하자.

### 파이썬 설치 확인해보기

아나콘다의 경우에는 패스에 파이썬 경로가 포함되지 않기 때문에 아나콘다 파워쉘을 실행해서 확인해야한다.

![/images/2020/0622/19.png](/images/2020/0622/19.png)

아나콘다 파워쉘을 실행시킨후 파이썬이 잘 설치되었는지 확인해보자.

`python -V` 로 확인해보면 파이썬 3.7.6 이 설치되었음을 알수 있다.

또한 `get-command python` 으로 파이썬이 설치된 경로를`확인할 수있는데, 나의 경우에는`C:\Users\wapj\anaconda3\python.exe` 이었다. 파이썬을 좀 더 편하게 사용하고 싶은 경우 패스에 추가해주면 좋다.

![/images/2020/0622/20.png](/images/2020/0622/20.png)

참고로 아나콘다를 설치하면 `ANACONDA NAVIGATOR` 가 함께 설치되는데, 실행해보면 꽤 많은 패키지들이 함께 설치되어 있다.

파이썬 학습에 꽤나 도움될만한 것들이 많이 있으니, 관심있는 사람은 살펴보아도 좋을 것 같다.

![/images/2020/0622/21.png](/images/2020/0622/21.png)

## 네번째, 패키지 매니저를 사용하여 설치하기

첫번째 방법처럼 다운로드 받아서 설치하는 방법은, 새로운 버전이 나왔을때 테스트를 해보려면 다시 지우고 새로 깔아야하는 불편함이 있다. 두번째 방법으로 패키지 매니저를 사용하여 설치하는 방법이 있는데, 이번에는 윈도우의 chocolatey 와 맥의 brew 를 사용하여 파이썬을 설치해 보도록 하자.

### chocolatey 설치하기

chocolatey는 아래와 같은 요구사항이 있다. 설치가 안된다면 아래의 조건을 만족하지 않는지 확인해보자.

- Windows 7+ / Windows Server 2003+
- PowerShell v2+ (웹사이트에서 설치하기위한 최소버전은 v3이다.)
- .NET Framework 4+ (웹사이트에서 설치하기위한 최소버전은 4.5 이다.)

설치를 하기위해서는 관리자권한으로 **파워쉘**을 열어야한다.

![/images/2020/0622/22.png](/images/2020/0622/22.png)

윈도우즈의 검색창에서 `POWER SHELL` 이라고 치면 위와 같은 화면이 나오는데, 관리자 권한으로 실행을 클릭하자.

![/images/2020/0622/23.png](/images/2020/0622/23.png)

커맨드 화면이 나오면 아래의 명령어를 붙여넣고 엔터키를 누르자.

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

파워쉘에서 `choco` 라고 명령어 입력시 아래와 같이 나오면 성공이다.

![/images/2020/0622/24.png](/images/2020/0622/24.png)

이제 파이썬을 설치해보자.

choco 로 그냥 `python` 을 검색하면 너무 많은 결과가 나오게 되니, 검증(approved) 된 패키지만 찾도록 하자. 또한 파이썬 2.x 는 사용하지 않을 예정이라 `python3`로 검색했다. 파워쉘의 커맨드창에 아래와 같이 입력해주자.

```powershell
> choco search python3 |Select-String -Pattern Approved
```

![/images/2020/0622/25.png](/images/2020/0622/25.png)

그러면 적당한 갯수의 패키지가 보이게된다.

`chocolatey` 는 **[웹사이트](https://chocolatey.org/search?q=python)**도 제공하고 있으니 웹사이트에서 검색후 사용해도 된다.

### chocolatey로 파이썬 설치하기

파이썬을 설치하기 위해서는 `powershell` 을 관리자 권한으로 열어주어야한다.

파워쉘을 연다음 `choco install python3` 을 입력하자. 관리자 권한이 아닌경우 설치를 진행하면 권한이 없어서 설치가 되지 않는다.

설치시에 이것저것 물어보는데 `a`를 선택하면 전부다 `y`로 처리된다. 귀찮은경우에 사용하자.

![/images/2020/0622/26.png](/images/2020/0622/26.png)

![/images/2020/0622/27.png](/images/2020/0622/27.png)

설치가 다 되었다면, 파이썬이 잘 실행되는지 테스트를 해봐야하는데, 그전에 `refreshenv` 를 실행해서 파이썬의 path를 적용한 환경변수를 현재 파웨쉘터미널에 적용해주어야한다. 그 후에 `python -V` 를 입력시 `Python 3.8.3` 과 같은 메세지가 나오면 잘 설치가 된 것이다.

## 다섯번째, wsl + pyenv를 사용하여 python 사용하기

윈도우10부터는 wsl로 윈도우의 서브시스템으로 리눅스를 사용할 수 있다. wsl 은 windows subsystem for linux 의 약자인데, 말그대로 윈도우에서 리눅스를 사용할 수 있게 해주는 녀석이다. `마이크로소프트 스토어`에서 설치가 가능하다.

사용하기가 쉬운 우분투를 한번 받아보도록 하자.

![/images/2020/0622/28.png](/images/2020/0622/28.png)

원하는 버전을 받으면 되는데, 나는 20.04를 받았다. 18.04버전도 문제없이 잘 동작할것이다.

![/images/2020/0622/29.png](/images/2020/0622/29.png)

`무료버튼`을 클릭하면 설치가 된다.

![/images/2020/0622/30.png](/images/2020/0622/30.png)

설치가 완료됐으면 실행을 해보도록 하자.

![/images/2020/0622/31.png](/images/2020/0622/31.png)

![/images/2020/0622/32.png](/images/2020/0622/32.png)

실행하니 위와 같은 에러가 뜨는데, wsl 을 사용할 수있도록 설정을 해야한다고 한다. 파워쉘을 `관리자`모드로 켜고 아래의 명령을 실행해주자.

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

![/images/2020/0622/33.png](/images/2020/0622/33.png)

위의 설정을 하고나서 컴퓨터를 재시작 해주어야한다.

재시작후 설치한 우분투를 다시 실행하면 설치를 하게되고, 패스워드를 입력해주어야한다.

![/images/2020/0622/34.png](/images/2020/0622/34.png)

wsl 설치관련해서는 아래 링크를 참고하도록하자

[https://docs.microsoft.com/ko-kr/windows/wsl/install-on-server](https://docs.microsoft.com/ko-kr/windows/wsl/install-on-server)

이제 우분투에서 pyenv 를 설치하여 파이썬을 설치해보자. wsl에 설치된 우분투도 윈도우에서 사용가능하다!

우분투에서의 pyenv 설치는 pyenv-installer를 사용하는 것이 좋다. pyenv-installer 를 사용하면 관련 플러그인도 함께 설치해주기때문에 편리하다.

```bash
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
```

설치후에는 `.profile` 에 pyenv 초기화 스크립트를 추가해주어야한다.

```bash
# .profile 에 추가해주자.
export PATH="/home/gyus/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

추가후 쉘을 재시작해주거나 `source .profile` 을 실행하면 pyenv 를 사용할 수 있게 된다.

파이썬을 설치하려면 C컴파일러등의 개발도구가 필요한데, 아래 명령어를 사용하여 개발도구들을 미리 설치하자.

```bash
$ sudo apt-get install build-essential
```

위의 명령어로도 잘 안되는 경우가 있는데 그런 경우에는 아래와 패키지들을 설치해주자.

```bash
$ sudo apt-get install autoconf automake autopoint autotools-dev blt-dev debhelper dh-autoreconf
  dh-strip-nondeterminism diffstat docutils-common gettext intltool-debian
  libarchive-zip-perl libbluetooth-dev libbluetooth3 libbz2-dev libcroco3 libdb-dev
  libdb5.3-dev libexpat1-dev libffi-dev libfile-stripnondeterminism-perl libfontconfig1-dev
  libfreetype6-dev libgdbm-dev libice-dev libjs-jquery libjs-sphinxdoc libjs-underscore
  liblzma-dev libmpdec-dev libncursesw5-dev libpixman-1-0 libpng-dev libpthread-stubs0-dev
  libreadline-dev libsm-dev libsqlite3-dev libssl-dev libtcl8.6 libtext-unidecode-perl
  libtimedate-perl libtinfo-dev libtk8.6 libtool libx11-dev libxau-dev libxcb1-dev
  libxdmcp-dev libxext-dev libxfont2 libxft-dev libxkbfile1 libxml-libxml-perl
  libxml-namespacesupport-perl libxml-sax-base-perl libxml-sax-perl libxrender-dev
  libxss-dev libxss1 libxt-dev m4 pkg-config po-debconf python-babel-localedata
  python3-alabaster python3-babel python3-docutils python3-imagesize python3-lib2to3
  python3-pygments python3-roman python3-sphinx python3-tz quilt sgml-base sharutils
  sphinx-common tcl tcl-dev tcl8.6 tcl8.6-dev tex-common texinfo tk tk-dev tk8.6
  tk8.6-blt2.5 tk8.6-dev x11-xkb-utils x11proto-core-dev x11proto-dev
  x11proto-scrnsaver-dev x11proto-xext-dev xml-core xorg-sgml-doctools xserver-common
  xtrans-dev xvfb zlib1g-dev
```

### pyenv 로 파이썬 설치

pyenv 로 파이썬을 설치하는 것은 정말 매우 간단하다. (시간이 좀 오래걸린다)

```bash
# 파이썬 설치
$ pyenv install 3.8.3
Downloading Python-3.8.3.tar.xz...
-> https://www.python.org/ftp/python/3.8.3/Python-3.8.3.tar.xz
Installing Python-3.8.3...

Installed Python-3.8.3 to /home/andy/.pyenv/versions/3.8.3
```

설치후에 virtualenv 로 가상환경을 같이 만들어주면 좋다.

```bash
# 가상환경 만들기
$ pyenv virtualenv 3.8.3 py38

# 현재 쉘의 가상환경을 py38 로 지정
$ pyenv local py38

$ python -V
Python 3.8.3
```

wsl에서 pyenv 로 설치한 파이썬을 윈도우에서 사용가능하다. 다만 경로가 조금 복잡하다. wsl 콘솔에서 아래와 같이 입력하면 탐색기가 뜨면서 경로를 바로 찾을 수 있다.

```bash
$ explorer.exe .
```

pycharm 프로페셔널의 경우에는 wsl의 파이썬을 쓸 수 있도록 지원하고 있다. 아닌경우는 안타깝게도 사용하기가 어려울듯하다.

[https://www.jetbrains.com/help/pycharm/using-wsl-as-a-remote-interpreter.html](https://www.jetbrains.com/help/pycharm/using-wsl-as-a-remote-interpreter.html)

## 결론

개인적으로는 chocolatey 가 제일 깔끔하게 설치가 되는 편이었어서 좋았던것 같다. 윈도우즈용 파이썬 개발환경은 그다지 좋다고 볼수는 없는 편으로 생각된다. 데이터 과학자라면 아나콘다가 훨씬 나은 경험을 줄 것 같다.
