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
export const loadingAlert = () => {
    return Swal.fire({
        title: 'Buscando...',
        text: 'Por favor espera un momento',
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