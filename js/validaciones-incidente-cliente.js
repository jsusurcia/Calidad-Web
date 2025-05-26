document.addEventListener('DOMContentLoaded', function () {
    const tipoDocRadios = document.querySelectorAll('input[name="tipo-doc"]');
    const numDocumentoInput = document.getElementById('num-documento-cliente');
    const sucursalesSelect = document.getElementById('sucursales');
    const areasSelect = document.getElementById('areas');
    const empleadoSelect = document.getElementById('empleado');
    const evidenciaInput = document.getElementById('evidencia');
    
    // Validación de tipo de documento (habilitar el número de documento cuando se seleccione)
    tipoDocRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            numDocumentoInput.disabled = false;
        });
    });

    // Validación de sucursal (habilitar área cuando se seleccione una sucursal)
    sucursalesSelect.addEventListener('change', function () {
        areasSelect.disabled = false;
    });

    // Validación de área (habilitar empleado cuando se seleccione un área)
    areasSelect.addEventListener('change', function () {
        empleadoSelect.disabled = false;
    });

    // Validación para aceptar solo imágenes en el campo de archivo
    evidenciaInput.addEventListener('change', function () {
        const file = evidenciaInput.files[0];
        if (file) {
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(fileType)) {
                alert("Por favor, sube un archivo de imagen (JPG, PNG, GIF).");
                evidenciaInput.value = '';
            }
        }
    });
});
