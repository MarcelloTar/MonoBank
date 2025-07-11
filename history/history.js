let info = JSON.parse(localStorage.getItem('info'))
console.log(info);

const boxInfoContent = document.querySelector('.boxInfoContent');
const select = document.querySelector('select');

if (info.cards[0].historyLogs.length >= 13) {
    document.querySelector('.wrap').classList.add('bigwrap')
    document.querySelector('.boxInfoContent').classList.add('bigBox')
}
for (let i = 0; i < Object.keys(info.cards[0].historyLogs).length; i++) {
     operationTypeFun(0, i, 'Received credits', '<img src="../img/history/plusImg.png" alt=""></img>', 'Депозит', '+')
     operationTypeFun(0, i, 'Withdrawn of credits', '<img src="../img/history/minusImg33.png" alt="">', 'Знято', '-')
     operationTypeFun(0, i, 'Transaction limit changed', '', 'Зміняно ліміт', '')
}
document.querySelector('.wrap').classList.add(info.background)
if (info.topic === 'dark') {
    document.querySelector('.boxInfo').classList.add('blackhon')
    document.querySelectorAll('.box').forEach(item => {
        item.classList.add('blackBorder')
    })
    select.classList.add('blackSelect')
    document.querySelector('.back').classList.add('whiteColor')
}

select.addEventListener('change', () => {
    let selectValue = select.value 
    boxInfoContent.innerHTML = ''
    for (let i = 0; i < Object.keys(info.cards[selectValue].historyLogs).length; i++) {
        operationTypeFun(selectValue, i, 'Received credits', '<img src="../img/history/plusImg.png" alt=""></img>', 'Депозит', '+')
        operationTypeFun(selectValue, i, 'Withdrawn of credits', '<img src="../img/history/minusImg33.png" alt="">', 'Знято', '-')
        operationTypeFun(selectValue, i, 'Transaction limit changed', '', 'Зміняно ліміт', '')
    }
    if (info.cards[selectValue].historyLogs.length >= 13) {
        document.querySelector('.wrap').classList.add('bigwrap')
        document.querySelector('.boxInfoContent').classList.add('bigBox')
    } else {
        document.querySelector('.wrap').classList.remove('bigwrap')
        document.querySelector('.boxInfoContent').classList.remove('bigBox')
    }
})

function operationTypeFun(numberCard, i, text, img, title, sign, number = 1, text2 = '') {
    if (info.cards[numberCard].historyLogs[i].operationType === text) {
         boxInfoContent.innerHTML += `
          <div class="box">
             <div class="boxImgText">
                 ${img}
                 <p class="money">${sign + info.cards[numberCard].historyLogs[i].credits}</p>
             </div>
             <p class="text">${title}</p>
             <p class="date">${info.cards[numberCard].historyLogs[i].operationTime}</p>
         </div>
        `
        return   
    } /*else if (text2 === 'Withdrawn of credits' && number === 1) {
        operationTypeFun(numberCard, i, 'Withdrawn of credits', '<img src="../img/history/minusImg33.png" alt="">', 'Знято', '-', )
    } else {
        operationTypeFun(numberCard, i, 'Transaction limit changed', '', 'Зміняно ліміт', '')
    }*/

}
