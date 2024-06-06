import { URL_USERS } from "../services/routes.js";
import { post } from "../services/Services.js";

/**get form for register */
const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("dob");
const passwordInput = document.getElementById("password");
const passwoInput = document.getElementById("password");
const rolInput = document.getElementById("role");

/**Add register */
const Insert = () =>{
    form.addEventListener("submit", (e) =>{
        e.preventDefault();
    
        const name = nameInput.value;
        const email = emailInput.value;
        const date = dateInput.value;
        const password = passwoInput.value;
        const role = rolInput.value;
        
        if (isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(role)) {
            return;
        }

        const data = {
            name,
            email,
            date,
            password,
            role
        }

        
        if (post(URL_USERS,data)) {
            alert("registro exitoso")
            return window.location.href = "../views/login.html";
        }
    })
}
Insert();

const isEmpty = (valor) =>{
    if (/^\/s*$/.test(valor)) {
            alert("Porfavor llene los campos vacios");
            return true;
    }return false;
}


