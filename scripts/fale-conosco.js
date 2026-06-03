emailjs.init("hxaCp62qDiCWIC2WK");
//aqui chama a funcão de envio do email, que deve ser implementada no email.js

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

const form = document.getElementById("formContato"); // pega o formulário de contato pelo ID


const nome = document.getElementById("nome"); // pega o campo nome
const email = document.getElementById("email"); // pega o campo email
const telefone = document.getElementById("telefone"); // pega o campo telefone
const mensagem = document.getElementById("mensagem"); // pega o campo mensagem
const botaoEnviar = document.getElementById("enviar"); // pega o botão enviar

// aqui sera criado um elemento para aparecer a mensagem apos o spinner
const statusMensagem = document.createElement("span"); // cria uma div para mensagem
statusMensagem.id = "statusMensagem"; // adiciona id a div criada
statusMensagem.className = "mensagem-status"; //adiciona a classe para estilizaçao
botaoEnviar.insertAdjacentElement("afterend", statusMensagem); // aqui a mensagem aparece apos o botao

// aqui sera carregado o spinner quando o usuario clicar no envio do formulario
const spinnerEnvio = document.createElement("span");
spinnerEnvio.id = "spinnerEnvio";
spinnerEnvio.className = "spinner-envio";
botaoEnviar.insertAdjacentElement("afterend", spinnerEnvio);




// função auxiliar para controlar o status
function mostrarStatus(estado, texto = "") {
    // reseta tudo
    spinnerEnvio.classList.remove("ativo");
    statusMensagem.classList.remove("sucesso", "erro", "ativo");
    statusMensagem.textContent = "";

    if (estado === "enviando") {
        spinnerEnvio.classList.add("ativo");      // só spinner, sem texto

    } else if (estado === "sucesso" || estado === "erro") {
        spinnerEnvio.classList.remove("ativo");   // remove spinner
        statusMensagem.textContent = texto;        // exibe texto
        statusMensagem.classList.add(estado, "ativo");
    }
}

function ocultarStatus() {
    spinnerEnvio.classList.remove("ativo");
    statusMensagem.classList.remove("sucesso", "erro", "ativo");
    statusMensagem.textContent = "";
}

// =============================================
// MÁSCARA TELEFONE (SEM BIBLIOTECA)
// =============================================
telefone.addEventListener("input", (e) => { // escuta entradas no campo telefone
    let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2"); // aplica o formato de DDD
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2"); // separa o número com hífen

    e.target.value = valor.substring(0, 15); // limita o texto a 15 caracteres
});

// =============================================
// FUNÇÕES DE ERRO
// =============================================
function limparErro(campo) { // remove erro visual e mensagem associada ao campo
    campo.classList.remove("error", "erro"); // remove classe de erro do campo

    const proximoElemento = campo.nextElementSibling; // pega o próximo elemento no DOM, aqui tambem faz com que os erros não fiquem aparecendo a cada clique do usuario

    if (proximoElemento && proximoElemento.classList.contains("mensagem-erro")) { // se for mensagem de erro
        proximoElemento.remove(); // remove o elemento de erro
    }
}

function mostrarErro(campo, mensagemErro) { // adiciona mensagem de erro ao campo
    limparErro(campo); // remove qualquer erro anterior do campo

    campo.classList.add("error"); // marca o campo como erro

    const span = document.createElement("span"); // cria o elemento da mensagem
    span.className = "mensagem-erro"; // define a classe do span
    span.textContent = mensagemErro; // coloca o texto da mensagem

    campo.insertAdjacentElement("afterend", span); // insere o span logo após o campo
}

// =============================================
// VALIDAÇÕES
// =============================================
function validarEmail(email) { // verifica se o email está no formato correto
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex para validar email
    return regex.test(email); // retorna true se o email for válido
}

function validarNome() { // valida o nome informado
    const valor = nome.value.trim(); // remove espaços antes e depois

    if (valor.length < 3) { // se tiver menos de 3 caracteres apresenta mensagem abaixo
        mostrarErro(nome, "Informe um nome válido."); 
        return false; // indica validação falha
    }
    //se o valor for algo que nao seja texto mostra erro 
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(valor)) { //  bloqueia números e caracteres especiais
        mostrarErro(nome, "O nome deve conter apenas letras.");
        return false;
    }   

    limparErro(nome); // limpa erro anterior se houver
    return true; // indica validação bem-sucedida
}

