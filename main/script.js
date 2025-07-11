const jsonSign = JSON.parse(localStorage.getItem('user'));
let cardsJson = localStorage.getItem('info') ? JSON.parse(localStorage.getItem('info')) : null;
const info = {
    cards: [
        {
            balance: cardsJson ? cardsJson.cards[0].balance : 0,
            transactionLimit: cardsJson ? cardsJson.cards[0].transactionLimit : 100,
            historyLogs: cardsJson ? cardsJson.cards[0].historyLogs : [],
            numberCard: cardsJson ? cardsJson.cards[0].numberCard : [],
            styleCard: cardsJson ? cardsJson.cards[0].styleCard : 'styleCard'
        },
        {
            balance: cardsJson ? cardsJson.cards[1].balance : 0,
            transactionLimit: cardsJson ? cardsJson.cards[1].transactionLimit : 100,
            historyLogs: cardsJson ? cardsJson.cards[1].historyLogs : [],
            numberCard: cardsJson ? cardsJson.cards[1].numberCard : [],
            styleCard: cardsJson ? cardsJson.cards[1].styleCard : 'styleCard1'
        },
        {
            balance: cardsJson ? cardsJson.cards[2].balance : 0,
            transactionLimit: cardsJson ? cardsJson.cards[2].transactionLimit : 100,
            historyLogs: cardsJson ? cardsJson.cards[2].historyLogs : [],
            numberCard: cardsJson ? cardsJson.cards[2].numberCard : [],
            styleCard: cardsJson ? cardsJson.cards[2].styleCard : 'styleCard2'
        }
    ],
    pageCard: cardsJson ? cardsJson.pageCard : 0,
    background: cardsJson ? cardsJson.background : 'background1',
    logo: cardsJson ? cardsJson.logo : 'imgLogo1',
    topic: cardsJson ? cardsJson.topic : 'light'
}



if (!!cardsJson == false) {
    for (let i = 0; i < 3; i++) { 
        for (let j = 0; j < 16; j++) {
            
            let randomNumber = Math.floor(Math.random()*9)
            if (j == 3 || j == 7 || j == 11) {
                info.cards[i].numberCard.push(randomNumber + ' ')
            } else {
                info.cards[i].numberCard.push(randomNumber)
            }   
        }
    }
}
console.log(info.cards);

