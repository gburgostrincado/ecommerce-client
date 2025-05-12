# E-Commerce Frontend React con Vite

## Descripción

Este proyecto es el frontend para una aplicación de comercio electrónico desarrollada con React y Vite. La aplicación permite a los usuarios ver productos, agregarlos al carrito de compras, realizar pagos mediante Stripe y gestionar reembolsos de sus órdenes.

## Tecnologías

- **React**: Biblioteca para construir interfaces de usuario
- **Vite**: Herramienta de construcción y desarrollo
- **React Router**: Navegación entre páginas
- **Axios**: Cliente HTTP para realizar peticiones a la API
- **Stripe API**: Integración con el SDK de Stripe para pagos
- **Zustand**: Gestión de estado de la API y caché
- **Bootstrap CSS**: Framework de CSS para estilos (opcional)

## Requisitos previos

- Node.js (v20 o superior)
- Backend API configurado y ejecutándose
- Cuenta de Stripe para las pruebas de pago

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto
   ```
   API_URL=http://localhost:4000/api/v1
   REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
   ```

## Características principales

### Vista de productos
- Listado de productos con imagen, nombre, descripción y precio
- Vista detallada de cada producto

### Carrito de compras
- Añadir productos al carrito
- Eliminar productos del carrito
- Persistencia del carrito en localStorage

### Proceso de pago
- Integración con Stripe para el procesamiento de pagos
- Página de checkout con resumen de compra
- Redirección a la página de éxito tras completar el pago

### Gestión de órdenes
- Visualización de historial de órdenes
- Detalle de cada orden con sus productos
- Solicitud de reembolsos totales o parciales

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo de Vite
- `npm run build`: Compila la aplicación para producción

## Ejecución en desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Integración con Stripe

Para la integración con Stripe:

1. Se utiliza el componente `Elements` de Stripe
2. Para el checkout se implementa `redirectToCheckout` con la sessionId proporcionada por el backend
3. Para la confirmación de pago se utiliza el webhook configurado en el backend

## Despliegue

Para construir la aplicación para producción:

```bash
npm run build
```

Esto generará una carpeta `dist` con los archivos estáticos que pueden ser desplegados en cualquier servicio de hosting como Netlify, Vercel, o un servidor propio.

## Notas importantes

- Asegúrate de que el backend esté en ejecución antes de iniciar el frontend
- Para pruebas de pago, utiliza las tarjetas de prueba proporcionadas por Stripe:
  - Ejemplo: 
    - numero: 4242424242424242
    - CVC: 3 dígitos al azar
    - Fecha: Cualquier fecha futura

- Configura correctamente las URLs de redirección en el backend para el flujo de pago