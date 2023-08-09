---
title: "웹팩에 대하여 알아보자1 : hello webpack"
date: "2020-08-12"
tags: ["webpack"]
category: dev
published: true
---

## [웹팩](https://webpack.js.org/)이 뭘까?

공식사이트에 나와 있는 문서를 보면 웹팩은 모오던 자바스크립트 어플리케이션을 위한 `스태틱 모듈 번들러` 라이브러리이다. 이말을 분해해서 적어본다면 이렇다.

`스태틱` 이라고 하는 말은 다이나믹의 반대이니 모듈이 동적으로 변하지 않는다는 의미이겠다.
`모듈`은 자바스크립트 코드 뭉치를 모듈이라고 하는 것이고, `번들러` 라고 하는 것은 스태틱 모듈들을 하나의 파일로 만들어 주는 녀석 이라는 뜻이다. 번들이라는 뜻자체가 여러가지를 하나로 묶은 것을 번들이라고 하는데, 웹팩은 번들러 역활을 잘하기 위해 존재하는 녀석이라는 뜻이 된다.

실제로는 우리가 정의한 의존성 파일에서 모든 의존성을 찾아서 의존성그래프(dependency graph)를 만든다음, 어플리케이션에 필요한 모든 모듈을 적은 갯수의 번들들로(대부분은 하나의 파일로) 만들어준다.

백마디 말보다 한마디 코드가 더 나은 설명일 때가 많으니, 실제로 예제를 보면서 확인해보자.

## 웹팩 맛보기

> [webpack 사이트](https://webpack.js.org/guides/getting-started/) 를 참고하였다.

아래와 같은 스크립트로 프로젝트를 만들자.

```shell
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

그리고 index.html 을 프로젝트 디렉토리에 만들고 src 디렉토리 밑에 index.js 파일도 만들자.
아래와 같은 구조가 된다.

```
├── index.html
├── package-lock.json
├── package.json
└── src
    └── index.js
```

index.html 은 아래와 같이 되어 있다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

index.js 는 아래와 같이 `hello webpack` 을 화면에 출력하는 코드이다.

```javascript
function component() {
  const element = document.createElement("div")

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ")

  return element
}

document.body.appendChild(component())
```

index.js 에서는 `_.join` 함수를 사용하고 있는데, 이는 자바스크립트 함수가 아니라 lodash 에 의존성이 있는 함수이다.
그런데 이러한 의존성을 index.html 파일에서 관리하는 것은 아래와 같은 문제가 있다.

- index.js 에서 의존성을 명확하게 알기 힘들다.
- 의존성 파일이 없거나 여러개의 순서가 뒤바뀌거나 하는 경우 제대로 동작하지 않을 수 있다.
- 사용하지 않는 의존성의 경우에도 웹브라우저가 다운로드를 받게된다.

웹팩을 사용하면 이러한 문제들을 편하게 해결할 수 있다.

### 번들 만들기

위에서 만들었던 index.html 을 dist 디렉토리로 옮기자

```
├── dist
│ └── index.html # 여기로 옮김
├── package-lock.json
├── package.json
└── src
    └── index.js
```

의존성을 프로젝트에서 관리 할것이므로 설치를 해주자.

```shell
npm install --save lodash
```

`index.js` 에서는 모듈 시스템을 사용하여 명시적으로 `lodash` 를 임포트 해주자.

```js
// 명시적으로 lodash 를 임포트 해준다
import _ from "lodash"

function component() {
  const element = document.createElement("div")
  element.innerHTML = _.join(["hell", "webpack"], "")
  return element
}

document.body.appendChild(component())
```

`index.js` 에서 lodash 를 임포트 해줬으니 이제 index.html 에서는 빼줘야한다.
아래와 같이 index.html 에서 lodash 를 불러오던 script태그를 삭제해주자.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

이제 `npx webpack` 을 실행하면 `dist/main.js` 가 생기게 되는데 이는
webpack에서 기본값으로 엔트리 포인트는 `src/index.js` 가되어 있고,
output 으로 `dist/main.js` 가 되어 있기 때문이다.

`npx` 는 npm 5.2.0 이후부터 실행할 수 있는 명령어인데, `npx webpack` 은 `./node_modules/.bin/webpack` 과 같다.

```s
npx webpack
Hash: 46d24a7e2660cba51209
Version: webpack 4.44.1
Time: 1674ms
Built at: 2020-08-12 09:37:03
  Asset      Size  Chunks             Chunk Names
main.js  72.3 KiB       0  [emitted]  main
Entrypoint main = main.js
[1] ./src/index.js 214 bytes {0} [built]
[2] (webpack)/buildin/global.js 472 bytes {0} [built]
[3] (webpack)/buildin/module.js 497 bytes {0} [built]
    + 1 hidden module
```

`npx`를 실행 하면 위와 같이 해시값, 웹팩의 버전, 빌드하는데 걸린 시간, 결과물의 파일명 사이즈 청크등 다양한 정보가 나오게 되고 결과물로 `dist/main.js` 가 생기게 된다.

### webpack config 사용하기

버전4 부터 웹팩은 아무런 설정이 필요하지 않지만, 좀 더 디테일한 설정이 필요한 경우는 설정파일을 만들어서 사용할 수 있다.
프로젝트 디렉토리에 `webpack.config.js` 를 만들고 아래와 같이 설정한 다음 저장하자. 설정에 관한 자세한 내용은 [웹팩설정](https://webpack.js.org/configuration/) 에서 확인할 수 있다.

```js
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
}
```

`npx webpack` 으로 번들링을 할 수 있다.
웹팩 설정파일이 `webpack.config.js` 가 아닌 경우에는 `--config` 옵션을 쓸 수 있다.

```
npx webpack --config mywebpack.config.js
```

### NPM 스크립트로 등록하기

`package.json` 의 scripts 에 아래와 같이 등록하면 `npx webpack` 을 한번 감싸서 `npm run bulid` 로 사용할 수 있다.

> 사실 npx webpack 이 더 간단한데.. 굳이 해야되나 싶긴하다.

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "데모",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack" // npx webpack 대신 npm run build 를 사용할 수 있다.
  },
  "keywords": [],
  "author": "",
  "private": true,
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12"
  },
  "dependencies": {
    "lodash": "^4.17.19"
  }
}
```
