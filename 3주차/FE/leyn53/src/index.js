/*eslint-disable */

import React, {useState} from 'react';
import './App.css';


function 오름차순정렬(){
  let orderTitle = [...글제목];
  orderTitle.sort();
  글제목변경함수( orderTitle );
}



function App() {
  let [modal, modal함수] = useState(false);
  let [글제목,글제목변경] = useState(['외모 지상 주의', '여신 강림', '싸움 독학']);
  let [누른제목, 방금누른제목] = useState(0);
  let [따봉, 따봉변경] = useState(0);
  let [no따봉, no따봉변경] = useState(0);
  let posts = '강남 고기 맛집';
  

//  function 제목바꾸기(){
//    var newArray = [...글제목];
//    newArray[0] = '여자 코트 추천';
//    글제목변경( newArray );
//
//  }

  return (

    

    <div className="App">
     <div className="black-nav">
      <div> MY 네이버 웹툰 </div>
     </div>
    
     <div className="list">
      <h3> { 글제목[0] } <span onClick= { () => { 따봉변경(따봉 + 1) } }>👍</span> {따봉} </h3>
      <p>금요 웹툰</p>
      <hr/>
     </div>
     <div className="list">
      <h3> { 글제목[1] }<span onClick= { () => { no따봉변경(no따봉 - 1) } }>👎</span> {no따봉} </h3>
      <p>화요 웹툰</p>
      <hr/>
     </div>
     <div className="list">
      <h3> { 글제목[2] } </h3>
      <p>일요 웹툰</p>
      <hr/>
     </div>
     <div>
    <button onClick={() => {modal함수(!modal)}}>내용보기</button>
  

	{
      modal === true
      ? <Modal />
      : null
	}
    </div>
    </div>
  );
}

function Modal(props){
  return (
    <div className="modal">
       <h2>제목 </h2>
       <p>날짜</p>
       <p>상세내용</p>
     </div>  
  )
}



export default App;
