---
title: 블로그 개선
date: "2020-05-19"
tags: ["shell", "blog"]
category: dev
featured: /images/2020/blog-update.jpg
draft: false
---

# 블로그를 업데이트하였다

2019년 5월 13일에 만들고 거의 방치했었는데, 회사에 주간으로 블로그를 쓰는 모임이 있다는 것을 듣고 방치된 블로그를 활성화 시켜보고자 가입을 하게 되었다. 글을 쓰지 않으면 벌금을 내게되는 시스템이 있었는데, 벌금보다는 내가 글을 쓰는지 안쓰는지 지켜봐주는 사람들이 생기게 된 것이었다. 이것이 정체된 블로그 생활에 활력소를 주게 되어서 다시 블로그를 잘 사용해보기로 하였다.

아래에 적게될 내용들은 요 몇일간 적용한 내용들이다.

## 스타일의 변경

### 폰트 사이즈 조절

폰트 사이즈를 사실 신경쓰지 않고, 브라우저 기본 폰트설정을 사용하고 있었다.
그러다 보니 h1,h2,h3 가 너무 크게 나와서 가독성을 해치는 것으로 보였다.
또한 내가쓰는 아이폰8에서 상단 메뉴가 두줄로 보이는 불상사가 생겼다.
그래서 폰트를 모두 줄이게되었다. css는 잘모르지만 어딘가에서 주워들어서 알고 있는 rem을 적용하였다.

```css
h1 {
  font-size: 1.6rem;
}

h2 {
  font-size: 1.3rem;
}

h3 {
  font-size: 1.1rem;
}

li {
  font-size: 0.9rem;
}
```

### 문법강조구문의 배경색을 변경했다.

기존에는 문법강조시에 배경색이 완전 검은색이었다. 검은색이 뭔가 투박해보이기도하고 못생겨 보이기도하고 가독성도 약간 나빠지는 것 같은 느낌이었다. 다른 사람들의 블로그를 보니 배경색이 그나마 좀 차분한 색들이 많이 있었다. 그래서 나도 배경색만 좀 차분한 파란색 계열로 변경해 보았다. 그랬더니 쪼오끔더 글들이 이쁘게 나오는 효과가 있었다.

아래와 같이 적용해서 여러줄로 나오는 부분과 인라인으로 되어 있는 부분의 색을 다르게 주었다.

```css
:not(pre) > code[class*="language-"] {
  background: #345d82;
}

pre[class*="language-"] {
  background: #002a4f;
}
```

## 카테고리를 추가했다.

개발이야기만 잔뜩있고, 뭔가 글도 재미없게 써져있는 나와 달리 다른 친구들은 일상에 대한 이야기들도 있었다. 나는 사실 일상이야기를 블로그에 잘 올리지는 않지만, 개발이외의 뭔가 재밌는 것을 올리고 싶을 경우도 있을 것 같아서 카테고리를 만들었다. 메타데이터에 category 를 넣고 graphql 에서 받아오게만 하면 되는 거였기 때문에 이건 쉬웠다.

다만, 개츠비에서 제공하는 `graphql` 태그에서 변수를 입력받는 것을 허용하지 않았다. 그래서 아래와 같은 `graphql 쿼리` 를 카테고리별로 한번씩 + 전체 불러오는 쿼리를 따로 따로 복사 붙여넣기를 해야했다. 이슈를 읽어보면 정말로 `정적`인 상태로 관리하고 싶기 때문이라고 한다.

아래와 같은 쿼리를 3번날려야 했지만, 그래도 만드는것 자체는 재미가 있었다.

```javascript
export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "diary" } } }
      ...중략
```

## 드래프트 기능을 추가했다.

글을 하루만에 다 적고 바로 발행을 하면 좋겠지만, 글을 적어두고 묵혀놨다가 수정하고 덧붙이고 하는 작업을 꽤나 하는편이다. 그런데 이전에는 파일명을 `some_blog.md.bak` 처럼 파일명의 확장자를 변경했다가 다쓰고 나면 다시 변경하곤 했는데 지금 생각해보면 나의 과거가 바보같다. ㅠㅠ
graphql 에 필터를 하나 더 걸면 되는 것이었다. 무식하게 살았던 과거를 반성해본다.

