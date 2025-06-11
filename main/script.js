

let cardsJson = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : null;
// let number = []

const cards = [
    {
        balance: cardsJson ? cardsJson[0].balance : 0,
        transactionLimit: cardsJson ? cardsJson[0].transactionLimit : 100,
        historyLogs: cardsJson ? cardsJson[0].historyLogs : [],
        numberCard: cardsJson ? cardsJson[0].numberCard : []
    },
    {
        balance: cardsJson ? cardsJson[1].balance : 0,
        transactionLimit: cardsJson ? cardsJson[1].transactionLimit : 100,
        historyLogs: cardsJson ? cardsJson[1].historyLogs : [],
        numberCard: cardsJson ? cardsJson[1].numberCard : []
    },
    {
        balance: cardsJson ? cardsJson[2].balance : 0,
        transactionLimit: cardsJson ? cardsJson[2].transactionLimit : 100,
        historyLogs: cardsJson ? cardsJson[2].historyLogs : [],
        numberCard: cardsJson ? cardsJson[2].numberCard : []
    }

];


if (!!cardsJson == false) {
    for (let i = 0; i < 3; i++) {
    
    for (let j = 0; j < 16; j++) {
        
        let randomNumber = Math.floor(Math.random()*9)
        if (j == 3 || j == 7 || j == 11) {
            cards[i].numberCard.push(randomNumber + ' ')
        } else {
            // number.push(randomNumber)
            cards[i].numberCard.push(randomNumber)
        }   
    }
    }
}


console.log(cards);


const jsonSign = JSON.parse(localStorage.getItem('user'));




//  






function UserCard(card){
 
    this._balance = cardsJson ? cardsJson[card].balance : 0;
    this._transactionLimit = cardsJson ? cardsJson[card].transactionLimit : 100;
    this._historyLogs = cardsJson ? cardsJson[card].historyLogs : [];
    this._card = card
 
    let logOperation = (operationType, credits) => {
        this._historyLogs.push({
            operationType: operationType,
            credits: credits,
            operationTime: new Date().toLocaleString()
        })
    }
    this.getBalance = () => {
        return this._balance;
    }
    this.getCard = () => {
        return this._card
    }
    this.getTransactionLimit = () =>{
        return this._transactionLimit
    }
    
    this.getCardOptions = () => {
        return {
            balance: this._balance,
            transactionLimit: this._transactionLimit,
            historyLogs: this._historyLogs,
            key: this._key
        }
    }
 
    this.putCredits = (amount) => {
        this._balance += amount;
        logOperation("Received credits", amount)
        console.log(this._historyLogs);
        cards[card].balance = this._balance
        cards[card].historyLogs = this._historyLogs
        localStorage.setItem('cards', JSON.stringify(cards))
        return this._balance;
    }
 
    this.takeCredits = (amount) =>{
        if(this._balance >= amount && this._transactionLimit >= amount){
            this._balance -= amount;
            logOperation('Withdrawn of credits', amount)
            cards[card].balance = this._balance
            cards[card].historyLogs = this._historyLogs
            localStorage.setItem('cards', JSON.stringify(cards))
            return this._balance;
        } else{
            console.error("Not enough credits or transaction limit exceeded");
        }
    }
 
    this.setTransactionLimit = (amount) => {
        if(amount< 0 ){
            return console.error("Transaction limit can't be negative");
        } else{
            this._transactionLimit = amount;
            logOperation("Transaction limit changed", amount)
            cards[card].transactionLimit = this._transactionLimit
            cards[card].historyLogs = this._historyLogs
            localStorage.setItem('cards', JSON.stringify(cards))
            return `Transaction limit set to ${this._transactionLimit}`
        }
 
    }
    this.transferCredits = (amount) => {
        const tax = amount * 0.005; 
        const totalAmount = amount + tax;
        if(totalAmount> this._balance){
            return console.warn("Not enough credits");
        }
 
        if( totalAmount > this._transactionLimit){
            return console.warn("Transaction limit exceeded");
        }
 
       this._balance -= totalAmount;
        // this.putCredits(totalAmount)
 
        // card.putCredits(amount);
 
        logOperation("Withdrawn of credits", amount)
        return totalAmount
        // return `Transfered ${amount} credits to card ${card.getCardOptions().key}`

 
    }
 
 
}


