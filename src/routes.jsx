import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from "./pages/_layouts/app";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { Itens } from './pages/app/itens/itens';
import { Empresas } from './pages/app/empresas/empresas';

export const router = createBrowserRouter([

    {
        path: '/' ,
        element: <AppLayout />,
        children: [{path: '/', element: <Dashboard/>}]
    },
    {
        path: '/licitados' ,
        element: <AppLayout/>,
        children: [{path: '/licitados', element: <Itens/>}]
    },{
        path: '/empresas-participantes' ,
        element: <AppLayout/>,
        children: [{path: '/empresas-participantes', element:<Empresas/>}]
    },

])

