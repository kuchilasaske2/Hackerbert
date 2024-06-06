// Funções de Login
function initLogin() {
    var formularioLogin = $("#formulario-login");

    formularioLogin.on("submit", function (e) {
        e.preventDefault();
        var email = $("#email-login").val();
        var senha = $("#senha-login").val();

        var loginData = {
            email: email,
            senha: senha
        };

        $.ajax({
            url: "/api/login",
            method: "POST",
            data: JSON.stringify(loginData),
            contentType: "application/json",
            success: function (response) {
                alert("Login realizado com sucesso!");
                localStorage.setItem("usuario", JSON.stringify(response));
                window.location.href = "index.html";
            },
            error: function (error) {
                alert("Erro ao realizar login: " + error);
            }
        });
    });
}

// Inicializar funções de cadastro e login
if ($("#formulario-cadastro-usuario").length) {
    initCadastroUsuarios();
}

if ($("#formulario-cadastro-restaurante").length) {
    initCadastroRestaurantes();
}

if ($("#formulario-login").length) {
    initLogin();
}

// Função para atualizar o menu do usuário
function updateUserMenu() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
        $("#user-name").text(usuario.nome);
        $("#user-menu").show();
    } else {
        $("#user-menu").hide();
    }
}

// Verificar se o usuário está logado ao carregar a página
updateUserMenu();

// Função de logout
$("#logout").on("click", function () {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
});