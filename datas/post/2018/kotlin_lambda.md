---
title: "kotlin 람다 써보기"
date: "2018-06-22"
tags: ["kotlin"]
category: "dev"
draft: false
---

## 람다 써보기

익명 클래스로 리스너 구현하기

```scala
// 자바
button.setOnClickListener ( new OnClickListener() {
    @Override
    public void onClick(View view) {  /* 클릭시 수행할 동작 */ }
});

// 코틀린
button.setOnClickListener { /* 클릭시 수행할 동작 */}
```

람다를 사용해서 최대값 찾기

```scala
val people = listOf(Person("앤디", 38), Person("실바", 32), Person("캐슬", 42))
println(people.maxBy { it.age })

// 멤버 참조를 사용하여 컬렉션 검색
println(people.minBy(Person::age))
```

```scala
// 람다식 문법
{ x: Int, y: Int -> x + y }

// 람다로 sum 함수 만들기
val sum = {x: Int, y: Int -> x + y}
println(sum(1,2))
```

*run*  : 인자로 받은 람다를 실행해 주는 라이브러리 함수 이다.

```scala
run { println(42) }
```

`people.maxBy` 리팩토링 하기

```kotlin
// 연장자 찾기 정석 버전
people.maxBy({ p: Person -> p.age })

//가장 뒤에 있는 파라메터 람다는 밖으로 빼낼 수 있다.
people.maxBy() { p: Person -> p.age }

// 람다가 유일한 파라메터인 경우 괄호 삭제해도 됨
 people.maxBy { p: Person -> p.age }

// 파라메터 타입 생략 하기  : 컴파일러가 타입을 자동 유출함. 못하는 경우도 있는데 그경우만 명시해주면 됨
people.maxBy { p -> p.age }

// 람다의 파라메터가 하나뿐이고 그 타입을 컴파일러가 추론할 수 있는 경우 it이라는 파라메터 명을 사용할 수 있음
people.maxBy { it.age }

// 람다를 변수에 저장할 때에는 파라메터 타입으 추론할 문맥이 존재하지 않음. 그러므로 파라메터 타입을 생략하면 안됨
getAge = { p: Person -> p.age }
people.maxBy(getAge)
```

함수의 파라메터를 람다에서 사용가능

```kotlin
fun printMessageWithPrefix(messages: Collection<String>, prefix:String) {
    messages.forEach(
        println("$prefix $it")
    )
}

// output 
Error :  403 forbidden
Error :  404 not found

```


* 자바와 다른점은 람다가 파이널이 아닌 변수에 접근 가능하고 람다내부에서 값을 변경해도 된다.
* 아래는 람다에서 final이 아닌 변수를 사용하고 값을 변경하는 예제이다. 

```kotlin
fun printProblemCounts(responses: Collection<String>) {
    var clientErrors = 0
    var serverErrors = 0
    responses.forEach {
        if (it.startsWith("4")) {
            clientErrors++
        } else if (it.startsWith("5")) {
                        serverErrors++
        }
    }
    println("$clientErrors client errors, $serverErrors server errors")
}


>>> val responses = listOf("200 OK", "418 I'm a teepot", "500 internal server error")
>>> printProblemCounts(responses)
// output
1 client errors, 1 server errors
```

* 람다를 event handler 혹은 비동기로 사용할때 로컬 변수를 람다에서 변경하는 경우 람다가 실행되는 시점에만 변경된다는 것에 주의해야한다. 

```kotlin
fun tryToCountButtonClick(button: Button): Int {
    var clicks = 0
    button.Click { clicks++ }
    return clicks
}
```

* 위의 함수는 항상 0을 리턴하는데 `clicks++` 부분이 함수가 다 실행되고 실행되기 때문이다. 

### 멤버 참조

