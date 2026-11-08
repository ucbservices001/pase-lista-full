import api from "../api"; // <--- Importamos la instancia centralizada de Axios

export const getMaestros = async () => {
    try {
        const respuesta = await api.get("/maestros");
        console.log("RESPUESTA API MAESTROS:", respuesta.data);
        return respuesta.data;
    } catch (error) {
        console.error("Error al obtener maestros:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.msg ||
            error.response?.data?.message ||
            "No fue posible obtener los maestros"
        );
    }
};

export const createMaestro = async (maestro) => {
    try {
        const respuesta = await api.post("/maestros", {
            nombre: maestro.nombre,
            email: maestro.email,
            password: maestro.password,
            numeroEmpleado: maestro.numeroEmpleado,
            telefono: maestro.telefono || null
        });
        return respuesta.data;
    } catch (error) {
        console.error("Error al crear maestro:", error.response?.data || error);
        return null;
    }
};

export const updateMaestro = async (id, maestro) => {
    try {
        const respuesta = await api.put(`/maestros/${id}`, {
            nombre: maestro.nombre,
            email: maestro.email, 
            numeroEmpleado: maestro.numeroEmpleado,
            telefono: maestro.telefono
        });
        return respuesta.data;
    } catch (error) {
        console.error("Error al actualizar maestro:", error.response?.data || error);
        return null;
    }
};

export const deleteMaestro = async (id) => {
    try {
        const respuesta = await api.delete(`/maestros/${id}`);
        return respuesta.data;
    } catch (error) {
        console.error("Error al eliminar maestro:", error.response?.data || error);
        return null;
    }
};

// --- Parte o implementación Diego C. A. ---
export const importarMaestros = async (datos) => {
    try {
        const respuesta = await api.post("/maestros/importar", datos);
        return respuesta.data;
    } catch (error) {
        console.error("Error al importar maestros:", error.response?.data || error);
        return { success: false, msg: error.response?.data?.msg || "Error de conexión en importación" };
    }
};