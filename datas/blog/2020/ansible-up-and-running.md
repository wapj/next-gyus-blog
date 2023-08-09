---
title: 앤서블 시작과 실행을 읽은 후기
date: "2020-05-24"
tags: ["ansible", "infra"]
category: dev
published: true
featured: images/2020/ansible-up-and-running.jpg
---

간밤에 잠이 안와서 읽기 시작했는데, 내용이 굉장히 알찬 책이었다.
1장에서 7장까지는 다른책에 있는 내용과 크게 다른 내용이 없어서 대부분 알고 있는 내용이라 술술 넘겼다. 새롭게 알게된 내용들은 8장부터 나온 내용들이다. aws 관련, docker 관련, 윈도우즈 관련, 네트워크 장비 관련은 정말 **읽기만** 했다. (필요할때 찾아보면 될 것 같음)

## 새롭게 알게 된 내용들

- 앤서블은 여러가지 전송방식을 지원한다. 기본방식인 `smart`는 ssh 클래아언트가 ControlPersist를 지원하는 경우 로컬 ssh 클라이언트를 사용하고, 아닌경우는 Paramiko 라는 파이썬 ssh 구현체를 사용한다. (관련변수 ansible_connection)

### 동적 인벤토리 추가

- 앤서블 플레이북의 실행시에 동적으로 인벤토리를 추가할 수 있다. 예를 들어 `dynamic.py` 라는 파이썬 스크립트를 만들고 내부에서 적절한 코드를 만들면된다. result로 다음의 결과가 필요하다.

```json

# ./dynamic.py --host 실행시
{"ansible_host": "abc.exampl.com", "ansible_port": 22, "ansible_user": "deploy", "ansible_private_key_file": "./ssh/id_ras.pub" }

# ./dynamic.py --list 실행시

{
    "production": ["real.example.com", "real.example.com", ...],
    "sandbox": ["sandbox.example.com", "sandbox.example.com", ...],
    "dev": ["dev.example.com", "dev.example.com", ...],
}
```

- `add_host` 모듈을 사용하여 호스트를 동적으로 추가가능
- `group_by` 모듈은 사용하여 그룹을 동적으로 추가가능

### xip.io

