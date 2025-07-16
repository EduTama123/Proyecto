// Obtener elementos del DOM
const formContacto = document.getElementById('formContacto');
const inputNombre = document.getElementById('nombres');
const inputApellido = document.getElementById('apellidos');
const inputEmail = document.getElementById('email');
const inputTelefono = document.getElementById('phone');
const inputCodigoPostal = document.getElementById('codigo-postal');
const inputPais = document.getElementById('pais');
const inputFechaNacimiento = document.getElementById('fecha-nacimiento');
const inputMensaje = document.getElementById('message');
const botonEnviar = document.getElementById('botonEnviar');

// Remover atributos required para usar nuestras validaciones
document.querySelectorAll('[required]').forEach(el => {
    el.removeAttribute('required');
});

// FUNCIONES DE VALIDACIÓN

// Validar Nombre
const validarNombre = () => {
    const valor = inputNombre.value.trim();
    const errorElement = document.getElementById('errorNombre');

    if (valor === '') {
        mostrarError(inputNombre, errorElement, 'El nombre es obligatorio. Ejemplo: Daniel Fernado');
        return false;
    }

    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s']+$/;
    if (!regex.test(valor)) {
        mostrarError(inputNombre, errorElement, 'Solo se permiten letras y espacios');
        return false;
    }

    mostrarValido(inputNombre, errorElement);
    return true;
};

// Validar Apellido
const validarApellido = () => {
    const valor = inputApellido.value.trim();
    const errorElement = document.getElementById('errorApellido');

    if (valor === '') {
        mostrarError(inputApellido, errorElement, 'El apellido es obligatorio. Ejemplo: Escobar Piedra');
        return false;
    }

    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s']+$/;
    if (!regex.test(valor)) {
        mostrarError(inputApellido, errorElement, 'Solo se permiten letras y espacios');
        return false;
    }

    mostrarValido(inputApellido, errorElement);
    return true;
};

// Validar Email
const validarEmail = () => {
    const valor = inputEmail.value.trim();
    const errorElement = document.getElementById('errorEmail');

    if (valor === '') {
        mostrarError(inputEmail, errorElement, 'El email es obligatorio. Ejemplo: estudiante@itsqmet.com');
        return false;
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(valor)) {
        mostrarError(inputEmail, errorElement, 'Ingrese un email válido');
        return false;
    }

    mostrarValido(inputEmail, errorElement);
    return true;
};

// Validar Teléfono
const validarTelefono = () => {
    const valor = inputTelefono.value.trim();
    const errorElement = document.getElementById('errorTelefono');

    if (valor === '') {
        mostrarError(inputTelefono, errorElement, 'El teléfono es obligatorio. Ejemplo: 0987654321');
        return false;
    }

    if (!valor.startsWith('0')) {
        mostrarError(inputTelefono, errorElement, 'El teléfono debe comenzar con 0. Ejemplo: 0987654321');
        return false;
    }

    if (valor.length !== 10) {
        mostrarError(inputTelefono, errorElement, 'El teléfono debe tener 10 dígitos. Ejemplo: 0987654321');
        return false;
    }

    const regex = /^[0-9]+$/;
    if (!regex.test(valor)) {
        mostrarError(inputTelefono, errorElement, 'Solo se permiten números. Ejemplo: 0987654321');
        return false;
    }

    mostrarValido(inputTelefono, errorElement);
    return true;
};

// Validar Código Postal
const validarCodigoPostal = () => {
    const valor = inputCodigoPostal.value.trim();
    const errorElement = document.getElementById('errorCodigoPostal');

    if (valor === '') {
        mostrarError(inputCodigoPostal, errorElement, 'El código postal es obligatorio');
        return false;
    }

    const regex = /^[0-9]{4,6}$/;
    if (!regex.test(valor)) {
        mostrarError(inputCodigoPostal, errorElement, 'Código postal inválido (4-6 dígitos)');
        return false;
    }

    mostrarValido(inputCodigoPostal, errorElement);
    return true;
};

