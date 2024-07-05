import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {

  return (

<div >

 <HelmetProvider>
  <ThemeProvider storageKey="licitando-theme" defaultTheme="dark">
  <Helmet titleTemplate="%s | licitando"/>

<RouterProvider router={router}/>

  </ThemeProvider>

 </HelmetProvider>
</div>
  )
}

