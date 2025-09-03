import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className={"flex justify-center"}>
      <div className={"max-w-2xl rounded-lg border border-black p-5 m-5"}>
        <h2>저는요</h2>
        카카오엔터테인먼트에서 AI응용기술 개발팀의 개발자로 일하고 있는
        승귤입니다.
        <h2 className={"mt-10"}>강의</h2>
        <p>
          <ul>
            <li>
              <Link
                href={
                  "https://www.inflearn.com/course/ai-%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8-%EA%B0%9C%EB%B0%9C-%EC%98%A4%EB%A6%AC%EC%97%94%ED%85%8C%EC%9D%B4%EC%85%98"
                }
              >
                AI 에이전트 개발 오리엔테이션
              </Link>
            </li>
            <li>
              <Link
                href={
                  "https://www.inflearn.com/course/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EA%B7%B8%EB%83%A5-%EC%9E%AC%EB%AF%B8%EB%A1%9C"
                }
              >
                📚 파이썬 그냥 재미로
              </Link>
            </li>
            <li>
              <Link
                href={
                  "https://www.inflearn.com/course/%EC%B4%88%EB%B3%B4-%EB%B0%B1%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%A1%9C%EB%93%9C%EB%A7%B5"
                }
              >
                🗺초보 백엔드 개발자 로드맵
              </Link>
            </li>
            <li>
              <Link
                href={"https://coloso.co.kr/products/programming-parkseungkyoo"}
              >
                🗺코틀린과 스프링 부트로 배우는 현대적 백엔드 개발 (2024.7)
              </Link>
            </li>
          </ul>
        </p>
        <h2 className={"mt-10"}>지은 책</h2>
        <h3>요즘 AI 에이전트 개발</h3>
        <div className="space-y-4 mb-6">
          <p>
            "요즘 AI 에이전트" 책을 쓴 이야기 글이든 코드든 첫 한줄을 쓰기가 참
            힘듭니다. 사실 지금 작성하는 이 글도 첫 한줄을 썼다 지웠다를
            몇번이나 했습니다. 시작의 힘듦의 문제는 대규모 언어 모델(LLM)이 많은
            도움을 주고 있습니다. 책을 처음으로 기획 할 때에도 LLM의 도움을 많이
            받았죠.
          </p>
          <p>
            사실 LLM이 써준 기획은 거의 폐기 되었지만, 일단 하고 보는 AI의
            진취성은 시작하기전에 무엇을 어떻게 할지를 많이 고민하는 저와
            반대여서 오히려 도움이 됐습니다. 팔꿈치로 슬쩍 찌른다는 뜻을 가진
            '넛지(Nudge)' 라는 말이 있죠. 관련한 책도 있구요. AI는 아마도 매일
            매일의 시작의 어려움을 마주하는 사람들에게 많은 도움을 주고 있을 것
            같습니다. 실행하는 것이 두렵고 어려운 사람에게 일단 시작할 수 있게
            해주는 용기를 줍니다.
          </p>
          <p>
            "요즘 AI에이전트"는 그렇게 시작됐습니다. 책을 쓴다는 건 꽤나
            고통스러운 일인데, 이번에는 좀 덜 힘들었어요. 뭘 어떻게 적어야 될지
            모르겠을 때 일단 적고 수정하기를 반복했습니다. 문제는 이게 책이
            인쇄되기 직전까지 그랬다는 것이긴 하지만요. API가 계속 바뀌고 새로운
            모델이 나오는 바람에 코드 예제를 몇 번이나 수정했는지 모릅니다.
          </p>
          <p>
            그래서 꽤나 많은 내용들이 최신 업데이트가 되어 있습니다. 아마도
            책중에는 GPT5로 예제를 만든 첫 책일겁니다. 물론 앤트로픽의 claude도
            다루고 gemini모델도 다뤄봅니다. 400페이지 남짓한 책에 파이썬 설치,
            LLM모델 사용하는법, 랭체인, 오픈AI의 에이전트 SDK, 구글이 만든 ADK,
            랭그래프, MCP, A2A, 실제로 써먹을 만한 프로젝트 2개까지 담았으니
            진짜 알짜배기로 꽉꽉 채웠습니다.
          </p>
          <p>
            이렇게 많은 것을 다루면서 쓸모있는 지식을 전달하는게 가능해? 라는
            질문이 생기실 수 있습니다. 그래서 어떤 내용을 다룰지 꽤 고민을 많이
            한편입니다. 랭체인, 랭그래프는 나온지 꽤 오래된 프로젝트라
            안정상태에 들어갔다고 생각하여 꽤 많은 분량을 할애했습니다. 반면
            MCP, A2A는 나온지 1년도 되지 않았기에 가볍게 다루었습니다.
          </p>
          <p>
            다만 MCP는 마지막 실전 프로젝트에서 제가 일하면서 배운 노하우들을
            녹여서 만들어놨습니다. MCP 클라이언트를 만드는 자료는 거의 없는데 이
            책에는 있습니다. 꽤 재밌게 보실 수 있을거예요.
          </p>
          <p>
            AI에이전트 나도 만들어 보고 싶은데, 어떻게 해야되는지 모르겠네
            참고할만한거 없을까? 라는 고민이 드신다면 한번 살펴보세요! 오늘부터
            절찬리 판매중입니다!
          </p>

          <Image
            src={"/yozm_ai_agent_book.jpg"}
            width={"300"}
            height={"300"}
            alt={"Node.js 백엔드 개발자 되기"}
          />

          <h4 className="font-bold mt-4">구매 링크</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <Link
                href="https://bit.ly/4fsHPOT"
                className="text-blue-600 hover:underline"
              >
                교보문고
              </Link>
            </li>
            <li>
              <Link
                href="https://bit.ly/45ltHlT"
                className="text-blue-600 hover:underline"
              >
                예스24
              </Link>
            </li>
            <li>
              <Link
                href="https://bit.ly/47j3Ptj"
                className="text-blue-600 hover:underline"
              >
                알라딘
              </Link>
            </li>
          </ul>

          <h4 className="font-bold mt-4">참고 자료</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <Link
                href="https://github.com/wapj/yozm-ai-agent"
                className="text-blue-600 hover:underline"
              >
                소스코드 저장소
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/wapj/yozm-ai-agent/issues"
                className="text-blue-600 hover:underline"
              >
                질문은 깃헙 이슈로 올려주시면, 늦더라도 꼭 답변드립니다!
              </Link>
            </li>
          </ul>
        </div>
        <h3>Node.js 백엔드 개발자 되기</h3>
        <div>
          <div>
            1년 6개월 동안 정말 열심히 쓴 책입니다. 책에 들어가는 코드의
            퀄리티를 정말 신경 많이 썼습니다.
          </div>
          <div>
            웹서버의 동작을 알아보기 위해 자체로 구현해보는 코드가 있으며,
            성능테스트도 다루고 있습니다.
          </div>
          <div>
            npm을 잘 사용하는 방법, V8엔진의 동작 방식, express, typescript,
            Nest.js, mongodb, sqlite, oauth, websocket 등의 많은 기술들을 최대한
            잘 전달하기 위해 노력했습니다.
          </div>
          <div></div>
        </div>
        <Image
          src={"/node_backend_book.jpg"}
          width={"300"}
          height={"300"}
          alt={"Node.js 백엔드 개발자 되기"}
        />
        <h3>책구매 링크</h3>
        <ul>
          <li>
            <Link href={"https://product.kyobobook.co.kr/detail/S000201457949"}>
              교보문고
            </Link>
          </li>
          <li>
            <Link href={"https://www.yes24.com/Product/Goods/118379776"}>
              yes24
            </Link>
          </li>
          <li>
            <Link
              href={
                "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=314774905"
              }
            >
              알라딘
            </Link>
          </li>
          <li>
            <Link href={"https://ridibooks.com/books/4547000020"}>
              리디북스
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
