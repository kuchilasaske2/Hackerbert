$(document).ready(function() {
    var currentUsuario = JSON.parse(localStorage.getItem("currentUsuario"));

    if (currentUsuario) {
        $("#menu").html(`
            <p>Bem-vindo, ${currentUsuario.nome}</p>
            <ul>
                <li><a href="dados.html">Meus Dados</a></li>
                <li><a href="ultimos-restaurantes.html">Últimos Restaurantes Vistos</a></li>
                <li><a href="ultimos-comentarios.html">Últimos Comentários</a></li>
            </ul>
        `);
    } else {
        $("#menu").html('<p><a href="login.html">Login</a></p>');
    }
});