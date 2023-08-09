---
title: "파이썬 패키징, 배포 툴의 과거와 현재"
date: "2020-09-05"
tags: ["python", "packaging"]
category: dev
published: true
---

개인적으로 배포 관련해서 관심이 많은 편인데, 파이썬을 꽤 오래 사용하고 있으면서도 파이썬을 잘 배포하려면 어떻게 해야 하는지 고민을 별로 하지 않은 것 같아서 좀 찾아보게 되었다. 결론을 미리 말한다면 현재는 그나마 안정된 상태이지만, 과거에는 혼파망(혼돈 파괴 망각)이 딱 어울리는 상황이었다. 이 글에서는 과거의 혼란했던 상황과 현재의 상태를 다룬다.

## 2000년 최초의 파이썬 패키징 라이브러리 distutils

필자가 파릇파릇한 신입생이던 시절인 2000년도에 파이썬 1.6.1에 처음으로 추가된 라이브러리이다. 파이썬이 첫 릴리즈 된 게 1991년이니까 9년 만에 패키징 라이브러리가 나왔다는 것이다. 또한 distutils는 정말 딱 파이썬 코드를 패키징 하는 기능만 있었다. 메타데이터를 수집은 하고 사용을 하고 있지 않았는데, 추후에 PyPI (Python Package Index)가 생기면서 distutils 에도 메타데이터를 사용하도록 변경이 되었다. distutils는 파이썬 3.3까지 사용되었고 지금은 레거시가 되었다.

## 2002년, 2003년 파이썬의 패키지 인덱스 서버 PyPI

파이썬을 하는 사람이라면 다들 너무나 자연스럽게 사용하고 있는 PyPI이지만, 서버가 구동된 것은 2003년부터이다. 이때부터 파이썬도 하나의 중앙 패키지 인덱스가 생기게 되었다. 이때는 setuptools가 나오기 전이므로 distutils를 사용했고 메타데이터는 setup.py를 사용했다.

## 2005년 distutils의 개선판 Setuptools

setuptools는 distutils의 개선 판이라고 볼 수 있는데, setuptools는 easy_install이라는(pip 같은) 커맨드 라인 툴을 제공했다. easy_install 은 지금은 잘 안 쓰지만, pip이전에 많이 사용하던 패키지 관리 툴이었다. 약간 이해 안 될 수 있지만, pip를 사용하기 위해서 easy_install로 pip를 설치하곤 했었다. setuptools는 distutils에 비해 개선된 점이 있었는데, 쉽게 빌드&배포가 가능했고, 설치 시에 의존성이 걸려 있는 패키지들도 함께 설치해준다는 것이었다. setuptools는 Egg라는 단일 바이너리 패키징 파일도 지원했다.

## 2006년 통합 배포 툴을 만들고자 했던 buildout

buildout 은 파이썬을 위한 패키징 & 배포 툴이었는데, 2가지 문제를 해결하기 위해 만들어졌다고 한다. 첫 번째는 애플리케이션 중심의 패키징과 배포이고 두 번째는 반복해서 배포하는 경우의 반복적인 작업을 줄이기 위한 것이다. 안타깝게도 현재는 그리 널리 사용되고 있지 않은 것으로 보인다.

## 2007년 virtualenv의 등장

virtualenv는 많이들 사용하고 있는 가상 환경을 만들어주는 툴이다. 랜 비킹이라는 사람이 만들었는데, 나도 덕을 많이 봤고, 현재도 pyenv에 얹어서 함께 사용하고 있는 툴이다.

## 2008년 pip 가 세상에 소개되다.

pip도 virtualenv를 만든 랜 비킹이라는 사람이 만들었다. pip는 easy_install을 대체하기 위한 용도로 만들어졌는데, 대표적인 몇 가지 차이점으로 easy_install은 패키지 삭제(uninstall), 설치된 패키지의 리스팅, 의존성 오버라이드 (지정된 버전이 아닌 메이저 버전을 고정하고 마이너는 자동으로 업데이트해주는 등의 기능)를 지원하지 않았다. 그 외에도 상반된 차이점들이 있었는데, 결론적으로는 pip 가 널리 사용되게 되었다.

아래 링크에서 자세한 차이점을 확인할 수 있다.

https://packaging.python.org/discussions/pip-vs-easy-install/

## 그 외 버려진 녀석들 distribute, Distutil2

