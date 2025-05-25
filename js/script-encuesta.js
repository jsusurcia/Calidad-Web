// Objeto para almacenar las calificaciones
const calificaciones = {
    amabilidad: 0,
    rapidez: 0,
    calidad: 0
};

// Textos descriptivos para cada calificación
const textosCalificacion = {
    1: "Muy malo",
    2: "Malo", 
    3: "Regular",
    4: "Bueno",
    5: "Excelente"
};

// Inicializar el sistema de estrellas
function inicializarEstrellas() {
    const starButtons = document.querySelectorAll('.star-btn');
    
    starButtons.forEach(button => {
        // Evento click para seleccionar calificación
        button.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            const group = this.dataset.group;
            
            seleccionarCalificacion(group, rating);
        });

        // Evento hover para previsualizar
        button.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            const group = this.dataset.group;
            
            previsualizarCalificacion(group, rating);
        });
    });

    // Restaurar estado original al salir del hover
    document.querySelectorAll('[data-rating-group]').forEach(group => {
        group.addEventListener('mouseleave', function() {
            const groupName = this.dataset.ratingGroup;
            actualizarEstrellas(groupName, calificaciones[groupName]);
        });
    });
}

// Función para seleccionar una calificación
function seleccionarCalificacion(group, rating) {
    calificaciones[group] = rating;
    
    // Actualizar estrellas
    actualizarEstrellas(group, rating);
    
    // Actualizar input hidden
    document.getElementById(group + '-value').value = rating;
    
    // Actualizar texto descriptivo
    const textoElemento = document.getElementById(group + '-text');
    textoElemento.textContent = `${rating} estrella${rating > 1 ? 's' : ''} - ${textosCalificacion[rating]}`;
    textoElemento.className = 'text-sm text-blue-600 font-medium';
}

// Función para previsualizar calificación en hover
function previsualizarCalificacion(group, rating) {
    actualizarEstrellas(group, rating);
}

// Función para actualizar la visualización de las estrellas
function actualizarEstrellas(group, rating) {
    const groupContainer = document.querySelector(`[data-rating-group="${group}"]`);
    const stars = groupContainer.querySelectorAll('.star-btn');
    
    stars.forEach((star, index) => {
        const starRating = index + 1;
        const svg = star.querySelector('svg');
        
        if (starRating <= rating) {
            // Estrella seleccionada - dorada
            svg.classList.remove('text-gray-300');
            svg.classList.add('text-yellow-400');
        } else {
            // Estrella no seleccionada - gris
            svg.classList.remove('text-yellow-400');
            svg.classList.add('text-gray-300');
        }
    });
}

// Función para mostrar todos los datos de la encuesta (para desarrollo)
function mostrarDatosEncuesta() {
    const form = document.getElementById('formulario-encuesta');
    const formData = new FormData(form);
    
    const datos = {
        pregunta1: formData.get('pregunta1'),
        amabilidadMesero: formData.get('amabilidadMesero'),
        rapidezServicio: formData.get('rapidezServicio'), 
        calidadComida: formData.get('calidadComida'),
        comentariosAdicionales: formData.get('comentariosAdicionales'),
        calificacionesNuméricas: calificaciones,
        promedioCalificaciones: calcularPromedio()
    };
                
    const datosDiv = document.getElementById('datos-encuesta');
    datosDiv.textContent = JSON.stringify(datos, null, 2);
    datosDiv.classList.toggle('hidden');
}

// Función para calcular el promedio de calificaciones
function calcularPromedio() {
    const valores = Object.values(calificaciones).filter(val => val > 0);
    if (valores.length === 0) return 0;
    
    const suma = valores.reduce((acc, val) => acc + val, 0);
    return (suma / valores.length).toFixed(2);
}

// Manejar el envío del formulario
document.getElementById('formulario-encuesta').addEventListener('submit', function(e) {
    // Validar que al menos una pregunta de estrellas esté respondida
    const tieneCalificaciones = Object.values(calificaciones).some(val => val > 0);
    
    if (!tieneCalificaciones) {
        e.preventDefault();
        alert('Por favor, complete al menos una calificación con estrellas.');
        return false;
    }
                
    // Aquí puedes agregar el envío al backend
    console.log('Encuesta enviada con éxito');
    console.log('Calificaciones:', calificaciones);
    
    // Para desarrollo: mostrar datos antes de enviar (remover en producción)
    // e.preventDefault();
    // mostrarDatosEncuesta();
});

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarEstrellas();
});