function UserCard(card){
 
    this._balance = cardsJson ? cardsJson.cards[card].balance : 0;
    this._transactionLimit = cardsJson ? cardsJson.cards[card].transactionLimit : 100;
    this._historyLogs = cardsJson ? cardsJson.cards[card].historyLogs : [];
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
 
    this.putCredits = (amount) => { 
        this._balance += Math.round(amount);
        logOperation("Received credits", amount)
        console.log(this._historyLogs);
        info.cards[card].balance = this._balance
        info.cards[card].historyLogs = this._historyLogs
        localStorage.setItem('info', JSON.stringify(info))
        return this._balance;
    }
 
    this.takeCredits = (amount) =>{
        if (this._balance <= amount) {
            messageText.textContent = 'У вас стількі грошей нема'
            getMessage()
            return
        }
        if (this._transactionLimit <= amount) {
            messageText.textContent = 'Ви перевищили ліміт'
            getMessage()
            return
        }
        this._balance -= Math.round(amount);
        logOperation('Withdrawn of credits', amount)
        info.cards[card].balance = this._balance
        info.cards[card].historyLogs = this._historyLogs
        localStorage.setItem('info', JSON.stringify(info))
        return this._balance;
    }
    this.setTransactionLimit = (amount) => {
            this._transactionLimit = Math.round(amount);
            logOperation("Transaction limit changed", amount)
            info.cards[card].transactionLimit = this._transactionLimit
            info.cards[card].historyLogs = this._historyLogs
            localStorage.setItem('info', JSON.stringify(info))
    }
    this.transferCredits = (amount) => {
        const tax = amount * 0.005; 
        const totalAmount = amount + tax;
        if(totalAmount > this._balance){
            messageText.textContent = 'У вас стількі грошей нема'
            getMessage()
            return
        }
 
        if( totalAmount > this._transactionLimit){
            messageText.textContent = 'Ви перевищили ліміт'
            getMessage()
            return
        }
 
       this._balance -= amount;
        // this.putCredits(totalAmount)
 
        // card.putCredits(amount);
 
        logOperation("Withdrawn of credits", amount)
        info.cards[card].balance = this._balance
        info.cards[card].historyLogs = this._historyLogs
        localStorage.setItem('info', JSON.stringify(info))
        return Math.ceil(totalAmount)
 
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

let user = new UserCard(0)
let attrCard
let attrlogo
let attrBackground

const imgName = document.querySelector('.box_imgName');
const backgroundBlocks = document.querySelectorAll('.backgroundBlock');

const buttons = document.querySelectorAll('button');
const message = document.querySelector('.message');
const messageText = document.querySelector('.messageText');
const money = document.querySelector('.money');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modalContent');
const deposite = document.querySelector('#deposite');
const breeding = document.querySelector('#breeding');
const changeLimit = document.querySelector('#ChangeLimit');
const changeCard = document.querySelector('#changeCard');
const myName = document.querySelectorAll('.myName');
const logoImg = document.querySelectorAll('.logoImg')
const numberCard = document.querySelector('#numberCard');
const cardBox = document.querySelector('.cardBox');
myName[0].textContent = jsonSign.name
logoImg[0].src = `../img/main/logo/${info.logo}.png`
cardBox.style.background = `url('../img/main/cards/${info.cards[0].styleCard}.png') no-repeat`
cardBox.style.backgroundSize = `cover`


numberCard.textContent = info.cards[0].numberCard.join('')

if (info.topic == 'dark') {
    whiteOrBlack('add')
}
   
document.querySelector('.main').classList.add(info.background)

money.textContent = user.getBalance()

deposite.addEventListener('click', function(){
    let depositeText = ` <div class="modal__close ${info.topic === 'dark' ? 'whiteColor' : ''}" data-close>&times;</div> <h1>Поповнити баланс</h1> <input type="number" class="input"> <button class="buttonEvent ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Підтвердити</button>`
    textModal(depositeText)

    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        if (+input.value >= 0) {
            user.putCredits(+input.value)
            money.textContent = user.getBalance()
            getMessage() 
        } else {
            messageText.textContent = "Ви ввели від'ємне число"
            getMessage() 
        }
          
       
    })
})

breeding.addEventListener('click', function () {
    let breedingText =  `<div class="modal__close ${info.topic === 'dark' ? 'whiteColor' : ''}" data-close>&times;</div> <h1>Вивести</h1> <p class="limit ${info.topic === 'dark' ? 'limitBlack' : ''}">Ваш ліміт: <span>${user.getTransactionLimit()}</span></p> <input type="number" class="input"> <button class="buttonEvent ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Підтвердити</button>`
    textModal(breedingText)
    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        if (+input.value >= 0) {
            user.takeCredits(+input.value)
            money.textContent = user.getBalance()
            getMessage()
        } else {
            messageText.textContent = "Ви ввели від'ємне число"
            getMessage() 
        }
    })
    
})

changeLimit.addEventListener('click', function () {
    let changeLimitText =  `<div class="modal__close ${info.topic === 'dark' ? 'whiteColor' : ''}" data-close>&times;</div> <h1>Змінити ліміт</h1> <p class="limit ${info.topic === 'dark' ? 'limitBlack' : ''}">Поточний ліміт: <span>${user.getTransactionLimit()}</span></p> <input type="number" class="input"> <button class="buttonEvent ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Підтвердити</button>`
    textModal(changeLimitText)
    const input = document.querySelector('.input');
    document.querySelector('.buttonEvent').addEventListener('click', function(){
        if (+input.value >= 0) {
            messageText.textContent = 'Ліміт змінено'
            getMessage()
            user.setTransactionLimit(+input.value)
        } else {
            messageText.textContent = "Ви ввели від'ємне число"
            getMessage() 
        }
    })
})

