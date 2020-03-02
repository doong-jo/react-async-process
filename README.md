# react-async-process
React에서의 API 호출과 응답에 대한 핸들링 playground

## [Page level에서 API 호출 및 핸들링](https://github.com/doong-jo/react-async-process/tree/master)

### 장점
- Page 컴포넌트에서 상태를 관리하고 하위의 컴포넌트에게 props로 전달하므로 단순하고 이해하기 쉬움
- 별도의 다른 모듈(파일)을 생성하여 관리할 일이 줄어들음
- 각 컴포넌트는 props를 주입받으므로 재사용성이 높아짐

### 단점
- API 요청이 많을수록 Page 컴포넌트가 비대해질 수 있음
- 역방향으로 데이터가 흐를 시에 콜백을 넘겨줘야 함

## [각 컴포넌트에서 API 호출 및 핸들링](https://github.com/doong-jo/react-async-process/tree/component)

### 장점
- 각 API 호출이 분산되어 있으므로 호출하는 API 요청이 많더라도 한 컴포넌트가 비대해지는 것을 막을 수 있음

### 단점
- 데이터의 흐름이 분산되어 있어 파악하기 쉽지 않음
`
ex. Button 클릭 (API call) -> Modal 팝업 -> Modal 버튼 클릭 (API call) -> div에 표시
하나의 데이터 흐름을 보기 위해서 3개 이상의 파일을 확인해야 함
`
- 관리해야할 파일들이 많아짐 (context, reducer, action ...)
- 컴포넌트의 재사용성이 떨어짐
