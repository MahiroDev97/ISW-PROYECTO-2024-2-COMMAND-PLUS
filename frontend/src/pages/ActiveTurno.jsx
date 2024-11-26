import '../styles/activeturno.css';
import { useNavigate } from 'react-router-dom';
import useTurnoError from '../hooks/turno/useTurnoError.jsx';
import { createTurno } from '../services/turno.service.js';

const ActiveTurno = () => {
    const navigate = useNavigate();
    const { error, handleError, clearError } = useTurnoError();

    const activeTurno = async () => {
        try {
            clearError();
            console.log('activeTurno del button activado');
            const response = await createTurno();
            console.log('response', response);
            if (response.status === 'Success') {
                console.log('response.status === Success');
                navigate('/auth');
            } else if (response.status === 'Client error') {
                console.log('response.status === Client error');
                handleError(response.details);
            }
        } catch (error) {
            console.log('error en activeTurno');
            handleError(error);
        }
    }

    return (
        <div className="turno-container">
            {error && <div className="error-message">{error.message || 'Error desconocido'}</div>}
            <img src="/path/to/logo.png" alt="Logo Command+" className="logo" />
            <button className="iniciar-turno" onClick={activeTurno}>Iniciar turno</button>
        </div>
    );
};

export default ActiveTurno;