##IDE 학습 공통
Plugin 사용법 정리: https://eugene663.tistory.com/3

# vanlia-js-chrome
### 프로젝트 내용
Nomad Coders의 '바닐라 JS로 크롬 앱 만들기' 강의(https://nomadcoders.co/javascript-for-beginners/lectures/1705)를 따라 진행했다. HTML, CSS, Javascript를 이용하여 구현했다. 
현재 시간과 위치, 날씨를 표시하며 이름을 입력하고 TO DO LIST를 만들 수 있는 페이지이다.

### 사용된 기술
1. 현재 시간 표시: setInterval()함수와 Date 객체를 이용하여 구현가능하다. 현재 시간을 불러오는 함수를 1초에 한 번씩 실행하는 방식이다. 시간, 분, 초의 자릿수는 padstart를 통해 맞춘다.
2. 로그인: form을 통해 input값을 submit 한다. submit후 새로고침되는 기본 동작은 preventDefault()를 통해 막는다. 이름을 입력하면 localStorage에 저장한다. localStorage.setItem(key, value), localStorage.getItem(key, value)를 이용했다. 
3. 랜덤한 배경색, 이미지, 명언: Math.floor(Math.random() * 배열.length)를 통해 랜덤한 값을 얻는다. 이미지 같은 경우에는 document.createElement("img")의 src를 지정해주는 방식을 이용한다.
4. TO DO List : input창을 통해 TO DO 항목을 입력하면 삭제 버튼과 함께 화면에 표시된다. 삭제 버튼은 이미지와 같이 createElement를 사용하고, EventListener를 통해 클릭을 감지한다. 입력한 TO DO List를 localStorage에 저장하는 것 역시 로그인 기능과 유사하다. TO DO List를 가져오는데에는 stringify, forEach가 추가적으로 필요하고 삭제하는 데에는 filter 함수를 이용한다.
5. 현재의 날씨와 위치: https://openweathermap.org 에서 제공한 기능을 사용한다. navigator.geolocation.getCurrentPosition을 통해 얻은 현재 위치를 통해 도시 이름과 날씨를 알 수 있다.

### 새로 알게 된 내용
처음 사용해 본 기술은 현재의 날씨와 위치를 가져오는 것과 localStorage를 다루는 방법이다. 

### 더 공부해야 할 내용
급하게 마무리하느라 CSS를 많이 다루지 못했다. CSS 부분을 더 보강해서 좀 더 눈에 잘 띄는 페이지로 발전시킬 것이다. 각 부분을 원하는 위치에 배치시키는 데 어려움이 있다.
