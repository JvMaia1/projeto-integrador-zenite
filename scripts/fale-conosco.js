// =============================================
// FAQ ACCORDION
// =============================================
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


// =============================================
// FORMULÁRIO
// =============================================



    const form = document.getElementById("formContato");

    // if (!form) return;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const mensagem = document.getElementById("mensagem");
    const botaoEnviar = document.getElementById("enviar");

    // =============================================
    // MÁSCARA TELEFONE (SEM BIBLIOTECA)
    // =============================================
    telefone.addEventListener("input", (e) => {
        let valor = e.target.value.replace(/\D/g, "");

        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

        e.target.value = valor.substring(0, 15);
    });

    // =============================================
    // FUNÇÕES DE ERRO
    // =============================================
    function limparErro(campo) {
        campo.classList.remove("erro");

        const proximoElemento = campo.nextElementSibling;

        if (
            proximoElemento &&
            proximoElemento.classList.contains("mensagem-erro")
        ) {
            proximoElemento.remove();
        }
    }

    function mostrarErro(campo, mensagemErro) {
        limparErro(campo);

        campo.classList.add("erro");

        const span = document.createElement("span");
        span.className = "mensagem-erro";
        span.textContent = mensagemErro;

        campo.insertAdjacentElement("afterend", span);
    }

    // =============================================
    // VALIDAÇÕES
    // =============================================
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

        limparErro(nome);
        return true;
    }

    function validarEmailCampo() {
        const valor = email.value.trim();

        if (!validarEmail(valor)) {
            mostrarErro(email, "Informe um e-mail válido.");
            return false;
        }

        limparErro(email);
        return true;
    }

    function validarTelefone() {
        const numeros = telefone.value.replace(/\D/g, "");

        if (numeros.length !== 11) {
            mostrarErro(
                telefone,
                "Informe um telefone com DDD válido."
            );
            return false;
        }

        limparErro(telefone);
        return true;
    }

    function validarMensagem() {
        const valor = mensagem.value.trim();

        if (valor.length < 10) {
            mostrarErro(
                mensagem,
                "A mensagem deve possuir pelo menos 10 caracteres."
            );
            return false;
        }

        limparErro(mensagem);
        return true;
    }

    // =============================================
    // SUBMIT
    // =============================================
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nomeValido = validarNome();
        const emailValido = validarEmailCampo();
        const telefoneValido = validarTelefone();
        const mensagemValida = validarMensagem();

        const formularioValido =
            nomeValido &&
            emailValido &&
            telefoneValido &&
            mensagemValida;

        if (!formularioValido) {
            return;
        }

        // =============================================
        // SUCESSO
        // =============================================
        botaoEnviar.innerHTML = "✓ Enviado";
        botaoEnviar.disabled = true;

        botaoEnviar.style.backgroundColor = "#28a745";
        botaoEnviar.style.color = "#fff";
        botaoEnviar.style.cursor = "not-allowed";
        botaoEnviar.style.opacity = "0.9";

        console.log("Formulário validado com sucesso!");

        // Futuro backend:
        // form.submit();
    });