pip처럼 setuptools의 불편함을 해결하기 위해 나왔던 distribute 패키지라던지, Distutil2 들은 개발의 진척이 제대로 되지 않아서 사용하지 않게 되었다.

## 2013년 패키징 포맷으로 wheel 이 등장함

pep-425와 pep-427 이 채택되었고, 특히 pep-427에서는 바이너리 포맷으로 wheel을 제안하였다. 간단히 설명하자면. whl 확장자를 가지고 있는 zip 포맷으로 압축한 하나의 바이너리 파일인데, egg 파일이 특정 파이썬 버전에 의존성이 있었던 반면 wheel 은 그런 부분이 개선되었다. 또한 wheel은 버저닝을 지원하는 부분도 egg보다 개선된 것이었는데, 자세한 것은 pep-427을 참고하도록 하자.

## 2014년 pip 가 더 널리 사용됨

pep-453 에는 pip를 파이썬 기본 패키징 프로그램으로 사용하자는 제안이 담겨 있는데, 2013년 10월에 채택되었고 그 결과 python3.4에 포함되게 되었다. 지금은 너무도 자연스럽게 사용하고 있는 pip인데, 파이썬에 포함된 시점이 그리 오래되지 않았다는 것은 약간 놀랍다. 물론 이때 setuptools도 여전히 사용되고 있었다.

## 2016년 pyproject.toml 이 채택됨

setuptools로 배포를 하는 환경에서 패키징과 배포를 위한 설정 파일로 setup.py를 주로 사용하게 되는데, 문제는 setup.py 파이 썬파일이기에 파이썬으로 실행이 가능하고 이는 문제가 생길 수 있는 여지를 주게 된다. 이에 pep-518 에는 해당 프로젝트의 의존성에 대한 정보만 담는 파일을 만들자라는 취지로 제안되었다. 해당 제안은 채택이 되고 pyproject.toml로 빌드를 할 수 있게 되는 툴들이 몇 가지 나오게 되었다. ( poetry, flit) 개인적으로도 setup.py 보다는 pyroject.toml 이 좋은 방향이라고 생각한다.

## 2017년 통합 패키징 툴을 목표로 하는 pipenv 가 등장함

pyenv와 virtualenv를 적절히 섞어놓은 것이 콘셉트인 requests로 유명한 케네스 헤이츠가 만든 패키징 툴이다. 파이썬 커뮤니티에서 잘 밀어주고 있는 프로젝트였는데, 2018년부터 관리가 잘 되고 있지 않다. (2020년부터 다시 이어받아서 관리가 되고 있는 듯하다.)

## 앞으로는 어떻게 될까?

ruby의 bundler 나 nodejs의 npm을 사용해본 입장으로서는 pip는 아직 아쉬운 부분이 좀 남아있다. 예를 들어 dependency resolving (이미 설치한 의존성과 다른 패키지에서 요구하는 의존성이 충돌 나는 것을 해결해주는 것) 이 되지 않는다. 락 파일이 없는 점 또한 아쉬운 부분이다. 의존성으로 걸린 패키지의 이에 버전은 같으나 파일이 업데이트되는 경우 문제가 생길 수 있다. 가상 환경의 미지원 도 아쉬운 부분인데, pip를 사용 시에는 이러한 부분들을 손수 잘 처리해야 한다. 이러한 문제들을 모두 해결한 라이브러리가 차세대 pip가 될 것이라고 생각하는데, pip 자체에서 해결을 하려는 노력은 없는 것으로 보인다. 개인적으로는 pip에 있는 문제들을 모두 해결한 poetry를 도입하려고 하고 있다. 다만 아직 한창 개발 중인 프로젝트이기에 버그가 있을 수 있다는 것이 단점인데, 최근에는 많이 안정화되었다고 한다.

### 참고 링크들

https://pyvideo.org/pycon-india-2019/python-packaging-where-we-are-and-where-were-headed-pradyun-gedam.html

https://snarky.ca/what-the-heck-is-pyproject-toml/

https://www.python.org/dev/peps/pep-0518/

https://www.pypa.io/en/latest/history

https://www.python.org/dev/peps/pep-0427/

https://www.python.org/dev/peps/pep-0453/

https://the-hitchhikers-guide-to-packaging.readthedocs.io/en/latest/introduction.html#current-state-of-packaging

https://stackoverflow.com/questions/8550062/how-do-setuptools-distribute-and-pip-relate-to-one-another
