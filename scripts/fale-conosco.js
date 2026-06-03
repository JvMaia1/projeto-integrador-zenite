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

const statusMensagem = document.createElement("div"); // cria uma div para mensagem
statusMensagem.id = "statusMensagem"; // adiciona id a div criada
statusMensagem.className = "mensagem-status"; //adiciona a classe para estilizaçao
botaoEnviar.insertAdjacentElement("afterend", statusMensagem); // aqui a mensagem aparece apos o botao

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
    campo.classList.remove("erro"); // remove classe de erro do campo

    const proximoElemento = campo.nextElement; // pega o próximo elemento no DOM

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

    if (valor.length < 2) { // se tiver menos de 3 caracteres
        mostrarErro(nome, "Informe um nome válido."); // mostra mensagem de erro
        return false; // indica validação falha
    }

    limparErro(nome); // limpa erro anterior se houver
    return true; // indica validação bem-sucedida
}

function validarEmailCampo() { // valida o campo de email do formulário
    const valor = email.value.trim(); // remove espaços em branco

    if (!validarEmail(valor)) { // se o email não for válido
        mostrarErro(email, "Informe um e-mail válido."); // mostra mensagem de erro
        return false; // indica validação falha
    }

    limparErro(email); // limpa erro anterior
    return true; // indica email válido
}

function validarTelefone() { // valida o telefone informado
    const numeros = telefone.value.replace(/\D/g, ""); // remove tudo que não for número

    if (numeros.length !== 11) { // se não tiver 11 dígitos (DDD + número)
        mostrarErro(telefone,"Informe um telefone com DDD válido."); // mostra mensagem de erro
        return false; // indica validação falha
    }

    limparErro(telefone); // limpa erro anterior
    return true; // indica telefone válido
}

function validarMensagem() { // valida a mensagem enviada
    const valor = mensagem.value.trim(); // remove espaços antes e depois

    if (valor.length < 10) { // se tiver menos de 10 caracteres
        mostrarErro(mensagem,"A mensagem deve possuir pelo menos 10 caracteres."); // mostra mensagem de erro
        return false; // indica validação falha
    }

    limparErro(mensagem); // limpa erro anterior
    return true; // indica mensagem válida
}

    // =============================================
    // SUBMIT
    // =============================================
form.addEventListener("submit", async (e) => { // adiciona evento ao enviar o formulário
    e.preventDefault(); // impede o envio padrão da página

    const nomeValido = validarNome(); // valida o campo nome
    const emailValido = validarEmailCampo(); // valida o campo email
    const telefoneValido = validarTelefone(); // valida o campo telefone
    const mensagemValida = validarMensagem(); // valida o campo mensagem

    const formularioValido =
        nomeValido &&
        emailValido &&
        telefoneValido &&
        mensagemValida; // verifica se todos os campos estão válidos

    if (!formularioValido) { // se algum campo estiver inválido
        return; // cancela o envio
    }

    statusMensagem.textContent = "Enviando..."; // indica que o envio está em andamento
    statusMensagem.classList.remove("sucesso", "erro");
    statusMensagem.classList.add("enviando"); // adiciona classe para estilizar mensagem de envio
    botaoEnviar.disabled = true; // desabilita o botão para evitar múltiplos envios

    try {

        await emailjs.sendForm(
            "service_lb8j3f1", //service id gerado pelo emailjs
            "template_7j7mzi4", //template id gerado pelo emailjs
            form
        ); // envia o formulário via EmailJS

        statusMensagem.textContent = "E-mail enviado com sucesso!"; // mostra sucesso na mensagem
        statusMensagem.classList.remove("enviando", "erro");
        statusMensagem.classList.add("sucesso");

        form.reset(); // limpa os campos do formulário

        console.log("E-mail enviado com sucesso!"); // mostra mensagem de sucesso no console

    } 
    catch (erro) {

        console.error("Erro ao enviar:", erro); // mostra erro no console

        statusMensagem.textContent = "Erro ao enviar. Tente novamente."; // informa erro na mensagem
        statusMensagem.classList.remove("enviando", "sucesso");
        statusMensagem.classList.add("erro"); // adiciona a classe erro na mensagem

    } 
    finally {

        setTimeout(() => { // restaura o botão após 3 segundos
            botaoEnviar.disabled = false; // reabilita o botão
            statusMensagem.textContent = ""; // limpa a mensagem de status
            statusMensagem.classList.remove("sucesso", "erro"); //aqui alterna as classe em caso de sucesso ou erro
        }, 3000);

    }
});
