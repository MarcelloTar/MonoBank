const email = document.querySelector('#emailInp');
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