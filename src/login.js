import navBar from "./UI/navBar";

const applybttn = document.querySelector("#apply");
const clockinbttn = document.querySelector("#clockin");
const regForm = document.querySelector("#registerForm");
const clockinForm = document.querySelector("#loginForm");
const passwordInput = document.getElementById('registerPassword');
const usernameInput = document.getElementById('registerUserName');
const emailInput = document.querySelector("#registerEmail");


//clear the session storage after every login page load
sessionStorage.clear();

//populate and display the navbar
navBar();

let passwordValid = false;
let usernameValid = false;
let emailValid = false;
let radioValue = "Part-time";


//buttons animation
applybttn.addEventListener("click", () => {
    if (regForm.style.transform = "scaleY(0)") {
        if (clockinForm.style.transform = "scaleY(0)") { //would not let me use || so I have to use two if statents
            regForm.style.transform = "scaleY(1)";
        }
        regForm.style.transform = "scaleY(1)";
    }
});


clockinbttn.addEventListener("click", () => {
    if (clockinForm.style.transform = "scaleY(0)") {
        if (regForm.style.transform = "scaleY(0)") { 
            clockinForm.style.transform = "scaleY(1)";
        }
        clockinForm.style.transform = "scaleY(1)";
    }
});


//display forms
regForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = emailInput.value;
    const userName = usernameInput.value;
    const password = passwordInput.value;

    //check if email is unique
    for (let i = 0; i < localStorage.length; i++){
        if (email === localStorage.key(i)) {
            emailValid = false;
        }
    }

    //if the password, email and user name are valid, create a user object and save it to local storage. 
    if (passwordValid && usernameValid && emailValid) {
        
        const user = {
            email: email,
            name: userName,
            password: password,
            difficulty: radioValue,
            score: 0
        }

        localStorage.setItem(email, JSON.stringify(user))

        document.getElementById("messageDiv").innerHTML = "<p>Registration successful!</p>"

        //else display error
    } else if (!passwordValid || !usernameValid || !emailValid){
        document.getElementById("messageDiv").innerHTML = "<p>Email, name, or password invalid or taken!</p>"
    }
})

clockinForm.addEventListener("submit", e => {
    e.preventDefault();

    let email = document.querySelector("#loginEmail").value;
    let password = document.querySelector("#loginPassword").value;

    //if the email exist in the LS
    if (localStorage[email] !== undefined) {
        const userToLog = JSON.parse(localStorage[email]);

        //and the password matches
        if (password === userToLog.password) {

            //set the user to the session Storage current logged user
            sessionStorage.loggedInUser = userToLog.email;
            //and move to the game page
            window.location.href = "main.html";
        }
    } else {
        document.getElementById('messageDiv').innerHTML = "Invalid username or password!";

    }
})

//change image -- set difficulty

document.querySelectorAll(`input[name="empType"]`).forEach((radioButton) => {
    radioButton.addEventListener("change", event => {
        const radioButtonValue = event.target.value;

        if (radioButtonValue === "Part-time") {
            document.getElementById("parttimeImg").src = "/src/images/Assets/cards/enemies/Assets-12.png"
            document.getElementById("fulltimeImg").src = "/src/images/Assets/cards/enemies/Assets-15.png"
            radioValue = "Part-time";

        } else if (radioButtonValue === "Full-time") {
            document.getElementById("parttimeImg").src = "/src/images/Assets/cards/enemies/Assets-15.png"
            document.getElementById("fulltimeImg").src = "/src/images/Assets/cards/enemies/Assets-12.png"
            radioValue = "Full-time";
        }
    })
});


//password valid

passwordInput.addEventListener('input',  function() {
    const password = this.value;

    //set the conditions for the password being valid
    if (password.length >= 8 && password.charCodeAt(password.length-1) > 47 && password.charCodeAt(password.length-1) < 58) {
        document.getElementById("passImg").src = "/src/images/Assets/cards/enemies/Assets-13.png";
        passwordValid = true;
    } else {
        document.getElementById("passImg").src = "/src/images/Assets/cards/enemies/Assets-16.png";
        passwordValid = false;
    }
});


//username valid

usernameInput.addEventListener('input',  function() {
    const username = this.value;

    //if name is not empty, then it's valid
    if (username !== "") {
        document.getElementById("nameImg").src = "/src/images/Assets/cards/enemies/Assets-14.png"; 
        usernameValid = true;
    } else {
        document.getElementById("nameImg").src = "/src/images/Assets/cards/enemies/Assets-17.png";
        usernameValid = false;
    }
});

//email valid

emailInput.addEventListener("input", function () {
    const email = this.value;

        //set the conditions for the email being valid
    if (email.length >= 11 && email.includes("@") && email.includes(".com")) {
        document.getElementById("emailImg").src = "/src/images/Assets/cards/enemies/Assets-14.png"; 
        emailValid = true;
        console.log(emailValid);
    } else {
        document.getElementById("emailImg").src = "/src/images/Assets/cards/enemies/Assets-17.png";
        emailValid = false;
    }
})