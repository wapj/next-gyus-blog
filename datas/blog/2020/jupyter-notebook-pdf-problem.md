---
title: "jupyter notebook 에서 pdf 만들기"
date: "2020-05-13"
tags: ["jupyter notebook"]
category: "dev"
published: true
---

## 주피터를 저작도구로 사용하기 시작했다

최근에 여가시간을 다 보내고도 시간이 남을때 책을 쓰고 있다.

책을 쓰려면 저작도구가 필요한데, 회사 사람이 책 저작도구로 `jupyter notebook` 을 사용했다고 하여,
책을 쓰는 용도로 써보니 확실히 개발관련책, 특히나 파이썬 책을 쓰는데에는 아주 좋았다.
그런데 문제는 여기서 작성한 글을 pdf 로 뽑아낼때 발생했는데...

![img1](../../images/20200129/1.png)

File -> Download as -> pdf 를 클릭하면 아래와 같이 에러가 난다.

![img2](../../images/20200129/2.png)

### pandoc 과 MacTeX 설치

내용인 즉슨 [pandoc을 설치해라](http://pandoc.org/installing.html) 이다.
맥에서는 `$ brew install pandoc` 으로 설치가 가능하다.

설치후 다시 클릭해보면
`xelatex` 가 패스에 없다는 에러가 뜬다. `xelatex` 가 없으면 설치하라는 말도 덧붙인다.
아래 [링크](https://nbconvert.readthedocs.io/en/latest/install.html#installing-tex)를 따라 또 설치를 하러 가보자.

```
nbconvert failed: xelatex not found on PATH, if you have not installed
xelatex you may need to do so. Find further instructions at
https://nbconvert.readthedocs.io/en/latest/install.html#installing-tex.
```

링크를 가보면 `Installing Tex` 라고 떡 하니 `TeX` 를 설치해줘야 하는 것 같다.
mac은 `MecTeX` 라는것을 설치하면 된다.

[http://tug.org/mactex/](http://tug.org/mactex/) 에서

![img3](../../images/20200129/3.png)

[링크](http://tug.org/cgi-bin/mactex-download/MacTeX.pkg)를 눌러서 패키지를 다운받아서 설치하자. (참고로 굉장히 오래걸린다)

MacTex를 설치하자. (pdf 변환하려고 이걸 설치해야하는건 좀 과한거 아닌가라는 생각이 들기시작했다.)

nbconvert 도 설치해야하는 것 같으니 이것도 설치해주자.

```
pip install nbconvert
```

### mactex 설치후 패스잡아주기

`.bash_profile` 에 패스를 잡아주자.

2020년 5월 13일 기준으로 아래의 패스에 latex에 필요한, 명령어들이 들어있다.

```
/usr/local/texlive/2020/bin/x86_64-darwin
```

위 패스를 .bash_profile 에 추가하자.

```
# .bash_profile 에 추가해주자
export PATH="/usr/local/texlive/2020/bin/x86_64-darwin:$PATH"
```

latex을 설치했으니, pdf로 내보내기를 다시 해보면 에러는 나지 않지만, 아래와 같은 화면을 볼 수 있다.

![img4](../../images/20200129/4.png)

위와 같이 글자가 깨져보이는 이유는 폰트가 제대로 설정 되어 있지 않기 때문인데,
pdf내보내기 할때 latex에서 한글 폰트를 읽어올 수 있도록 변경해줘야한다.

## jupyter 설정

jupyter를 설치하고 실행했으면 아마도 `~/.jupyter` 디렉토리가 있을 것이다.
없다면 만들어주도록 하자. (`cd ~ && mkdir .jupyter`)

.jupyter 디렉토리에는 아래의 두개의 파일을 추가 할 것이다.

- latex 템플릿파일 : hangul.tplx
- 주피터 노트북 설정 파일 : jupyter_notebook_config.py

### hangul.tplx 파일

latex 설정파일인데, kotex 라는 패키지를 사용하여 한글폰트를 사용할 수 있게한다.

```
((=- Default to the notebook output style -=))
 ((*- if not cell_style is defined -*))
     ((* set cell_style = 'style_jupyter.tplx' *))
 ((*- endif -*))

 ((=- Inherit from the specified cell style. -=))
 ((* extends cell_style *))


 %===============================================================================
 % Latex Article
 %===============================================================================

 ((*- block docclass -*))
 \documentclass[11pt]{article}
 \usepackage{kotex}
 ((*- endblock docclass -*))
```

### jupyter_notebook_config.py 파일

jupyter notebook 설정파일이다.

우리는 pdf 내보내기할 때의 커맨드만 설정하겠지만, 더 궁금한게 있는 사람은 [공식문서](https://jupyter-notebook.readthedocs.io/en/stable/config_overview.html?highlight=jupyter_notebook_config)를 참고하자.

```
import os
# custom_path = os.path.expanduser("~/.jupyter/nbconvert_templates")
# c.TemplateExporter.template_path.append(custom_path)
c.LatexExporter.template_file = 'hangul'
c.PDFExporter.latex_count = 3
c.PDFExporter.template_file = 'hangul'
c.PDFExporter.latex_command = ['xelatex', '{filename}']
```

- `LatexExporter` 와 `PDFExporter` 의 템플릿파일을 hangul 로 변경해준다.
- `PDFExporter`에 딸려서 실행하는 latex_command 를 `xelatex filename` 으로 변경해준다.
- 아까 설치한 MacTex 를 깔고, 패스를 설정하면서 xelatex 을 사용할 수 있게되었다.

### 주의점

- jupyter notebook의 설정을 변경시에는 항상 jupyter notebook 을 재시작 해주어야한다.
- 이미지의 경우 보통 상대경로로 지정헤줄때 `![이미지](./images/1/1.jpg)` 이런식으로 사용하곤 하는데, 이러면 이미지가 나오지 않게 된다. `./` 를 없앤상태로 `![이미지](images/1/1.jpg)` 와 같은 형태로 사용해야 이미지가 잘 나오게 된다.

이렇게까지 했는데도 안된다면, 이제부터는 latex와 cjk 관련으로 검색을 잘 찾아서 해결해보도록 하자.
이 글을 쓰는 나도, jupyter에서 한글로 뽑아지는 pdf를 보기 위해 이렇게나 노력해야된다는 것을 알았다면,
아마 일찌감치 다른 툴을 찾아봤을 것이다.

그럼 코로나 조심들 하시고 다음에 봅시다~
