
const jsonSign = JSON.parse(localStorage.getItem('user'));



let balanceLocal = JSON.parse(localStorage.getItem('balance'))                                            




// datacardlocalStr.balance = 100

// function local(){
    
// }
// console.log(localStorage.getItem('balance'));

// localStorage.getItem('balance')

function UserCard(index){
 
    this._balance = localStorage.getItem('balance') ? localStorage.getItem('balance') : 0;
    this._transactionLimit = localStorage.getItem('transactionLimit') ? localStorage.getItem('transactionLimit') : 100;
    this._historyLogs = localStorage.getItem('historyCard') ? JSON.parse(localStorage.getItem('historyCard')) : [];
    this._key = index;
 
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
        localStorage.setItem('historyCard', JSON.stringify(this._historyLogs))
        localStorage.setItem('balance', this._balance)
        return this._balance;
    }
 
    this.takeCredits = (amount) =>{
        if(this._balance >= amount && this._transactionLimit >= amount){
            this._balance -= amount;
            logOperation('Withdrawn of credits', amount)
            localStorage.setItem('historyCard', JSON.stringify(this._historyLogs))
            localStorage.setItem('balance', this._balance)
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
            localStorage.setItem('historyCard', JSON.stringify(this._historyLogs))
            localStorage.setItem('transactionLimit', this._transactionLimit)
            return `Transaction limit set to ${this._transactionLimit}`
        }
 
    }
    this.transferCredits = (amount, card) => {
        const tax = amount * 0.005; 
        const totalAmount = amount + tax;
        if(totalAmount> this._balance){
            return console.warn("Not enough credits");
        }
 
        if( totalAmount > this._transactionLimit){
            return console.warn("Transaction limit exceeded");
        }
 
        this._balance -= totalAmount;
 
        card.putCredits(amount);
 
        logOperation("Withdrawn of credits", amount)
 
        return `Transfered ${amount} credits to card ${card.getCardOptions().key}`
 
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

let user = new UserCard()

















const imgName = document.querySelector('.box_imgName');
const backgroundBlocks = document.querySelectorAll('.backgroundBlock');
const white = document.querySelector('.white');
const black = document.querySelector('.black');
const buttons = document.querySelectorAll('button');

const changesDataBoxImg = document.querySelector('.changesDataBoxImg');


const money = document.querySelector('.money');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modalContent');
const deposite = document.querySelector('#deposite');
const breeding = document.querySelector('#breeding');
const ChangeLimit = document.querySelector('#ChangeLimit');
const changeCard = document.querySelector('#changeCard');

const myName = document.querySelectorAll('.myName');
for (let i = 0; i < 2; i++) {
    myName[i].textContent = jsonSign.name
    
}



if (localStorage.getItem('dark') == 'dark') {
    backgroundBlocks.forEach((backgroundBlock) =>{
        backgroundBlock.classList.add('blackhon')
    })
    buttons.forEach((button) =>{
        button.classList.add('blackhonbutton')
    })
    document.querySelector('.changesDataBoxButton').classList.add('blackhonbutton')
    modal.classList.add('blackhon')
    document.querySelector('.changesDataBoxButton').classList.add('blackhonbutton')
}
   
    

money.textContent = user.getBalance()
imgName.addEventListener('click', ()=>{
    document.querySelector('.changesDataBox').classList.toggle('none')
    document.querySelector('.changesIconBox').classList.add('none')
})
black.addEventListener('click', () =>{
    backgroundBlocks.forEach((backgroundBlock) =>{
        backgroundBlock.classList.add('blackhon')
    })
    buttons.forEach((button) =>{
        button.classList.add('blackhonbutton')
    })
    document.querySelector('.changesDataBoxButton').classList.add('blackhonbutton')
    modal.classList.add('blackhon')
    document.querySelector('.changesDataBoxButton').classList.add('blackhonbutton')
    localStorage.setItem('dark', 'dark')
})
white.addEventListener('click', () =>{
    backgroundBlocks.forEach((backgroundBlock) =>{
        backgroundBlock.classList.remove('blackhon')
    } )
    buttons.forEach((button) =>{
        button.classList.remove('blackhonbutton')
    })
    document.querySelector('.changesDataBoxButton').classList.remove('blackhonbutton')
    modal.classList.remove('blackhon')
    document.querySelector('.changesDataBoxButton').classList.remove('blackhonbutton')
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

deposite.addEventListener('click', function(){
    let depositeText = '<h1>Поповнити баланс</h1> <input type="text" class="input"> <button class="buttonEvent">Підтвердити</button>'
    textModal(depositeText)


    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user.putCredits(+input.value)
        money.textContent = user.getBalance()
        
    })
})

breeding.addEventListener('click', function () {
    let breedingText =  `<h1>Поповнити баланс</h1> <p class="limit">Ваш ліміт: <span>${user.getTransactionLimit()}</span></p> <input type="text" class="input"> <button class="buttonEvent">Підтвердити</button>`
    textModal(breedingText)
    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user.takeCredits(+input.value)
        money.textContent = user.getBalance()
        
    })
    
})

ChangeLimit.addEventListener('click', function () {
    let changeLimitText =  `<h1>Змінити ліміт</h1> <p class="limit">Поточний ліміт: <span>${user.getTransactionLimit()}</span></p> <input type="text" class="input"> <button class="buttonEvent">Підтвердити</button>`
    textModal(changeLimitText)
    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user.setTransactionLimit(+input.value)
    })
})


function textModal(text) {
    modal.classList.remove('none')
    modalContent.innerHTML = ''
    modalContent.innerHTML = text
}
const back = document.querySelector('.back');
back.addEventListener('click', () =>{
    modal.classList.add('none')
    // console.log('hello');
    
})