* 함수를 값으로 변경하고 싶은경우 `::` 연산자를 사용하자
* 아래와 같은 표현을 `멤버 레퍼런스` 라고 부른다.
* 하나의 함수 또는 프로퍼티에 대응된다.
* 람다를 표현하는 간결한 방법이다.

```kotlin
val getAge = Person::age

// 요거랑 동일함
val getAge = {person: Person -> person.age }

people.maxBy(Person::age)

// 탑레벨 멤버 레퍼런스 `::` 앞의 클래스를 생략
fun salute() = println("Salute!")
>>> run(::salute)
Salute!
```

* 위임을 사용하는 함수인경우 멤버 레퍼런스를 사용하면 편하다 

```kotlin
val action = { person: Person, message: String -> sendEmail(person, message)}

val nextAction = ::sendEmail
```

* 인스턴스의 생성을 지연시키고 싶은경우 `생성자 레퍼런스`를 사용할 수 있다. 

```kotlin
data class Person(val name: String, val age: Int)

>>> val createPerson = ::Person
>>> val p = createPerson("Andy", 38)
>>> println(p)
Person(name=Andy, age=38)
```

* 확장함수도 마찬가지로 사용가능

```kotlin
fun Person.isAdult() = age >= 21
val predicate = Person::isAdult
```

> isAdult는 Person의 멤버가 아니지만, 멤버처럼 사용할 수 있다.

### 컬렉션을 위한 함수형 API

* 함수형 스타일은 컬렉션을 다룰때 장점이 많다.

#### 필터와 맵

* 필터랑 맵은 컬렉션 처리할때 기본이 되는 함수들이다.
* 필터는 참이되는 원소들만 리스트에 보낸다.

```kotlin
data class Person(val name: String, val age: Int)

>>> val list = listOf(1, 2, 3, 4)
>>> println(list.filter { it % 2 == 0 })

[2, 4]
```

## 연산자 오버로딩과 관례

- 기존 자바클래스에 대해 확장함수를 구현하면서 관례에 따라 이름을 붙이면 자바코드를 바꾸지 않아도 새로운 기능을 쉽게 부여할 수 있다. 

### 산술 연산자 오버로딩

```
data class Point(val x: Int, val y: Int) {
    operator fun plus(other: Point): Point { 
        return Point(x + other.x, y + other.y)
    }
}

>>> val p1 = Point(10, 20)
>>> val p2 = Point(30, 40)
>>> println(p1 + p2)
output

Point(x=40, y=60)
```

* 연산자를 오버로딩 하는 함수 앞에는 `operator` 키워드가 있어야 한다.
* operator 키워드로 plus 함수를 선언하면 `+` 기호로 두 객체를 더할 수 있다.
* `a + b -> a.plus(b)` 와 같이 작동한다. 
* 교환법칙을 자동으로 지원하지 않는다. 필요한 경우 구현해야함.
* 확장함수로 정의도 가능

```
operator fun Point.plus(other: Point): Point {
    return Point(x + other.x, y + other.y)
}
```

오버로딩 가능한 산술 연산자 

| 식  | 함수 이름  |
|:-:|:-:|
| a * b | times |
| a / b | div |
| a % b | rem |
| a + b | plus |
| a - b | minus |
| a += b | plusAssign |
| -a | unaryMinus |
| +a | unaryPlus |
| !a | not |
| ++a, a++ | inc |
| --a, a-- | dec |
| a == b | equals |
| a < b, a > b, a <= b, a >= b | compareTo |
| arr[1] | get |
| arr[1] = 'a' | set |
| .. | rangeTo |
| for a in arr | iterator |
| val (x, y) = p | component |

* `a == b` -> `a?.equals(b) ? : (b == null)`
* equals는 operator 가 아닌 override 키워드를 앞에 붙인다.
* `a <= b` -> `a.compageTo(b) <= b` 로 컴파일됨
* `start..end` -> `start.rangeTo(end)`