(어 그러고보니 카테고리별 graphql 에 필터 안 걸어놨다. 바로 추가해야겠다.)

```javascript
{
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }

```

## 태그를 넣을 수 있게 만들었다.

각 페이지의 메타데이터에 `tags` 를 넣어두면 당연히 graphql 로 검색을 할 수있게 되는 것이었다.

그리고 우리의 친절한 개츠비 개발자님들은 [가이드](https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/) 도 잘 만들어 놨다. 나는 정말 이 문서보고 그대로 따라했고, html 태그도 그냥 내가 만든 레이아웃 안에 넣는 것만 했었다.

가이드는 좀 기니깐 내가 만든 페이지의 짧은 소스를 붙여보면 아래와 같다.

```javascript
import React from "react"
import kebabCase from "lodash/kebabCase"

import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout menu="tags">
    <div>
      <h1>태그들</h1>
      <ul>
        {data.allMarkdownRemark.group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
```

위의 소스에서 `Layout` 만 내가 만든 컴포넌트이다. (심지어 이것도 개츠비 가이드보고 따라 만든것이다. ) 이 글을 보고 있는 현명한 여러분들은 충분히 잘 만들 수 있을 것이다.

## TOC(상단에 페이지 요약이 나오는 기능)를 추가했다.

`TOC`는 현재까지는 반쪽짜리 기능이다. 그냥 `graphql` 로 긁어 온것을 화면에 붙이는 것만 하였다. 제대로 동작하려면 링크까지 제대로 동작해야 하는데, 고칠것이 많아서 아직 진행하지 못했다. 일단 하는 방법은 굉장히 쉬웠다. 아래와 같이 `graphql` 에서 `toc`를 html 태그로 제공하고 있었다.

```javascript
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents ### 이항목이 TOC 이다.
      timeToRead
      frontmatter {
        title
        tags
        category
      }
    }
  }
`
```

나는 저 `tableOfContents` 를 템플릿에 이렇게 붙이는 것만 했다.

```html
<p>
    <div dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
</p>
```

반쪽 짜리 기능이지만, 있는게 조금 더 보기가 좋았다

## 이전글, 다음글 링크를 추가했다.

이전글, 다음글 기능을 붙이는 것은 조금 헷갈렸었는데, `gatsby-node.js` 에서 post 별로 `forEach` 를 돌면서 페이지를 생성할 때 `context` 에 이전글과 다음글에 대한 오브젝트를 넘겨주어야했다. 코드는 아래와 같다.

```javascript
// gatsby-node.js
const posts = result.data.postsRemark.edges
posts.forEach(({ node }, index) => {
  createPage({
    path: node.fields.slug,
    component: blogPostTemplate,
    context: {
      slug: node.fields.slug,
      prev: index === 0 ? null : posts[index - 1].node,
      next: index === posts.length - 1 ? null : posts[index + 1].node,
    },
  })
})
```

이렇게 prev, next 를 넘겨주게되면 template 파일에서 사용하는 context에 prev, next 가 같이 넘어오게 된다.

```javascript
// templates/blogPost.js

