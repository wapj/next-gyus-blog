---
title: "gatsby helmet 사용하기"
date: "2019-05-18"
category: "dev"
published: true
---

### 설치

`npm install --save gatsby-plugin-react-helmet react-helmet`

### 설정

`gatsby-config.js`

```
{
  plugins: [`gatsby-plugin-react-helmet`]
}
```

### 사용법

```
import React from "react"
import { Helmet } from "react-helmet"

class Application extends React.Component {
  render() {
    return (
      <div className="application">
        <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    </div>
    )
  }
}
```

나는 구글 아날리스틱 적용이랑 메타의 타이틀을 페이지마다 바꾸는데 사용했다.

끝~
