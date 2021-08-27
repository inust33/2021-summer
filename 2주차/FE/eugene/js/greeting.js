//const loginForm = document.getElementById("login-form");
//const loginInput = loginForm.querySelector("input");
//const loginButton = loginForm.querySelector("button");

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
//const loginButton = document.querySelector("#login-form button");

const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden"; //대문자로 표현하는 것이 관습
const USERNAME_KEY = "username";

const link = document.querySelector("a");

// function onLoginBtnClick(){
//     //console.dir(loginInput);
//     //console.log("clicked!");
//     //console.log(loginInput.value);

//     const username = loginInput.value;
//     if(username == ""){
//         alert("Please write your name");
//     }else if(username.length > 15){
//         alert("Your name is too long.")
//     }
// }

//loginButton.addEventListener("click", onLoginBtnClick);

function onLoginSubmit(event) {
    //const username = loginInput.value;
    //console.log("username");

     event.preventDefault(); //form을 submit하면서 자동으로 새로고침되는 걸 막음
    const username = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASSNAME);
    console.log(loginInput.value);
    localStorage.setItem(USERNAME_KEY, username);
    //greeting.innerText = "Hello " + username;
    
    //greeting.innerText = `Hello ${username} keep going`;
    //greeting.classList.remove(HIDDEN_CLASSNAME);

    paintGreetings(username);
}

function handleLinkClick(event) {
    //console.log(event);
    //alert("clicked!");

    event.preventDefault();
    console.dir(event);
}

//loginForm.addEventListener("submit", onLoginSubmit);
//link.addEventListener("click", handleLinkClick);

function paintGreetings(username){
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);   
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
//console.log(savedUsername);

if(savedUsername === null){
    //show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
}else{
    //show the greetings
    paintGreetings(savedUsername);
}