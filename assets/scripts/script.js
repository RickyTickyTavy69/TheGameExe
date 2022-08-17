/**************************************HOVER_WEAPONS**********************************************/

const chooseYourWeapon = document.querySelector(".chooseYourWeapon");

chooseYourWeapon.addEventListener("mouseover", (event) =>{
    if(event.target.classList.contains("weapon")) {
        console.log("weapon");
    }
})