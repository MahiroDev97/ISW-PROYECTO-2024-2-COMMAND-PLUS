import '../styles/activeturno.css';
import { useNavigate } from 'react-router-dom';
import useTurnoError from '../hooks/turno/useTurnoError.jsx';
import { createTurno } from '../services/turno.service.js';
import useUser from '../hooks/auth/useUser';

const ActiveTurno = () => {
    const navigate = useNavigate();
    const { error, handleError, clearError } = useTurnoError();
    const user = useUser();

    if (user.active) {
        user.rol === 'garzon' ? navigate('/comandas') : navigate('/cocina');
    }

    const activeTurno = async () => {
        try {
            clearError();
            console.log('activeTurno del button activado');
            const response = await createTurno();
            console.log('response', response);
            if (response.status === 'Success') {
                console.log('response.status === Success');
                navigate("/home");
            } else if (response.status === 'Client error') {
                console.log('response.status === Client error');
                navigate("/home");
                handleError(response.details);
            }
        } catch (error) {
            console.log('error en activeTurno');
            navigate("/home");
            handleError(error);
        }
    }

    return (
        <div className="turno-container">
            {error && <div className="error-message">{error.message || 'Turno ya iniciado :)'}</div>}
            <h1 className="logo">Command+</h1>
            <button className="iniciar-turno" onClick={activeTurno}>Iniciar turno</button>
            <div className="turno-description">
                <h1>Bienvenido a Command+</h1>
                <p>Inicia tu turno y disfruta de la mejor experiencia en la gestión de pedidos.</p>
            </div>
        </div>
    );
};

export default ActiveTurno;