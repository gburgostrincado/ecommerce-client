import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno
  const env = loadEnv(mode, process.cwd(), '')
  
  // También puedes usar dotenv directamente
  dotenv.config({ path: `.env.${mode}` })
  
  return {
    plugins: [react()],
    define: {
      // Haz que las variables de entorno estén disponibles
      'process.env': env
    }
  }
})