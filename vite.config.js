import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // OVO JE KLJUČNO - Sprečava dupliranje Reacta i beli ekran
    dedupe: ['react', 'react-dom', 'three'],
  },
})