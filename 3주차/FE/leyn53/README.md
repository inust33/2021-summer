1. 프로젝트 내용
- My 네이버 웹툰 list UI 만들기

2. 사용된 기술 정리

- state에 데이터 저장을 하는이유
- 좋아요버튼 누를시 숫자 1증가시키기
- omponent를 통해 html 관리
- 클릭하면 동작하는 모달창
- Component
```js
function Modal(){
  return (
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <다른컴포넌트></다른컴포넌트>
    </div>
  )
}
function 다른컴포넌트(){
  return ( <div> 안녕하세요 </div> )
}
```

3. 새로 알게 된 내용

- 리액트 설치와 개발환경 셋팅
- 리액트 기초용어 의미
◾ npx : 라이브러리 설치를 도와주는명령어 (node js 필요)
◾ create-raect-app : 리액트 셋팅 다된 boilerplate만들기 쉽게 도와주는 라이브러리
◾ blog : project name
◾ npm start : 코드짠걸 미리보기 띄우기
◾ npm : 라이브러리를 쉽게 설치할수있게 도와주는 tool
◾ node_modules : 라이브러리 모은 폴더
◾ public : static 파일 보관함
◾ src: 소스코드 보관함
◾ package.json : 설치한 라이브러리 목록 (npm로 설치할때마다 목록에 정리됨)__
◾ index.js는 app.js를 index.html에 넣게해주는 기능을 하기때문에 app.js가 메인페이지가됨



4. 더 공부해야 할 내용

- 기본적으로 아직 js문법을 제대로 익히지 못해서인지 노마드코더의 강의를 듣는데 어려움이 있었습니다.
- 그래서 좀 더 이해를 쉽게 해주는 강의를 듣게되었고, 리액트의 개념을 파악하는데 집중하여 많은 기능들을 학습하고 구현하지는 못했습니다
- 문법들과 실전코드들을 더 익혀야할 것 같습니다.
- yarn & React Boostrap 라이브러리 설치 및 적용
- Navbar, Jumbotron, item card layout
- mport / export,  data Html binding
