---
title: "Java17을 쓰면 좋을까?"
date: "2022-01-25"
tags: ["TIL", "java"]
category: dev
featured: "images/java17.webp"
draft: false
---

## 자바17은 왜이리 인기가 없나

2021년 9월 14일에 자바의 새로운 LTS(Long-Term-Support)버전인 17이 나왔다.
그런데, 아직까지는 사람들이 많이 도입을 꺼리는 것 같다.

보통 새로운 버전이 나오면 `와 신난다. 새로운기능이 뭐지? 어서 써보고싶다!` 이래야 맞는거 아닌가 싶은데,
우리회사 기준으로 주위에 쓰는 팀이 없다.

그래서 그런지, 오라클에서 이런글도 써줬다. 왜 옮겨야 하는지, 어떻게 하면 좋은지...
글쓴이는 JDK8에서 JDK11로 갈때보다 JDK11에서 JDK17로 옮기는것이 훨씬 쉬웠다고 한다.

> 읽어보면 업글하는데 노력이 좀 드는데... 쓸만해... 정도다... 좀 더 분발하시라 오라클 형님들

[이제는 Java17로 옮길 때(why and how) ](https://blogs.oracle.com/javamagazine/post/its-time-to-move-your-applications-to-java-17-heres-why-and-heres-how)


## 자바17로 바꿀려면, 주의해야되는 것들

글을 잠깐 읽어보니 업그레이드에 노력(effort)이 필요하다고 되어 있다. 이게 인기가 없는 원인이구나 싶었다.

업그레이드 내용을 잠깐 보면 변경되는게 꽤 있다.

- JavaFX가 없어진다. [gluon](https://gluonhq.com/products/javafx/) 이나 [OpenJFX](https://mvnrepository.com/artifact/org.openjfx)를
사용하라고 가이드가 되어있다.

- 폰트들 : 자바는 원래 폰트가 별로 없지만, Java11에 완전 삭제했다. [Apache POI](https://poi.apache.org/)를 사용하라고 한다.

- Java Mission Control : 모니터링과 프로파일링에 사용하는 녀석인데, 요녀석도 JDK에 포함되어 있었으나, 이제 따로 받아야한다. [JDK Mission Control](https://www.oracle.com/java/technologies/javase/products-jmc8-downloads.html)

- Java EE : 자바11에서 Java EE모듈을 삭제했다. JAXB 이런 것 들이다. Java EE는 많으니 표로 알려주고 있다. 아마도... artifactId만 바꾸면 될 것이다.. 아마도..

| 모듈 | 바꿔야하는 artifactId |
| --- | --- |
| java.activation | jakarta.activation |
| java.xml.ws.annotation | jakarta.anotation-api |
| java.transcation | jakarta.transcation-api |
| java.xml.bind | jakarta.xml.bind-api, jaxb-impl |
| java.xml.ws | jakarta.xml.ws-api, jaxws-rt |

- CORBA : 요녀석도 Java11에 삭제당했다!
- Nashorn : 자바 15에 삭제됐다. [nashorn-core](https://mvnrepository.com/artifact/org.openjdk.nashorn/nashorn-core)를 쓰면 된다. 나름 관심있는 기능이었는데 아쉽다.
- 시험용 컴파일러들 : 자바17에는 GraalVM의 AOT(ahead-of-time), JIT(just-in-time)컴파일러가 제거된다. 자세한것은 [JEP410](https://openjdk.java.net/jeps/410)을 보라고..


마리안 차이코프스키라는 사람의 글도 보자.


[자바8과 자바17비교 모던 자바는 자바8보다 얼마나 좋은가?](https://marian-caikovski.medium.com/java-17-language-compared-to-java-8-how-modern-java-is-better-than-java-8-65a4e39c448e)


## 자바17에서 변하는 것들 (자바8부터의 변경점)
자바의 새로운 피쳐들의 특징은 아래 3가지라고 한다.

- 코드의 재사용을 방지
- 장황한 코드를 줄이기 (잘했다.)
- Object같은 shared type 인자를 받는 메서드를 오버로딩 하는 메서드들을 사용안함 (shared type 뭔지 정확하게는 모르겠지만, Object같이 어떤 타입이라도 메서드에 넣을수 있는 것은 무겁고 코드 작성 및 읽기에도 좋지 않다고 생각하는데 그런 부분을 얘기하는 것 같다.)

### 캡슐화

- 모듈 : 모듈은 자바9에 새로 생겼고, 내부코드를 애플리케이션에서 숨기기 위해 사용됨
- Sealed Type : 자바15에 추가됨. final 클래스 대신 사용

### 코드의 간결성

- 지역 변수의 타입 추론 : var 키워드를 쓰면 타입추론을 해준다. (코틀린에 있던거 아님?)
- `Switch` 표현식 : 자바12에 스위치 표현식이 들어갔다. 이제 `break` 그만 써도 된다. (이런건 자바스크립트에도 없는거라고 자랑함)
- 텍스트 블럭: 다른 언어에는 당연한거지만 자바13에 들어갔다. """ """ 으로 감싸서 여러줄로 문자열을 쓸 수 있다.
- Records : 불변데이터를 전송할때 편하게 사용할 수 있는 Record 라는 녀석이 생겼다. DB에서 부터 Record 데이터가 건너온다고 하면 불변이니 안심하고 쓸 수 있을 것 같다. (다른데는 원래 다 있던거...)

### 타입캐스팅
- `instanceof`의 패턴매칭 가능. JDK14에 추가됐다.
- `switch`문에서 패턴매칭가능 (어? 이거 코틀린에 있던건데?)


## 결론

모던 자바는 확실히 예전 자바보다 기능이 쓸만한 것 같다. 코틀린의 영향인지 다른 언어의 영향인지 모르겠으나, 언어차원에서 제공해주는 편의 기능들이 코틀린과 거의 유사해지고 있다.
이제야 자바가 정신차리고 언어를 좀 개선하는구나 하는 생각이든다. 자바가 이렇게 열심히 하면 애매해지는게 코틀린의 포지션일 것 같다. 코틀린은 어차피 자바를 한번 감싼 녀석이니 순정 좋아하는 사람들은 그냥 자바17을 쓰는게 좋지 않을까. 어쨌거나 새로운 언어를 배우는 것 보다는 원래 있던 자바에 조금 더 편한 기능을 추가하는게 편하긴 할거니까.

나의 개인적인 결론은 `일단 자바부터 잘하자` 이다.

왜냐면 앞으로 내가 해야하는 업무의 70%이상이 자바일테니까...ㅎㅎ
