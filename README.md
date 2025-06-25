# Ficticia S.A. - Gestión de Clientes

## Descripción

Sistema para registrar, modificar y eliminar personas con datos personales y atributos específicos.  
Incluye autenticación vía JWT, backend en Flask y frontend en React.

---

## Requisitos

- Python 3.8+  
- Node.js 14+ y npm  
- Git (opcional para clonar)

---

## Instalación y ejecución

### Backend

1. Clonar el repositorio (si no lo hiciste aún):

   ```bash
   git clone https://github.com/Fabrikpz/technical-validation.git
   cd technical-validation/backend
   ```

2. Crear y activar entorno virtual (opcional pero recomendado):

   - **Windows:**

     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```

   - **Linux/macOS:**

     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Instalar dependencias:

   ```bash
   pip install -r requirements.txt
   ```

4. Ejecutar la aplicación backend:

   ```bash
   python app.py
   ```

   > **Importante:** Dejá esta terminal abierta y funcionando.

---

### Frontend

1. Abrir una nueva terminal para el frontend.

2. Navegar a la carpeta del frontend:

   ```bash
   cd ../frontend
   ```

3. Instalar dependencias:

   ```bash
   npm install
   ```

4. Ejecutar la aplicación frontend:

   ```bash
   npm run dev
   ```

---

## Uso

1. Abrí en el navegador la URL que indica el frontend (`http://localhost:5173`).
2. Logueate con un usuario registrado.
3. Registrá, modificá o eliminá personas desde la interfaz.
