import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from "./pages/_layouts/app";
import { Header } from "./components/header";
import { Dashboard } from "./pages/app/dashboard/dashboard";

export const router = createBrowserRouter([

    {
        path: '/' ,
        element: <AppLayout />,
        children: [{path: '/', element: <Dashboard/>}]
    },
    {
        path: '/licitados' ,
        element: <Header />,
        children: [{path: '/licitados', element: <Header/>}]
    },

])