class UserAccount {
    constructor(name){
        this._name = name;
        this._cards = [];
    }
    addCard(){
        if(this._cards.length >= 3){
            return console.warn("User can't have more than 3 cards");
        } else{
            const card = new UserCard(this._cards.length + 1)
            this._cards.push(card);
            return card;
        }
 
    }
 
    getCardByKey(key){
        if(key < 1 || key > 3){
            return console.error("Card with such key doesn't exist");
        }
 
        // return this._cards[key - 1];
 
        for(let card of this._cards){
            if(card._key === key){
                return card;
            }
        }
        return console.error("Card with such key doesn't exist");
    }
 
 
}

let user = new UserCard(localStorage.getItem('pageCard') ? localStorage.getItem('pageCard') : 0)







console.log(JSON.parse(localStorage.getItem('cards')));









const imgName = document.querySelector('.box_imgName');
const backgroundBlocks = document.querySelectorAll('.backgroundBlock');
const white = document.querySelector('.white');
const black = document.querySelector('.black');
const buttons = document.querySelectorAll('button');

const changesDataBoxImg = document.querySelector('.changesDataBoxImg');
const message = document.querySelector('.message');


const money = document.querySelector('.money');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modalContent');
const deposite = document.querySelector('#deposite');
const breeding = document.querySelector('#breeding');
const changeLimit = document.querySelector('#ChangeLimit');
const changeCard = document.querySelector('#changeCard');
const myName = document.querySelectorAll('.myName');
for (let i = 0; i < 2; i++) {
    myName[i].textContent = jsonSign.name
    
}

const numberCard = document.querySelector('#numberCard');
numberCard.textContent = cards[0].numberCard.join('')


if (localStorage.getItem('dark') == 'dark') {
    whiteOrBlack('add')
}
   
    

money.textContent = user.getBalance()
imgName.addEventListener('click', ()=>{
    document.querySelector('.changesDataBox').classList.toggle('none')
    document.querySelector('.changesIconBox').classList.add('none')
})
black.addEventListener('click', () =>{
    whiteOrBlack('add')
    localStorage.setItem('dark', 'dark')
})
white.addEventListener('click', () =>{
    whiteOrBlack('remove')
    localStorage.removeItem('dark')
})

document.querySelectorAll('[data-logoImg]').forEach((logoImg) =>{
    logoImg.addEventListener('click', function () {
        let logoimage = logoImg.getAttribute('data-logoImg')
        document.querySelectorAll('.logoImg').forEach((logoImg) =>{
            logoImg.src = `../img/main/${logoimage}.png`;
        })
    })
})

changesDataBoxImg.addEventListener('click', () =>{
    document.querySelector('.changesIconBox').classList.toggle('none')
})

// document.addEventListener('click', (e) => { 
//     let clickInside = modal.contains(e.target) 
//     let clickOnButton = button.contains(e.target) 
//     if (!clickInside && !clickLogo){ 
//         modal2.classList.add('none') 
//     } 
// })

deposite.addEventListener('click', function(){
    let depositeText = '<h1>Поповнити баланс</h1> <input type="text" class="input"> <button class="buttonEvent">Підтвердити</button>'
    textModal(depositeText)


    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user.putCredits(+input.value)
        money.textContent = user.getBalance()
        getMessage()
    })
})

breeding.addEventListener('click', function () {
    let breedingText =  `<h1>Вивести</h1> <p class="limit">Ваш ліміт: <span>${user.getTransactionLimit()}</span></p> <input type="text" class="input"> <button class="buttonEvent">Підтвердити</button>`
    textModal(breedingText)
    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user.takeCredits(+input.value)
        money.textContent = user.getBalance()
        getMessage()
        
    })
    
})

changeLimit.addEventListener('click', function () {
    let changeLimitText =  `<h1>Змінити ліміт</h1> <p class="limit">Поточний ліміт: <span>${user.getTransactionLimit()}</span></p> <input type="text" class="input"> <button class="buttonEvent">Підтвердити</button>`
    textModal(changeLimitText)
    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user.setTransactionLimit(+input.value)
    })
})

