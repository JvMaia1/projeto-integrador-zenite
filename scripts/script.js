'use strict'

const heroVideo = document.getElementsByTagName("video")[0];
const titulo = document.querySelector('#titulo');
const tituloNav = document.querySelector('#titulo-nav');
const ancoraComoFunciona = document.querySelector('#ancora-como-funciona');
const botaoRolagem = document.querySelector('#botao-rolar');
heroVideo.playbackRate = 0.75;
console.log(botaoRolagem);
const footer = document.querySelector('.pronto-para-transformar');

function esmaecerElemento(elementoObservado, elementoAlterado){
    const elementoResponsivo = new IntersectionObserver (([entry]) => {
        if (entry.isIntersecting){
            elementoAlterado.classList.remove('visivel');
        } else  elementoAlterado.classList.add('visivel');
        {
            threshold: 0;
        }
});
elementoResponsivo.observe(elementoObservado)
}

esmaecerElemento(titulo, tituloNav)

esmaecerElemento(footer, botaoRolagem)
