import { useEffect } from 'react';
import useUser from '../hooks/auth/useUser';
import { Navigate } from "react-router-dom";

const Home = () => {
  const user = useUser();
  useEffect(() => {
    console.log('user HOME:', user);


  }, [user]);

  if (user?.rol === "administrador") {
    return <Navigate to="/adminTables" replace />;
  }
  if (user?.active) {
    if (user?.rol === "garzon") {
      return <Navigate to="/comandas" replace />;
    }
    if (user?.rol === "cocinero") {
      return <Navigate to="/cocina" replace />;
    }
  }
  else {
    return <Navigate to="/activeturno" replace />;
  }




  return (
    <>
    </>
  )
}

export default Home