


const jsonSign = JSON.parse(localStorage.getItem('user'));
let cardsJson = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : null;
const cards = [
    {
        balance: cardsJson ? cardsJson[0].balance : 0,
        transactionLimit: cardsJson ? cardsJson[0].transactionLimit : 100,
        historyLogs: cardsJson ? cardsJson[0].historyLogs : [],
        numberCard: cardsJson ? cardsJson[0].numberCard : [],
        styleCard: cardsJson ? cardsJson[0].styleCard : 'styleCard'
    },
    {
        balance: cardsJson ? cardsJson[1].balance : 0,
        transactionLimit: cardsJson ? cardsJson[1].transactionLimit : 100,
        historyLogs: cardsJson ? cardsJson[1].historyLogs : [],
        numberCard: cardsJson ? cardsJson[1].numberCard : [],
        styleCard: cardsJson ? cardsJson[1].styleCard : 'styleCard1'
    },
    {
        balance: cardsJson ? cardsJson[2].balance : 0,
        transactionLimit: cardsJson ? cardsJson[2].transactionLimit : 100,
        historyLogs: cardsJson ? cardsJson[2].historyLogs : [],
        numberCard: cardsJson ? cardsJson[2].numberCard : [],
        styleCard: cardsJson ? cardsJson[2].styleCard : 'styleCard2'
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
 
       this._balance -= amount;
        // this.putCredits(totalAmount)
 
        // card.putCredits(amount);
 
        logOperation("Withdrawn of credits", amount)
        cards[card].balance = this._balance
        cards[card].historyLogs = this._historyLogs
        localStorage.setItem('cards', JSON.stringify(cards))
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
const logoImg = document.querySelectorAll('.logoImg')
// for (let i = 0; i < 2; i++) {
    myName[0].textContent = jsonSign.name
    
// }

const numberCard = document.querySelector('#numberCard');
numberCard.textContent = cards[0].numberCard.join('')


if (localStorage.getItem('dark') == 'dark') {
    whiteOrBlack('add')
}
   
    

money.textContent = user.getBalance()
// imgName.addEventListener('click', ()=>{
//     document.querySelector('.changesDataBox').classList.toggle('none')
//     document.querySelector('.changesIconBox').classList.add('none')
// })

//міняння тем
// black.addEventListener('click', () =>{
//     whiteOrBlack('add')
//     localStorage.setItem('dark', 'dark')
// })
// white.addEventListener('click', () =>{
//     whiteOrBlack('remove')
//     localStorage.removeItem('dark')
// })


//міняння аватара 
// document.querySelectorAll('[data-logoImg]').forEach((logoImg) =>{
//     logoImg.addEventListener('click', function () {
//         let logoimage = logoImg.getAttribute('data-logoImg')
//         document.querySelectorAll('.logoImg').forEach((logoImg) =>{
//             logoImg.src = `../img/main/${logoimage}.png`;
//         })
//     })
// })



// changesDataBoxImg.addEventListener('click', () =>{
//     document.querySelector('.changesIconBox').classList.toggle('none')
// })

// document.addEventListener('click', (e) => { 
//     let clickInside = modal.contains(e.target) 
//     let clickOnButton = button.contains(e.target) 
//     if (!clickInside && !clickLogo){ 
//         modal2.classList.add('none') 
//     } 
// })




    // modalTrigger.forEach(btn => {
    //     btn.addEventListener('click', openModal);
    // });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
   

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });




deposite.addEventListener('click', function(){
    let depositeText = ' <div class="modal__close" data-close>&times;</div> <h1>Поповнити баланс</h1> <input type="text" class="input"> <button class="buttonEvent">Підтвердити</button>'
    textModal(depositeText)
    modalContent.classList.remove('modalchangeCardBox')

    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user.putCredits(+input.value)
        money.textContent = user.getBalance()
        getMessage()
    })
})

