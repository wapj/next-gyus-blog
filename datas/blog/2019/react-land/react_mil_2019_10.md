---
title: "MIL 10월에 공부한 것들"
date: "2019-10-01"
tags: ["TIL"]
category: "dev"
published: true
---

## react

- `render` 함수만 필요한 경우는 함수형 컴포넌트로 작성하는게 좋다.

바벨을 사용해서 리액트 javascript 컴파일하기

```
npx babel --watch src --out-dir . --presets @babel/preset-react
```

### 클래스형 컴포넌트와 함수형 컴포넌트

- 클래스 컴포넌트는 함수형 컴포넌트가 할 수 있는 모든 일을 할 수 있다.
- 새로운 버전(16.8 이후)에서는 함수형 컴포넌트가 좋다.

### webpack

- 자바스크립트로 만든 프로그램을 배포하기 좋은 형태로 묶어주는 툴이다.

#### 웹팩 실행하기

```
$ npx webpack
```

### create-react-app

create-react-app 사용해서 프로젝트 만들기

```
$ npx create-react-app {project_name}
```

시작하기

```
cd {project_name}
npm start
```

https를 사용하고 싶을때

```
# 리눅스 or 맥
HTTPS=true npm start

# 윈도우라면
HTTPS=true && npm start
```

빌드하기
`npm run build` 는 배포 환경에서 사용할 파일을 만들어줌

로컬에 웹서버를 띄워서 확인하기

`npm install -g serve` 로 `serve` 모듈을 설치하고 로컬에 웹서버를 띄워보자

`server` 아니고 `serve` 인것에 주의하자.

```
npx serve -s build
```

build 를 할때 10킬로바이트보다 작은 이미지는 별도의 파일로 생성되지 않고 data url 형식으로 자바스크립트 파일에 포함된다. 작은 파일을 요청하는 http 컨넥션이 더 비싸기 때문이다.

#### polyfill

core-js 를 사용하면 폴리필을 사용할 수 있다.

설치

```
npm install core-js
```

```
import 'core-js/features/string/pad-start';
const val = '123'.padStart(5, '0');

console.log(val); // 00123
```

#### autoprefixer

css의 최신기능을 사용하려면 벤더 접두사가 붙은 이름을 사용해야하는데, `autoprefixer` 패키지를 사용하면 자동으로 접두사가 붙는다.

### css 작성방법

- css-module : css파일간 클래스 충돌을 방지해줌
- css-in-js : css코드를 자바스크립트 파일 안에 작성함. `styled-components` 가 가장유명함 `npm install styled-components`
- sass : 변수, 믹스인을 사용하여 css코드를 재사용 할 수 있다. `npm install node-sass`

### 단일 페이지 애플리케이션 (SPA) 만들기

- 리액트는 SPA로 개발하는 것이 정석이다.
- 페이지 전환시의 렌더링을 클라이언트에서 처리한다 -> 네이티브 애플리케이션처럼 동작.
