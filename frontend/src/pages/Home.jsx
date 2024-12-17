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


  return (
    <>
    </>
  )
}

export default Home