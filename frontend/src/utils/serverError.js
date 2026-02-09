// utils/serverError.js
import { defaultAlert } from "../utils/alert";

let showingServerError = false;

export const handleServerError = (status) => {
    if (showingServerError) return;
    showingServerError = true;

    defaultAlert(
        "error",
        "Servicio no disponible",
        "En este momento los servicios de Sanitas no están disponibles. Intenta más tarde."
    );

    setTimeout(() => {
        showingServerError = false;
    }, 3000);
};