// Validar País (como input text)
const validarPais = () => {
    const valor = inputPais.value.trim();
    const errorElement = document.getElementById('errorPais');

    if (valor === '') {
        mostrarError(inputPais, errorElement, 'El país es obligatorio');
        return false;
    }

    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!regex.test(valor)) {
        mostrarError(inputPais, errorElement, 'Solo se permiten letras y espacios');
        return false;
    }

    if (valor.length < 3) {
        mostrarError(inputPais, errorElement, 'El nombre del país es muy corto');
        return false;
    }

    mostrarValido(inputPais, errorElement);
    return true;
};

// Validar Fecha de Nacimiento
const validarFechaNacimiento = () => {
    const valor = inputFechaNacimiento.value;
    const errorElement = document.getElementById('errorFechaNacimiento');

    if (valor === '') {
        mostrarError(inputFechaNacimiento, errorElement, 'La fecha de nacimiento es obligatoria');
        return false;
    }

    const fechaNacimiento = new Date(valor);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    if (edad < 18) {
        mostrarError(inputFechaNacimiento, errorElement, 'Debe ser mayor de 18 años');
        return false;
    }

    mostrarValido(inputFechaNacimiento, errorElement);
    return true;
};

// Validar Mensaje
const validarMensaje = () => {
    const valor = inputMensaje.value.trim();
    const errorElement = document.getElementById('errorMensaje');

    if (valor === '') {
        mostrarError(inputMensaje, errorElement, 'El mensaje es obligatorio');
        return false;
    }

    if (valor.length < 10) {
        mostrarError(inputMensaje, errorElement, 'El mensaje debe tener al menos 10 caracteres');
        return false;
    }

    mostrarValido(inputMensaje, errorElement);
    return true;
};

// Funciones auxiliares para mostrar errores/válidos
const mostrarError = (input, errorElement, mensaje) => {
    errorElement.textContent = mensaje;
    errorElement.className = 'error text-red-600 text-sm mt-1';
    input.classList.remove('border-gray-300', 'border-green-500');
    input.classList.add('border-red-500');
};

const mostrarValido = (input, errorElement) => {
    errorElement.textContent = '';
    errorElement.className = 'error';
    input.classList.remove('border-gray-300', 'border-red-500');
    input.classList.add('border-green-500');
};

//VERIFICAR SI SE CUMPLEN LAS CONDICIONES Y HABILITAR EL BOTON
const validarFormulario = () => {
    if (validarNombre() && validarApellido() && validarEmail() && validarTelefono() && validarCodigoPostal() && validarPais() && validarFechaNacimiento() && validarMensaje()) {
        botonEnviar.disabled = false;
    } else {
        botonEnviar.disabled = true;
    }
};
// MANEJO DE EVENTOS EN TIEMPO REAL
inputNombre.addEventListener('input', () => {
    validarNombre();
    validarFormulario();
});

inputApellido.addEventListener('input', () => {
    validarApellido();
    validarFormulario();
});

inputEmail.addEventListener('input', () => {
    validarEmail();
    validarFormulario();
});

inputTelefono.addEventListener('input', () => {
    validarTelefono();
    validarFormulario();
});

inputCodigoPostal.addEventListener('input', () => {
    validarCodigoPostal();
    validarFormulario();
});

inputPais.addEventListener('input', () => {
    validarPais();
    validarFormulario();
});

inputFechaNacimiento.addEventListener('change', () => {
    validarFechaNacimiento();
    validarFormulario();
});

inputMensaje.addEventListener('input', () => {
    validarMensaje();
    validarFormulario();
});

//SIMULACIÓN DEL ENVÍO DEL FORMULARIO ASÍNCRONO CON UNA PROMESA
const mensajeExitoso = document.querySelector('#registroExitoso');
const enviarFormulario = async () => {
    mensajeExitoso.textContent = "Enviando...";
    await new Promise(resolve => setTimeout(resolve, 1500));
    mensajeExitoso.textContent = "Formulario enviado con éxito!!!";
    formContacto.reset();
    inputNombre.classList.remove('border-green-500');
    inputApellido.classList.remove('border-green-500');
    inputEmail.classList.remove('border-green-500');
    inputTelefono.classList.remove('border-green-500');
    inputCodigoPostal.classList.remove('border-green-500');
    inputPais.classList.remove('border-green-500');
    inputFechaNacimiento.classList.remove('border-green-500');
    inputMensaje.classList.remove('border-green-500');
    botonEnviar.disabled = true;
};

