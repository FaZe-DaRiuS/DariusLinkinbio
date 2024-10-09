// URL de tu bin en jsonbin.io (reemplaza con tu URL)
const visitCounterApiUrl = 'https://api.jsonbin.io/v3/b/67066a6dad19ca34f8b57d6c';
const apiKey = '$2a$10$GBpBu7hwlKdcnHFyMiAMMevKfq.IoaHPbEBvos2OfZeGJRuHxXK92'; 


async function updateGlobalVisitCounter() {
    try {
        if (localStorage.getItem('hasVisited')) {
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

            let data = await response.json();
            let visitCount = data.record.visits;

            document.getElementById('visit-counter').textContent = `Views: ${visitCount}`;
        } else {
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

            let data = await response.json();
            let visitCount = data.record.visits;

            visitCount++;

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

            localStorage.setItem('hasVisited', true);

            document.getElementById('visit-counter').textContent = `Visitas globales: ${visitCount}`;
        }
    } catch (error) {
        console.error(error);
        document.getElementById('visit-counter').textContent = 'Error al cargar visitas';
    }
}

const toggleButton = document.getElementById('toggle-theme');

toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    toggleButton.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});

updateGlobalVisitCounter();
