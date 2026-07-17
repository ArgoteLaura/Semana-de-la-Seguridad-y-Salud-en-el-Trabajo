document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnEmpezar").addEventListener("click", iniciarJuego);
    document.getElementById("btnAyudaAleatoria1").addEventListener("click", usarAyudaAleatoria1);
    document.getElementById("btnAyudaAleatoria2").addEventListener("click", usarAyudaAleatoria2);
});

const preguntas = [
    {
        pregunta: "1. ¿Qué norma establece la obligatoriedad de conformar el COPASST en las empresas colombianas?",
        opciones: ["a. Resolución 1843 de 2025.",
        "b. Resolución 2013 de 1986.",
        "c. Ley 100 de 1993.",
        "d. Decreto 1295 de 1994."],
        respuesta: 1
    },
    {
        pregunta: "2. ¿Cada cuánto tiempo se renuevan los miembros del COPASST?",
        opciones: ["a. Cada año.",
        "b. Cada dos años.",
        "c. Cada seis meses.",
        "d. Cada tres años."],
        respuesta: 1
    },
    {
        pregunta: "3. ¿Quién designa a los representantes del empleador ante el COPASST?",
        opciones: ["a. El Ministerio del Trabajo.",
        "b. La ARL.",
        "c. El empleador.",
        "d. Los trabajadores mediante votación."],
        respuesta: 2
    },
    {
        pregunta: "4. ¿Cómo se eligen los representantes de los trabajadores ante el COPASST?",
        opciones: ["a. Por designación directa del empleador.",
        "b. Por votación libre entre los trabajadores.",
        "c. Por sorteo entre los jefes de área.",
        "d. Por antigüedad en la empresa."],
        respuesta: 1
    },
    {
        pregunta: "5. ¿Cuál es el número mínimo de empleados que obliga a una empresa a conformar el COPASST (en lugar de Vigía de SST)?",
        opciones: ["a. 5 trabajadores.",
        "b. 10 trabajadores.",
        "c. 20 trabajadores.",
        "d. 50 trabajadores."],
        respuesta: 1
    },
    {
        pregunta: "6. ¿Qué figura reemplaza al COPASST en empresas con menos de 10 trabajadores?",
        opciones: ["a. El Comité de Convivencia Laboral.",
        "b. El Vigía Ocupacional.",
        "c. El Vigía de Seguridad y Salud en el Trabajo.",
        "d. El SG-SST directamente a cargo del gerente."],
        respuesta: 2
    },
    {
        pregunta: "7. ¿Con qué periodicidad mínima debe reunirse ordinariamente el COPASST?",
        opciones: ["a. Una vez por semana.",
        "b. Una vez al mes.",
        "c. Una vez cada tres meses.",
        "d. Una vez al año."],
        respuesta: 1
    },
    {
        pregunta: "8. ¿Cuál de las siguientes es una función principal del COPASST?",
        opciones: ["a. Definir los salarios de los trabajadores.",
        "b. Vigilar el desarrollo de las actividades del Sistema de Gestión de SST.",
        "c. Aprobar los contratos laborales.",
        "d. Realizar los exámenes médicos ocupacionales."],
        respuesta: 1
    },
    {
        pregunta: "9. ¿Quién debe garantizar el tiempo y los recursos necesarios para el funcionamiento del COPASST?",
        opciones: ["a. La ARL exclusivamente.",
        "b. El empleador.",
        "c. El Ministerio de Salud.",
        "d. Los propios integrantes del comité, sin apoyo de la empresa."],
        respuesta: 1
    },
    {
        pregunta: "10. ¿Qué norma regula actualmente, de manera general, la implementación del Sistema de Gestión de SST en el que se enmarca el COPASST?",
        opciones: ["a. Decreto 1072 de 2015.",
        "b. Resolución 1843 de 2025.",
        "c. Decreto 4050 de 1994.",
        "d. Ley 1562 de 2012 exclusivamente."],
        respuesta: 0
    },
];

let indicePregunta = 0;
let puntuacion = 0;
let tiempoRestante;
let intervaloTiempo;
let comodin1Usado = false;
let comodin2Usado = false;
let ayudaUsada = null;


function iniciarJuego() {
    document.getElementById("inicio").classList.add("oculto");
    document.getElementById("juego").classList.remove("oculto");

// Cambiar el fondo cuando empieza el juego
document.body.style.backgroundImage = "url('ImagenJPEG/FondoPreguntas.jpeg')";

    puntuacion = 0;
    indicePregunta = 0;
    comodin1Usado = false;
    comodin2Usado = false;
    actualizarPuntuacion();
    siguientePregunta();
}

