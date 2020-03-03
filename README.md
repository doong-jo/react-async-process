# react-async-process
React에서의 API 호출과 응답에 대한 핸들링 playground

## 실행
node (v10 or v12)
```sh
yarn
yarn start
```
or
```sh
npm i
npm start
```

## Flow
1. Button 클릭 (API call)
2. Modal 팝업
3. Modal 버튼 클릭 (API call)
4. div에 표시

## To-do
- [x] Page level에서 API 처리 프로세스 작성
- [x] Component level에서 API 처리 프로세스 작성
- [ ] 동시에 API 호출 및 결과를 핸들링 할 수 있는 `useParallel` 작성
- [ ] 순차적으로 API 호출 및 결과를 핸들링 할 수 있는 `useWaterfall` 작성

## [1. Page level에서 API 호출 및 핸들링](https://github.com/doong-jo/react-async-process/tree/master)

![react-async 001](https://user-images.githubusercontent.com/22005861/75739361-08823180-5d48-11ea-81cb-cc6e00380931.jpeg)

### 장점
- Page 컴포넌트에서 API 응답에 대한 상태를 관리하고 하위의 컴포넌트에게 props로 전달하므로 단순하고 이해하기 쉬움
- 각 컴포넌트는 props를 주입받으므로 재사용성이 높아짐

### 단점
- API 요청이 많을수록 Page 컴포넌트가 비대해질 수 있음
- 역방향으로 데이터가 흐를 시에 콜백을 넘겨줘야 함

## [2. 각 컴포넌트에서 API 호출 및 핸들링](https://github.com/doong-jo/react-async-process/tree/component)
Context API를 통해 상태를 공유하고 이를 구독하여 각 컴포넌트의 상태 갱신

![react-async 002](https://user-images.githubusercontent.com/22005861/75739383-13d55d00-5d48-11ea-9688-64dee455db1b.jpeg)

### 장점
- 각 API 호출이 분산되어 있으므로 호출하는 API 요청이 많더라도 한 컴포넌트가 비대해지는 것을 막을 수 있음
- 컴포넌트에게 API 호출에 대한 권한을 위임함으로써 응답에 대한 핸들링 역할이 분산됨

### 단점
- 데이터의 흐름이 분산되어 있어 파악하기 쉽지 않음 (3개 이상의 파일을 확인해야 함)
- 각 컴포넌트에 데이터에 대한 상태를 다시 정의해줘야함
- 페이지에 종속되므로 컴포넌트를 재사용하기 어려움. 재사용을 위해선 wrapper를 따로 만들어야 함
- 관리해야할 파일들이 많아짐 (context, reducer, action ...)


## 의견
- API 호출이 페이지 방문 시 주로 이루어지며 컴포넌트 간의 갱신이 적다면 1번
- Use case의 단계가 많고 컴포넌트 간의 갱신이 많다면 2번
