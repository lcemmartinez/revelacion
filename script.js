// 1. MANEJO DE LA MÚSICA
const btnMusica = document.getElementById('btn-reproducir');
const audio = document.getElementById('musica-fondo');

btnMusica.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        btnMusica.innerText = "Pausar Música ⏸️";
    } else {
        audio.pause();
        btnMusica.innerText = "Poner Música 🎵";
    }
});

// 2. FUNCIÓN PARA EL CONFETI (Rosa y Azul)
function lanzarConfetiTematico() {
    // Confeti Azul
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#89CFF0', '#B0E0E6']
    });

    // Confeti Rosa a los 250ms
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F2A7B5', '#FFC0CB']
        });
    }, 250);
}

// 3. ENVÍO UNIFICADO A GOOGLE SHEETS
const form = document.getElementById('form-registro');
// Usamos tu URL real que pegaste en el código
const scriptURL = 'https://script.google.com/macros/s/AKfycbwxWX_3BJnsr_Hj1PUc4ZbN11S03nQ6ODljzCEgNOq8GAqArT7paX0UJlT_nflMvWIvDg/exec';

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const btnEnvio = document.getElementById('submit-btn');
    btnEnvio.disabled = true;
    btnEnvio.innerText = "Enviando...";

    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form)
    })
    .then(response => {
        // Lanzamos la celebración
        lanzarConfetiTematico();

        // Esperamos un segundo para que vean el confeti antes del mensaje
        setTimeout(() => {
            alert('¡Confirmación enviada con éxito! 🎉 Nos vemos pronto.');
            btnEnvio.disabled = false;
            btnEnvio.innerText = "Enviar Confirmación";
            form.reset();
        }, 1000);
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Hubo un error al enviar. Por favor, intenta de nuevo.');
        btnEnvio.disabled = false;
        btnEnvio.innerText = "Enviar Confirmación";
    });
});