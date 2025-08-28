let comidas = [];
 
const frasesBienvenida = [
    "me alegra que estés aquí.",
    "tu sonrisa hace especial este proyecto.",
    "esta ruleta es solo una excusa para recordarte cuánto te amo.",
    "hoy será un gran día porque estás tú.",
    "todo lo que hago, lo hago con amor por ti.",
    "estás en mis pensamientos todo el tiempo.",
    "tú haces que todo valga la pena.",
];

function obtenerFraseBienvenida() {
    return frasesBienvenida[Math.floor(Math.random() * frasesBienvenida.length)];
}
 
Swal.fire({
    icon: 'info',
    title: 'Hola de nuevo amor 💖',
    text: obtenerFraseBienvenida(),
    confirmButtonText: '🥰'
});

const frasesLindas = [
    "Estas hermosa.",
    "Tu esposo te ama.",
    "Eres lo mejor de mi vida.",
    "Gracias por existir.",
    "Tu sonrisa alegra mi mundo.",
    "No olvides que te amo.",
    "Contigo todo es mejor.",
    "Hola miau mor 😻. ",
    "No hay nadie como tú 😉. ",
    "Tú eres la flor más linda 🌼.",
    "Podazón! tu amor me hace gigante.",
    "Cayó un unicornio en tu patio y vas a ver que darle de comer?",
    "Eres mi dulce favorito de la gota de miel 😋."
];

function obtenerFraseLinda() {
    return frasesLindas[Math.floor(Math.random() * frasesLindas.length)];
}

// Función para actualizar estadísticas (NUEVA)
function actualizarStats() {
    $('#totalComidas').text(comidas.length);
    $('#totalElegidas').text($('#tbElegidas tbody tr').not(':has(.empty-state)').length);
}

function cargarComidas() {
    const data = localStorage.getItem("comidas");
    if (data) {
        comidas = JSON.parse(data);
        renderizarTabla();
    }
    actualizarStats(); // NUEVA: Actualizar stats al cargar
}

function guardarComidas() {
    localStorage.setItem("comidas", JSON.stringify(comidas));
    actualizarStats(); // NUEVA: Actualizar stats al guardar
}