// Función para generar y mostrar la tabla (versión corregida)
const generarTabla = () => {
    const tablaRegistrosBody = document.getElementById('tableBody');

    // Obtener valores
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('phone').value;
    const codigoPostal = document.getElementById('codigo-postal').value;
    const pais = document.getElementById('pais').value;
    const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
    const mensaje = document.getElementById('message').value;

    // Limpiar tabla existente
    tablaRegistrosBody.innerHTML = '';

    // Función auxiliar para agregar filas
    const agregarFila = (campo, valor) => {
        const fila = document.createElement('tr');
        fila.className = 'hover:bg-gray-50';
        fila.innerHTML = `
            <td class="p-3 text-sm text-gray-700 font-medium whitespace-nowrap">${campo}</td>
            <td class="p-3 text-sm text-gray-900">${valor}</td>
        `;
        tablaRegistrosBody.appendChild(fila);
    };

    // Agregar todas las filas
    agregarFila('Nombres', nombres);
    agregarFila('Apellidos', apellidos);
    agregarFila('Correo electrónico', email);
    agregarFila('Teléfono', telefono);
    agregarFila('Código Postal', codigoPostal);
    agregarFila('País', pais);
    agregarFila('Fecha de Nacimiento', fechaNacimiento);

    // Manejo especial para el mensaje (puede ser largo)
    const filaMensaje = document.createElement('tr');
    filaMensaje.className = 'hover:bg-gray-50';
    filaMensaje.innerHTML = `
        <td class="p-3 text-sm text-gray-700 font-medium whitespace-nowrap align-top">Mensaje</td>
        <td class="p-3 text-sm text-gray-900">
            <div class="max-h-32 overflow-y-auto whitespace-pre-wrap">${mensaje}</div>
        </td>
    `;
    tablaRegistrosBody.appendChild(filaMensaje);

    // Mostrar tabla
    document.getElementById('resultTable').classList.remove('hidden');
    document.getElementById('resultTable').scrollIntoView({ behavior: 'smooth' });
};

// Manejar el envío del formulario
formContacto.addEventListener('submit', function (e) {
    e.preventDefault();


    // Validar todos los campos nuevamente
    const esValido = validarNombre() &&
        validarApellido() &&
        validarEmail() &&
        validarTelefono() &&
        validarCodigoPostal() &&
        validarPais() &&
        validarFechaNacimiento() &&
        validarMensaje();

    if (esValido) {
        // Mostrar la tabla con los datos
        generarTabla();

        // Enviar el formulario
        enviarFormulario();

        // Desplazarse a la tabla
        document.getElementById('resultTable').scrollIntoView({
            behavior: 'smooth'
        });
    } else {
        // Mostrar mensaje de error si algún campo no es válido
        const mensajeError = document.createElement('div');
        mensajeError.className = 'bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mt-4';
        mensajeError.textContent = 'Por favor complete todos los campos correctamente';

        // Insertar el mensaje de error
        const formParent = formContacto.parentNode;
        const existingError = formParent.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        formParent.insertBefore(mensajeError, formContacto.nextSibling);
        mensajeError.classList.add('error-message');

        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeError.remove();
        }, 3000);
    }
});

// Manejar el envío del formulario
validarFormulario();

// Función para formatear los nombres de los campos
function formatFieldName(key) {
    const fieldNames = {
        'nombres': 'Nombres',
        'apellidos': 'Apellidos',
        'email': 'Correo electrónico',
        'telefono': 'Teléfono/Celular',
        'consulta': 'Tipo de consulta',
        'productos': 'Productos de interés',
        'cantidad': 'Cantidad estimada',
        'mensaje': 'Mensaje'
    };
    return fieldNames[key] || key;
}

