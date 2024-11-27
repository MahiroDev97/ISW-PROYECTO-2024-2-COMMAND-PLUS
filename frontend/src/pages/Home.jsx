import { useEffect } from 'react';
import useUser from '../hooks/auth/useUser';

const Home = () => {
  const user = useUser();

  useEffect(() => {
    console.log('user HOME:', user);
  }, [user]);

  return (
    <>
    </>
  )
}

export default Home