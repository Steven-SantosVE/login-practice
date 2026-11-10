import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

import './css/App.css'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);