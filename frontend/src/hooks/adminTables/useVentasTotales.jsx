



import { getVentasTotales } from '../../services/productcomanda.service';
import { useState, useEffect } from 'react';
import { getMesAnoDisponibles } from '../../services/productcomanda.service';

//get solo anos disponibles
export default function useVentasTotales() {



    const [ventasTotales, setVentasTotales] = useState([]);
    const [anoSeleccionado, setAnoSeleccionado] = useState(null);
    const [anosDisponiblesState, setAnosDisponiblesState] = useState([]);


    const anosDisponibles = getMesAnoDisponibles();
    const anosDisponiblesArray = anosDisponibles.map(({ ano }) => ano);
    console.log('anosDisponibles', anosDisponiblesArray);
    setAnosDisponiblesState(anosDisponiblesArray);

    useEffect(() => {
        getVentasTotales(anoSeleccionado).then(setVentasTotales);
    }, [anosDisponiblesState]);

    return { ventasTotales, anosDisponiblesState, anoSeleccionado, setAnoSeleccionado };
}