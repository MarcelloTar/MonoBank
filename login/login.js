const email = document.querySelector('#loginInp');
const password = document.querySelector('#passwordInp');
const signIn = document.querySelector('#send');
const user = localStorage.getItem('user')
const jsonSign = JSON.parse(user)
console.log(jsonSign);

signIn.addEventListener('click', () =>{
    if (email.value && password.value) {
        if(jsonSign.email === email.value && jsonSign.password === password.value){
            // alert('ви правильно ввели пароль і логін')
            window.location.href = '../main/main.html'
        }
    } else {
        
    }
})