[xip.io](http://xip.io/) 는 DNS를 따로 할당할 수 없는 개발머신에서 임시로 도메인을 사용할 수 있게하는 `매직 도메인`을 제공하는 서비스이다. ROR로 유명한 basecamp사에서 제공해주고 있다.

- 예를 들어 `10.0.0.10.xip.io` 는 `10.0.0.10` 을 리턴해준다.
- 비슷하게 `www.10.0.0.10.xip.io` 도 `10.0.0.10` 을 리턴해준다.
- 위와같이 테스트를 위한 DNS를 따로 설정하지 않고 자연스럽게 사용할 수 있다.

### pre_task, post_task

- tasks 섹션 앞뒤로 실행해야 하는 태스크를 별도로 정의해서 사용할 수 있다.
- 예를 들어 pre_tasks 에서 `yum update` 를 해주고 post_tasks 에서는 슬랙 알림 기능을 넣을 수 있다.

```
---
- hosts: localhost
  pre_tasks:
  - command: echo 전처리 태스크
  tasks:
  - command: echo 태스크
  post_tasks:
  - command: echo 후처리 태스크
```

### 사용자 정의 필터

- 필터는 변수의 값을 특정한 함수로 넘긴다음 결과를 다시 리턴받게해주는 녀석이다.
- 앤서블은 [jinja2의 필터](https://ansible-docs.readthedocs.io/zh/stable-2.0/rst/playbooks_filters.html)를 기본적으로 사용할 수 있다.
- jinja2에서 제공하는 필터로 부족한 경우에 커스텀 필터를 만들 수 있다.
- `.ansible/plugins/filter` 에 넣거나 `ANSIBLE_FILTER_PLUGINS` 에 설정할 수 있다. 필터는 파이썬으로 만들어야된다.

### lookup (조회)

- 앤서블은 다양한 경로에서 변수들을 조회하게 된다.
- 기본적으로는 파일이지만, redis, etcd 같은 메모리 디비를 사용할 수도 있다.
- 자세한 내용은 [lookup 플러그인](https://docs.ansible.com/ansible/latest/plugins/lookup.html) 페이지를 참고하자. (굉장히 많음)
- 개인적으로는 [hashicorp vault](https://docs.ansible.com/ansible/latest/plugins/lookup/hashi_vault.html) 용이 있는지 궁금했는데 있었다.

### listen 핸들러

- 하나 이상의 핸들러를 실행해주고 싶은경우 `notify` 에서 리스트로 정의해줄 수도 있으나, 태스크와 handler에 `listen` 을 주게 되면, 조금더 편하게 설정할 수 있다.

### 콜백 플러그인

- 플레이의 시작과 끝에 콜백 플러그인을 사용해서, 로그를 남기거나 슬랙에 알림을 주는 일을 할 수 있다.
- [공식 문서](https://docs.ansible.com/ansible/latest/plugins/callback.html)를 참고하자.

### 앤서블 빠르게하기

- 멀티플렉싱 사용하기
- 팩트캐싱하기
- async 절
- 병렬처리 사용

### 사용자 정의 모듈

- command, shell 절이 너무 복잡해지고 반복해서 사용해야하는 코드가 있다면, 사용자 정의 모듈을 사용해볼수있다. (입력파싱, JSON포맷으로 리턴, 외부 프로그램 호출)
- 파이썬으로 만들면 `AnsibleModule` 클래스의 지원을 받을 수 있다.
- 사용자 정의 모듈은 `playbooks/libaray/<사용자정의모듈>` 에 저장하면 된다.

### 복잡한 루프

> 제대로 쓰면 이것만가지고 글 하나를 적을 수 있으니 검색을 위한 키워드만 적어두겠음

- with_items : 리스트 엘리먼트를 반복
- with_lines : 커맨드 결과의 라인을 반복
- with_fileglob : 파일이름을 반복
- with_firt_found : 존재하는 입력중 첫번째 파일
- with_dict : 딕셔너리를 반복
- with_flattened : 병합된 리스트를 반복
- with_indexed_items : 단일 반복
- with_nested : 중첩반복
- with_random_choice : 랜덤
- with_sequence : 시퀀스를 반복
- with_subelements : 중첩 반복
- with_together : 압축리스트를 반복
- with_inventory_hostnames : 일치하는 호스트를 반복

### ssh 에이전트 포워딩

- 부록A에 있는 내용인데, 평소에 궁금했던 내용이었어서 아주 도움이 됐다.
- sudo 가 잘 안된다는 내용이 있어서 이부분은 테스트를 해볼 예정
- ssh 커맨드에 `-A` 옵션을 주면 사용가능하다.
- `./ssh/config` 에 아래의 설정을 추가해도 된다.

```
Host *
  ForwardAgent yes
```

- 앤서블에서만 사용하고 싶다면 `ansible.cfg` 파일에 아래와 같이 설정하면 된다.

```cfg
[ssh_connection]
ssh_args = -o ForwardAgent=yes
```

ssh 에이전트 포워딩은 아래와 같은 처리를 해주는 것이다.

```shell
# 아래와 같은 처리를 하고 싶은 경우 보통 공용키를 깃헙에 등록해주어야한다.
어플리케이션 서버 (git clone) -> 깃헙

# 에이전트 포워딩 기능을 사용하면 로컬머신의 공용키를 가지고 어플리케이션 서버에서 깃헙으로 인증을 할 수 있다.

로컬머신 -> 어플리케이션 서버(git clone) -> 깃헙
```

## 좋았던 점

- 공식문서의 구석진 곳을 찾아야만 알 수 있는 내용들이 잘 정리가 되어 있는 부분이 굉장히 좋았다.
- 특히 앤서블 명령어를 실제로 실행했을때 내부 동작이 어떤식으로 동작하는지 잘 설명이 되어 있어서 아주 좋았다.
- 실제로 실행할 수 있는 코드들을 제공한다.
- 실습용 코드들이 대부분 실제 업무에서 쓸 수 있는 수준이다.

## 아쉬운 점

- 편집이 살짝 아쉬운 부분이 많았다. 책의 성격상 테스트 코드가 굉장히 많았는데, 코드의 가독성이 별로 좋지 않았다. 그래서 소스코드를 볼때 정신이 산만해 지는 느낌이 많았다.
- 설명이 간결하지 않고, 장황한 경우가 더러 있다.
- 플레이북과 role 에 대해서 좀 더 자세히 설명해줬으면 하는 아쉬움이 있다.

## 결론

- 앤서블 입문서를 보았거나 앤서블을 한번쯤 써본 사람들은 읽으면 새로 알게 되는 내용들이 많을 것이라고 생각한다.
- 공식문서가 잘쓰여져 있지만, 링크를 타고타고 가야하는 수고로움이 있는데, 책에서 길잡이 역활을 잘 해준다.

## 기타 참고

- 책을 번역하신 분의 [블로그 글](https://knight76.tistory.com/entry/%EB%B2%88%EC%97%AD-%EC%B1%85-%EB%B0%9C%EA%B0%84-Ansible-Up-and-Running-%EC%95%A4%EC%84%9C%EB%B8%94-%EC%8B%9C%EC%9E%91%EA%B3%BC-%EC%8B%A4%ED%96%89)이다.
- 책 커버 이미지를 구하기가 힘들었다ㅠㅠ 이미지는 [교보문고](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&barcode=9791161753218#N)에서 가져왔습니다. (왜인지 모르겠지만, 출판사에서 올려두신 이미지는 해상도가 너무 낮았다.)
