const email = document.querySelector('#emailInp');

const box_left = document.querySelector('.box_left');
const send = document.querySelector('.send');
const pinkodNumber = document.querySelector('.pinkodNumber');
const message = document.querySelector('.message');


send.addEventListener('click', (event) => {
    event.preventDefault();
    if (email.value) {
        box_left.innerHTML = ''
        box_left.innerHTML += `
            <h1 class="codeText">введіть код який прийшов</h1>
            <div class="code_box">
                <input type="text" class="code" maxlength="1" minlength="1">
                <input type="text" class="code" maxlength="1" minlength="1">
                <input type="text" class="code" maxlength="1" minlength="1">
                <input type="text" class="code" maxlength="1" minlength="1">
            </div>
            <button class="confirm">Підтвердити</button>
            <div class="stage_box">
                <div class="stage active"><p>1</p></div>
                <div class="stage active"><p>2</p></div>
                <div class="stage"><p>3</p></div>
            </div>
        `
        let pincod = []
        for (let i = 0; i < 4; i++) {
            let randomNumber = Math.floor(Math.random()*9)
            pincod.push(randomNumber)
        }
        pinkodNumber.textContent = pincod.join('')
        getMessage()
        const codes  = document.querySelectorAll('.code');
        document.querySelector('.confirm').addEventListener('click', () => {
           for (let i = 0; i < codes.length; i++) {
                if (!codes[i].value || typeof(+codes[i]) !== "number") {
                    console.log('помивка');
                    
                    return
                }
           }

            let userPincod = []
            
            codes.forEach(item => {
                userPincod.push(+item.value)
            })
            console.log(userPincod);
            if (pincod.join('') === userPincod.join('')) {
                message.classList.remove('animationMessageStart')
                 box_left.innerHTML = ''
                 box_left.innerHTML = `
                       <div class="box_pasworld">
                    <div class="box_pasworld_content">
                        <p class="name">введіть ім’я</p>
                        <input type="text" id="nameInp">
                    </div>
                    <div class="box_pasworld_content">
                        <p class="surname">введіть прізвище</p>
                        <input type="text" id="surnameInp">
                    </div>
                    <div class="box_pasworld_content">
                        <p class="password">введіть пароль</p>
                        <input type="text" id="passwordInp1">
                    </div>
                    <div class="box_pasworld_content">
                        <p class="repeatPassword">повторіть пароль</p>
                        <input type="text" id="passwordInp2">
                    </div>
                </div>

                 <button class="confirm2" id="registrationBtn">Підтвердити</button>
                 <div class="stage_box">
                    <div class="stage active"><p>1</p></div>
                    <div class="stage active"><p>2</p></div>
                    <div class="stage active"><p>3</p></div>
                </div>
                `
                
                const name = document.querySelector('#nameInp');
                const surname = document.querySelector('#surnameInp');
                const password1 = document.querySelector('#passwordInp1');
                const password2 = document.querySelector('#passwordInp2');
                const registrationBtn = document.querySelector('#registrationBtn');
                registrationBtn.addEventListener('click', () =>{
                    if (email.value && name.value && password1.value && password2.value) {
                        if(password1.value === password2.value){
                            
                            const user = {
                                email: email.value,
                                name: name.value,
                                surname:surname.value,
                                password: password1.value
                            }
                            localStorage.setItem('user', JSON.stringify(user))
                            // alert('Registration successfull')
                            window.location.href = '../login/login.html'
                        } else{
                            alert('Passwords don`t match')
                        }
                    } else {
                        alert('Запомніть всі поля')
                    }
                })
            }
           
           
           
           
    
            
        })
    } else {
        alert('Введіть елктронну пошту ')
    }


})




function getMessage() {
    message.classList.add('animationMessageStart')
    setTimeout(() => {
        message.classList.remove('animationMessageStart')
    }, 500000);
}