```kotlin
class Point(val x: Int, val y: Int) {
    operator fun component1() = x
    operator fun component2() = y
}
```
* 코틀린 표준에서는 맨앞의 다섯 원소에 대한 componentN을 제공한다.
* compoenent6 부터 에러가 난다. 

코틀린은 비트연산자를 지원하지 않음

|자바 | 코틀린| 
|:-:|:-:|
|<< | shl|
| >> | shr|
| >>> | ushr|
|&| and|
|\| | or|
|^| xor|
|~| inv| 

### 위임 프로퍼티 (delegated property)

* 프로퍼티의 값이 변경될때 추가로 동작하는 코드를 위임 시킬 수 있음
* 위임을 사용해서 값을 메모리가 아닌, 데이터베이스나 세션, 파일 등에 저장가능


문법
```kotlin
class Foo {
    var p: Type by Delegate()
}
```

ex)
```kotlin
class Foo {
    private val delegate = Delegate()
    var p: Type
    set(value: Type) = delegate.setValue(..., value)
    get() = delegate.getValue(...)
}
```

* p의 get/set 을 Delegate() 에 위임함

지연 초기화를 위임 프로퍼티로 구현
```kotlin
class Person(val name: String) {
    val emails by lazy { loadEmails(this) }
}
```


헬퍼클래스를 만들어서 프로퍼티 변경 통지 만들기

```kotlin
class ObservableProperty(
    val propName: String, var propValue: Int,
    val changeSupport: PropertyChangeSupport
) {
    fun getValue(): Int = propValue
    fun setValue(newValue: Int) {
        val oldValue = propValue
        propValue = newValue
        changeSupport.firePropertyChange(propName, oldValue, newValue)
    }
}

class Person(
    val name: String, age: Int, salary: Int
) : PropertyChangeAware() {
    val _age = ObservableProperty("age", age, changeSupport)
    var age: Int
        get() = _age.getValue()
        set(value) { _age.setValue(value)}
    val _salary = ObservableProperty("salary", salary, changeSupport)
    var salary: Int 
        get() = _salary.getValue()
        set(value) { _salary.setValue(value)}
}
```

ObservableProperty를 프로퍼티 위임으로 사용할 수 있도록 리팩토링

```kotlin
class ObservableProperty(
    var propValue: Int, val changeSupport: PropertyChageSupport
) {
    operator fun getValue(p: Person, prop: KProperty<*>): Int = propValue
    operator fun setValue(p: Person, prop: KProperty<*>, newValue: Int) {
        val oldValue = propValue
        propValue = newValue
        changeSupport.firePropertyChange(prop.name, oldValue, newValue)
    }
}

class Person(
    val name: String, age: Int, salary: Int
) : PropertyChangeAware() {
    var age: Int by ObservableProperty(age, changeSupport)
    var salary: Int by ObservableProperty(salary, changeSupport)
}
```

* by 키워드로 위임 객체를 지정하면 직접 작성했던 코드들을 코틀린 컴파일러가 대신해준다. 


Delegates.observable 표준 라이브러리를 사용하기. 

```kotlin
class Person(
    val name: String, age: Int, salary: Int
) : PropertyChangeAware() {
    private val observer = {
        prop: KProperty<*>, oldValue: Int, newValue: Int -> 
            changeSupport.filrePropertyChange(prop.name, oldValue, newValue)
    }
    var age: Int by Delegates.observable(age, observer)
    var salary: Int by Delegates.observable(salary, observer)
}
```

## 8장 고차함수 : 파라메터와 리턴값으로 람다 사용하기

* 고차함수는 다른 함수를 인자로 받거나 함수를 리턴하는 함수이다.

함수타입 선언하기

```kotlin
val sum = {x: Int, y: Int -> x + y}
val print = { println(42) }
```

* 위의 경우는 컴파일러가 알아서 함수타입임을 추론함

`(파라메터 타입, 파라메터 타입) -> 리턴 타입` 이런식으로 좀 더 명시적으로 할 수 있다.

