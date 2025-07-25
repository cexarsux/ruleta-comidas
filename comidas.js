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
    confirmButtonText: '🥰 Muack!'
});

    function cargarComidas() {
        const data = localStorage.getItem("comidas");
        if (data) {
            comidas = JSON.parse(data);
            renderizarTabla();
        }
    }

    function guardarComidas() {
        localStorage.setItem("comidas", JSON.stringify(comidas));
    }

    function renderizarTabla() {
        const $tbody = $("#tbComidas tbody");
        $tbody.empty();
        comidas.forEach((comida, index) => {
            $tbody.append(`
                <tr>
                    <td>${comida}</td>
                    <td>
                        <button onclick="eliminarComida(${index})">Eliminar</button>
                    </td>
                </tr>
            `);
        });
    }

    function eliminarComida(index) {
        comidas.splice(index, 1);
        guardarComidas();
        renderizarTabla();
    }

    $("#btnAgregar").on("click", function () {
        const comida = $("#txtComida").val().trim();
        if (comida) {
            comidas.push(comida);
            guardarComidas();
            renderizarTabla();
            $("#txtComida").val('');
        }
    });

    $("#btnGirar").on("click", function () {
        const seleccionadas = [...comidas];
        if (seleccionadas.length < 6) {
            alert("Debe haber al menos 6 comidas registradas para girar la ruleta.");
            return;
        }
        seleccionadas.sort(() => Math.random() - 0.5);
        const elegidas = seleccionadas.slice(0, 6);

        const $tbody = $("#tbElegidas tbody");
        $tbody.empty();
        elegidas.forEach(comida => {
            $tbody.append(`<tr><td>${comida}</td></tr>`);
        });
    });

    $("#btnExportar").on("click", function () {
        const blob = new Blob([JSON.stringify(comidas, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "comidas.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // Botón para abrir el selector de archivo
$("#btnImportar").on("click", function () {
    $("#fileImportar").click();
});

const frasesLindas = [
    "Estas hermosa.",
    "Tu esposo te ama.",
    "Eres lo mejor de mi vida.",
    "Gracias por existir.",
    "Tu sonrisa alegra mi mundo.",
    "Siempre estoy pensando en ti.",
    "No olvides que te amo.",
    "Soy afortunado de tenerte.",
    "Contigo todo es mejor."
];


function obtenerFraseLinda() {
    return frasesLindas[Math.floor(Math.random() * frasesLindas.length)];
}


// Leer el archivo importado
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
					text: "Comidas importadas con éxito. " + obtenerFraseLinda(),
					confirmButtonText: '💖 Gracias guapo'
				});

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "El archivo no contiene una lista válida de comidas."
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Error al leer el archivo: " + err.message
            });
        }
    };
    reader.readAsText(file);

    // Limpiar el input para que se pueda volver a seleccionar el mismo archivo después
    $(this).val('');
});


    // Inicializar
    cargarComidas();