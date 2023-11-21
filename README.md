# WeedWebCRUD

## Pasos para correr la aplicación

1. Clonar el repositorio:

```bash
   git clone https://github.com/Lau36/weedweb_CRUD.git
```

2. Cambiarse a la rama development:

```bash
    git checkout development
```

3. Crear una base de datos con el nombre y las credenciales deseadas, preferiblemente desde la shell de sql:

```sql
    CREATE DATABASE weedweb_CRUD;
```

4. En la raíz del proyecto (a la altura de este README), crear un archivo `.env` con las siguientes variables, reemplazando donde sea necesario:

```dotenv
    JWT_SECRET=<Número de 8 dígitos>
    JWT_SECRET_REFRESH=<Número de 4 dígitos>
    DB_NAME=<nombre de la base de datos creada>
    DB_PASSWORD=<contraseña de postgres>
    DB_HOST=<Host de su base de datos>
    DB_USER=<Usuario de la base de datos>
    PORT=<Puerto en el que correrá la aplicación>
```

5. Instalar dependencias y ejecutar la aplicación:

```bash
    npm install
    npm start
```

6. Para probar los endpoints, se recomienda usar Postman o Insomnia:

   - Crear persona: `http://localhost:4000/users/api/person`
   - Crear empresa: `http://localhost:4000/users/api/company`
   - Logearse: `http://localhost:4000/users/api/SignIn`
   - Refrescar token: `http://localhost:4000/users/api/tokenRefresh`
   - Cerrar sesión: `http://localhost:4000/users/api/logout`
   - Actualizar persona por ID: `http://localhost:4000/users/api/user/id`
   - Actualizar empresa por ID: `http://localhost:4000/users/api/company/id`
   - Info de usuario por ID: `http://localhost:4000/users/api/id`

## Para probar los servicios haga lo siguiente:

1. Probar servicio de crear persona:
   `{ 
 "password": "12345678",
 "email": "lonera@gmail.com",
 "phone_number": "3219875671",
 "name": "Lonera Marcela",
 "last_name": "Zuluaga Martinez",
 "national_id": "1109440313"
}`

2. Crear empresa
   `{ 
 "password": "12345678",
 "email": "sigein@gmail.com",
 "phone_number": "3217924496",
 "company_name": "sigein",
 "nit": "123456789-1"
}`

3. Login
   `{
"password": "12345678",
"email": "sigein1@gmail.com"
}`

4. Actualizar persona

   - Tenemos que estar autorizados para esta accion y debemos mandar el id del usuario en los parametros
     `{ 
"email": "lonera1@gmail.com",
"phone_number": "3219875673",
"name": "Lonera Marcela",
"last_name": "Zuluaga Martinez"
  }`

5. Disfrute :D

6. Actualizar empresa

   - Tenemos que estar autorizados para esta accion y debemos mandar el id del usuario en los parametros
     `{ 
    "email": "sigein1@gmail.com",
    "phone_number": "3219875672",
    "company_name": "sigein"
}`

7. Consultar info
   - Debe ser autenticado, si no se puede consultar la informacion de todos los usuarios y tambien recuerden mandar el id por los parametros
8. TokenRefresh

   - Debe de estar autorizado y mandar por los header el token de refresco con el nombre "token"

9. Logout
   - Debe de mandar solo el token de refresco por los headers con el nombre "token"
