
const send = document.querySelector('#send');
const bigBoxInput = document.querySelector('.bigBoxInput');

const userlocal = localStorage.getItem('user')
const jsonSign = JSON.parse(userlocal)
function input() {
    bigBoxInput.innerHTML = `
    <div class="smallBoxInput">
        <p>поміняти ім’я</p>
        <input type="text" id="nameInp" placeholder="${jsonSign.name}">
    </div>
    <div class="smallBoxInput">
        <p>поміняти прізвище</p>
        <input type="text" id="surnameInp" placeholder="${jsonSign.surname}">
    </div>
    <div class="smallBoxInput">
        <p>поміняти email</p>
        <input type="email" id="emailInp" placeholder="${jsonSign.email}">
    </div>
    <div class="smallBoxInput">
        <p>поміняти пароль</p>
        <input type="password" id="passwordInp" placeholder="${jsonSign.password}">
    </div>
    `
}
input()

send.addEventListener('click', function(){
    const name = document.querySelector('#nameInp');
    const surname = document.querySelector('#surnameInp');
    const email = document.querySelector('#emailInp');
    const passwordInp = document.querySelector('#passwordInp');
    const user = {
        email: email.value ? email.value : jsonSign.email,
        name: name.value ? name.value : jsonSign.name,
        surname:surname.value ? surname.value : jsonSign.surname,
        password: passwordInp.value ? passwordInp.value : jsonSign.password
    }
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(user))
})
