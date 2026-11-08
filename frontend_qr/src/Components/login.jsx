import { useState } from "react";
import "../screens/Login.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../api"; // <--- Importamos la instancia centralizada que apunta al backend en Render

function Login() {
    const navigation = useNavigate();

    // Estados para capturar el correo, la contraseña y posibles errores
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const inicializarSesion = async (e) => {
        e.preventDefault(); 
        setError(null); // Limpiamos errores previos

        try {
            // Petición POST utilizando la instancia global 'api'
            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            // Verificamos si el backend respondió con éxito
            if (response.data.success) {
                const tokenReal = response.data.token;

                // Guardamos el token en el almacenamiento local
                localStorage.setItem('token', tokenReal);

                // Redirigimos al dashboard
                navigation("/dashboard");
            }
        } catch (error) {
            // Manejamos los errores del servidor
            if (error.response && error.response.data) {
                setError(error.response.data.message); 
            } else {
                setError("Error de conexión con el servidor.");
            }
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <img
                    src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                    alt="logo"
                    className="logo"
                />

                <h1>Pase de Lista QR</h1>

                <p className="subtitulo">
                    Iniciar sesión para continuar
                </p>

                {/* Mostrar mensaje de error visualmente si las credenciales fallan */}
                {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={inicializarSesion}>
                    Iniciar Sesión
                </button>

                <button
                    className="register-button"
                    onClick={() => navigation("/register")}
                >
                    Crear Cuenta
                </button>

                <p className="forgot-password">
                    <Link to="/forgot-password">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </p>

                <p className="footer">
                    Universidad Tecnológica del Valle del Mezquital
                </p>

            </div>
        </div>
    );
}

export default Login;