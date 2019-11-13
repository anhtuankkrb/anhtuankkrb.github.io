
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav')
const iconAccount = document.querySelector('.repo-account');
const account = document.querySelector('.account')


burger.addEventListener('click',function(){
    nav.classList.toggle("toggle");
    burger.classList.toggle("x");
    account.classList.remove("toggle-account");
});

iconAccount.addEventListener('click',function(){
    account.classList.toggle("toggle-account");
    nav.classList.remove("toggle");
    burger.classList.remove("x");
});