// MEJORADA: Nueva función de renderizado con iconos y botones bonitos
function renderizarTabla() {
    const $tbody = $("#tbComidas tbody");
    $tbody.empty();
    
    if (comidas.length === 0) {
        $tbody.append(`
            <tr>
                <td colspan="2" class="empty-state">
                    <i class="fas fa-plate-wheat"></i>
                    <p>No hay comidas agregadas aún.<br>¡Empieza agregando tus platillos favoritos!</p>
                </td>
            </tr>
        `);
        return;
    }
    
    comidas.forEach((comida, index) => {
        $tbody.append(`
            <tr class="fade-in">
                <td>
                    <div class="food-item">
                        <div class="food-icon">
                            <i class="fas fa-utensils"></i>
                        </div>
                        ${comida}
                    </div>
                </td>
                <td>
                    <button class="btn btn-danger btn-small" onclick="eliminarComida(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

// MEJORADA: Confirmación con SweetAlert2 antes de eliminar
function eliminarComida(index) {
    const comida = comidas[index];
    
    Swal.fire({
        title: '¿Estás seguro mi amor?',
        text: `¿Quieres eliminar "${comida}" de tu lista?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ff6a88',
        cancelButtonColor: '#667eea',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Mejor no'
    }).then((result) => {
        if (result.isConfirmed) {
            comidas.splice(index, 1);
            guardarComidas();
            renderizarTabla();

            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: `${comida} fue eliminado de tu lista. ${obtenerFraseLinda()}`,
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

// MEJORADA: Validaciones y mensajes bonitos
$("#btnAgregar").on("click", function () {
    const comida = $("#txtComida").val().trim();
    
    // Validación: campo vacío
    if (!comida) {
        Swal.fire({
            icon: 'warning',
            title: '¡Oops mi amor!',
            text: 'Por favor escribe el nombre de una comida',
            confirmButtonText: 'Okey 💕'
        });
        return;
    }
    
    // NUEVA: Validación de duplicados
    if (comidas.includes(comida)) {
        Swal.fire({
            icon: 'info',
            title: 'Ya existe esa comida',
            text: `"${comida}" ya está en tu lista preciosa`,
            confirmButtonText: 'Entendido 😊'
        });
        return;
    }
    
    comidas.push(comida);
    guardarComidas();
    renderizarTabla();
    $("#txtComida").val('');
    
    // MEJORADA: Mensaje de éxito con frase linda
    Swal.fire({
        icon: 'success',
        title: '¡Agregado!',
        text: `${comida} se agregó a tu lista. ${obtenerFraseLinda()}`,
        timer: 2000,
        showConfirmButton: false
    });
});

// MEJORADA: Mejor manejo de la ruleta con animación
$("#btnGirar").on("click", function () {
    const seleccionadas = [...comidas];
    
    if (seleccionadas.length < 6) {
        Swal.fire({
            icon: 'warning',
            title: 'Necesitas más comidas mi amor',
            text: "Debe haber al menos 6 comidas registradas para girar la ruleta.",
            confirmButtonText: 'Entendido 💖'
        });
        return;
    }
    
    // NUEVA: Animación de giro
    const $btnGirar = $(this);
    $btnGirar.addClass('spin');
    $btnGirar.prop('disabled', true);
    
    setTimeout(() => {
        $btnGirar.removeClass('spin');
        $btnGirar.prop('disabled', false);
        
        seleccionadas.sort(() => Math.random() - 0.5);
        const elegidas = seleccionadas.slice(0, 6);

        const $tbody = $("#tbElegidas tbody");
        $tbody.empty();
        
        elegidas.forEach(comida => {
            $tbody.append(`
                <tr class="fade-in">
                    <td>
                        <div class="food-item">
                            <div class="food-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            ${comida}
                        </div>
                    </td>
                </tr>
            `);
        });
        
        actualizarStats(); // NUEVA: Actualizar stats después de girar
        
        // MEJORADA: Mensaje de éxito con frase linda
        Swal.fire({
            icon: 'success',
            title: '¡Ruleta girada!',
            text: `Se eligieron tus 6 comidas para esta semana. ${obtenerFraseLinda()}`,
            confirmButtonText: 'Gracias mi amor 💕'
        });
    }, 1000);
});

// MEJORADA: Mejor manejo de exportar
$("#btnExportar").on("click", function () {
    if (comidas.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'No hay comidas que exportar',
            text: 'Agrega algunas comidas primero mi amor',
            confirmButtonText: 'Okey 💖'
        });
        return;
    }
    
    const blob = new Blob([JSON.stringify(comidas, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "comidas-familia-rodriguez.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // NUEVA: Mensaje de confirmación
    Swal.fire({
        icon: 'success',
        title: '¡Exportado!',
        text: `Tus comidas se descargaron correctamente. ${obtenerFraseLinda()}`,
        timer: 2000,
        showConfirmButton: false
    });
});

// Botón para abrir el selector de archivo
$("#btnImportar").on("click", function () {
    $("#fileImportar").click();
});

// MEJORADA: Mejor manejo de importar con validaciones
$("#fileImportar").on("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                comidas = data;
                guardarComidas();
                renderizarTabla();
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: `Comidas importadas con éxito. ${obtenerFraseLinda()}`,
                    confirmButtonText: '💖 Gracias guapo'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el archivo',
                    text: "El archivo no contiene una lista válida de comidas.",
                    confirmButtonText: 'Entendido'
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error al leer el archivo',
                text: "No se pudo leer el archivo: " + err.message,
                confirmButtonText: 'Entendido'
            });
        }
    };
    reader.readAsText(file);

    // Limpiar el input para que se pueda volver a seleccionar el mismo archivo después
    $(this).val('');
});

// NUEVA: Funcionalidad de Enter para agregar comida
$("#txtComida").keypress(function(e) {
    if (e.which === 13) { // Enter key
        $("#btnAgregar").click();
    }
});

// NUEVA: Inicializar tabla de elegidas con estado vacío
function inicializarTablaElegidas() {
    const $tbody = $("#tbElegidas tbody");
    if ($tbody.find('tr').length === 0) {
        $tbody.append(`
            <tr>
                <td class="empty-state">
                    <i class="fas fa-magic"></i>
                    <p>¡Usa la ruleta para elegir tus comidas!</p>
                </td>
            </tr>
        `);
    }
}

// Inicializar
$(document).ready(function() {
    cargarComidas();
    inicializarTablaElegidas();
    actualizarStats();
});