function siguientePregunta() {
    if (indicePregunta < preguntas.length) {
        setTimeout(() => {
            mostrarPregunta();
            iniciarTemporizador();
        }, 3000);
        
        // Reproducir el audio de la pregunta
        let audioPreguntas = document.getElementById("audioPreguntas");
        if (!audioPreguntas.paused) {
            audioPreguntas.pause();
            audioPreguntas.currentTime = 1; // Reiniciar para la próxima reproducción
        }
        audioPreguntas.play();
    } else {
        finalizarJuego();
    }
}

function mostrarPregunta() {
    let p = preguntas[indicePregunta];
    document.getElementById("pregunta").innerText = p.pregunta;
    let opcionesDiv = document.getElementById("opciones");
    opcionesDiv.innerHTML = "";
    p.opciones.forEach((opcion, index) => {
        let btn = document.createElement("button");
        btn.innerText = opcion;
        btn.classList.add("opcion");
        btn.addEventListener("click", function () {
            verificarRespuesta(index, btn);
        });
        opcionesDiv.appendChild(btn);
    });

}

function verificarRespuesta(indice) {
    let audioPreguntas = document.getElementById("audioPreguntas");
    if (!audioPreguntas.paused) {
        audioPreguntas.pause();
        audioPreguntas.currentTime = 10;
    }

    if (indice === preguntas[indicePregunta].respuesta) {
        puntuacion += 100;

        // Mostrar alerta de respuesta correcta sin botón
        swalOcultarPreguntas({
            title: "¡Correcto!",
            icon: "success",
            showConfirmButton: false, // Oculta el botón de confirmación
            timer: 3500 // La alerta dura 3 segundos
        });

        // Reproducir audio de respuesta correcta
        let audio_respuesta_correcta = document.getElementById("audio_respuesta_correcta");
        audio_respuesta_correcta.play();

       
        if (puntuacion >= 1000) {
            setTimeout(mostrarPantallaGanador, audio_respuesta_correcta.duration * 1000);
        } else {
            setTimeout(() => {
                indicePregunta++;
                siguientePregunta();
            }, 500);
        }
    } else {
        // Solo finalizar el juego si no se ha alcanzado la puntuación máxima
        if (puntuacion < 1000) {
            swalOcultarPreguntas({
                title: "Incorrecto",
                text: "Intenta de nuevo.",
                icon: "error"
            });
            finalizarJuego();
            let audio_respuesta_incorrecta = document.getElementById("audio_respuesta_incorrecta");
            audio_respuesta_incorrecta.play();
        }
    }

    actualizarPuntuacion();
}

//funcion para vfunction mostrarPantallaGanador() {
    function mostrarPantallaGanador() {
        const juego = document.getElementById('juego');
        juego.innerHTML = `
            <div class="pantalla-ganador">
            <h1>¡Felicidades, gran ganador!</h1>

        <p>
                Tu conocimiento y rapidez te han llevado a la cima, demostrando que estás bien 
                informado sobre la seguridad y salud en el trabajo.
            </p>

            <p>
                Gracias por participar y por ser parte de este reto. ¡Sigue promoviendo una cultura 
                de prevención y bienestar en nuestro entorno laboral!
            </p>

            <p><strong>¡Enhorabuena y mucho éxito!</strong></p>

        <button onclick="location.reload()">Volver al inicio</button>
        </div>

        `;
        document.body.style.backgroundImage = "url('./imgBotones/Mapa_Sinergy.png')"; // Cambiar fondo
        let audio_ganador = document.getElementById("audio_ganador");
        audio_ganador.play();

    }

function actualizarPuntuacion() {
    document.getElementById("score").innerText = "Puntaje: " + puntuacion;
}

function ocultarPreguntaYRespuestas() {
    const pregunta = document.getElementById("pregunta");
    const opciones = document.getElementById("opciones");
    const comodines = document.querySelector(".comodines");
    [pregunta, opciones, comodines].forEach(element => {
        if (element) {
            element.style.visibility = "hidden";
            element.style.opacity = "0";
            element.style.pointerEvents = "none";
        }
    });
}

function mostrarPreguntaYRespuestas() {
    const pregunta = document.getElementById("pregunta");
    const opciones = document.getElementById("opciones");
    const comodines = document.querySelector(".comodines");
    [pregunta, opciones, comodines].forEach(element => {
        if (element) {
            element.style.visibility = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        }
    });
}