```kotlin
val sum: (Int, Int) -> Int = {x, y -> x + y}
val action: () -> Unit = {println(42)}
```

리턴타입이 null 이 되는 경우에는 아래와 같은 식으로 한다. 

```kotlin
var canReturnNull: (Int, Int) -> Int? = { null }
```

* 함수타입과 람다식은 재활용하기 좋은 코드를 만들때 쓸 수 있는 훌륭한 도구이다. 
* 코드의 일부분을 복사해 붙여 넣고 싶은경우 사용하면 좋다. 

### 인라인 함수 : 람다의 부가 비용 없애기

* inline 변경자를 어떤 함수에 붙이면 컴파일러가 해당 함수를 호출하는 모든 코드를 함수의 몸체에 해당하는 바이트코드로 바꾼다. 
* 어떤 함수를 inline 으로 선언하면 그 함수의 몸통이 inline이 된다. 
* 파라메터로 함수를 받는 경우, 파라메터로 넘겨받은 함수를 변수에 한번더 할당하게 되면 인라인으로 사용할 수 없다. 
* 인라인으로 사용하면 안되는 람다를 파라메터로 사용하는 경우 `noinline` 키워드를 파라메터 앞에 붙여서 인라인으로 바꾸는 것을 금지할 수 있다. 
* 인라인 키워드를 함수에 붙일때에는 코드 크기에 주의해야한다. 함수의 몸체인 바이트코드가 여기저기 복사되기 때문이다. 
* `try-with-resource` 와 같은 기능을 제공하는 `use` 라는 함수가 람다를 파라메터로 받으며, 인라인 함수이다.

### 고차 함수 안에서 흐름제어

```kotlin
data class Person(val name:String, val age: Int)
val people = listOf(Person("Alice", 29), Person("Bob", 31))

fun lookForAlice(people: List<Person>) {
    for (person in people) {
        if (person.name == "Alice") {
            println("Found!")
            return
        }
    }
    println("Not found")
}

>>> lookForAlice(people)
Found!
```

* 위와 같은 코드를 람다를 사용하는 `forEach` 를 사용해도 된다. 

```kotlin
fun lookForAlice(people: List<Person>) {
    people.forEach {
        if (it.name == "Alice" ) {
            println("Found!")
            return
        }
    }
    println("Not Found!")
}
```

* 람다 안에서 return 을 사용하면 람다에서만 return 이 호출 되는 것이 아니라 그 람다를 호출하는 함수가 실행을 끝나고 결과값을 리턴한다. 
* 자신을 둘러싼 블록보다 더 바깥에 있는 블록을 리턴하게 만드는 return 문을 `nonlocal return` 이라 부른다. 
* nonlocal return 을 사용할 수 있는 함수는 인라인 함수만 가능하다. 
* nonlocal return 이 아닌 경우는 레이블을 붙이는데, `local return` 이라 부른다.

```kotlin
fun lookforAlice(people: List<Person>) {
    people.forEach label@ {
        if (it.name == "Alice") return@label
    }
    println("Alice might be somewhere")
}
```

* 함수명을 레이블로 사용도 가능
* 람다식에는 레이블이 2개이상 붙을 수 없음

```kotlin
fun lookforAlice(people: List<Person>) {
    people.forEach {
        if (it.name == "Alice") return@forEach
    }
    println("Alice might be somewhere")
}
```

람다 말고 코드 볼록을 넘기는 방법으로 익명함수를 넘기는 방법이 있다. 

```kotlin
fun lookforAlice(people: List<Person>) {
    people.forEach (fun (person) {
        if (person.name == "Alice") return // 가장가까운 함수를 가리킴
        println("${people.name} is not Alice")
    })
}
```

* return 이 실행되면 가장 가까운 `fun` 함수를 리턴한다. 
* 함수의 body 에서 여러곳에서 return 을 사용해야하는 경우 람다 대신 익명함수를 사용하면 된다.
