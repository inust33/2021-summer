# Movie App 2019
https://eugene663.github.io/movie_app/

### 프로젝트 내용
Nomad Coders의 'ReactJS로 영화 웹 서비스 만들기' 강의(https://nomadcoders.co/react-fundamentals/lobby)를 따라 진행했다.
영화에 대한 정보를 react를 통해 표현하였다.

### 사용된 기술
#### REACT
1. state - class component : 처음 화면을 띄울 때 loading 상태임을 표현했다. state를 사용했기 때문에 class component로 작성하였다. 영화 관련 정보를 가져온 후 setState 함수를 통해 state를 refresh하고 render function을 호출했다.
2. PropTypes : prop-types는 전달받은 props가 원하는 props가 맞는 지 확인하기 위해 사용한다. props를 잘못 작성하면 component가 제대로 작동하지 않기 때문에 필요하다. id, year, title, summary, poster, genres의 정보를 각 특성에 맞게 작성하였다. (ex. id: PropTypes.number.isRequired)
3. Async-await: componentDidMount함수(getMovie 함수)가 끝날 때까지 약간의 시간이 소요될 수 있다. axios가 끝날 때까지 기다린후 다음 동작이 일어나야 하므로 비동기 기술이 필요하다.

### 새로 알게 된 내용
https://eugene663.tistory.com/13
https://eugene663.tistory.com/14


### 더 공부해야 할 내용
component나 새롭게 알게 된 함수들을 다루는 데 익숙치 않다. 이 부분은 클론 코딩보다는 직접 코드를 짜면서 보완해 나가야 할 것 같다.
