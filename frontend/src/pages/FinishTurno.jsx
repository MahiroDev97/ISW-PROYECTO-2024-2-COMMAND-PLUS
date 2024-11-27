import '../styles/finishturno.css';
import { useNavigate } from 'react-router-dom';
import useTurnoError from '../hooks/turno/useTurnoError.jsx';
import { finishTurno } from '../services/turno.service.js';

const FinishTurno = () => {
    const navigate = useNavigate();
    const { error, handleError, clearError } = useTurnoError();

    const handleFinishTurno = async () => {
        try {
            clearError();
            console.log('handleFinishTurno del button activado');
            const response = await finishTurno();
            console.log('response', response);
            if (response.status === 'Success') {
                console.log('response.status === Success');
                navigate('/home');
            } else if (response.status === 'Client error') {
                console.log('response.status === Client error');
                handleError(response.details);
            }
        } catch (error) {
            console.log('error en handleFinishTurno');
            handleError(error);
        }
    }

    return (
        <div className="turno-container">
            {error && <div className="error-message">{error.message || 'Error desconocido'}</div>}
            <h1 className="logo">Command+</h1>
            <button className="terminar-turno" onClick={handleFinishTurno}>Terminar turno</button>
            <div className="turno-description">
                <h1>Gracias por usar Command+</h1>
                <p>Termina tu turno y asegúrate de que todo esté en orden.</p>
            </div>
        </div>
    );
};

export default FinishTurno;
