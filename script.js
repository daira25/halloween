
// ==================================
// HISTORIAS DE HALLOWEEN
// ==================================

const historias = {
    1: `La casa abandonada:

En las afueras del pueblo había una casa antigua
que llevaba muchos años vacía.

Una noche, un grupo de amigos decidió entrar.
Al cruzar la puerta, escucharon pasos en el piso
de arriba. Cuando fueron a investigar, encontraron
una habitación llena de fotografías antiguas.

En una de ellas aparecían ellos mismos...
¡pero la foto parecía tener muchos años!`,

    2: `El espejo misterioso:

Una familia encontró un espejo antiguo en una
tienda de antigüedades.

Lo colocaron en su habitación, pero cada noche
el espejo parecía mostrar una habitación diferente.

Una noche, al mirarlo, descubrieron que en el
reflejo había una puerta que no existía en
la habitación real.

Desde entonces, nadie volvió a mirarlo de noche.`,

    3: `La calabaza encantada:

En un pequeño pueblo, cada Halloween aparecía
una calabaza iluminada frente a una casa.

Nadie sabía quién la colocaba allí.

Un año, una niña decidió esperar para descubrir
el misterio. Al llegar la medianoche, vio que
la calabaza tenía una pequeña nota:

"Compartí tu luz y hacé sonreír a alguien".`
};

function mostrarHistoria(numero) {
    const caja = document.getElementById("historiaTexto");

    caja.textContent = historias[numero];

    reproducirSonido();
}


// ==================================
// CURIOSIDADES
// ==================================

const curiosidades = [
    "🎃 Halloween se celebra cada 31 de octubre.",
    "🦇 Los murciélagos son animales nocturnos.",
    "👻 Los fantasmas son personajes tradicionales de los cuentos de terror.",
    "🍬 El truco o trato es una tradición popular de Halloween.",
    "🕷️ Las arañas son uno de los adornos más utilizados en Halloween.",
    "🧙 Los disfraces de brujas son muy populares durante esta celebración."
];

let indiceCuriosidad = 0;

function nuevaCuriosidad() {

    const texto = document.getElementById("curiosidadExtra");

    texto.textContent = curiosidades[indiceCuriosidad];

    indiceCuriosidad++;

    if (indiceCuriosidad >= curiosidades.length) {
        indiceCuriosidad = 0;
    }

    reproducirSonido();
}


// ==================================
// JUEGO DE PREGUNTAS
// ==================================

const preguntas = [
    {
        pregunta: "¿Qué día se celebra Halloween?",
        opciones: [
            "31 de octubre",
            "25 de diciembre",
            "1 de enero"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Cuál es uno de los símbolos de Halloween?",
        opciones: [
            "Un árbol de Navidad",
            "Una calabaza",
            "Un corazón"
        ],
        correcta: 1
    },

    {
        pregunta: "¿Qué criaturas aparecen en las historias de terror?",
        opciones: [
            "Vampiros",
            "Dinosaurios solamente",
            "Peces"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Qué animal se relaciona con Halloween?",
        opciones: [
            "Delfín",
            "Murciélago",
            "Pingüino"
        ],
        correcta: 1
    },

    {
        pregunta: "¿Qué suelen pedir los niños en Halloween?",
        opciones: [
            "Libros",
            "Flores",
            "Dulces"
        ],
        correcta: 2
    }
];

let preguntaActual = 0;
let puntaje = 0;
let respondida = false;

function cargarPregunta() {

    const pregunta = preguntas[preguntaActual];

    document.getElementById("pregunta").textContent =
        preguntaActual + 1 + ". " + pregunta.pregunta;

    document.getElementById("resultado").textContent = "";

    document.getElementById("siguiente").disabled = true;

    const opciones = document.getElementById("opciones");

    opciones.innerHTML = "";

    respondida = false;

    pregunta.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.textContent = opcion;

        boton.onclick = function() {
            comprobarRespuesta(indice);
        };

        opciones.appendChild(boton);

    });
}


function comprobarRespuesta(indice) {

    if (respondida) return;

    respondida = true;

    const pregunta = preguntas[preguntaActual];

    const botones = document.querySelectorAll("#opciones button");

    botones.forEach(boton => {
        boton.disabled = true;
    });

    const resultado = document.getElementById("resultado");

    if (indice === pregunta.correcta) {

        puntaje += 10;

        resultado.textContent = "🎉 ¡Respuesta correcta! +10 puntos";

        resultado.style.color = "#50ff80";

    } else {

        resultado.textContent =
            "❌ Respuesta incorrecta. La respuesta correcta era: " +
            pregunta.opciones[pregunta.correcta];

        resultado.style.color = "#ff7777";

    }

    document.getElementById("puntaje").textContent =
        "Puntaje: " + puntaje;

    document.getElementById("siguiente").disabled = false;

    reproducirSonido();
}


function siguientePregunta() {

    if (!respondida) return;

    preguntaActual++;

    if (preguntaActual >= preguntas.length) {

        document.getElementById("pregunta").textContent =
            "🏆 ¡Juego terminado!";

        document.getElementById("opciones").innerHTML = "";

        document.getElementById("resultado").textContent =
            "Obtuviste " + puntaje + " de 50 puntos.";

        document.getElementById("siguiente").disabled = true;

        if (puntaje === 50) {
            document.getElementById("resultado").textContent +=
                " ¡Excelente, sos un experto en Halloween!";
        }

        return;
    }

    cargarPregunta();
}


function reiniciarJuego() {

    preguntaActual = 0;

    puntaje = 0;

    document.getElementById("puntaje").textContent =
        "Puntaje: 0";

    cargarPregunta();

}


// ==================================
// SONIDOS
// ==================================

let sonidoActivo = false;
let contextoAudio = null;

function activarSonido() {

    sonidoActivo = !sonidoActivo;

    const boton = document.getElementById("sonidoBtn");

    boton.textContent = sonidoActivo ? "🔊 Sonido ON" : "🔇 Sonido OFF";

    if (sonidoActivo) {
        reproducirSonido();
    }
}


function reproducirSonido() {

    if (!sonidoActivo) return;

    try {

        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) return;

        if (!contextoAudio) {
            contextoAudio = new AudioContext();
        }

        if (contextoAudio.state === "suspended") {
            contextoAudio.resume();
        }

        const oscilador = contextoAudio.createOscillator();

        const volumen = contextoAudio.createGain();

        oscilador.type = "sine";

        oscilador.frequency.setValueAtTime(
            400,
            contextoAudio.currentTime
        );

        oscilador.frequency.exponentialRampToValueAtTime(
            180,
            contextoAudio.currentTime + 0.2
        );

        volumen.gain.setValueAtTime(
            0.12,
            contextoAudio.currentTime
        );

        volumen.gain.exponentialRampToValueAtTime(
            0.001,
            contextoAudio.currentTime + 0.2
        );

        oscilador.connect(volumen);

        volumen.connect(contextoAudio.destination);

        oscilador.start();

        oscilador.stop(contextoAudio.currentTime + 0.2);

    } catch (error) {
        console.log("El sonido no está disponible.");
    }
}


// ==================================
// INICIAR PAGINA
// ==================================

document.getElementById("siguiente").disabled = true;

cargarPregunta();