function validarEmailCampo() { // valida o campo de email do formulário
    const valor = email.value.trim(); // remove espaços em branco

     if (valor.length === 0) { // se o campo estiver vazio, não exibe erro ainda
        limparErro(email);
        return false;
    }

    if (!validarEmail(valor)) { // se o email não for válido
        mostrarErro(email, "Informe um e-mail válido.");   // mostra mensagem de erro
        return false; // indica validação falha
    }

    limparErro(email); // limpa erro anterior
    return true;
}

function validarTelefone() { // valida o telefone informado
    const numeros = telefone.value.replace(/\D/g, ""); // remove tudo que não for número

    if (numeros.length === 0) { // se o campo estiver vazio, não exibe erro ainda
        limparErro(telefone);
        return false;
    }

    if (numeros.length !== 11) { // se não tiver 11 dígitos (DDD + número)
        mostrarErro(telefone, "Informe um telefone com DDD válido."); // mostra mensagem de erro
        return false; // indica validação falha
    }

    limparErro(telefone);// limpa erro anterior
    return true;
}

function validarMensagem() { // valida a mensagem enviada
    const valor = mensagem.value.trim(); // remove espaços antes e depois

    if (valor.length === 0) { // se o campo estiver vazio, não exibe erro ainda
        limparErro(mensagem);
        return false;// indica mensagem válida
    }

    if (valor.length < 10) {// se tiver menos de 10 caracteres
        mostrarErro(mensagem, "A mensagem deve possuir pelo menos 10 caracteres."); // mostra mensagem de erro
        return false; // indica validação falha
    }

    limparErro(mensagem); // limpa erro anterior
    return true;// indica mensagem válida
}
    // =============================================
    // VALIDAÇÕES EM TEMPO REAL
    // =============================================
nome.addEventListener("blur", validarNome); // valida nome enquanto o usuário digita
email.addEventListener("blur", validarEmailCampo); // valida email enquanto o usuário digita
telefone.addEventListener("blur", validarTelefone);// valida telefone enquanto o usuário digita
mensagem.addEventListener("blur", validarMensagem);// valida mensagem enquanto o usuário digita

    // =============================================
    // SUBMIT
    // =============================================
form.addEventListener("submit", async (e) => { // adiciona evento ao enviar o formulário
    e.preventDefault(); // impede o envio padrão da página

    const nomeValido = validarNome(); // valida o campo nome
    const emailValido = validarEmailCampo(); // valida o campo email
    const telefoneValido = validarTelefone(); // valida o campo telefone
    const mensagemValida = validarMensagem(); // valida o campo mensagem

    // força exibição de erro nos campos vazios ao tentar enviar
    if (!nomeValido) mostrarErro(nome, "Informe um nome válido.");
    if (!emailValido) mostrarErro(email, "Informe um e-mail válido.");
    if (!telefoneValido) mostrarErro(telefone, "Informe um telefone com DDD válido.");
    if (!mensagemValida) mostrarErro(mensagem, "A mensagem deve possuir pelo menos 10 caracteres.");

    const formularioValido =
        nomeValido &&
        emailValido &&
        telefoneValido &&
        mensagemValida; // verifica se todos os campos estão válidos

    if (!formularioValido) { // se algum campo estiver inválido
        return; // cancela o envio
    }

    mostrarStatus("enviando"); //  substitui as 3 linhas antigas
    botaoEnviar.disabled = true;
   
    try {

        await emailjs.sendForm(
            "service_p0giqqh", //service id gerado pelo emailjs
            "template_ffrup4a", //template id gerado pelo emailjs
            form
        ); // envia o formulário via EmailJS

        // statusMensagem.classList.remove("enviando", "erro");
        mostrarStatus("sucesso", "E-mail enviado com sucesso!");

        form.reset(); // limpa os campos do formulário

        console.log("E-mail enviado com sucesso!"); // mostra mensagem de sucesso no console

    } 
    catch (erro) {

        console.error("Erro ao enviar:", erro); // mostra erro no console

        mostrarStatus("erro", "Erro ao enviar. Tente novamente!");

    } 
    finally {
        setTimeout(() => { // restaura o botão após 3 segundos
            botaoEnviar.disabled = false; // reabilita o botão
            ocultarStatus();
        }, 3000);
    }
});
