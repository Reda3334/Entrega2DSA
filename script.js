$(document).ready(function () {
    // Evento click del botón
    $('#submit-usuario').on('click', function () {
        // Obtener el nombre de usuario ingresado
        const username = $('#github-usuario').val().trim();

        // Validar si se ingresó algo
        if (username) {
            fetchRepos(username); // Llamar a la función para obtener repositorios
        } else {
            alert('Por favor, ingresa un nombre de usuario válido de GitHub.');
        }
    });

    // Función para obtener los repositorios de GitHub
    function fetchRepos(username) {
        const apiURL = `https://api.github.com/users/${username}/repos`;

        $.ajax({
            url: apiURL,
            method: 'GET',
            success: function (data) {
                $('#repos-body').empty(); // Limpiar contenido anterior

                if (data.length > 0) {
                    // Iterar por cada repositorio y agregarlo a la tabla
                    data.forEach(repo => {
                        const repoRow = `
                            <tr>
                                <td><a href="${repo.html_url}" target="_blank">${repo.name}</a></td>
                                <td>${repo.description ? repo.description : 'No tiene descripción'}</td>
                                <td>${repo.stargazers_count}</td>
                            </tr>
                        `;
                        $('#repos-body').append(repoRow);
                    });
                    $('#repos-table').show(); // Mostrar la tabla
                } else {
                    alert('No se encontraron repositorios para este usuario.');
                    $('#repos-table').hide();
                }
            },
            error: function () {
                alert('No se pudo obtener los repositorios. Verifica el nombre de usuario e intenta de nuevo.');
                $('#repos-table').hide();
            }
        });
    }
});