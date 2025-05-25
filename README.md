
# Proyecto Final - LawTrack (App Jurídica)

Proyecto de gestión jurídica, gestiona clientes y expedientes en base a un usuario con rol ABOGADO.

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

Proyecto realizado por - [PEÑA, Marcos - TAVELLA, Mateo - BASTIDA, Nicolas] - [2025]
