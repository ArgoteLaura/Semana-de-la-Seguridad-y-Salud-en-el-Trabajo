document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnEmpezar").addEventListener("click", iniciarJuego);
    document.getElementById("btnAyudaAleatoria1").addEventListener("click", usarAyudaAleatoria1);
    document.getElementById("btnAyudaAleatoria2").addEventListener("click", usarAyudaAleatoria2);
});

const preguntas = [
    {
        pregunta: "1. ¿Qué significan las siglas COPASST?",
        opciones: ["a. Comité de Paz, Salud y Seguridad en el Trabajo.",
        "b. Comité Paritario Asociado y Seguro en el Trabajo.",
        "c. Conformación Paritaria de Seguridad y Salud en el Trabajo.",
        "d. Comité Paritario de Seguridad y Salud en el Trabajo."],
        respuesta: 3
    },
    {
        pregunta: "2. ¿Cuál es la función principal del COPASST?",
        opciones: ["a. Gestionar las actividades recreativas de los empleados.",
        "b. Velar por la implementación de programas de bienestar social.",
        "c. Promover y vigilar las normas de seguridad y salud en el trabajo.",
        "d. Administrar los recursos financieros del área de seguridad."],
        respuesta: 2
    },
    {
        pregunta: "3. ¿Cuál de las siguientes es una responsabilidad del COPASST?",
        opciones: ["a. Administrar los contratos laborales de los empleados.",
        "b. Investigar los accidentes de trabajo y proponer medidas correctivas.",
        "c. Supervisar el rendimiento productivo de los empleados.",
        "d. Gestionar los permisos de vacaciones de los empleados."],
        respuesta: 1
    },
    {
        pregunta: "4. ¿Qué debe hacer el COPASST ante la identificación de condiciones peligrosas en el lugar de trabajo?",
        opciones: ["a. Elaborar un informe anual de productividad.",
        "b. Notificar a las autoridades locales de inmediato.",
        "c. Recomendar medidas correctivas y de prevención.",
        "d. Despedir a los empleados que estén en riesgo."],
        respuesta: 2
    },
    {
        pregunta: "5. ¿Quiénes conforman el COPASST dentro de una empresa?",
        opciones: ["a. Solo los directivos de la empresa.",
        "b. Representantes de los empleadores y trabajadores en partes iguales.",
        "c. Solo los representantes de los trabajadores.",
        "d. Un representante del departamento de recursos humanos."],
        respuesta: 1
    },
    {
        pregunta: "6. ¿Cuál es el principal compromiso de SINERGY con los funcionarios para procurar la Seguridad y Salud en el Trabajo?",
        opciones: ["a. Aumentar la productividad de los empleados.",
        "b. Implementar un Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST).",
        "c. Reducir costos operativos.",
        "d. Ampliar la oferta de servicios."],
        respuesta: 1
    },
    {
        pregunta: "7. ¿Qué aspecto se busca promover a través de la implementación del SG-SST?",
        opciones: ["a. La competitividad en el mercado.",
        "b. La prevención de riesgos laborales y la protección de la salud y seguridad de los trabajadores.",
        "c. La expansión de la empresa.",
        "d. La innovación tecnológica."],
        respuesta: 1
    },
    {
        pregunta: "8. ¿Cómo se lleva a cabo la identificación de riesgos en la organización?",
        opciones: ["a. A través de encuestas anuales.",
        "b. Solo en caso de accidentes.",
        "c. No se realizará identificación de riesgos.",
        "d. Mediante la evaluación y valoración de peligros."],
        respuesta: 3
    },
    {
        pregunta: "9. ¿Qué recursos se destinan para la implementación del SG-SST?",
        opciones: ["a. Recursos financieros, técnicos y humanos.",
        "b. Solo recursos humanos.",
        "c. Recursos solo para capacitaciones.",
        "d. No se destinarán recursos específicos."],
        respuesta: 0
    },
    {
        pregunta: "10. ¿A quién se debe informar la política de seguridad y salud en el trabajo a los empleados?",
        opciones: ["a. Solo en reuniones trimestrales.",
        "b. A través de correos electrónicos.",
        "c. Se debe informar a todo el personal vinculado contractualmente con SINERGY.",
        "d. No se comunicará formalmente."],
        respuesta: 2
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
        Swal.fire({
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
            Swal.fire({
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
                Eres el gran ganador de <strong>"103 Funcionarios Dicen"</strong> sobre el comité de COPASST. </p> 
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

function iniciarTemporizador() {
    clearInterval(intervaloTiempo);
    tiempoRestante = 30;
    document.getElementById("tiempo").innerText = tiempoRestante;
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        document.getElementById("tiempo").innerText = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            Swal.fire({
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
    
    Swal.fire({
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
    Swal.fire({
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
    Swal.fire({
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
    Swal.fire({
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
    Swal.fire({
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
    Swal.fire({ 
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
    Swal.fire({ 
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
        Swal.fire({
            title: "Comodín ya utilizado",
            text: "Ya has usado este comodín anteriormente",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
        return;
    }
    
    comodin1Usado = true;
    
    Swal.fire({
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
        Swal.fire({
            title: "Comodín ya utilizado",
            text: "Ya has usado este comodín anteriormente",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
        return;
    }
    
    comodin2Usado = true;
    
    Swal.fire({
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