function swalOcultarPreguntas(options) {
    const originalDidOpen = options.didOpen;
    const originalDidClose = options.didClose;

    options.didOpen = (popup) => {
        ocultarPreguntaYRespuestas();
        if (typeof originalDidOpen === "function") {
            originalDidOpen(popup);
        }
    };

    options.didClose = () => {
        mostrarPreguntaYRespuestas();
        if (typeof originalDidClose === "function") {
            originalDidClose();
        }
    };

    return Swal.fire(options);
}

function iniciarTemporizador() {
    clearInterval(intervaloTiempo);
    tiempoRestante = 30;
    document.getElementById("tiempo").innerText = tiempoRestante;
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        document.getElementById("tiempo").innerText = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            swalOcultarPreguntas({
                title: "Tiempo agotado",
                icon: "warning",
                confirmButtonText: "Aceptar"
            });
            finalizarJuego();
        }
    }, 1000);
}

function finalizarJuego() {
    clearInterval(intervaloTiempo);
    
    // Detener el audio de preguntas si está reproduciéndose
    let audioPreguntas = document.getElementById("audioPreguntas");
    if (!audioPreguntas.paused) {
        audioPreguntas.pause();
        audioPreguntas.currentTime = 0; // Reiniciar el audio a su posición inicial
    }
    
    swalOcultarPreguntas({
        title: "Juego terminado",
        text: "Puntuación: " + puntuacion,
        icon: "info",
        confirmButtonText: "Reiniciar"
    }).then(() => {
        location.reload();
    });
    
    let audio_respuesta_incorrecta = document.getElementById("audio_respuesta_incorrecta");
    audio_respuesta_incorrecta.play();
}

function usar5050() {
    // Mostrar mensaje de carga
    swalOcultarPreguntas({
        title: "50:50",
        text: "Eliminando dos opciones incorrectas...",
        //icon: "info",
        imageUrl: "./imgBotones/50_50.jpg",
        imageHeight: 100, 
        imageAlt: "Comodín 50:50", 
        showConfirmButton: false,
        timer: 3000
        }).then(() => {
        // Eliminar las opciones después de mostrar el mensaje
        let p = preguntas[indicePregunta];
        let incorrectas = p.opciones.filter((_, index) => index !== p.respuesta);
        let opcionesParaOcultar = incorrectas.sort(() => Math.random() - 0.5).slice(0, 2);
        document.querySelectorAll(".opcion").forEach(btn => {
            if (opcionesParaOcultar.includes(btn.innerText)) {
                btn.style.display = "none";
            }
        });
    });
}

function usarLlamada() {
    let p = preguntas[indicePregunta];
    let respuestaCorrecta = p.opciones[p.respuesta];
    swalOcultarPreguntas({
        title: "Tus amigos sugieren que...",
        text: "Llama a dos amigos",
        imageUrl: "./imgBotones/Llamada_2_Amigos.jpg",
        imageHeight: 100, 
        imageAlt: "Comodín Llamada", 
        showConfirmButton: false,
        confirmButtonText: "Aceptar",
        timer: 3000
    });
}

function usarComite() {
    let p = preguntas[indicePregunta];
    let respuestaCorrecta = p.opciones[p.respuesta];
    swalOcultarPreguntas({
        title: "La audiencia recomienda que... ",
        text: "Dirijase a la audiencia",
        imageUrl: "./imgBotones/Audiencia.jpg",
        imageHeight: 100, 
        imageAlt: "Audiencia",
        confirmButtonText: "Aceptar",
        showConfirmButton: false,
        timer: 3000
    });
}

function usarSGSST() {
    let p = preguntas[indicePregunta];
    let respuestaCorrecta = p.opciones[p.respuesta];
    swalOcultarPreguntas({
        title: "El SG-SST sugiere que...",
        text: "Dirijase a la profesional",
        imageUrl: "./imgBotones/SG-SST.jpg",
        imageHeight: 100, 
        imageAlt: "SG-SST",
        confirmButtonText: "Aceptar",
        showConfirmButton: false,
        timer: 3000 
    });
}

function perderJuego1() {
    swalOcultarPreguntas({ 
        title: "Pierde el turno", 
        text: "Has perdido el juego.", 
        imageUrl: "./imgBotones/Pierde_Turno.jpg",
        imageHeight: 100, 
        imageAlt: "Pierde_Turno",
        confirmButtonText: "Aceptar",
        showConfirmButton: false,
        timer: 3000  
    }).then(() => finalizarJuego());
}

