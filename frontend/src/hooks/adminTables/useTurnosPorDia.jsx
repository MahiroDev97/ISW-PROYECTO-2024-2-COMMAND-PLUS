import { useEffect, useState } from "react";
import { getTurnosDia, getTurnosMesAno, getTurnosDate } from "../../services/turno.service";

export const useTurnosPorDia = () => {

    const [viewMode, setViewMode] = useState("day");
    const [datesAvailable, setDatesAvailable] = useState([]);
    const [dateSelected, setDateSelected] = useState(null);
    const [monthAvailable, setMonthAvailable] = useState([]);
    const [yearAvailable, setYearAvailable] = useState([]);
    const [monthSelected, setMonthSelected] = useState(null);
    const [yearSelected, setYearSelected] = useState(null);
    const [turnos, setTurnos] = useState([]);


    const getDatesAvailable = async () => {
        const [dates, error] = await getTurnosDate();

        if (error) return;
        setDatesAvailable(dates);
    }






};