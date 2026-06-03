'use strict'

const heroVideo = document.getElementsByTagName("video")[0];
const titulo = document.querySelector('#titulo');
const botaoRolagem = document.querySelector('#botao-rolar');
heroVideo.playbackRate = 0.75;

function esmaecerElemento(elementoObservado, elementoAlterado){
    const elementoResponsivo = new IntersectionObserver (([entry]) => {
        elementoAlterado.classList.toggle('visivel', entry.isIntersecting);
    },{threshold: 0 });
    elementoResponsivo.observe(elementoObservado)
}


esmaecerElemento(titulo, botaoRolagem)
