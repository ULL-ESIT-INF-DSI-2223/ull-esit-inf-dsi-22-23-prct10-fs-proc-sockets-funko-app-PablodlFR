# Práctica 10 - APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js
Esta práctica consiste en la realización de una serie de ejercicios que hacen uso de las APIs asíncronas de Node.js para la gestión del sistema de ficheros (_fs_), creación de procesos (_child\_proces_) y sockets (_net_). Además se mostrará el ejercicio realizado en la hora de prácticas (PE101).
\
\
El código fuente de ambos ejercicios se encuentra organizado en diferentes directorios y se hace uso de sintaxis ES para importar/exportar las distintas entidades.
## Ejercicio de clase
## Ejercicios de guion
### Ejercicio 1
El primer ejercicio  debemos de comprender el siguiente código y realizar una traza mostrando el contenido de la pila de llamadas, el registro de eventos, la cola de manejadores y lo que se muestra por consola. Además de responder un par de preguntas.
```TypeScript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
\
#### Paso 1 (Ejecución del programa):
*Consola:*
```bash
$node dist/ej-guion/ejercicio-1/watchfile.js helloworld.txt
```
Como se ha especificado un archivo el cual existe, no se llegan a ejecutar los dos primeros _console.log()_ del programa.
\
\
*Pila de llamadas:*
```TypeScript
access(filename, constants.F_OK, (err) => {...});
```
*Registro de eventos de la API:*
```
Vacía
```
*Cola de manejadores:*
```
Vacía
```
#### Paso 2:
Como no se ha detectado ningún error en la función _access_, llega a la pila de llamadas el _console.log()_ que indica que se está observando el archivo pasado por parámetro.
\
\
*Pila de llamadas:*
```TypeScript
console.log(`Starting to watch file ${filename}`);
```
Se muestra dicho mensaje por consola.
\
\
*Consola:*
```bash
$node dist/ej-guion/ejercicio-1/watchfile.js helloworld.txt
Starting to watch file helloworld.txt
```
*Registro de eventos de la API:*
```
Vacía
```
*Cola de manejadores:*
```
Vacía
```
#### Paso 3:
Se llama a la función _watch_ con el nombre del archivo a observar como argumento.
\
\
*Pila de llamadas:*
```TypeScript
watch(process.argv[2]);
```
La consola sigue igual.
\
\
*Consola:*
```bash
$node dist/ej-guion/ejercicio-1/watchfile.js helloworld.txt
Starting to watch file helloworld.txt
```
Se registra los eventros relacionado a la variable _watcher_, que acabamos de asignar con la función _watch_.
\
\
*Registro de eventos de la API:*
```TypeScript
watcher.on('change'), () => {
  console.log(`File ${filename} has been modified somehow`);
}
```
*Cola de manejadores:*
```
Vacía
```
#### Paso 4:
Como no se ha realizado todavía ninguna modificación, no salta el evento registrado anteriormente y llegamos al último _console.log()_ del programa.
\
\
*Pila de llamadas:*
```TypeScript
console.log(`File ${filename} is no longer watched`);
```
Se ejecuta el _console.log()_.
\
\
*Consola:*
```bash
$node dist/ej-guion/ejercicio-1/watchfile.js helloworld.txt
Starting to watch file helloworld.txt
File helloworld.txt is no longer watched
```
*Registro de eventos de la API:*
```TypeScript
watcher.on('change'), () => {
  console.log(`File ${filename} has been modified somehow`);
}
```
*Cola de manejadores:*
```
Vacía
```
#### Paso 5 (Se realiza la primera modificación del fichero):
*Registro de eventos de la API:*
```TypeScript
watcher.on('change'), () => {
  console.log(`File ${filename} has been modified somehow`);
}
```
Se activa el evento correspondiente en el registro de eventos y este se envía a la cola de manejadores.
\
\
*Cola de manejadores:*
```TypeScript
() => {
  console.log(`File ${filename} has been modified somehow`);
}
```
Como la pila de llamadas hasta este momento se encuentra vacía, pasa a ejecutar sin problemas el _console.log()_ de la cola de manejadores.
\
\
*Pila de llamadas:*
```TypeScript
console.log(`File ${filename} has been modified somehow`);
```
Se muestra dicho mensaje por consola.
\
\
*Consola:*
```bash
$node dist/ej-guion/ejercicio-1/watchfile.js helloworld.txt
Starting to watch file helloworld.txt
File helloworld.txt is no longer watched
File helloworld.txt has been modified somehow
```
#### Paso 6 (Segunda modificación del fichero):
El registro de eventos se mantiene igual, a la espera de que su activación.
\
\
*Registro de eventos de la API:*
```TypeScript
watcher.on('change'), () => {
  console.log(`File ${filename} has been modified somehow`);
}
```
Se activa el evento correspondiente en el registro de eventos y este se envía a la cola de manejadores, la cual se había vaciado tras la finalización del paso anterior.
\
\
*Cola de manejadores:*
```TypeScript
() => {
  console.log(`File ${filename} has been modified somehow`);
}
```
Como la pila de llamadas volvía a estar vacía, pasa a ejecutar sin problemas el _console.log()_ de la cola de manejadores.
\
\
*Pila de llamadas:*
```TypeScript
console.log(`File ${filename} has been modified somehow`);
```
Se muestra dicho mensaje por consola.
\
\
*Consola:*
```bash
$node dist/ej-guion/ejercicio-1/watchfile.js helloworld.txt
Starting to watch file helloworld.txt
File helloworld.txt is no longer watched
File helloworld.txt has been modified somehow
File helloworld.txt has been modified somehow
```
### Ejercicio 2
### Ejercicio 3 - Cliente y servidor para la aplicación de registro de Funko Pops 
## Conclusión
Al igual que en las prácticas anteriores se han incluido los flujos de trabajo de GitHub Actions:
* Tests: [![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-PablodlFR/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-PablodlFR/actions/workflows/node.js.yml)
* Coveralls: [![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-PablodlFR/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-PablodlFR?branch=main)
* Sonar-Cloud: [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-PablodlFR&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-PablodlFR)
## Bibliografía
Para la realización de esta práctica se han consultado las siguientes fuentes bibliográficas:
* [Guion de la práctica 10](https://ull-esit-inf-dsi-2223.github.io/prct10-fs-proc-sockets-funko-app/)
* [Yargs](https://www.npmjs.com/package/yargs)
* [Chalk](https://www.npmjs.com/package/chalk)
* [Events](https://nodejs.org/docs/latest-v19.x/api/events.html)
* [fs](https://nodejs.org/docs/latest-v19.x/api/fs.html)
* [child_process](https://nodejs.org/docs/latest-v19.x/api/child_process.html)
* [net](https://nodejs.org/docs/latest-v19.x/api/net.html)