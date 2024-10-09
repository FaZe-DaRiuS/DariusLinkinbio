// URL de tu bin en jsonbin.io (reemplaza con tu URL)
const visitCounterApiUrl = 'https://api.jsonbin.io/v3/b/67066a6dad19ca34f8b57d6c';
const apiKey = '$2a$10$GBpBu7hwlKdcnHFyMiAMMevKfq.IoaHPbEBvos2OfZeGJRuHxXK92'; // Tu clave de API de jsonbin.io

// Función para obtener y actualizar las visitas
async function updateGlobalVisitCounter() {
    try {
        // Primero, obtenemos el número de visitas actual desde el bin
        let response = await fetch(visitCounterApiUrl, {
            method: 'GET',
            headers: {
                'X-Master-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener el contador de visitas');
        }

        // Parseamos la respuesta como JSON
        let data = await response.json();
        let visitCount = data.record.visits;

        // Incrementamos el contador de visitas
        visitCount++;

        // Actualizamos el número de visitas en el servidor (PUT request)
        let putResponse = await fetch(visitCounterApiUrl, {
            method: 'PUT',
            headers: {
                'X-Master-Key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ visits: visitCount })
        });

        if (!putResponse.ok) {
            throw new Error('Error al actualizar el contador de visitas');
        }

        // Mostramos el número actualizado de visitas en el HTML
        document.getElementById('visit-counter').textContent = `Visitas globales: ${visitCount}`;
    } catch (error) {
        console.error(error);
        document.getElementById('visit-counter').textContent = 'Error al cargar visitas';
    }
}

// Función para alternar el tema claro/oscuro
const toggleButton = document.getElementById('toggle-theme');

toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    toggleButton.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});

// Llamamos a la función al cargar la página
updateGlobalVisitCounter();
