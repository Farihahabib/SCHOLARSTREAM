import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './components/theme-provider.jsx'
 import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'   
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <div>
   <QueryClientProvider client={queryClient}>
     <AuthProvider>
       <ThemeProvider defaultTheme="light" storageKey="scholarstream-ui-theme">
         <RouterProvider router={router} />
         <Toaster position='top-right' reverseOrder={false} />
       </ThemeProvider>
     </AuthProvider>
   </QueryClientProvider>
  </div>
)
