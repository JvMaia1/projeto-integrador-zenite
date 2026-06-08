'use strict';

emailjs.init("hxaCp62qDiCWIC2WK");

/* ------------------- FAQ ACCORDION ------------------- */
const faqCards = document.querySelectorAll(".faq .card");

faqCards.forEach((card) => {
    const h3 = card.querySelector("h3");
    const p = card.querySelector("p");

    if (!h3 || !p) return;

    h3.setAttribute("tabindex", "0");
    h3.setAttribute("role", "button");
    h3.setAttribute("aria-expanded", "false");

    p.style.display = "none";
    h3.classList.add("faq-toggle");

    const toggle = () => {
        const isOpen = p.style.display !== "none";

        p.style.display = isOpen ? "none" : "block";
        h3.setAttribute("aria-expanded", String(!isOpen));
        card.classList.toggle("faq-aberto", !isOpen);
    };

    h3.addEventListener("click", toggle);

    h3.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
    }
    });
});

/* ------------------- FORMULÁRIO ------------------- */
const form = document.getElementById("formContato");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const mensagem = document.getElementById("mensagem");
const botaoEnviar = document.getElementById("enviar");

const statusMensagem = document.createElement("span");
statusMensagem.id = "statusMensagem";
statusMensagem.className = "mensagem-status";
botaoEnviar.insertAdjacentElement("afterend", statusMensagem);

const spinnerEnvio = document.createElement("span");
spinnerEnvio.id = "spinnerEnvio";
spinnerEnvio.className = "spinner-envio";
botaoEnviar.insertAdjacentElement("afterend", spinnerEnvio);

/* ------------------- STATUS DO ENVIO ------------------- */
function mostrarStatus(estado, texto = "") {
    spinnerEnvio.classList.remove("ativo");
    statusMensagem.classList.remove("sucesso", "erro", "ativo");
    statusMensagem.textContent = "";

    if (estado === "enviando") {
        spinnerEnvio.classList.add("ativo");
        return;
    }

    if (estado === "sucesso" || estado === "erro") {
        statusMensagem.textContent = texto;
        statusMensagem.classList.add(estado, "ativo");
    }
}

function ocultarStatus() {
    spinnerEnvio.classList.remove("ativo");
    statusMensagem.classList.remove("sucesso", "erro", "ativo");
    statusMensagem.textContent = "";
}

/* ------------------- MÁSCARA DE TELEFONE ------------------- */
telefone.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");

    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    e.target.value = valor.substring(0, 15);
});

/* ------------------- ERROS ------------------- */
function limparErro(campo) {
    campo.classList.remove("error", "erro");

    const proximoElemento = campo.nextElementSibling;

    if (proximoElemento && proximoElemento.classList.contains("mensagem-erro")) {
        proximoElemento.remove();
    }
}

function mostrarErro(campo, mensagemErro) {
    limparErro(campo);

    campo.classList.add("error");

    const span = document.createElement("span");
    span.className = "mensagem-erro";
    span.textContent = mensagemErro;

    campo.insertAdjacentElement("afterend", span);
}

/* ------------------- VALIDAÇÕES ------------------- */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

function validarNome() {
    const valor = nome.value.trim();

    if (valor.length < 3) {
        mostrarErro(nome, "Informe um nome válido.");
        return false;
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(valor)) {
    mostrarErro(nome, "O nome deve conter apenas letras.");
    return false;
    }

    limparErro(nome);
    return true;
}

function validarEmailCampo() {
    const valor = email.value.trim();

    if (valor.length === 0) {
        limparErro(email);
        return false;
    }

    if (!validarEmail(valor)) {
        mostrarErro(email, "Informe um e-mail válido.");
        return false;
    }

    limparErro(email);
    return true;
}

function validarTelefone() {
    const numeros = telefone.value.replace(/\D/g, "");

    if (numeros.length === 0) {
        limparErro(telefone);
        return false;
    }

    if (numeros.length !== 11) {
        mostrarErro(telefone, "Informe um telefone com DDD válido.");
        return false;
    }

    limparErro(telefone);
    return true;
}

function validarMensagem() {
    const valor = mensagem.value.trim();

    if (valor.length === 0) {
        limparErro(mensagem);
        return false;
    }

    if (valor.length < 10) {
        mostrarErro(mensagem, "A mensagem deve possuir pelo menos 10 caracteres.");
        return false;
    }

    limparErro(mensagem);
    return true;
}

/* ------------------- VALIDAÇÃO EM TEMPO REAL ------------------- */
nome.addEventListener("blur", validarNome);
email.addEventListener("blur", validarEmailCampo);
telefone.addEventListener("blur", validarTelefone);
mensagem.addEventListener("blur", validarMensagem);

/* ------------------- SUBMIT ------------------- */
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nomeValido = validarNome();
    const emailValido = validarEmailCampo();
    const telefoneValido = validarTelefone();
    const mensagemValida = validarMensagem();

    if (!nomeValido) mostrarErro(nome, "Informe um nome válido.");
    if (!emailValido) mostrarErro(email, "Informe um e-mail válido.");
    if (!telefoneValido) mostrarErro(telefone, "Informe um telefone com DDD válido.");
    if (!mensagemValida) mostrarErro(mensagem, "A mensagem deve possuir pelo menos 10 caracteres.");

    const formularioValido = nomeValido && emailValido && telefoneValido && mensagemValida;

    if (!formularioValido) return;

    mostrarStatus("enviando");
    botaoEnviar.disabled = true;

    try {
        await emailjs.sendForm("service_p0giqqh", "template_ffrup4a", form);
        mostrarStatus("sucesso", "E-mail enviado com sucesso!");
        form.reset();
        console.log("E-mail enviado com sucesso!");
    } catch (erro) {
        console.error("Erro ao enviar:", erro);
        mostrarStatus("erro", "Erro ao enviar. Tente novamente!");
    } finally {
        setTimeout(() => {botaoEnviar.disabled = false; ocultarStatus();}, 3000);
    }
});
