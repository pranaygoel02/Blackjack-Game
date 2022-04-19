
let hasBlackJack = false;
let isAlive = true;
//user
var StartGameBtn = document.getElementById("startgame-btn");
var newCardBtn = document.getElementById("newcard-btn");
var NewBtns = document.getElementById("new-btns");
var UserEl = document.getElementById("user-el");
var sumEl = document.getElementById("sum-el");
var messageEl = document.getElementById("message-el");
let message = "";
var StandEl = document.getElementById("stand-el");
var userDeck = document.getElementById("user-deck");
var sum=0;
var firstCard = 0;
var secondCard = 0;
//dealer
var DealerEl = document.getElementById("dealer-el");
var dealerSumEl = document.getElementById("dealerSum-el");
var dealerDeck = document.getElementById("dealer-deck");
let dealerSum = 0;
let dealerFirstCard = 0;
let dealerSecondCard = 0;
let dealerIsAlive=true;
let dealerWin = false;
let dealerCards = "";
var winnerEl = document.getElementById("winner");
var newBtnsHidden = true; 

function UserStartGame(){
    userDeck.innerHTML="";
    document.querySelectorAll(".sum").forEach(element => {
        element.style.visibility='visible';
    }); 
    winnerEl.textContent="";
    messageEl.style.visibility='visible';
    hasBlackJack=false;
    isAlive=true;
    newBtnsHidden = false;
    NewBtns.style.visibility='visible';
    dealerSum=0;
    dealerSumEl.innerHTML="";
    dealerStartGame();    
    UserEl.innerHTML = "YOU:";
    firstCard = randomCard();
    secondCard = randomCard();
    $("#user-deck").append(`<img src="cards/${firstCard}.png">`);
    $("#user-deck").append(`<img src="cards/${secondCard}.png">`);
    let firstcardVal=firstCard;
    let secondcardVal=secondCard;
    if(firstCard>=10)
    firstcardVal=10;
    if(secondCard>=10)
    secondcardVal=10;
    sum = firstcardVal + secondcardVal;
    sumEl.textContent = "Sum: "+sum;
    StartGameBtn.innerHTML = "START NEW GAME";
    renderGame();
}

function renderGame(){
    sumEl.textContent = "Sum: "+sum;
    if(sum <= 20){
        message = "Do you want to draw a new card?";
    }else if(sum === 21){
        NewBtns.style.visibility='hidden';
        hasBlackJack = true;
        isAlive = false;
        dealerDisplay();
    }else{
        message = "Bust";
        NewBtns.style.visibility='hidden';
        isAlive = false;
        hasBlackJack= false;
        dealerDisplay();
    }
    messageEl.textContent = message;
    console.log(message);
    console.log(hasBlackJack);
    console.log(isAlive);
}

//button-functions
function newCard(){
    console.log("New Card Taken");
    let card = randomCard();
    $("#user-deck").append(`<img src="cards/${card}.png">`);
    firstCard=0;
    secondCard=0;
    if(card>=10)
    sum+=10;
    else
    sum+=card;
    sumEl.textContent = "Sum: "+sum;
    renderGame();
}

function UserStand() {
    console.log("Stand");
    isAlive=false;
    NewBtns.style.visibility='hidden';
    dealerDisplay();
}


//dealer game functions

function dealerStartGame(){
    dealerDeck.innerHTML="";
    console.log("Dealer game started");
    dealerIsAlive=true;
    dealerCards="";
    dealerSum=0;
    dealerFirstCard = randomCard();
    dealerSecondCard = randomCard();
    let dealerFirst = dealerFirstCard;
    let dealerSecond = dealerSecondCard;
    $("#dealer-deck").append(`<img src="cards/${dealerFirstCard}.png">`);
    $("#dealer-deck").append(`<img src="cards/back.png">`);
    console.log(dealerFirstCard);
    console.log(dealerSecondCard);
    DealerEl.innerHTML = "DEALER: ";  
    if(dealerFirst>=10)
    dealerSum+=10;
    else
    dealerSum+=dealerFirst;
    dealerSumEl.innerHTML="Sum: "+dealerSum;
    dealerCards+=changeCard(dealerFirstCard);
    dealerCards+=changeCard(dealerSecondCard);
    if(dealerSecond>=10)
    dealerSum+=10;
    else
    dealerSum+=dealerSecond;
    dealerFirstCard=0;
    dealerSecondCard=0; 
    console.log(dealerCards);   
    while(dealerIsAlive===true)
    dealerDecide();
}

function dealerDecide() {
    let decision = Math.floor(Math.random()*2)+1;
    console.log(decision);
    if(dealerSum<=11)
    dealerNewCard();
    else if(dealerSum<=21 && decision===1)
    dealerNewCard();
    else{
        console.log(dealerCards);
        dealerIsAlive=false;
    }
}
 function dealerDisplay(){
    dealerSumEl.textContent = "Sum: "+dealerSum; 
    $("#dealer-deck").empty(); 
    for(let i=0;i<dealerCards.length;i++){
        console.log(dealerCards.charAt(i));
        $("#dealer-deck").append(`<img src="cards/${dealerCards.charAt(i)}.png">`);
    }
    decision(); 
 }

function dealerNewCard() {
    let card = randomCard();
    dealerCards +=changeCard(card);
    console.log("New Card Taken by Dealer"); 
    console.log(card);   
    if(card>=10)
    dealerSum+=10;
    else
    dealerSum+=card;
}

function decision(){
    if(sum<21)
    messageEl.textContent="";
    winnerEl.style.visibility='visible';
    if((dealerSum<sum && sum<=21) || (sum<dealerSum && dealerSum>21 && sum<=21)){
        winnerEl.textContent="YOU WON!!!";
        if(sum===21)
        winnerEl.textContent="YOU GOT A BLACKJACK!!!!"
    }
    else if((dealerSum>sum && dealerSum<=21) || (dealerSum<sum && sum>21 && dealerSum<=21)){
        winnerEl.textContent="DEALER WON!!!"
        if(dealerSum===21)
        winnerEl.textContent="DEALER GOT A BLACKJACK!!!!"
    }
    else if(sum===dealerSum)
    winnerEl.textContent="<PUSH>";
    else if(sum>21 && dealerSum>21)
    winnerEl.textContent="START A NEW GAME!"
    console.log(winnerEl.textContent);
}

//basic operations
function changeCard(card){
    switch(card){
        case 10:
            return("D");
        case 1:
            return("A");
        case 11:
            return("J");
        case 12:
            return("Q");
        case 13:
            return("K");
        default:
            return(card);
    }
}

function randomCard(){
    let card = Math.floor(Math.random()*13)+1;
    return(card);
}