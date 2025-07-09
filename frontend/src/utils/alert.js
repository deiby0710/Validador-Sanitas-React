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