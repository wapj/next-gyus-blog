---
title: "[TIL] 자바스크립트의 객체에서 일부만 떼서 다른 객체에 할당하기"
date: "2020-07-17"
tags: ["TIL", "javascript", "destructuring"]
category: dev
featured: /images/2020/get-subset-of-object.png
draft: false
---

자바스크립트에서 복잡한 객체의 데이터의 일부만 다른 객체로 할당하고 싶다는 요구사항이 있었다.

예를 들어 아래와 같은 코드가 있다고 치자.

```javascript
const keyboards = [
  {
    color: "black",
    maker: "한성",
    name: "한무무",
    productName: "GBK68",
    haveTenkey: false,
    width: 28,
    height: 7,
  },
  {
    color: "white",
    maker: "후지쯔",
    name: "해피해킹2",
    productName: "HHKB2",
    haveTenkey: false,
    width: 26,
    height: 7,
  },
  {
    color: "black",
    maker: "토프레",
    name: "레알포스2",
    productName: "87USB",
    haveTenkey: false,
    width: 32,
    height: 13,
  },
];
```

해결하고 싶은 문제는 아래와 같다.
내가 알고 있는 정보는 키보드이름이 `한무무` 인 것과 제품명이 `GBK68` 이라는 것이고,
해당 제품이 키보드 리스트에 존재하면 새로운 객체의 오브젝트에 컬러(`color`)와 텐키가 있는지여부(`haveTenkey`)를 할당해주는 코드를 만들고 싶다.

그런데 문제는 알고 싶은 정보의 키는 계속 변경될 수 있다는 것이다.

내가 알고 있는 정보로 리스트에서 원하는 것을 찾아내는 것은 `filter` 혹은 `find` 함수를 사용해서 간단하게 찾아낼 수 있다.

```javascript
const foundKeyboard = keyboards.find(item => {
  return item.name === "한무무" && item.productName === "GBK68";
});
```

알고싶은 값이 변하지 않는 다면 아래와 같이 그냥 손으로 작성하면 된다.

```javascript
const whatIwantKeyboardInfo = {
  color: foundKeyboard.color,
  haveTenkey: foundKeyboard.haveTenkey,
};
```

### ES5 에서 객체의 일부만 할당하기

알고 싶은 정보가 달라질 수 있다에서 좀 피곤해지기 시작했는데, 원래 알고 있는 지식이었다면 아래와 같이 했을 것이다.

```javascript
const wantKnowKeys = ["color", "haveTenkey"];

const subset = Object.keys(foundKeyboard)
  .filter(key => {
    return wantKnowKeys.indexOf(key) >= 0;
  })
  .reduce((obj, key) => {
    obj[key] = foundKeyboard[key];
    return obj;
  }, {});
```

### ES6의 destructuring 사용하기

조금 더 찾아보니 ES6에서는 `destructuring` 으로 할 수 있는 방법이 있었다.
[destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 에 대해서는 링크를 눌러보도록 하자. 아주 간단하게 얘기하면 객체를 풀어서 필요한것만 쉽게 꺼낼 수 있게 해주는 문법이다.
`destructuring`을 사용한 코드는 아래와 같이 생겼다.

```javascript
const pick = ({ color, haveTenkey }) => ({ color, haveTenkey });
const subset2 = pick(foundKeyboard);
```

`pick` 함수는 생략된게 많아서 처음 본 사람은 좀 알아보기 힘들 수 있는데, 풀어서 쓰면 아래와 같다.

```javascript
const pick2 = function({ a, c }) {
  return { a, c };
};
const subset3 = pick2(foundKeyboard);
```

### lodash 사용하기

마지막으로 `descructing` 이런거 귀찮고 그냥 편하게 쓰고 싶은 사람에게는 [lodash](https://lodash.com/) 를 추천한다.
lodash 의 `pick` 함수를 사용하면 아주 간단하게 해결된다.

```javascript
const subset4 = _.pick(foundKeyboard, ["color", "haveTenkey"]);
```
