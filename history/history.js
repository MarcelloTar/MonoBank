let objectHistory = JSON.parse(localStorage.getItem('historyCard'))


let objectToMassif = Object.keys(objectHistory)
console.log(objectToMassif.length, objectToMassif);

if (objectToMassif.length >= 13) {
    document.querySelector('.wrap').classList.add('bigwrap')
}
let massifs = Object.entries(objectHistory)

const boxInfoContent = document.querySelector('.boxInfoContent');
// console.log(macivs);

massifs.forEach((massif) =>{
    if (massif[1].operationType === 'Received credits') {
        boxInfoContent.innerHTML += `
         <div class="box">
            <div class="boxImgText">
                <img src="../img/history/plusImg.png" alt="">
                <p class="money">+${massif[1].credits}</p>
            </div>
            <p class="text">Депозит</p>
            <p class="date">${massif[1].operationTime}</p>
         </div>`   
    } else if(massif[1].operationType === 'Withdrawn of credits'){
        boxInfoContent.innerHTML += `
         <div class="box">
            <div class="boxImgText">
                <img src="../img/history/plusImg.png" alt="">
                <p class="money">+${massif[1].credits}</p>
            </div>
            <p class="text">Знято</p>
            <p class="date">${massif[1].operationTime}</p>
         </div>`   
    } else if(massif[1].operationType === 'Transaction limit changed'){
        boxInfoContent.innerHTML += `
         <div class="box">
            <div class="boxImgText">
                <img src="../img/history/plusImg.png" alt="">
                <p class="money">+${massif[1].credits}</p>
            </div>
            <p class="text">Зміна ліміту</p>
            <p class="date">${massif[1].operationTime}</p>
         </div>`   
    }
})
