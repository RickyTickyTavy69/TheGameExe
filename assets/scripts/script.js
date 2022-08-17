
import Game from "./game.module.js";

/**************************************HOVER_WEAPONS**********************************************/

const chooseYourWeapon = document.querySelector(".chooseYourWeapon");
const choosingYou = document.querySelector(".choosingYou");
const choosingKI = document.querySelector(".choosingKI");
let yourGame = new Game();
const result = document.querySelector(".result");

chooseYourWeapon.childNodes.forEach( (child) => {
    if (child.children !== undefined){
        child.children[0].addEventListener("mouseover", (event) =>{
            console.log()
            event.target.style.display = "none";
            child.children[1].style.display = "block";
            choosingYou.style.color = "red";
            choosingYou.innerHTML = `${child.children[1].classList.value.split(" ")[1]}...?`
        })
        child.children[1].addEventListener("mouseout", (event) =>{
            child.children[0].style.display = "block";
            event.target.style.display = "none";
            const isChosen = choosingYou.innerHTML[choosingYou.innerHTML.length - 1]
            if (isChosen !== "!"){                    // wenn schon etwas gewählt wurde, dann soll InnerHTML nicht wieder
                choosingYou.innerHTML = "";                     // gelöscht werden.
            }
        })
        child.children[1].addEventListener("click", (event) =>{
            console.log("click", event.target.classList.value.split(" ")[1]);
            const choosenWeapon = event.target.classList.value.split(" ")[1];
            console.log("choosen weapon", choosenWeapon);
            choosingYou.style.color = "red";
            choosingYou.innerHTML = `${choosenWeapon}!!`
            const choosenKIWeapon = Game.getKIChoosen();
            console.log("KI choosen", choosenKIWeapon);
            choosingKI.innerHTML = `KI hat ${choosenKIWeapon}`;
            const winnerNumber = yourGame.getWinner(choosenKIWeapon, choosenWeapon);
            console.log("winner", winnerNumber);
            if(winnerNumber === 0){
                result.style.color = "orange";
                result.innerHTML = `${choosenKIWeapon} gegen ${choosenWeapon} => unentschieden!`
            } else if (winnerNumber === 1){
                result.style.color = "green";
                result.innerHTML = `${choosenWeapon} gegen ${choosenKIWeapon} => du gewinnst!`
            } else if (winnerNumber === 2) {
                result.style.color = "red";
                result.innerHTML = `${choosenKIWeapon} gegen ${choosenWeapon} => du verlierst ha ha ha!`
            }
        })
    }
})
