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

## 구현 범위

```
/ : 로그인 페이지
/reset-password : 비밀번호 재설정 페이지
/my-info : 회원 정보 조회 페이지
```

- 퍼블리싱을 제외한 아래 세가지(A, B, C) 모두 빠짐없이 구현하였습니다.

#### 비밀번호 재설정 페이지(as A)

- 비밀번호 재설정 페이지에는 아래와 같은 절차와 흐름을 갖고 있습니다.
  1. [인증 코드 발급 요청 페이지]에서 이메일을 입력해서 비밀번호 재설정 인증 코드를 전달 받습니다.
  2. [인증 코드 검증 페이지]에서 비밀번호 재설정 인증 코드를 입력합니다.
  3. [비밀번호 변경 페이지]에서 새로운 비밀번호를 입력하여 비밀번호를 변경합니다.

1. **인증 코드 발급 요청 페이지**

   - [x] 이메일을 입력 할 수 있는 Input Form과 다음(next) Button을 배치합니다.
   - [x] 다음 Button을 클릭하면 이메일을 검증합니다.
   - [x] [인증 코드 발급 요청 API]를 호출하고 응답 결과에 따라 처리합니다.
     - [x] 호출에 실패하면 메시지로 알립니다.
     - [x] 호출이 성공하면 [인증 코드 검증 페이지]로 이동합니다.

2. **인증 코드 검증 페이지**

   - [x] 인증 코드를 입력 할 수 있는 Input Form과 인증 만료 시간 Counter, 다음 Button을 배치합니다.
   - [x] 인증 만료 시간 Counter는 앞서 저장한 남은 인증 시간을 활용해서 mm:ss로 표현합니다. # 만료시간이 지났을 경우 1로 이동하도록 처리했습니다.
   - [x] 다음 Button을 클릭하면 인증 코드를 검증합니다.
   - [x] [인증 코드 검증 API]를 호출하고 응답 결과에 따라 처리합니다.
     - [x] 호출에 실패하면 메시지로 알립니다.
     - [x] 호출이 성공하면 [비밀번호 변경 페이지]로 이동합니다.

3. **비밀번호 변경 페이지**
   - [x] 새로운 비밀번호, 새로운 비밀번호 확인 Input Form과 비밀번호 변경하기 Button을 배치합니다.
   - [x] 비밀번호 변경하기 Button을 클릭하면 새로운 비밀번호와 새로운 비밀번호 확인을 검증합니다.
   - [x] [비밀번호 변경 API]를 호출하고 응답 결과에 따라 처리합니다.
     - [x] 호출이 성공하거나 실패하면 메시지로 알립니다.

#### 로그인 페이지(as B)

- [x] 아이디와 비밀번호를 입력 할 수 있는 Input Form과 로그인 Button을 배치합니다.
  - [x] 로그인 Button을 클릭하면 아이디와 비밀번호를 검증 & 처리합니다.
  - [x] [로그인 API]를 호출하고 응답 결과에 따라 처리합니다.
    - [x] 호출에 실패하면 메시지로 알립니다.
    - [x] 호출이 성공하면 [회원 정보 조회 페이지]로 이동합니다.
- [x] 비밀번호 재설정 Button을 배치합니다.
  - [x] 클릭하면 [비빌번호 재설정 > 인증 코드 발급 요청 페이지]로 이동합니다.

#### 회원 정보 조회 페이지(as C)

- [x] 회원 정보를 보여줄 수 있는 Card를 배치합니다.
  - [x] 이름, 이메일, 프로필 이미지
- [x] 로그아웃 Button을 배치합니다.
  - [x] 클릭하면 [로그아웃 API]를 호출하고 응답 결과에 따라 처리합니다.
    - [x] 호출에 실패하면 메시지로 알립니다.
    - [x] 호출이 성공하면 [로그인 페이지]로 이동합니다.
- [x] 페이지 진입 시 [회원정보 조회 API]를 호출합니다.
  - [x] 호출에 실패하면 [로그인 페이지]로 이동합니다. # [AuthRouter](src/routes/AuthRoute/AuthRoute.tsx)를 도입하였습니다.
  - [x] 호출이 성공하면 [회원정보 조회 API]의 응답 결과를 화면에 렌더링 합니다.

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
- flex, font, color 등 자주 사용하는 css 코드들은 [style/theme.ts](src/style/theme.ts)에 정의하였습니다.
- [AuthRouter](src/routes/AuthRoute/AuthRoute.tsx)를 도입하여 AccessToken과 isLogin 전역 상태가 존재하지 않는 경우 로그인 화면으로 Redirect 되도록 하였습니다.

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
