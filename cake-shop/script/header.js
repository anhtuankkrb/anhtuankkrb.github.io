$(window).on('load', function(){
    $('body').removeClass('preloading');
    $('.load').delay(500).fadeOut();
});



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

const toTop = document.getElementById('to-top');
$(window).scroll(function(){
    ($(this).scrollTop() > 100) ? $(toTop).fadeIn() : $(toTop).fadeOut();
});

$(toTop).click(function(event){
    event.preventDefault();
    $('html').animate({
        scrollTop: 0 }, 700
        );
});

