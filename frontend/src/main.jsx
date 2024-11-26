import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import ProtectedRoute from '@components/ProtectedRoute';
import Orders from '@pages/Orders';
import '@styles/styles.css';

//funcion que crea el router y lo renderiza en el root del html en pocas palabras es el punto de entrada de la aplicacion
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/users',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Users />
        </ProtectedRoute>
        ),
    },
  {
    path: '/orders',
    element: (
    <ProtectedRoute allowedRoles={['administrador', 'cocinero']}>
      <Orders />
    </ProtectedRoute>
    ),
  }
    



    ]
  },
  {
    path: '/auth',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])
//renderiza el router en el root del html 
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)