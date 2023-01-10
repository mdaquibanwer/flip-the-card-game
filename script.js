const Allcards = document.querySelectorAll(".card");

let cardOne,cardTwo;
let disablaDeck = false;
let matchedCards = 0;

const shuffleCard = ()=>{
    matchedCards = 0;
    cardOne = cardTwo = "";
    disablaDeck = false; // reset all the variables
    // creating arr of 8 pairs of items
    let imgArr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    imgArr.sort(()=>Math.random() > 0.5 ? 1 : -1)   // sorting the array randomly
    Allcards.forEach((card,index)=>{
        card.classList.remove("flip");
        let imgTag = card.querySelector("img") // passsing radom image to each card
        imgTag.src = `images/img-${imgArr[index]}.png`
        card.addEventListener("click",flipCard)
    }) 
}

const matchCards = (img1,img2)=>{
    // console.log(img1,img2)
    if(img1 === img2){  // checking whether two card matched
        matchedCards++;   // increment the total no. of matched card

        if(matchedCards === 8){ // doing this because in this game total matched card possible is 8;
            setTimeout(() => {
                return shuffleCard();   // calling the function after 1 second
            }, 1000);
        }
        cardOne.removeEventListener("click",flipCard)
        cardTwo.removeEventListener("click",flipCard)
        cardOne = cardTwo = "";   // setting both card value to blank
        return disablaDeck = false;
    }
    // if cards not matched
    setTimeout(() => {
        // adding a class shake in the claslist of cards
        cardOne.classList.add("shake")
        cardTwo.classList.add("shake")
    }, 400);
    setTimeout(() => {
        // removing the class shake and flip from the claslist of cards if cards not matched
        cardOne.classList.remove("shake","flip")
        cardTwo.classList.remove("shake","flip")
        cardOne = cardTwo = "";   // setting both card value to blank
        disablaDeck = false;
    }, 1000);
}

const flipCard = (e)=>{
    // console.log(e.target);
    let clickedCard = e.target; // getting user clicked card
    if(clickedCard !== cardOne && !disablaDeck){
        clickedCard.classList.add("flip");
        if(!cardOne){
            // returned the cardOne Value to clickedCard
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disablaDeck = true;
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;

        matchCards(cardOneImg,cardTwoImg);
    }
}
shuffleCard(); // shuffle card is called here so that game starts with shuffling it

Allcards.forEach(card=>{
    card.addEventListener("click",flipCard)
})