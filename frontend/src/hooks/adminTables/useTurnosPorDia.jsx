import { useEffect, useState } from "react";
import { getTurnosDia } from "../../services/turno.service";

export const useTurnosPorDia = () => {
    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        getTurnosDia().then(setTurnos);
    }, []);
};