changeCard.addEventListener('click', () => {
    let changeCardText = `
    <div class="modalchangeCard">
        <div class="card">
            <img src="../img/main/cards/${info.cards[0].styleCard}.png" alt="">
        </div>
        <div class="card">
            <img src="../img/main/cards/${info.cards[1].styleCard}.png" alt="">
        </div>
        <div class="card">
            <img src="../img/main/cards/${info.cards[2].styleCard}.png" alt="">
        </div>
    </div>
    <div class="modal__close ${info.topic === 'dark' ? 'whiteColor' : ''}" data-close>&times;</div>   
    <button class="buttonEvent ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Підтвердити</button>
    `
    let cardNum
    textModal(changeCardText)
    modalContent.classList.add('modalchangeCardBox')
    const card = document.querySelectorAll('.card');
    card.forEach((item, index) => {
        item.addEventListener('click', () => {
            cardNum = index
            for (let i = 0; i < card.length; i++) {
                document.querySelectorAll('.card img')[i].classList.remove('activCard')
            }
            document.querySelectorAll('.card img')[index].classList.add('activCard')
            
        })
    })

    document.querySelector('.buttonEvent').addEventListener('click', function(){
        user = new UserCard(cardNum)
        money.textContent = user.getBalance()
        numberCard.textContent = info.cards[cardNum].numberCard.join('')
        cardBox.style.background = `url('../img/main/cards/${info.cards[cardNum].styleCard}.png') no-repeat`
        cardBox.style.backgroundSize = 'cover'
        console.log(info.cards[cardNum].styleCard);
        
        info.pageCard = cardNum
        localStorage.setItem('info', JSON.stringify(info))
    })



})

document.querySelector('#fundsTransfer').addEventListener('click', () => { 
    textModal(`
        <div class="modal__close ${info.topic === 'dark' ? 'whiteColor' : ''}" data-close>&times;</div>
        <h1>Переславати кошти</h1>
        <p class="limit ${info.topic === 'dark' ? 'limitBlack' : ''}">Ваш ліміт: ${user.getTransactionLimit()}</p>
        <div class="fundsTransferContent">
                    <div class="fundsTransferContentLeft">
                        <p class="whatCardText"></p>
                        <input type="number" name="" id="inputNumber">
                    </div>

                    <div class="fundsTransferContentRight">
                        <select name="" id="selectCard" class="select ${info.topic === 'dark' ? 'selectBlack' : ''}">
                        </select>
                        <p class='NumberText'>0</p>
                    </div>
            </div>
            <button class="buttonEvent ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Підтвердити</button>`)
    whatCard()
    
    const inputNumber = document.querySelector('#inputNumber');
    inputNumber.addEventListener('input', () => {
        // number = user.transferCredits(+inputNumber.value)
        document.querySelector('.NumberText').textContent = Math.ceil(+inputNumber.value + (+inputNumber.value * 0.005))
    })
    const select = document.querySelector('#selectCard');
    let selectCard = select.value
    select.addEventListener('change', () => {
        selectCard = select.value
    })
    document.querySelector('.buttonEvent').addEventListener('click', () => {
        if (+inputNumber.value >= 0) {
            let moneyNumber = user.transferCredits(+inputNumber.value)
            if (moneyNumber !== undefined) {
                console.log(moneyNumber);
                money.textContent = user.getBalance()
                console.log(user.getBalance());
                let expiredСard = user.getCard()
                user = new UserCard(+selectCard)
                user.putCredits(moneyNumber)
                user = new UserCard(expiredСard)
                getMessage() 
            }
        } else {
            messageText.textContent = "Ви ввели від'ємне число"
            getMessage() 
        }
    })

})

imgName.addEventListener('click', () => {
   styleFun()
})

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


