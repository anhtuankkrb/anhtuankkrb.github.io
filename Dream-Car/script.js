let navSlide = () => {
    let burger = document.querySelector('.burger');
    let nav = document.querySelector('.link');
    let navLinks = document.querySelectorAll('.link li');
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation = '';
            }else{ 
                link.style.animation = `linkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    

}
navSlide();
