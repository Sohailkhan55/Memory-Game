const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard ,secondCard;
let lockBoard = false;

function flipCard()
{
    if(lockBoard)
    {
        //if lockBoard is true
        return;
    }
    if(this === firstCard)
    {
        //double clicked same card
        return;
    }
    this.classList.add('flip');
    if(!hasFlippedCard)
    {
        //firstClick
        hasFlippedCard=true;
        firstCard=this;
    }
    else{
        //secondClick
       // hasFlippedCard=false;
        secondCard=this;

        //do cards match?
        checkForMatch();
    }
}
function checkForMatch(){
    if(firstCard.dataset.framework === 
        secondCard.dataset.framework){
            //it's a match
            disableCards();
        }
        else{
           unflipCards();
           
        }
}
function disableCards()
{
    firstCard.removeEventListener('click' , flipCard);
     secondCard.removeEventListener('click' , flipCard);
     resetBoard();
}
function unflipCards()
{
    lockBoard=true;
         //not a match
         setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
}
function resetBoard()
{
    [hasFlippedCard,lockBoard]=[false,false];
    [firstCard,secondCard]=[null,null];
}
//in shuffle extra parenthesis is for immediately invoking function before start of game
(function shuffle()
{
    cards.forEach(card => {
            let randomPos = Math.floor( Math.random() * 12);
            card.style.order=randomPos;
    });
})();

cards.forEach(card=> card.addEventListener('click',flipCard));