function whatCard() {
        document.querySelector('.whatCardText').textContent = 'card' + (+user.getCard() + 1)
        let select = document.querySelector('#selectCard')

        if (user.getCard() == 2) {
            select.innerHTML = `
                <option value="1">card2</option>
                <option value="0">card1</option>
            `
        } else if(user.getCard() == 1) {
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
}

function getMessage() {
    message.classList.add('animationMessageStart')
    setTimeout(() => {
        message.classList.remove('animationMessageStart')
        messageText.textContent = 'Транзакція прийшла успішно'
    }, 3000);
}

function textModal(text) {
    modalContent.classList.remove('modalchangeCardBox')
    modal.classList.remove('none');
    document.body.style.overflow = 'hidden'
    modalContent.innerHTML = ''
    modalContent.innerHTML = text
    const modalCloseBtn = document.querySelector('[data-close]');
    modalCloseBtn.addEventListener('click', closeModal);
}

function whiteOrBlack(methodClass) {
    backgroundBlocks.forEach((backgroundBlock) =>{
        backgroundBlock.classList[methodClass]('blackhon')
    })
    document.querySelector('.history').classList[methodClass]('blackhonbutton')
    buttons.forEach((button) =>{ 
        button.classList[methodClass]('blackhonbutton')
    })
    modalContent.classList[methodClass]('blackhon')
    document.querySelectorAll('.buttonModal').forEach(button => {
        button.classList[methodClass]('blackhonbutton')
        
    })
    const iconButtons = document.querySelectorAll('.iconButton');
    if(iconButtons) {
        iconButtons.forEach(iconButton => {
            iconButton.classList[methodClass]('filterImgBlack')
        })
    }
    const back = document.querySelector('.back');
    if (back) {
        back.classList[methodClass]('whiteColor')
    }
    message.classList[methodClass]('messageBlack')
    document.querySelectorAll('.iconChange').forEach(item => {
        item.classList[methodClass]('filterImgBlack')
    })
}

function addEventListenerFun() {
    document.querySelector('.iconCardButton').addEventListener('click', () => {      
        modalContent.innerHTML = ''
        modalContent.innerHTML = `
            <div class="back ${info.topic === 'dark' ? 'whiteColor' : ''}" data-back>&larr;</div>
            <img src="../img/main/cards/styleCard.png" alt="" class="cardImg"> 
            <div class="changeStyleModalButton">
                <img src="../img/main/icons/iconCardButton.svg" alt="" class="iconCardButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconLogoButton.svg" alt="" class="iconLogoButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconBackroundButton.svg" alt="" class="iconBackroundButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconBackroundButton2.svg" alt="" class="iconBackroundButton2 ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
            </div>
            <div class="boxstyleCard">
                <img src="../img/main/cards/styleCard.png" alt="" data-cards="styleCard" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard1.png" alt="" data-cards="styleCard1" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard2.png" alt="" data-cards="styleCard2" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard3.png" alt="" data-cards="styleCard3" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard4.png" alt="" data-cards="styleCard4" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard5.png" alt="" data-cards="styleCard5" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard6.png" alt="" data-cards="styleCard6" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard7.png" alt="" data-cards="styleCard7" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard8.png" alt="" data-cards="styleCard8" class="boxstyleCardImg">
            </div>
            <button class="save ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Зберегти</button>
        `
        attrFunAndsaveFun((item) => {
                    attrCard = item.getAttribute('data-cards');
                    document.querySelector('.cardImg').src = `/img/main/cards/${attrCard}.png`;
                     
                }, 
                '[data-cards]',
                () => {
                    cardBox.style.background = `url('/img/main/cards/${attrCard}.png') no-repeat`
                    cardBox.style.backgroundSize = `cover`
                    info.cards[user.getCard()].styleCard = attrCard
                    localStorage.setItem('info', JSON.stringify(info))
                }
        )
        back()
        addEventListenerFun()
    })
    document.querySelector('.iconLogoButton').addEventListener('click', () => {
        modalContent.innerHTML = ''
        modalContent.innerHTML = `
            <div class="back ${info.topic === 'dark' ? 'whiteColor' : ''}" data-back>&larr;</div>
            <img src="../img/main/logo/imgLogo1.png" alt="" class="modalLogoImg"> 
            <div class="changeStyleModalButton">
                <img src="../img/main/icons/iconCardButton.svg" alt="" class="iconCardButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconLogoButton.svg" alt="" class="iconLogoButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconBackroundButton.svg" alt="" class="iconBackroundButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconBackroundButton2.svg" alt="" class="iconBackroundButton2 ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
            </div>
            <div class="boxstylelogo">
                <img src="../img/main/logo/imgLogo1.png" alt="" data-logoImg="imgLogo1" class="boxStyleLogoImg">
                <img src="../img/main/logo/imgLogo2.png" alt="" data-logoImg="imgLogo2" class="boxStyleLogoImg">
                <img src="../img/main/logo/imgLogo3.png" alt="" data-logoImg="imgLogo3" class="boxStyleLogoImg">
                <img src="../img/main/logo/imgLogo4.png" alt="" data-logoImg="imgLogo4" class="boxStyleLogoImg">
                <img src="../img/main/logo/imgLogo5.png" alt="" data-logoImg="imgLogo5" class="boxStyleLogoImg">
                <img src="../img/main/logo/imgLogo6.png" alt="" data-logoImg="imgLogo6" class="boxStyleLogoImg">
                <img src="../img/main/logo/imgLogo7.png" alt="" data-logoImg="imgLogo7" class="boxStyleLogoImg">
                <img src="../img/main/logo/imgLogo8.png" alt="" data-logoImg="imgLogo8" class="boxStyleLogoImg">
                <img src="../img/main/logo/imgLogo9.png" alt="" data-logoImg="imgLogo9" class="boxStyleLogoImg">
            </div>
            <button class="save ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Зберегти</button>
        `
            attrFunAndsaveFun((item) => {
                    attrlogo = item.getAttribute('data-logoImg'); 
                    document.querySelector('.modalLogoImg').src = `/img/main/logo/${attrlogo}.png`; 
                }, 
                '[data-logoImg]',
                () => {
                    logoImg[0].src = `/img/main/logo/${attrlogo}.png`
                    info.logo = attrlogo
                    localStorage.setItem('info', JSON.stringify(info))
                }
            )
        back()
        addEventListenerFun()
    })
    document.querySelector('.iconBackroundButton').addEventListener('click', () => {
        modalContent.innerHTML = ''
        modalContent.innerHTML = `
            <div class="back ${info.topic === 'dark' ? 'whiteColor' : ''}" data-back>&larr;</div>
            <div class="lookBackground"></div>
            <div class="changeStyleModalButton">
                <img src="../img/main/icons/iconCardButton.svg" alt="" class="iconCardButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconLogoButton.svg" alt="" class="iconLogoButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconBackroundButton.svg" alt="" class="iconBackroundButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconBackroundButton2.svg" alt="" class="iconBackroundButton2 ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
            </div>
            <div class="boxstyleBackground">
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
            <button class="save ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Зберегти</button>
        `
        attrFunAndsaveFun((item) => {
                attrBackground = item.getAttribute('data-background')
                let lookBackground = document.querySelector('.lookBackground')
                for (let i = 1; i <= 9; i++) {
                    lookBackground.classList.remove('background' + i)
                }
                lookBackground.classList.add(attrBackground)   
            }, 
            '[data-background]',
            () => {
                for (let i = 1; i <= 9; i++) {
                    document.querySelector('.main').classList.remove('background' + i)
                }
                document.querySelector('.main').classList.add(attrBackground)
                info.background = attrBackground
                localStorage.setItem('info', JSON.stringify(info))
            }

        )
        back()
        addEventListenerFun()
    })
    document.querySelector('.iconBackroundButton2').addEventListener('click', () => {
        modalContent.innerHTML = ''
        modalContent.innerHTML = `
            <div class="back ${info.topic === 'dark' ? 'whiteColor' : ''}" data-back>&larr;</div>
            <div class="changeStyleModalButton">
                <img src="../img/main/icons/iconCardButton.svg" alt="" class="iconCardButton iconButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconLogoButton.svg" alt="" class="iconLogoButton iconButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconBackroundButton.svg" alt="" class="iconBackroundButton iconButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconBackroundButton2.svg" alt="" class="iconBackroundButton2 iconButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
            </div>
            <div class="boxstyleBackground2">
                <div class="background black"></div>
                <div class="background white"></div>
            </div>
        `
        const white = document.querySelector('.white');
        const black = document.querySelector('.black');
        black.addEventListener('click', () =>{
            whiteOrBlack('add')
            info.topic = 'dark'
            console.log(info);
            
            localStorage.setItem('info', JSON.stringify(info))
        })
        white.addEventListener('click', () =>{
            whiteOrBlack('remove')
            info.topic = 'light'
            console.log(info);
            
            localStorage.setItem('info', JSON.stringify(info))
        })
        back()
        addEventListenerFun()
    })
    
}

function back() {
    document.querySelector('[data-back]').addEventListener('click', () => {
        styleFun()
    })
}
//  <button class="changesDataBoxButton ${info.topic === 'dark' ? 'blackhonbutton' : ''}"><a href="../account/account.html" class="${info.topic === 'dark' ? 'blackhonbutton' : ''}">Змінити дані</a></button>
function styleFun() {
     textModal( `
                <div class="modal__close ${info.topic === 'dark' ? 'whiteColor' : ''}" data-close>&times;</div>
                <img src="../img/main/logo/${info.logo}.png" alt="" class="changesDataBoxImg logoImg">
                <h1 class="myName">${jsonSign.name}</h1>
                <a href="../account/account.html" class="changesDataBoxButton ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Змінити дані</a>
                <button class="changeStyle ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Змінити стилі</button>
    `)
          
    const changeStyle = document.querySelector('.changeStyle');
    changeStyle.addEventListener('click', () => {
        modalContent.innerHTML = ''
        modalContent.innerHTML = `
            <div class="back ${info.topic === 'dark' ? 'whiteColor' : ''}" data-back>&larr;</div>
            <img src="../img/main/cards/styleCard.png" alt="" class="cardImg"> 
            <div class="changeStyleModalButton">
                <img src="../img/main/icons/iconCardButton.svg" alt="" class="iconCardButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconLogoButton.svg" alt="" class="iconLogoButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconBackroundButton.svg" alt="" class="iconBackroundButton ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
                <img src="../img/main/icons/iconBackroundButton2.svg" alt="" class="iconBackroundButton2 ${info.topic === 'dark' ? 'filterImgBlack' : ''}">
            </div>
            <div class="boxstyleCard">
                <img src="../img/main/cards/styleCard.png" alt="" data-cards="styleCard" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard1.png" alt="" data-cards="styleCard1" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard2.png" alt="" data-cards="styleCard2" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard3.png" alt="" data-cards="styleCard3" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard4.png" alt="" data-cards="styleCard4" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard5.png" alt="" data-cards="styleCard5" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard6.png" alt="" data-cards="styleCard6" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard7.png" alt="" data-cards="styleCard7" class="boxstyleCardImg">
                <img src="../img/main/cards/styleCard8.png" alt="" data-cards="styleCard8" class="boxstyleCardImg">
            </div>
            <button class="save ${info.topic === 'dark' ? 'blackhonbutton' : ''}">Зберегти</button>
        `
        attrFunAndsaveFun((item) => {
                attrCard = item.getAttribute('data-cards');
                document.querySelector('.cardImg').src = `/img/main/cards/${attrCard}.png`;    
            }, 
            '[data-cards]',
            () => {
                cardBox.style.background = `url('/img/main/cards/${attrCard}.png') no-repeat`
                cardBox.style.backgroundSize = `cover`
                info.cards[user.getCard()].styleCard = attrCard
                localStorage.setItem('info', JSON.stringify(info))
            }
        )
        addEventListenerFun()
        back()
    })
}

function attrFunAndsaveFun(text, attr, text2) {
    document.querySelectorAll(attr).forEach((item) =>{
        item.addEventListener('click', function () {   
            text(item)
        })
    }, { once: false })
    document.querySelector('.save').addEventListener('click', () => {
            text2()  
    }, { once: false })
}

function closeModal() {
    modal.classList.add('none');
    document.body.style.overflow = ''
}

function openModal() {
    modal.classList.remove('none');
}

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) { 
        closeModal();
    }
});