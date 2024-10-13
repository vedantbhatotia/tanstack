import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QueryClientProvider,QueryClient} from '@tanstack/react-query'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
    <App />
    </QueryClientProvider>
  </StrictMode>,
)
