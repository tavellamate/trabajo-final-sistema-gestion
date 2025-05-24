
# Proyecto Final - IUSNET (App Jurídica)

Este es un proyecto integrador para la materia Desarrollo de Aplicaciones Web. Consiste en una aplicación jurídica inspirada en IUSNET, desarrollada en equipo, con arquitectura cliente-servidor.

## 🧩 Funcionalidades Principales

- 🔐 Inicio de sesión con JWT y contraseñas encriptadas (bcrypt)
- 📁 Gestión de expedientes judiciales (carpetas)
- 📄 Carga de escritos y archivos (PDF)
- 📅 Agenda de audiencias o citas legales
- 🔍 Buscador jurídico por tipo de causa, cliente o palabra clave
- 👥 Sistema de roles (abogado, secretario)
- 🔄 CRUD completo con protección de rutas
- 📦 Backend con Prisma ORM + PostgreSQL

---

## ⚙️ Tecnologías Utilizadas

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **ORM**: Prisma
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT + bcrypt
- **Control de versiones**: Git + GitHub

---

## 🐘 Configuración de PostgreSQL con Prisma

1. Instalar PostgreSQL y crear una base de datos. Por ejemplo:

```bash
createdb iusnetdb
```

2. Editar el archivo `.env` para configurar la URL de conexión:

```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/iusnetdb"
```

3. Inicializar Prisma:

```bash
npx prisma init
```

4. Crear y aplicar migraciones:

```bash
npx prisma migrate dev --name init
```

5. Generar el cliente Prisma:

```bash
npx prisma generate
```

---

## 🛠️ Uso de Git en el Proyecto

Este proyecto se desarrolla de forma colaborativa utilizando Git y GitHub. Se siguen estas buenas prácticas:

### 1. Clonación del Repositorio

Cada miembro del grupo debe clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/iusnet.git
cd iusnet
```

### 2. Crear una rama para trabajar

```bash
git checkout -b feature/nombre-funcionalidad
```

Ejemplos:
- `feature/login`
- `feature/expedientes-crud`
- `feature/agenda`
- `fix/token-error`

### 3. Hacer cambios y commits

```bash
git add .
git commit -m "Implementar login con JWT"
```

### 4. Traer últimos cambios del equipo

```bash
git pull origin main
```

### 5. Subir cambios al repositorio remoto

```bash
git push origin feature/nombre-funcionalidad
```

### 6. Crear Pull Request

Desde GitHub, abrir un Pull Request para que el equipo revise antes de integrar a `main`.

### 7. Resolver conflictos (si aparecen)

Editar archivos y confirmar nuevamente:

```bash
git add .
git commit -m "Resolver conflictos"
git push origin feature/nombre-funcionalidad
```

---

## 📁 Estructura del Proyecto

```
iusnet/
├── backend/         # Servidor Express con Prisma ORM
│   ├── src/
│   └── prisma/
├── frontend/        # Aplicación React con TypeScript
│   └── src/
```

---

## ✅ Créditos

Proyecto realizado por el grupo de [Nombre del curso] - [Nombre de los integrantes] - [Año]