// pageContext 가 위에서 정의한 context 이다.
export default ({ data, pageContext }) => {
  const post = data.markdownRemark
  const title = post.frontmatter.title
  const html = post.html
  const { next, prev } = pageContext
```

그런 다음에는 그냥 화면에 그려주기만 하면된다.

```javascript
// templates/blogPost.js
<div style={{ marginBottom: "1rem", fontFamily: "avenir" }}>
    {next && (
    <Link to={next.fields.slug}>
        Next: {`${next.frontmatter.title}`}
    </Link>
    )}
</div>
<div style={{ fontFamily: "avenir" }}>
    {prev && (
    <Link to={prev.fields.slug}>
        Prev: {`${prev.frontmatter.title}`}
    </Link>
    )}
</div>
```

## 페이지 생성 스크립트를 작성했다.

지금 쓰고 있는 글도 페이지 생성 스크립트를 통해 기본틀을 만든것이다.
하는 일은 별거 없지만, 페이지 생성시 날짜를 입력하는 부분이라던지,
페이지의 타이틀을 적어줘야한다던지 드래프트 기능을 켰는지 껏는지등의 반복작업을
조금 더 편하게 하기위해 작성하였다. 코드는 아래와 같다.

```bash
#!/bin/bash
title=${1:-""}
category=${2:-"dev"}

date=`date '+%Y-%m-%d'`

echo "---
title: "$title"
date: "$date"
tags: [""]
category: "$category"
published: false
---

# 제목

" > $title.md
```

사용법은 다음과 같다.

```bash
$ create_page.sh <파일명> <카테고리>
```

파일명은 또한 slug로 사용될 타이틀명이기도 하다.
드래프트 기능을 자주 쓰게 된다면, 커밋할때 날짜를 자동으로 업데이트 해주는 것도 괜찮을 것 같다.

## 코멘트를 추가했다

`utterances`라는 깃헙과 연동해서 코멘트를 달 수 있도록 해주는 녀석인데, 컨셉이 마음에 들었다.
나의 블로그에는 99.9% 개발자만 들어올 것이기 때문에 github 계정은 하나쯤은 다들 있으실것 같다.
없으면 [하나만드세요~](https://github.com)

하는 법을 찾아보니 뭔가 복잡하게 정리해둔 문서가 많았는데 3가지만 하면 된다.

1. [github.com/apps/utterances](https://github.com/apps/utterances)에 들어가서 utterance 앱에 코멘트 쓰기 권한주기.

2. react를 쓸거라서 script 태그 못쓰니 아래와 같은 컴포넌트 만들기. 파일명은 `comment.js` 로 했다.

```javascript
import React, { Component } from "react"

export default class Comments extends Component {
  componentDidMount() {
    let script = document.createElement("script")
    let anchor = document.getElementById("inject-comments-for-uterances")
    script.setAttribute("src", "https://utteranc.es/client.js")
    script.setAttribute("crossorigin", "anonymous")
    script.setAttribute("async", true)
    script.setAttribute("repo", "[레파지토리]")
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("theme", "github-light")
    anchor.appendChild(script)
  }

  render() {
    return <div id="inject-comments-for-uterances"></div>
  }
}
```

3. 레이아웃에 붙이기

```javascript{7}
import Comment from "../components/comment"

export default ({ data, pageContext }) => {
<Layout>
  ... 중략
  <div>
    <Comment></Comment> /*바로 여기*/
  </div>
</Layout>
});
```

저렇게 하고나서 잘나오는지 보면 한번 더 인증하는 부분이 나오는데, 승인을 눌러주면 끝이다.

## 앞으로 남은것

- TOC에 링크가 달려 있긴하지만, 동작을 하지 않는 상황이다. 이부분은 `MDX` 라는 것을 적용하면 해결할 수 있을 것 같다.

- 검색붙이기 : [개츠비에 있는 문서](https://www.gatsbyjs.org/docs/adding-search-with-algolia/)를 참고하여 알골리아를 붙일 예정이다.

- 소셜 공유 기능 : [개츠비의 공식문서](https://www.gatsbyjs.org/tutorial/seo-and-social-sharing-cards-tutorial/) 를 참고해서 달아두긴 했는데, 작동을 하지 않는 상태이다. 잘 동작하도록 수정해야겠다.

- favicon 추가하기 : 다른 사람들은 파비콘도 좀 멋지던데, 나는 그냥 개츠비가 만들어준거 쓰고 있다. 이쁜걸로 조만간 바꿀 것이다.

그럼 다음에 보아요~ 안녕~ (코멘트 잘되는지 궁금한데 달아주시면 감사하겠습니다!)
