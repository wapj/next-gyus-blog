import React from "react";
import Link from "next/link";
import Image from 'next/image'

export default function About () {
  return (
    <div className={"flex justify-center"}>
      <div className={"max-w-2xl rounded-lg border border-black p-5 m-5"}>
        <h2>저는요</h2>
        카카오엔터테인먼트에서 백엔드 개발자로 일하고 있는 승귤입니다.

        <h2 className={"mt-10"}>강의</h2>
        <p>
          <ul>
            <li>
              <Link
                href={"https://www.inflearn.com/course/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EA%B7%B8%EB%83%A5-%EC%9E%AC%EB%AF%B8%EB%A1%9C"}>
                📚 파이썬 그냥 재미로
              </Link>
            </li>
            <li>
              <Link
                href={"https://www.inflearn.com/course/%EC%B4%88%EB%B3%B4-%EB%B0%B1%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%A1%9C%EB%93%9C%EB%A7%B5"}>
                🗺초보 백엔드 개발자 로드맵
              </Link>
            </li>
          </ul>
        </p>

        <h2 className={"mt-10"}>지은 책</h2>
        <h3>Node.js 백엔드 개발자 되기</h3>
        <div>
          <div>
            1년 6개월 동안 정말 열심히 쓴 책입니다. 책에 들어가는 코드의 퀄리티를 정말 신경 많이 썼습니다.
          </div>
          <div>
            웹서버의 동작을 알아보기 위해 자체로 구현해보는 코드가 있으며, 성능테스트도 다루고 있습니다.
          </div>
          <div>
            npm을 잘 사용하는 방법, V8엔진의 동작 방식, express, typescript, Nest.js, mongodb, sqlite, oauth, websocket 등의 많은 기술들을 최대한
            잘 전달하기 위해 노력했습니다.
          </div>
          <div>
          </div>
        </div>


        <Image src={"/node_backend_book.jpg"} width={"300"} height={"300"} alt={"Node.js 백엔드 개발자 되기"}/>
        <h3>책구매 링크</h3>
        <ul>
          <li>
            <Link href={"https://product.kyobobook.co.kr/detail/S000201457949"}>교보문고</Link>
          </li>
          <li>
            <Link href={"https://www.yes24.com/Product/Goods/118379776"}>yes24</Link>
          </li>
          <li>
            <Link href={"https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=314774905"}>알라딘</Link>
          </li>
          <li>
            <Link href={"https://ridibooks.com/books/4547000020"}>리디북스</Link>
          </li>
        </ul>
      </div>
    </div>
  )

}