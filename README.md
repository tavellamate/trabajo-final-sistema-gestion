
# Proyecto Final - LawTrack (App Jurídica)

¿Qué hace la aplicación?
LawTrack es un sistema web desarrollado con React (frontend) y Node.js + Express (backend) que permite a abogados gestionar sus causas o carpetas judiciales.
Los usuarios pueden registrarse, iniciar sesión, crear nuevas carpetas (también llamadas causas), ver el listado de las existentes y eliminarlas si ya no las necesitan.

🔧 Tecnologías utilizadas
Frontend: React + TypeScript

Backend: Node.js + Express + TypeScript

Base de datos: Prisma ORM con SQLite

Autenticación: JWT (tokens) y bcrypt para contraseñas

Estilos y diseño: HTML + CSS simple

🔐 Login y Seguridad
Los usuarios deben registrarse indicando su nombre, email, contraseña y rol (ABOGADO o SECRETARIO).

La contraseña se encripta con bcrypt antes de guardarse.

Al iniciar sesión, el servidor genera un token JWT que se guarda en el frontend para autenticar las solicitudes.

Solo los usuarios logueados pueden crear, ver o eliminar carpetas.

📁 Gestión de Carpetas
Cada carpeta representa una causa judicial.

Al crear una carpeta, se cargan los siguientes datos:

Tipo (por ejemplo, civil, penal)

Cliente (nombre del cliente asociado)

Resumen (breve descripción de la causa)

Todas las carpetas se visualizan en un listado.

Se puede hacer clic en una carpeta para ver más información (opcional).

El usuario también puede eliminar carpetas con un solo clic.

🧩 Estructura del Código
El backend está dividido en:

controllers: lógica de las rutas

routes: definición de endpoints

middleware: verificación de token JWT

utils: funciones auxiliares como generarToken

El frontend está dividido en páginas:

Login.tsx y Register.tsx para autenticación

HomePage.tsx para mostrar y gestionar las carpetas

DetalleCarpeta.tsx para ver escritos relacionados (opcional)

## ✅ Créditos

Proyecto realizado por - [PEÑA, Marcos - TAVELLA, Mateo - BASTIDA, Nicolas] - [2025]
