$(document).ready(function() {

    // Funções de Cadastro de Usuários
    function initCadastroUsuarios() {
        // Criar o formulário de cadastro
        var formularioCadastro = $("#formulario-cadastro");

        // Adicionar um evento de clique ao botão "Cadastrar"
        formularioCadastro.on("submit", function(e) {

            // Prevenir o envio do formulário
            e.preventDefault();

            // Obter os dados do formulário
            var nome = $("#nome").val();
            var nomeEstabelecimento = $("#nomeEstabelecimento").val();
            var enderecoEstabelecimento = $("#enderecoEstabelecimento").val();
            var email = $("#email").val();
            var senha = $("#senha").val();
            //var dataNascimento = $("#data-nascimento").val();

            // Criar um novo objeto JSON com os dados do formulário
            var usuario = {
                nome: nome,
                nomeEstabelecimento: nomeEstabelecimento,
                enderecoEstabelecimento: enderecoEstabelecimento,
                email: email,
                senha: senha,
                //dataNascimento: dataNascimento
            };

            // Enviar os dados do formulário para o servidor
            $.ajax({
                url: "http://localhost:8080/api/restaurantes",
                method: "POST",
                data: JSON.stringify(usuario),
                contentType: "application/json",
                success: function(usuario) {
                    // Exibir uma mensagem de sucesso
                    alert("Usuário cadastrado com sucesso!");

                    // Limpar o formulário
                    formularioCadastro.find("input").val("");
                },
                error: function(error) {
                    // Exibir uma mensagem de erro
                    alert("Erro ao cadastrar usuário: " + error);
                }
            });

        });

        // Criar o formulário de atualização
        var formularioAtualizacao = $("#formulario-atualizacao");

        // Adicionar um evento de clique ao botão "Atualizar"
        formularioAtualizacao.on("submit", function(e) {

            // Prevenir o envio do formulário
            e.preventDefault();

            // Obter o ID do usuário a ser atualizado
            var id = $("#id").val();

            var nome = $("#nome").val();
            var nomeEstabelecimento = $("#nomeEstabelecimento").val();
            var enderecoEstabelecimento = $("#enderecoEstabelecimento").val();
            var email = $("#email").val();
            var senha = $("#senha").val();
            //var dataNascimento = $("#data-nascimento").val();

            // Criar um novo objeto JSON com os dados do formulário
            var usuario = {
                nome: nome,
                nomeEstabelecimento: nomeEstabelecimento,
                enderecoEstabelecimento: enderecoEstabelecimento,
                email: email,
                senha: senha,
                //dataNascimento: dataNascimento
            };

            // Enviar os dados do formulário para o servidor
            $.ajax({
                url: "http://localhost:8080/api/restaurantes" + id,
                method: "PUT",
                data: JSON.stringify(usuario),
                contentType: "application/json",
                success: function(usuario) {
                    // Exibir uma mensagem de sucesso
                    alert("Usuário atualizado com sucesso!");

                    // Limpar o formulário
                    formularioAtualizacao.find("input").val("");
                },
                error: function(error) {
                    // Exibir uma mensagem de erro
                    alert("Erro ao atualizar usuário: " + error);
                }
            });

        });

        // Criar o botão de exclusão
        var botaoExclusao = $("#botao-exclusao");

        // Adicionar um evento de clique ao botão "Excluir"
        botaoExclusao.on("click", function(e) {

            // Prevenir o envio do formulário
            e.preventDefault();

            // Obter o ID do usuário a ser excluído
            var id = $("#id").val();

            // Enviar uma solicitação de exclusão para o servidor
            $.ajax({
                url: "http://localhost:8080/api/restaurantes" + id,
                method: "DELETE",
                success: function() {
                    // Exibir uma mensagem de sucesso
                    alert("Usuário excluído com sucesso!");

                    // Redirecionar para a página inicial
                    window.location.href = "/";
                },
                error: function(error) {
                    // Exibir uma mensagem de erro
                    alert("Erro ao excluir usuário: " + error);
                }
            });

        });
    }
    // Inicializar funções
    initCadastroUsuarios();
});