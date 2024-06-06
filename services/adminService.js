import { URL_RESERVATIONS, URL_USERS } from "../services/routes.js"
import { deleteById,editById, get,post } from "./Services.js";

/**great */
const great = document.getElementById("great");
const userLs = localStorage.getItem("nameUser")
great.textContent = "HOLA! admin "+userLs;

/**users */
const btnAdd = document.querySelector('.btnAdd');
const modalTitle = document.querySelector('.modal-title');
const form = document.querySelector('form');
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("dob");
const passwordInput = document.getElementById("password");
const roleInput = document.getElementById("role");

/**reservts */
const contentTable = document.querySelector('tbody');
const contentTableFlights = document.querySelector('#tbodyFlight')
const form2 = document.getElementById("reserveForm");
const flightInput = document.getElementById("flight");


//reload page and run function
document.addEventListener('DOMContentLoaded',()=>(paintUsers()))
document.addEventListener('DOMContentLoaded',()=>(paintReservs()))


btnAdd.addEventListener("click", ()=>{
    form.setAttribute("data-status", "add");
    modalTitle.textContent = "Agregar Nuevo Usuario";
    form.reset();
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    Insert();
})
//add users 
const Insert = () =>{
        const name = nameInput.value;
        const email = emailInput.value;
        const date = dateInput.value;
        const password = passwordInput.value;
        const role = roleInput.value;

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

        if (form.getAttribute("data-status") == "add") {
            post(URL_USERS,data)
        }else if(form.getAttribute("Data-status") == "edit"){
            editById(URL_USERS,form.getAttribute("data-id"),data)
        }
}

const isEmpty = (valor) =>{
    if (/^\/s*$/.test(valor)) {
            alert("Porfavor llene los campos vacios");
            return true;
    }return false;
}

//show table users
const paintUsers = async () =>{
    const users = await get(URL_USERS);

    users.forEach(user =>{
        const tr = document.createElement('tr');

        //creating tds
        const tdId = document.createElement('td');
        const nameTd = document.createElement('td');
        const emailTd = document.createElement('td');
        const dateTd = document.createElement('td');
        const roleTd = document.createElement('td');
        const editTd = document.createElement('td');
        const btnEdit = document.createElement('button');
        const deleteTd = document.createElement('td');
        const btnDelete = document.createElement('button');

        //btn styles
        btnEdit.classList ="btn btn-warning";
        btnEdit.setAttribute("data-bs-toggle", "modal");
        btnEdit.setAttribute("data-bs-target", "#exampleModal");
        btnDelete.classList ="btn btn-danger";

        //add content to tds
        tdId.textContent = user["id"];
        nameTd.textContent = user["name"];
        emailTd.textContent = user["email"];
        dateTd.textContent = user["date"]
        roleTd.textContent = user["role"];
        btnEdit.textContent = "editar";
        btnDelete.textContent = "eliminar";

        editTd.appendChild(btnEdit)
        deleteTd.appendChild(btnDelete)
        tr.append(tdId,nameTd,emailTd,dateTd,roleTd,editTd,deleteTd)

        //function edit
        btnEdit.addEventListener("click", () =>{
            form.setAttribute("data-status", "edit");
            form.setAttribute("data-id", user["id"]);
            modalTitle.textContent = "Editando Usuario";

            nameInput.value = user["name"];
            emailInput.value = user["email"];
            dateInput.value = user["dob"];
            passwordInput.value = user["password"]
            roleInput.value = user["role"]
        })
        //function delete 
        btnDelete.addEventListener("click", () =>{
            deleteById(URL_USERS,user["id"])
        })
        
        //adding content child, father
        contentTable.appendChild(tr)
    })
}

//show table reservs

const paintReservs = async () =>{
    const reservations = await get(URL_RESERVATIONS);

    reservations.forEach(reserv =>{
        const trReserv = document.createElement('tr');

        //creating tds
        const userId = document.createElement('td');
        const nameUserTd = document.createElement('td');
        const flightTd = document.createElement('td');

        const editTd = document.createElement('td');
        const btnEditReserv = document.createElement('button');
        const deleteTd = document.createElement('td');
        const btnDelete = document.createElement('button');

        //btn styles
        btnEditReserv.classList ="btn btn-warning";
        btnDelete.classList ="btn btn-danger";

        //add content to tds
        userId.textContent = reserv["id"];
        nameUserTd.textContent = reserv["nameUser"];
        flightTd.textContent = reserv["flightId"];

        btnEditReserv.textContent = "editar";
        btnDelete.textContent = "eliminar";

        editTd.appendChild(btnEditReserv)
        deleteTd.appendChild(btnDelete)
        trReserv.append(userId,nameUserTd,flightTd,editTd,deleteTd)

        //function edit
        btnEditReserv.addEventListener("click", async() =>{
            form2.style.display = "block"
            const newFLightId = await flightInput.value
            const newFlightSend = reserv["newFLightId"];
            const nameUserInput = document.querySelector('#nameUser');
            nameUserInput.value = reserv["nameUser"]
            const data = {
                savedNAme,
                "flightId":newFLightId
            }
            editById(URL_RESERVATIONS,reserv["id"],data)
        })
        //function delete 
        btnDelete.addEventListener("click", () =>{
            deleteById(URL_RESERVATIONS,reserv["id"])
        })
        
        //adding content child, father
        contentTableFlights.appendChild(trReserv)
    })
}