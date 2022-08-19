/*
* the code is
* documentation
* enough
*/
import Game from "./game.module.js";



const chooseYourWeapon = document.querySelector(".chooseYourWeapon");
const choosingYou = document.querySelector(".choosingYou");
const choosingKI = document.querySelector(".choosingKI");
const yourGame = new Game();
const result = document.querySelector(".result");
const YourCount = document.querySelector(".yourCount");
const KICount = document.querySelector(".kiCount");

/***********************************************ROUNDS****************************************************/

const roundsInput = document.querySelector(".rounds_input");
const roundsButton = document.querySelector(".countRounds");
let rounds = 1;
const roudsDisplay = document.querySelector(".rounds_display_number");
const modalWindow = document.querySelector(".modal_window");
const removeActive1 = document.querySelector(".remove_active");
const removeActive2 = document.querySelector(".remove_active2");

roundsButton.addEventListener("click", () => {
    console.log("rounds", roundsInput.value);
    rounds = Number(roundsInput.value);
    roudsDisplay.innerHTML = rounds.toString();
    roundsInput.value = 1;
})

/**************************************HOVER_WEAPONS**********************************************/


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

        /*******************************************************************GAME*******************************/

        child.children[1].addEventListener("click", (event) =>{
            console.log("click", event.target.classList.value.split(" ")[1]);
            const choosenWeapon = event.target.classList.value.split(" ")[1];
            console.log("choosen weapon", choosenWeapon);
            choosingYou.style.color = "red";
            choosingYou.innerHTML = `${choosenWeapon}!!`
            const choosenKIWeapon = Game.getKIChoosen();
            console.log("KI choosen", choosenKIWeapon);
            choosingKI.innerHTML = `The machine has ${choosenKIWeapon}`;
            const winnerNumber = yourGame.getWinner(choosenKIWeapon, choosenWeapon);
            console.log("winner", winnerNumber);
            if(winnerNumber === 0){
                roudsDisplay.innerHTML = (Number(roudsDisplay.innerHTML) - 1).toString();
                rounds = rounds - 1;
                result.style.color = "orange";
                result.innerHTML = `${choosenKIWeapon} vs ${choosenWeapon} => it is a draw!`
            } else if (winnerNumber === 1){
                roudsDisplay.innerHTML = (Number(roudsDisplay.innerHTML) - 1).toString();
                rounds = rounds - 1;
                result.style.color = "green";
                result.innerHTML = `${choosenWeapon} vs ${choosenKIWeapon} => you have won!`
                YourCount.innerHTML = (Number(YourCount.innerHTML) + 1).toString();
            } else if (winnerNumber === 2) {
                roudsDisplay.innerHTML = (Number(roudsDisplay.innerHTML) - 1).toString();
                rounds = rounds - 1;
                result.style.color = "red";
                result.innerHTML = `${choosenKIWeapon} vs ${choosenWeapon} => you have lost you looser ha ha ha!`
                KICount.innerHTML = (Number(KICount.innerHTML) + 1).toString();
            }
            console.log("rounds", rounds);
            /******************************************************modal_window*************************/
            if(Number(rounds) === 0){
                console.log("rounds zero");
                modalWindow.classList.add("active");
                let KIWins = Number(KICount.innerHTML);
                let YourWins = Number(YourCount.innerHTML);
                let modalHTML = "";
                console.log(KIWins, YourWins);
                if(KIWins === YourWins){
                    modalHTML = "It is a draw";
                } else if (KIWins > YourWins) {
                    modalHTML = "The machines have won!";
                } else if (KIWins < YourWins){
                    modalHTML = "You have won!";
                }
                modalWindow.children[0].innerHTML = `The game is over! ${modalHTML}`
                rounds = 1;
                roudsDisplay.innerHTML = "1";
                YourCount.innerHTML = "0";
                KICount.innerHTML = "0";
            }
            /******************************************************modal_window*************************/
        })
    }
})

removeActive1.addEventListener("click", () => {
    modalWindow.classList.remove("active");
})

removeActive2.addEventListener("click", () => {
    modalWindow.classList.remove("active");
})