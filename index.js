// Definim els colors disponibles per a la seqüència
const colors = ['red', 'yellow', 'blue', 'black', 'orange', 'purple', 'green', 'gray'];

// Inicialitzem les variables
let sequencia = [];          // La seqüència que ha de seguir el jugador
let respostaJugador = [];    // Les respostes del jugador
let bloquejar = true;        // Variable per bloquejar el jugador fins que es mostri la seqüència
let sonidoCorrecto = new Audio('correct-ding.mp3');
let sonidoError = new Audio('error-fallo-1.mp3');


// Quan es fa clic al botó "start", s'inicia el joc
document.getElementById("start").addEventListener("click", iniciar);

// Afegim un esdeveniment a cada botó de color per capturar el clic
document.querySelectorAll(".color").forEach(button => {
    button.addEventListener("click", (e) => {
        if (!bloquejar) {  // Si no està bloquejat, permetem que el jugador faci una acció
            let colorSeleccionat = e.target.dataset.color;  // Obtenim el color seleccionat pel jugador
            respostaJugador.push(colorSeleccionat);  // Afegim el color a les respostes del jugador
            verificarSequencia();  // Comprovem si la seqüència és correcta
        }
    });
});

// Funció per iniciar el joc
function iniciar() {
    sequencia = [];         // Reiniciem la seqüència
    respostaJugador = [];   // Reiniciem les respostes del jugador
    bloquejar = true;       // Bloquegem el jugador fins que es mostri la seqüència
    afegirColor();          // Afegim un color nou a la seqüència
    mostrar_colors(1000);   // Mostrem la seqüència amb un temps de retard
}

// Funció per afegir un color aleatori a la seqüència
function afegirColor() {
    numero = Math.floor(Math.random() * colors.length);  // Generem un nombre aleatori per escollir un color
    sequencia.push(colors[numero]);  // Afegim el color seleccionat a la seqüència
    console.log("Seqüència actual:", sequencia);  // Mostrem per consola la seqüència actual
}

// Funció asincrònica per mostrar la seqüència de colors
async function mostrar_colors(temps) {
    bloquejar = true;
    for (let color of sequencia) {  // Iterem per cada color de la seqüència
        console.log("Mostrant color:", color);  // Mostrem el color actual per consola
        let memoria = document.querySelector(".memoria");  // Obtenim l'element que mostra el color
        memoria.style.backgroundColor = color;  // Canviem el fons de l'element al color actual
        await esperar(temps);  // Esperem un temps determinat abans de passar al següent color
        memoria.style.backgroundColor = "white";  // Restablim el color de fons a blanc
        await esperar(500);  // Esperem mig segon abans de mostrar el següent color
    }
    bloquejar = false;  // Permetem que el jugador faci clic després de mostrar tota la seqüència
    respostaJugador = [];  // Reiniciem les respostes del jugador per la següent ronda
}

// Funció per esperar un cert temps en milisegons
function esperar(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));  // Retorna una promesa que es resol després d'un temps determinat
}

// Funció per verificar si la seqüència del jugador és correcta
function verificarSequencia() {
    const mensajeElemento = document.getElementById('missatge');  // Obtenim l'element on es mostrarà el missatge

    if (respostaJugador.length !== sequencia.length) {
        return;
    }

    // Comprovem si cada element de la seqüència del jugador és igual al de la seqüència correcta
    for (let i = 0; i < sequencia.length; i++) {
        if (respostaJugador[i] !== sequencia[i]) {
            mensajeElemento.textContent = "Error: Seqüència incorrecta";
            mensajeElemento.style.color = "red";
            sonidoError.play();
            return;  // Sortim de la funció si hi ha un error
        }
    }

    mensajeElemento.textContent = "Següent nivell";
    mensajeElemento.style.color = "green";
    sonidoCorrecto.play();

    // Després d'una secuencia correcta, afegim un nou color a la seqüència
    setTimeout(() => {
        respostaJugador = [];
        afegirColor();
        mostrar_colors(1000);  // Mostrem la nova seqüència amb el color afegit
    }, 1000);  a
}
