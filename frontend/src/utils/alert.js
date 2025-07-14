import Swal from 'sweetalert2';

// Campos incompletos
export const defaultAlert = (icon='info', title, text) => {
    return Swal.fire({
        icon,
        title,
        text,
        heightAuto: false
    });
};

// Cargando alerta
export const loadingAlert = (titulo='Buscando...', texto='Por favor espera un momento') => {
    return Swal.fire({
        title: titulo,
        text: texto,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
        heightAuto: false
    });
};

// Cerrar alerta
export const closeAlert = () => {
    Swal.close()
}

// Preguntar
export const confirmationQuestion = async (icono="question" ,titulo="Titulo", texto="Esta seguro?", confirmar="Si", denegar="No") => {
    const result = await Swal.fire({
        icon: icono,
        title: titulo,
        text: texto,
        showCancelButton: true,
        confirmButtonText: confirmar,
        cancelButtonText: denegar,
        heightAuto: false
    });
    return result.isConfirmed;
};

// Bienvenido
export const timedAlert = (icon, tittle, timer = 1500) => {
    return Swal.fire({
        position: "center",
        icon: icon,
        title: tittle,
        showConfirmButton: false,
        timer: timer
    });
}