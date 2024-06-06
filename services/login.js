import { URL_USERS } from "../services/routes.js";
import { get } from "../services/Services.js";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

form.addEventListener("submit",async (e) =>{
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    await validation(email, password);
})

/**User validation */

const validation = async (email,password) => {
    const data = await get(`${URL_USERS}?email=${email}&password=${password}`);

    if (data.length == 0){
        alert("Credendiales invalidas");
        return;
    }

    if(data[0]["password"] !== password) {
        alert("Credenciales invalidas");
        return;
    }

    /**validate el rol visitor or admin*/
    if (data[0]["role"] == "visitor") {
        window.location.href = "../views/visitor.html";
        localStorage.setItem("nameUser",data[0]["name"]);
        return;
    }

    if (data[0]["role"] == "admin") {
        window.location.href = "../views/admin.html";
        localStorage.setItem("nameUser",data[0]["name"]);
        return;
    }

    alert("Usuario inexistente");
}