changeCard.addEventListener('click', () => {
    let changeCardText = `   
    <div class="card">
        <img src="../img/main/styleCard.png" alt="">
    </div>
    <div class="card">
        <img src="../img/main/styleCard.png" alt="">
    </div>
    <div class="card">
        <img src="../img/main/styleCard.png" alt="">
    </div>
    <button class="buttonEvent">Підтвердити</button>
    `
    let cardNum
    modalContent.classList.add('modalchangeCard')
    modal.classList.add('modalchangeCardBox')
    textModal(changeCardText)
    const card = document.querySelectorAll('.card');
    card.forEach((item, index) => {
        item.addEventListener('click', () => {
            // user = new UserCard(index)
            // console.log(user);
            cardNum = index
            // money.textContent = user.getBalance()
            // console.log(user.getBalance());

            
            for (let i = 0; i < card.length; i++) {
                document.querySelectorAll('.card img')[i].classList.remove('activCard')
            }
            document.querySelectorAll('.card img')[index].classList.add('activCard')
            
        })
    })

    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user = new UserCard(cardNum)
        money.textContent = user.getBalance()
        numberCard.textContent = cards[cardNum].numberCard.join('')
        localStorage.setItem('pageCard', cardNum)
    })



})



document.querySelector('#fundsTransfer').addEventListener('click', () => {
    textModal(`<div class="fundsTransferContent">
                    <div class="fundsTransferContentLeft">
                        <p class="whatCardText">card1</p>
                        <input type="number" name="" id="inputNumber">
                    </div>
                    <img src="/img/main/icons/Arrow 4.svg" alt="">
                    <div class="fundsTransferContentRight">
                        <select name="" id="selectCard">
                        </select>
                        <p class='NumberText'></p>
                    </div>
            </div>
            <button class="buttonEvent">Підтвердити</button>`)
    whatCard(2)
    
    const inputNumber = document.querySelector('#inputNumber');
    inputNumber.addEventListener('input', () => {
        // number = user.transferCredits(+inputNumber.value)
        document.querySelector('.NumberText').textContent = +inputNumber.value + (+inputNumber.value * 0.005)
    })
    const select = document.querySelector('#selectCard');
    let selectCard = select.value
    select.addEventListener('change', () => {
        selectCard = select.value
    })
    document.querySelector('.buttonEvent').addEventListener('click', () => {
        let moneyNumber = user.transferCredits(+inputNumber.value)
        console.log(moneyNumber);
        
        money.textContent = user.getBalance()
        console.log(user.getBalance());
        
        user = new UserCard(+selectCard)
        user.putCredits(moneyNumber)
        if (user.getCard() == 2) {
           user = new UserCard(+selectCard)
        } else if(number == 1) {
           
        } else {
           
        }
        // money.textContent = Math.floor(user.putCredits(moneyNumber)) 
    })

})


function whatCard(number) {
    if (user.getCard() == number) {
        document.querySelector('.whatCardText').textContent = 'card' + (+user.getCard() + 1)
        let select = document.querySelector('#selectCard')

        if (number == 2) {
            select.innerHTML = `
                <option value="1">card2</option>
                <option value="0">card1</option>
            `
        } else if(number == 1) {
            select.innerHTML = `
                <option value="2">card3</option>
                <option value="0">card1</option>
            `
        } else {
             select.innerHTML = `
                <option value="2">card3</option>
                <option value="1">card2</option>
            `
        }

        // select.innerHTML = `
        //     <option value="${number == 2 ? 2 : number == 1 ? 1 : 0}">r</option>
        //     <option value="">r</option>
        // `
        return
    }
    whatCard(number - 1)
}



function getMessage() {
    message.classList.add('animationMessageStart')
    setTimeout(() => {
        message.classList.remove('animationMessageStart')
    }, 3000);
}


function textModal(text) {
    modal.classList.remove('none')
    modalContent.innerHTML = ''
    modalContent.innerHTML = text
}
const back = document.querySelector('.back');
back.addEventListener('click', () =>{
    modalContent.classList.remove('modalchangeCard')
    modal.classList.remove('modalchangeCardBox')
    modal.classList.add('none')
    
})
// user = new UserCard(0)
// console.log(user);



function whiteOrBlack(methodClass) {
     backgroundBlocks.forEach((backgroundBlock) =>{
        backgroundBlock.classList[methodClass]('blackhon')
    })
    buttons.forEach((button) =>{
        button.classList[methodClass]('blackhonbutton')
    })
    document.querySelector('.changesDataBoxButton').classList[methodClass]('blackhonbutton')
    modal.classList[methodClass]('blackhon')
    document.querySelector('.changesDataBoxButton').classList[methodClass]('blackhonbutton')
}

