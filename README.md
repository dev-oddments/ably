# Ably

https://nifty-ride-e2ab12.netlify.app/

## 프로젝트 실행 방법

```bash
## 의존성 설치
yarn install

## 로컬 서버 실행
yarn start

## Jest 기반 Unit Test 실행
yarn test

## Cypress 기반 E2E Test 실행
yarn cypress:open

## Linting 실행
yarn lint
```

## 사용 기술

> TypeScript, Webpack(+ babel), React, Redux(react-redux, redux-toolkit), styled-components, Jest(testing-library/react), Cypress, ESLint(+ Prettier), husky ...

## Showcase

<p align="center">
<img width="30%" alt="Screen Shot 2021-07-02 at 5 03 44 AM" src="https://user-images.githubusercontent.com/16266103/124183968-e511f700-daf3-11eb-81e6-12036e01375b.png">
<img width="30%" alt="Screen Shot 2021-07-02 at 5 03 55 AM" src="https://user-images.githubusercontent.com/16266103/124183964-e4796080-daf3-11eb-9642-460d752bb547.png">
<img width="30%" alt="Screen Shot 2021-07-02 at 5 03 35 AM" src="https://user-images.githubusercontent.com/16266103/124183969-e5aa8d80-daf3-11eb-88f5-88ea39b304a5.png">
</p>
<p align="center">
<img width="30%" alt="Screen Shot 2021-07-02 at 5 07 20 AM" src="https://user-images.githubusercontent.com/16266103/124183961-e3e0ca00-daf3-11eb-8b15-1fdeb7d5a83d.png">
<img width="30%" alt="Screen Shot 2021-07-02 at 5 07 34 AM" src="https://user-images.githubusercontent.com/16266103/124183959-e3e0ca00-daf3-11eb-8aa1-d3359757c76c.png">
<img width="30%" alt="Screen Shot 2021-07-02 at 5 09 33 AM" src="https://user-images.githubusercontent.com/16266103/124183957-e3483380-daf3-11eb-91ce-f962a57b1986.png">
</p>
<p align="center">
<img width="30%" alt="Screen Shot 2021-07-02 at 5 09 59 AM" src="https://user-images.githubusercontent.com/16266103/124183954-e2af9d00-daf3-11eb-8541-ecba98edde03.png">
<img width="30%" alt="Screen Shot 2021-07-02 at 5 10 06 AM" src="https://user-images.githubusercontent.com/16266103/124183941-e04d4300-daf3-11eb-965c-380292ebb0b1.png">
</p>

## 구현 범위

```
/ : 로그인 페이지
/reset-password : 비밀번호 재설정 페이지
/my-info : 회원 정보 조회 페이지
```

세가지(A, B, C) 요구사항 모두 빠짐없이 구현하였습니다.

## 알리고 싶은 포인트

- SEO를 위해 [meta 태그 설정](public/index.html)을 했습니다.
- Jest에서 styled-components의 ThemeProvider를 테스트 하기 위해서 [test-utils.tsx](test/test-utils.tsx)을 사용하였습니다.
- Webpack, tsconfig에서 module alias 설정을 하였고 [jest.config.js에 alias 설정](jest.config.js)을 하여 Jest가 정상 작동 하도록 하였습니다.
- [context/serverContext.ts](src/context/serverContext.ts)로 axios 요청을 일반화하였으며, accessToken가 존재하면 헤더에 포함되도록 처리하였습니다. 해당 모듈을 [repository/baseRepository.ts](src/repository/baseRepository.ts)에 import해 각 Endpoint에 맞게 함수를 정의하는 식으로 처리하였습니다.
- Atomic Design Pattern을 적용하였습니다.
- 전역 상태에 대해 각각 modal, password, auth 세부분으로 관심사를 분리하였습니다.
  - 비동기 action을 각 slice에 정의하였으며 모든 action에 대해 테스트 코드를 작성하였습니다. 최대한 View를 간결하게 하기위해 노력하였습니다.
  - Modal에 대한 메시지를 알리는 부분은 Alert Modal로 구현하여 처리하였습니다.
  - 비밀번호 변경에 대한 부분은 password 슬라이스에서 처리하였습니다.
  - 로그인 이후 정보를 담는 부분은 auth에서 처리하도록 하였습니다.
- 비동기 액션인 setLogin 과정에서 accessToken은 sessionStorage 저장되도록 처리하였으며, setLogout시 sessionStorage에 remove 되도록 처리했습니다.
- 인증 만료 시간 Counter는 passwordSlice의 startTime action을 사용하였으며, setInterval을 사용하도록 구현하였습니다.
  - 60초 미만의 시간이 남았을 경우 글자색을 빨간색으로 변경하도록 하였습니다.
- flex, font, color 등 자주 사용하는 css 코드들은 [style/theme.ts](src/style/theme.ts)에 정의하였습니다.
- [AuthRouter](src/routes/AuthRoute/AuthRoute.tsx)를 도입하여 AccessToken과 isLogin 전역 상태가 존재하지 않는 경우 로그인 화면으로 Redirect 되도록 하였습니다.
- 모든 input은 useState가 아닌 useRef로 값을 저장하게끔 처리하였습니다.

## src 폴더 구조

- components: atoms, molecules, organisms 로 쪼갠 컴포넌트를 정의했습니다.
- context: axios 요청을 일반화하는 모듈을 정의했습니다.
- pages: 페이지 단위로 렌더링할 컴포넌트를 정의했습니다.
- repository: context/serverContext.ts를 사용해 각 엔드포인트를 함수화 해두었습니다.
- store: redux store와 slice를 정의해두었습니다.
- utils: constants, snippet 등을 정의하였습니다.

## 테스팅

Jest를 사용하여 util 함수, redux slice, api context에 대한 테스트를 하였습니다. testing-library/react를 사용해 컴포넌트 테스트를 작성하였습니다.

E2E 테스트를 작성하기 위해 Cypress를 도입하였습니다. 처음 써보는 툴이지만 사용하기 편했고 QA를 편하게 해준다는 측면에서 앞으로도 계속 사용하게 될 것 같습니다.