breeding.addEventListener('click', function () {
    let breedingText =  `<div class="modal__close" data-close>&times;</div> <h1>Вивести</h1> <p class="limit">Ваш ліміт: <span>${user.getTransactionLimit()}</span></p> <input type="text" class="input"> <button class="buttonEvent">Підтвердити</button>`
    textModal(breedingText)
    modalContent.classList.remove('modalchangeCardBox')
    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user.takeCredits(+input.value)
        money.textContent = user.getBalance()
        getMessage()
        
    })
    
})

changeLimit.addEventListener('click', function () {
    let changeLimitText =  `<div class="modal__close" data-close>&times;</div> <h1>Змінити ліміт</h1> <p class="limit">Поточний ліміт: <span>${user.getTransactionLimit()}</span></p> <input type="text" class="input"> <button class="buttonEvent">Підтвердити</button>`
    textModal(changeLimitText)
    modalContent.classList.remove('modalchangeCardBox')
    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user.setTransactionLimit(+input.value)
    })
})

changeCard.addEventListener('click', () => {
    let changeCardText = `
    <div class="modalchangeCard">
        <div class="card">
            <img src="../img/main/cards/${cards[0].styleCard}.png" alt="">
        </div>
        <div class="card">
            <img src="../img/main/cards/${cards[1].styleCard}.png" alt="">
        </div>
        <div class="card">
            <img src="../img/main/cards/${cards[2].styleCard}.png" alt="">
        </div>
    </div>
    <div class="modal__close" data-close>&times;</div>   
    <button class="buttonEvent">Підтвердити</button>
    `
    let cardNum
    modalContent.classList.add('modalchangeCardBox')
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
    textModal(`
        <div class="modal__close" data-close>&times;</div>
        <div class="fundsTransferContent">
                    <div class="fundsTransferContentLeft">
                        <p class="whatCardText">card1</p>
                        <input type="number" name="" id="inputNumber">
                    </div>
                    <img src="/img/main/icons/Arrow 4.svg" alt="">
                    <div class="fundsTransferContentRight">
                        <select name="" id="selectCard">
                        </select>
                        <p class='NumberText'>0</p>
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
        // if (user.getCard() == 2) {
        //    user = new UserCard(+selectCard)
        // } else if(number == 1) {
           
        // } else {
           
        // }
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
    modal.classList.add('show');
    modal.classList.remove('hide');
    modalContent.innerHTML = ''
    modalContent.innerHTML = text
    const modalCloseBtn = document.querySelector('[data-close]');
    modalCloseBtn.addEventListener('click', closeModal);
}
// const back = document.querySelector('.back');
// back.addEventListener('click', () =>{
//     modalContent.classList.remove('modalchangeCard')
//     modal.classList.remove('modalchangeCardBox')
//     modal.classList.add('none')
    
// })
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

let attrCard
let attrlogo
let attrBackground
imgName.addEventListener('click', () => {
    modal.classList.add('show')
    modal.classList.remove('hide')
    changeCardAndData()
    const changeStyle = document.querySelector('.changeStyle');
    changeStyle.addEventListener('click', () => {
        modalContent.innerHTML = ''
        modalContent.innerHTML = `
           <img src="/img/main/cards/styleCard.png" alt="" class="cardImg"> 
                <div class="changeStyleModalButton">
                    <img src="/img/main/icons/iconCardButton.svg" alt="" class="iconCardButton">
                    <img src="/img/main/icons/iconLogoButton.svg" alt="" class="iconLogoButton">
                    <img src="/img/main/icons/iconBackroundButton.svg" alt="" class="iconBackroundButton">
                </div>
                <div class="boxstyleCard">
                    <img src="/img/main/cards/styleCard.png" alt="" data-cards="styleCard" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard1.png" alt="" data-cards="styleCard1" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard2.png" alt="" data-cards="styleCard2" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard3.png" alt="" data-cards="styleCard3" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard4.png" alt="" data-cards="styleCard4" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard5.png" alt="" data-cards="styleCard5" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard6.png" alt="" data-cards="styleCard6" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard7.png" alt="" data-cards="styleCard7" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard8.png" alt="" data-cards="styleCard8" class="boxstyleCardImg">
                </div>
                <button>Зберегти</button>
        `
         document.querySelectorAll('[data-cards]').forEach((card) =>{
                card.addEventListener('click', function () {
                    // console.log('hello');
                    
                    let attrCard = card.getAttribute('data-cards')
                    document.querySelector('.cardImg').src = `/img/main/cards/${attrCard}.png`
                    
                })
        })
       addEventListenerFun()

    })
})


function addEventListenerFun() {
     document.querySelector('.iconCardButton').addEventListener('click', () => {
            
            modalContent.innerHTML = ''
            modalContent.innerHTML = `
                <img src="/img/main/cards/styleCard.png" alt="" class="cardImg"> 
                <div class="changeStyleModalButton">
                    <img src="/img/main/icons/iconCardButton.svg" alt="" class="iconCardButton">
                    <img src="/img/main/icons/iconLogoButton.svg" alt="" class="iconLogoButton">
                    <img src="/img/main/icons/iconBackroundButton.svg" alt="" class="iconBackroundButton">
                </div>
                <div class="boxstyleCard">
                    <img src="/img/main/cards/styleCard.png" alt="" data-cards="styleCard" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard1.png" alt="" data-cards="styleCard1" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard2.png" alt="" data-cards="styleCard2" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard3.png" alt="" data-cards="styleCard3" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard4.png" alt="" data-cards="styleCard4" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard5.png" alt="" data-cards="styleCard5" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard6.png" alt="" data-cards="styleCard6" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard7.png" alt="" data-cards="styleCard7" class="boxstyleCardImg">
                    <img src="/img/main/cards/styleCard8.png" alt="" data-cards="styleCard8" class="boxstyleCardImg">
                </div>
                <button class="save">Зберегти</button>
            `

            document.querySelectorAll('[data-cards]').forEach((card) =>{
                card.addEventListener('click', function () {
                    // console.log('hello');
                    
                    attrCard = card.getAttribute('data-cards')
                    document.querySelector('.cardImg').src = `/img/main/cards/${attrCard}.png`
                    
                })
            })
            document.querySelector('.save').addEventListener('click', () => {
                
                document.querySelector('.cardBox').style.background = `url('/img/main/cards/${attrCard}.png') no-repeat`
                document.querySelector('.cardBox').style.backgroundSize = `cover`
            })
            addEventListenerFun()
        })
        document.querySelector('.iconLogoButton').addEventListener('click', () => {
            modalContent.innerHTML = ''
            modalContent.innerHTML = `
                <img src="/img/main/logo/imgLogo1.png" alt="" class="modalLogoImg"> 
                <div class="changeStyleModalButton">
                    <img src="/img/main/icons/iconCardButton.svg" alt="" class="iconCardButton">
                    <img src="/img/main/icons/iconLogoButton.svg" alt="" class="iconLogoButton">
                    <img src="/img/main/icons/iconBackroundButton.svg" alt="" class="iconBackroundButton">
                </div>
                <div class="boxstyleCard boxstylelogo">
                    <img src="/img/main/logo/imgLogo1.png" alt="" data-logoImg="imgLogo1" class="boxstyleCardImg">
                    <img src="/img/main/logo/imgLogo2.png" alt="" data-logoImg="imgLogo2" class="boxstyleCardImg">
                    <img src="/img/main/logo/imgLogo3.png" alt="" data-logoImg="imgLogo3" class="boxstyleCardImg">
                    <img src="/img/main/logo/imgLogo4.png" alt="" data-logoImg="imgLogo4" class="boxstyleCardImg">
                    <img src="/img/main/logo/imgLogo5.png" alt="" data-logoImg="imgLogo5" class="boxstyleCardImg">
                    <img src="/img/main/logo/imgLogo6.png" alt="" data-logoImg="imgLogo6" class="boxstyleCardImg">
                    <img src="/img/main/logo/imgLogo6.png" alt="" data-logoImg="imgLogo7" class="boxstyleCardImg">
                    <img src="/img/main/logo/imgLogo6.png" alt="" data-logoImg="imgLogo8" class="boxstyleCardImg">
                    <img src="/img/main/logo/imgLogo6.png" alt="" data-logoImg="imgLogo9" class="boxstyleCardImg">
                </div>
                <button class="save">Зберегти</button>
            `
             document.querySelectorAll('[data-logoImg]').forEach((logo) =>{
                logo.addEventListener('click', function () {
                    // console.log('hello');
                    
                    attrlogo = logo.getAttribute('data-logoImg')
                    document.querySelector('.modalLogoImg').src = `/img/main/logo/${attrlogo}.png`
                    
                })
            })
            document.querySelector('.save').addEventListener('click', () => {
                for (let i = 0; i < 2; i++) {
                    logoImg[i].src = `/img/main/logo/${attrlogo}.png`
                }
                
            })
            addEventListenerFun()
        })
        document.querySelector('.iconBackroundButton').addEventListener('click', () => {
            modalContent.innerHTML = ''
            modalContent.innerHTML = `
                <div class="lookBackground"></div>
                <div class="changeStyleModalButton">
                    <img src="/img/main/icons/iconCardButton.svg" alt="" class="iconCardButton">
                    <img src="/img/main/icons/iconLogoButton.svg" alt="" class="iconLogoButton">
                    <img src="/img/main/icons/iconBackroundButton.svg" alt="" class="iconBackroundButton">
                </div>
                <div class="boxstyleCard boxstyleBackground">
                   <div class="background1 background" data-background="background1"></div>
                   <div class="background2 background" data-background="background2"></div>
                   <div class="background3 background" data-background="background3"></div>
                   <div class="background4 background" data-background="background4"></div>
                   <div class="background5 background" data-background="background5"></div>
                   <div class="background6 background" data-background="background6"></div>
                   <div class="background7 background" data-background="background7"></div>
                   <div class="background8 background" data-background="background8"></div>
                   <div class="background9 background" data-background="background9"></div>
                </div>
                <button class="save">Зберегти</button>
            `
            
            document.querySelectorAll('[data-background]').forEach((background) =>{
                background.addEventListener('click', function () {
                    // console.log('hello');
                    
                    attrBackground = background.getAttribute('data-background')
                    let lookBackground = document.querySelector('.lookBackground')
                    for (let i = 1; i <= 9; i++) {
                        lookBackground.classList.remove('background' + i)
                    }
                    lookBackground.classList.add(attrBackground)
                })
            })
            document.querySelector('.save').addEventListener('click', () => {
                if (attrBackground) {
                    for (let i = 1; i <= 9; i++) {
                        document.querySelector('.main').classList.remove('background' + i)
                    }
                    document.querySelector('.main').classList.add(attrBackground)
                    localStorage.setItem('background', attrBackground)
                }
               
            })
            addEventListenerFun()
        })
}

function changeCardAndData() {
    
    modalContent.innerHTML = '';
    modalContent.innerHTML = `
        <div class="modal__close" data-close>&times;</div>
        <img src="../img/main/logo/imgLogo1.png" alt="" class="changesDataBoxImg logoImg">
        <h1 class="myName">${jsonSign.name}</h1>
        <button class="changesDataBoxButton"><a href="../account/account.html">Змінити дані</a></button>
        <button class="changeStyle">Змінити стилі</button>
    `
    const modalCloseBtn = document.querySelector('[data-close]');
    modalCloseBtn.addEventListener('click', closeModal);
}


