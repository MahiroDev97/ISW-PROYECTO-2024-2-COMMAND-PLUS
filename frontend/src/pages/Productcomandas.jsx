import Form from '../components/Form';
import Navbar from '../components/Navbar';
import Popup from '../components/Popup';
import ProtectedRoute from '../components/ProtectedRoute';
import Search from '../components/Search';
import Table from '../components/Table';
import { useEffect } from 'react';



const Productcomandas = () => {



    useEffect(() => {   
        document.title = 'Product Comandas';
    }, []);
 


    return (
 
        <ProtectedRoute>
            <Navbar />
            <div className="container">
                <h1>Product Comandas</h1>
                <Search />
                <Table />
                <Form />
                <Popup />
            </div>
        </ProtectedRoute>
    );
};





export default Productcomandas;