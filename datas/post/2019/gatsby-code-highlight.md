---
title: "개츠비로 코드하이라이팅하기"
date: "2019-05-15"
category: "dev"
draft: false
---

`gatsby-remark-prismjs` 를 써야된다고 함

### 설치

> 이 글을 쓰는 시점에는 하이라이팅이 안되고 있는 중이다..ㅎㅎ

> gatsby-transformer-remark 는 미리 설치를 해둔 상태여야한다.

```
npm install --save gatsby-remark-prismjs prismjs
```

### gatsby-config.js 설정

```
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            classPrefix: "language-",
            inlineCodeMarker: null,
            aliases: {},
            showLineNumbers: true,
            noInlineHighlight: false,
          },
        },
      ],
    },
  },
]
```

### CSS include

PrismJS 는 여러가지 테마가 있는데...
[여기](https://github.com/PrismJS/prism/tree/1d5047df37aacc900f8270b1c6215028f6988eb1/themes) 를 참고하자.

테마를 로딩 할라면 `gatsby-browser.js` 에 설정 해줘야 한다.

```
// gatsby-browser.js
require("prismjs/themes/prism-solarizedlight.css")
```

### 마크다운에서는 어떻게 사용??

`gatsby-config.js` 에 아래와 같이 설정해준다.


````
```javascript
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-prismjs`],
    },
  },
]
```
````

라인 번호를 보이게하려면 요렇게

````
```javascript{numberLines: true}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-prismjs`],
    },
  },
]
```
````

특정 라인부터 라인 번호가 보이게 하려면 요렇게

````
```javascript{numberLines: 5}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-prismjs`],
    },
  },
]
```
````

그런데 라인 번호 보여주는 기능은 뭔가 좀 아쉬운 부분이 있어서,

나는 적용을 하지는 않았다.

그럼 다음에 보아요~ 안녕~~
