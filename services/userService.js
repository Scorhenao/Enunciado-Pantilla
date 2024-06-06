import { URL_FLIGHTS, URL_RESERVATIONS } from "../services/routes.js"
import { deleteById,editById, get,post } from "./Services.js";

const great = document.getElementById("great");
const userLs = localStorage.getItem("nameUser")
great.textContent = "HOLA! "+userLs;


/**Information inputs */
const btnAdd = document.querySelector('.btnAdd');
const modalTitle = document.querySelector('.modal-title');
const form = document.querySelector('form');
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("dob");
const passwordInput = document.getElementById("password");
const roleInput = document.getElementById("role");




//reload page and run function
document.addEventListener('DOMContentLoaded',()=>(paintFlights()))


const getUSers = async (URL) =>{
    const users = await get(URL);

    users.forEach( user = {
        emailUser : user["name"]
    })
}
//show table users
const paintFlights = async () =>{
    const flights = await get(URL_FLIGHTS);

    flights.forEach((flight) =>{
        //father of cards
        const section = document.querySelector("section")
        const contentFlights = document.querySelector('#contentFlights');
        //cards container
        const divCol = document.createElement('div');
        divCol.classList = "col"
        contentFlights.appendChild(divCol)
        //Card
        const divCard = document.createElement('div');
        divCard.classList = "card"
        divCard.style ="width: 18rem;"
        divCol.appendChild(divCard)
        //img
        const img = document.createElement('img');
        img.classList = "card-img-top";
        img.src = "../assets/9fc1e655341e521c81133aa3f538fcb8.jpg"
        divCard.appendChild(img)
        //Card Body
        const carBody = document.createElement('div');
        carBody.classList = "card-body";
        divCard.appendChild(carBody)
        /*elements inside card body*/
        //h5
        const h5 = document.createElement('h5');
        h5.textContent = "desde: " + flight["origin"] + "hasta: " +flight["destination"]
        h5.classList = "card-title";
        //p
        const p = document.createElement('p');
        p.textContent = "Este vuelo tiene una capacidad de hasta " + flight["capacity"] + " personas y solo han reservado " + flight["reservedSeats"];
        p.classList = "card-text";
        //btn
        const btnReserv = document.createElement('button');
        btnReserv.classList = "btn btn-primary";
        btnReserv.textContent = "reservar"


        btnReserv.addEventListener("click",async () =>{
            const flightId = flight["id"]
            const data = {
                flightId,
                "nameUser" : userLs,
            }
            alert("Reserva Exitosa!!")
            post(URL_RESERVATIONS,data)
        })
        //add elements
        carBody.append(h5,p,btnReserv)
        //adding content child, father
        section.appendChild(contentFlights);
    })
}