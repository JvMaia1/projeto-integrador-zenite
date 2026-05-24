'use strict'

const heroVideo = document.getElementsByTagName("video")[0];
const titulo = document.querySelector('#titulo');
const tituloNav = document.querySelector('#titulo-nav');
const ancoraComoFunciona = document.querySelector('#ancora-como-funciona');
const botaoRolagem = document.querySelector('#botao-rolar');
heroVideo.playbackRate = 0.75;
console.log(botaoRolagem);

const tituloResponsivo = new IntersectionObserver (([entry]) => {
    if (entry.isIntersecting){
        tituloNav.classList.remove('visivel');
    } else tituloNav.classList.add('visivel');
    {
        threshold: 0;
    }
});

// const rolagemDinamica = new IntersectionObserver(([entry]) => {
//     if (entry.isIntersecting){    
//         botaoRolagem.href = 
//     }
// }
// );

tituloResponsivo.observe(titulo)
