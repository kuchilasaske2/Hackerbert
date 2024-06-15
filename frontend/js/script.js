$(document).ready(function() {
    // Cadastro de usuário
    $('#cadastroForm').on('submit', function(e) {
        e.preventDefault();
        var usuario = {
            nome: $('#nome').val(),
            email: $('#email').val(),
            senha: $('#senha').val()
        };
        $.ajax({
            url: 'http://localhost:8080/api/usuarios',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(usuario),
            success: function(response) {
                alert('Usuário cadastrado com sucesso!');
                window.location.href = 'index.html';
            },
            error: function(error) {
                alert('Erro ao cadastrar usuário!');
            }
        });
    });

    // Login de usuário
    $('#loginForm').on('submit', function (event) {
        event.preventDefault();
        
        var email = $('#email').val();
        var password = $('#senha').val();
        
        $.ajax({
            url: 'http://localhost:8080/api/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ "email": email, "senha": password }),
            success: function (response) {
                localStorage.setItem('usuario', JSON.stringify(response));
                window.location.href = '/';
            },
            error: function (xhr, status, error) {
                alert('Erro no login: ' + error);
            }
        });
    });

    var user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        $('#user-info').text('Olá, ' + user.name);
    }

    // Carregar lista de restaurantes
    if (window.location.pathname === '/restaurants.html') {
        loadRestaurants();
    }

    // Carregar detalhes do restaurante
    if (window.location.pathname === '/restaurant-details.html') {
        loadRestaurantDetails();
    }

    // Enviar comentário
    $('#submit-comment').on('click', function () {
        var commentText = $('#comment-text').val();
        var restaurantId = getRestaurantIdFromUrl();
        
        if (commentText) {
            $.ajax({
                url: '/api/restaurants/' + restaurantId + '/comments',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ text: commentText, userId: user.id }),
                success: function (response) {
                    $('#comments').append('<div class="comment">' + response.text + ' - ' + user.name + '</div>');
                    $('#comment-text').val('');
                },
                error: function (xhr, status, error) {
                    alert('Erro ao enviar comentário: ' + error);
                }
            });
        }
    });

    function loadRestaurants() {
        $.ajax({
            url: '/api/restaurants',
            method: 'GET',
            success: function (response) {
                response.forEach(function (restaurant) {
                    $('#restaurant-list').append('<li class="restaurant-item"><a href="/restaurant-details.html?id=' + restaurant.id + '">' + restaurant.name + '</a></li>');
                });
            },
            error: function (xhr, status, error) {
                alert('Erro ao carregar restaurantes: ' + error);
            }
        });
    }

    function loadRestaurantDetails() {
        var restaurantId = getRestaurantIdFromUrl();
        
        $.ajax({
            url: '/api/restaurants/' + restaurantId,
            method: 'GET',
            success: function (response) {
                $('#restaurant-name').text(response.name);
                $('#restaurant-address').text('Endereço: ' + response.address);
                $('#restaurant-phone').text('Telefone: ' + response.phone);
                $('#restaurant-cuisine').text('Tipo de Comida: ' + response.cuisine);
                response.comments.forEach(function (comment) {
                    $('#comments').append('<div class="comment">' + comment.text + ' - ' + comment.user.name + '</div>');
                });
            },
            error: function (xhr, status, error) {
                alert('Erro ao carregar detalhes do restaurante: ' + error);
            }
        });
    }

    function getRestaurantIdFromUrl() {
        var params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    // Exclusão de usuário
    window.deleteUser = function() {
        var loggedInUsuario = JSON.parse(localStorage.getItem('loggedInUsuario'));
        if (loggedInUsuario) {
            $.ajax({
                url: 'http://localhost:8080/api/usuarios/' + loggedInUsuario.id,
                type: 'DELETE',
                success: function(response) {
                    alert('Conta excluída com sucesso!');
                    localStorage.removeItem('loggedInUsuario');
                    window.location.href = 'index.html';
                    $('#menu').show();
                    $('#userMenu').hide();
                },
                error: function(error) {
                    alert('Erro ao excluir conta!');
                }
            });
        }
    };

    // Carregar dados do usuário no formulário de atualização
    if (window.location.pathname.endsWith('update.html')) {
        var loggedInUsuario = JSON.parse(localStorage.getItem('loggedInUsuario'));
        if (loggedInUsuario) {
            $('#nome').val(loggedInUsuario.nome);
            $('#email').val(loggedInUsuario.email);
            $('#senha').val(loggedInUsuario.senha);
        }

        $('#updateForm').on('submit', function(e) {
            e.preventDefault();
            var updatedUser = {
                name: $('#nome').val(),
                email: $('#email').val(),
                password: $('#senha').val()
            };
            $.ajax({
                url: 'http://localhost:8080/api/usuarios/' + loggedInUser.id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedUser),
                success: function(response) {
                    alert('Dados atualizados com sucesso!');
                    localStorage.setItem('loggedInUser', JSON.stringify(response));
                    window.location.href = 'index.html';
                },
                error: function(error) {
                    alert('Erro ao atualizar dados!');
                }
            });
        });
    }
    // Alternar tema
    $('#themeToggle').on('click', function() {
        $('body').toggleClass('dark');
        var theme = $('body').hasClass('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    // Aplicar tema salvo
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        $('body').addClass(savedTheme);
    }

    // Mostrar menus apropriados
    var userId = localStorage.getItem('userId');
    if (userId) {
        $('#menu').hide();
        $('#userMenu').show();
    } else {
        $('#menu').show();
        $('#userMenu').hide();
    }
});