function perderJuego2() {
    swalOcultarPreguntas({ 
        title: "Pierde el turno", 
        text: "Has perdido el juego.", 
        imageUrl: "./imgBotones/Pierde_Turno.jpg",
        imageHeight: 100, 
        imageAlt: "Pierde_Turno",
        confirmButtonText: "Aceptar",
        showConfirmButton: false,
        timer: 3000 
    }).then(() => finalizarJuego());
}




function usarAyudaAleatoria1() {
    console.log("Función usarAyudaAleatoria1 llamada");
    console.log("Estado de comodin1Usado:", comodin1Usado);
    
    if (comodin1Usado) {
        console.log("Condición cumplida: comodin1Usado es true");
        swalOcultarPreguntas({
            title: "Comodín ya utilizado",
            text: "Ya has usado este comodín anteriormente",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
        return;
    }
    
    comodin1Usado = true;
    
    swalOcultarPreguntas({
        title: "Cargando...",
        text: "Seleccionando ayuda aleatoria",
        allowOutsideClick: false,
        showConfirmButton: false,
        html: '<img src="ImagenDadosGif/dado3D.gif" width="200px" alt="Cargando">'
    });
    
    document.getElementById("btnAyudaAleatoria1").style.backgroundColor = "gray";

    // Lista de ayudas con probabilidades
    let ayudas = [
        { funcion: perderJuego2, probabilidad: 0.10 }, // 10%
        { funcion: usar5050, probabilidad: 0.25 },      // 20%
        { funcion: usarLlamada, probabilidad: 0.20 },   // 25%
        { funcion: perderJuego1, probabilidad: 0.10 },  // 15%
        { funcion: usarComite, probabilidad: 0.20 },    // 15%
        { funcion: usarSGSST, probabilidad: 0.15 }     // 15%
    ];

    // Generar un número aleatorio entre 0 y 1
    let rand = Math.random();
    let suma = 0;
    let ayudaSeleccionada = null;

    // Seleccionar la ayuda basada en su probabilidad
    for (let ayuda of ayudas) {
        suma += ayuda.probabilidad;
        if (rand <= suma) {
            ayudaSeleccionada = ayuda.funcion;
            break;
        }
    }

    ayudaUsada = ayudaSeleccionada;
    
    setTimeout(() => {
        Swal.close();
        ayudaSeleccionada();
    }, 3000);
}

function usarAyudaAleatoria2() {
    if (comodin2Usado) {
        swalOcultarPreguntas({
            title: "Comodín ya utilizado",
            text: "Ya has usado este comodín anteriormente",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
        return;
    }
    
    comodin2Usado = true;
    
    swalOcultarPreguntas({
        title: "Cargando...",
        text: "Seleccionando ayuda aleatoria",
        allowOutsideClick: false,
        showConfirmButton: false,
        html: '<img src="ImagenDadosGif/dado3D.gif" width="200px" alt="Cargando">'
    });

    document.getElementById("btnAyudaAleatoria2").style.backgroundColor = "gray";

    // Lista de ayudas con probabilidades
    let ayudas = [
        { funcion: perderJuego2, probabilidad: 0.10 }, // 10%
        { funcion: usar5050, probabilidad: 0.25 },      // 20%
        { funcion: usarLlamada, probabilidad: 0.20 },   // 25%
        { funcion: perderJuego1, probabilidad: 0.10 },  // 15%
        { funcion: usarComite, probabilidad: 0.20 },    // 15%
        { funcion: usarSGSST, probabilidad: 0.15 }     // 15%
    ];

    // Filtrar la ayuda ya utilizada (si existe)
    if (ayudaUsada !== null) {
        ayudas = ayudas.filter(ayuda => ayuda.funcion !== ayudaUsada);

        // Reajustar probabilidades proporcionalmente
        let totalProbabilidad = ayudas.reduce((sum, ayuda) => sum + ayuda.probabilidad, 0);
        ayudas.forEach(ayuda => ayuda.probabilidad /= totalProbabilidad);
    }

    let rand = Math.random();
    let suma = 0;
    let ayudaSeleccionada = null;

    for (let ayuda of ayudas) {
        suma += ayuda.probabilidad;
        if (rand <= suma) {
            ayudaSeleccionada = ayuda.funcion;
            break;
        }
    }

    setTimeout(() => {
        Swal.close();
        ayudaSeleccionada();
    }, 3000);
}
