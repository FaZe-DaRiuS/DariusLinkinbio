// Seleccionamos el botón
const toggleButton = document.getElementById('toggle-theme');

// Añadimos el evento de clic para alternar entre los modos
toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');

    // Cambia el ícono del botón dependiendo del modo
    if (document.body.classList.contains('light-mode')) {
        toggleButton.textContent = '🌞'; // Modo claro
    } else {
        toggleButton.textContent = '🌙'; // Modo oscuro
    }
});
