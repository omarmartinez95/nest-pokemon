<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Ejecutar en desarrollo

1. clonar el repositorio
2. Ejecutar 
```
npm install
```

3. tener nest cli instalado
```
npm i -g @nest/cli
```

4. levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.templete__ y renombrar la copia a __.env__

6. Llenar las variables de entorno definidas en __.env__

7. Ejecutar la aplicación en el entorno de desarrollo __npm run start:dev__


8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v1/seed
```

## Stack usado
* MongoDB
* nest

# Production Build

1. Crear el archivo .env.prod
2. Llenar las variables de entorn para produccion
3. Crear la imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```