const clock = document.querySelector("h2#clock");

function sayHello(){
    console.log("hello");
}
////첫번째 argument: 실행 function , 두번째 : function 간격 ms
//setInterval(sayHello, 5000);
//setTimeout(sayHello, 5000);

function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock(); //처음 시작할 때부터 시간 띄우기 위해서.
setInterval(getClock, 1000);