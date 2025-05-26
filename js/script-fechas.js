let fechasSeleccionadas = [];
            
// Configuración del datepicker con Flatpickr
const fp = flatpickr("#fechas-justificar-input", {
    mode: "single", // Modo single para seleccionar una fecha a la vez
    dateFormat: "d/m/Y",
    minDate: "06/04/2024",
    maxDate: "05/05/2025",
    locale: "es",
    allowInput: false,
    clickOpens: true,
    onChange: function(selectedDates, dateStr, instance) {
        if (selectedDates.length > 0) {
            agregarFecha(dateStr);
            instance.clear();
        }
    }
});
            
// Función para agregar una fecha
function agregarFecha(fechaStr) {
    // Verificar si la fecha ya está seleccionada
    if (!fechasSeleccionadas.includes(fechaStr)) {
        fechasSeleccionadas.push(fechaStr);
        actualizarDisplayFechas();
        actualizarInputHidden();
        actualizarValidacionFormulario();
    }
}
            
// Función para eliminar una fecha
function eliminarFecha(fechaStr) {
    const index = fechasSeleccionadas.indexOf(fechaStr);
    if (index > -1) {
        fechasSeleccionadas.splice(index, 1);
        actualizarDisplayFechas();
        actualizarInputHidden();
        actualizarValidacionFormulario();
    }
}
            
// Función para actualizar la visualización de fechas
function actualizarDisplayFechas() {
    const container = document.getElementById('fechas-seleccionadas-list');
    container.innerHTML = '';
    
    fechasSeleccionadas.forEach(fecha => {
        const fechaTag = document.createElement('div');
        fechaTag.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200';
        fechaTag.innerHTML = `
            <span class="mr-2">${fecha}</span>
            <button 
                type="button" 
                onclick="eliminarFecha('${fecha}')" 
                class="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                aria-label="Eliminar fecha ${fecha}">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        `;
        container.appendChild(fechaTag);
    });
    
    // Mostrar mensaje si no hay fechas seleccionadas
    if (fechasSeleccionadas.length === 0) {
        const mensajeVacio = document.createElement('div');
        mensajeVacio.className = 'text-gray-500 text-sm italic';
        mensajeVacio.textContent = 'No hay fechas seleccionadas';
        container.appendChild(mensajeVacio);
    }
}
            
// Función para actualizar el input hidden
function actualizarInputHidden() {
    const hiddenInput = document.getElementById('fechas-justificar-hidden');
    hiddenInput.value = fechasSeleccionadas.join(',');
}
            
// Función para actualizar la validación del formulario
function actualizarValidacionFormulario() {
    const inputVisible = document.getElementById('fechas-justificar-input');
    if (fechasSeleccionadas.length > 0) {
        inputVisible.removeAttribute('required');
        inputVisible.setCustomValidity('');
    } else {
        inputVisible.setAttribute('required', 'required');
        inputVisible.setCustomValidity('Debe seleccionar al menos una fecha');
    }
}
            
// function mostrarDatosFormulario() {
//     const form = document.getElementById('formulario-justificacion');
//     const formData = new FormData(form);
    
//     const datos = {
//         tipoDocumento: formData.get('tipoDocumento'),
//         numeroDocumento: formData.get('numeroDocumento'),
//         tipoEvento: formData.get('tipoEvento'),
//         tipoJustificacion: formData.get('tipoJustificacion'),
//         fechaSelector: formData.get('fechaSelector'),
//         fechasJustificar: formData.get('fechasJustificar'),
//         fechasArray: fechasSeleccionadas,
//         totalFechas: fechasSeleccionadas.length,
//         detallesEscritos: formData.get('detallesEscritos'),
//         evidenciaFotografica: formData.get('evidenciaFotografica')?.name || 'Sin archivo'
//     };
    
//     const datosDiv = document.getElementById('datos-formulario');
//     datosDiv.textContent = JSON.stringify(datos, null, 2);
//     datosDiv.classList.toggle('hidden');
// }

// // Manejar el envío del formulario
// document.getElementById('formulario-justificacion').addEventListener('submit', function(e) {
//     // Validar que haya al menos una fecha seleccionada
//     if (fechasSeleccionadas.length === 0) {
//         e.preventDefault();
//         alert('Por favor, selecciona al menos una fecha para justificar.');
//         return false;
//     }
    
//     // Aquí puedes agregar más validaciones o el envío al backend
//     console.log('Formulario enviado con éxito');
//     console.log('Fechas seleccionadas:', fechasSeleccionadas);
    
//     // Para desarrollo: mostrar datos antes de enviar (remover en producción)
//     // e.preventDefault();
//     // mostrarDatosFormulario();
// });

// Inicializar la vista
actualizarDisplayFechas();
actualizarValidacionFormulario();