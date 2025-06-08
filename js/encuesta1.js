// Sistema dinámico de calificaciones - Detecta automáticamente todos los grupos de estrellas
const calificaciones = {};

// Textos descriptivos para cada calificación
const textosCalificacion = {
    1: "Muy malo",
    2: "Malo", 
    3: "Regular",
    4: "Bueno",
    5: "Excelente"
};

// Inicializar el sistema de preguntas 'Si o No'
function inicializarSiNo() {
    const preguntasSiNo = document.querySelectorAll('input[type="radio"][name^="pregunta"]');

    preguntasSiNo.forEach(input => {
        input.addEventListener('change', function() {
            const group = this.name;  // El nombre de la pregunta (e.g., pregunta2, pregunta3)
            const value = this.value; // El valor de la respuesta ("si" o "no")
            
            // Asignar puntos según la respuesta
            if (value === "si") {
                calificaciones[group] = 5;
            } else {
                calificaciones[group] = 0;
            }
        });
    });
}

// Inicializar el sistema de estrellas dinámicamente
function inicializarEstrellas() {
    const gruposEstrella = document.querySelectorAll('[data-rating-group]');
    
    gruposEstrella.forEach(grupo => {
        const nombreGrupo = grupo.dataset.ratingGroup;
        calificaciones[nombreGrupo] = 0;
    });

    const starButtons = document.querySelectorAll('.star-btn');
    
    starButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            const group = this.dataset.group;
            seleccionarCalificacion(group, rating);
        });

        button.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            const group = this.dataset.group;
            previsualizarCalificacion(group, rating);
        });
    });

    gruposEstrella.forEach(grupo => {
        grupo.addEventListener('mouseleave', function() {
            const groupName = this.dataset.ratingGroup;
            actualizarEstrellas(groupName, calificaciones[groupName]);
        });
    });
}

// Función para seleccionar una calificación
function seleccionarCalificacion(group, rating) {
    calificaciones[group] = rating;
    actualizarEstrellas(group, rating);
    
    const hiddenInput = document.getElementById(group + '-value');
    if (hiddenInput) {
        hiddenInput.value = rating;
    }
    
    const textoElemento = document.getElementById(group + '-text');
    if (textoElemento) {
        textoElemento.textContent = `${rating} estrella${rating > 1 ? 's' : ''} - ${textosCalificacion[rating]}`;
        textoElemento.className = 'text-sm text-blue-600 font-medium';
    }
}

// Función para previsualizar calificación en hover
function previsualizarCalificacion(group, rating) {
    actualizarEstrellas(group, rating);
}

// Función para actualizar la visualización de las estrellas
function actualizarEstrellas(group, rating) {
    const groupContainer = document.querySelector(`[data-rating-group="${group}"]`);
    if (!groupContainer) return;
    
    const stars = groupContainer.querySelectorAll('.star-btn');
    
    stars.forEach((star, index) => {
        const starRating = index + 1;
        const svg = star.querySelector('svg');
        
        if (starRating <= rating) {
            svg.classList.remove('text-gray-300');
            svg.classList.add('text-yellow-400');
        } else {
            svg.classList.remove('text-yellow-400');
            svg.classList.add('text-gray-300');
        }
    });
}

// Función para mostrar todos los datos de la encuesta (para desarrollo)
function mostrarDatosEncuesta() {
    const form = document.getElementById('formulario-encuesta');
    const formData = new FormData(form);
    
    const datos = {};
    for (let [key, value] of formData.entries()) {
        datos[key] = value;
    }
    
    datos.calificacionesNumericas = calificaciones;
    datos.promedioCalificaciones = calcularPromedio();
    datos.totalPreguntas = Object.keys(calificaciones).length;
    datos.preguntasRespondidas = Object.values(calificaciones).filter(val => val > 0).length;
                
    const datosDiv = document.getElementById('datos-encuesta');
    datosDiv.textContent = JSON.stringify(datos, null, 2);
    datosDiv.classList.toggle('hidden');
}

// Función para calcular el promedio de calificaciones
function calcularPromedio() {
    // const valores = Object.values(calificaciones).filter(val => val > 0);
    const valores = Object.values(calificaciones);
    if (valores.length === 0) return 0;
    
    const suma = valores.reduce((acc, val) => acc + val, 0);
    return (suma / valores.length).toFixed(2);
}

// Manejar el envío del formulario
document.getElementById('formulario-encuesta').addEventListener('submit', function(e) {
    const tieneCalificaciones = Object.values(calificaciones).some(val => val > 0);
    
    if (!tieneCalificaciones) {
        e.preventDefault();
        alert('Por favor, complete al menos una calificación con estrellas.');
        return false;
    }
                
    e.preventDefault();
    mostrarDatosEncuesta();
});

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarEstrellas();
    inicializarSiNo();
});
