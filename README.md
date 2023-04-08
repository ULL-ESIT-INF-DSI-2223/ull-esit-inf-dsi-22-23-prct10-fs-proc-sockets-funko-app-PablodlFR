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
#### Paso 5 (Primera modificación del fichero):
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
* **¿Qué hace la función _access_?** La función access es una función asíncrona del módulo _fs_ de Node.js, el cual acepta tres argumentos: nombre del fichero, una constante que explicaremos a continuación y un _callback_ que se ejecutará en caso de error.
* **Para qué sirve el objeto _constants_?** Son una serie de constantes del módulo _fs_ que se usan en varias de sus funciones, para comprobar el modo de acceo de un archivo. La constante utilizada en este programa es _constants.F\_OK_, utilizada en la función access para verificar si un archivo existe. También existen otras constantes para comprobar si se puede leer un archivo, escribir, o ejecutar.

### Ejercicio 2
En este ejercicio debemos desarrollar una aplicación que nos permita obtener información sobre el número de líneas, palabras o caracteres de un fichero de texto, además de una combinación de ellos. Para esto haremos uso nuevamente del paquete _yargs_ para gestionar el paso de parámetros por la línea de comandos.
\
\
Se nos pide hacer el ejercicio de dos formas distintas, es por ello que se ha dividido cada uno de los casos en ficheros distintos. En el primer caso debemos de usar el método _pipe_ para redirigir las salidas de los comandos, mientras que de la segunda forma, no se utilizará este método, sino que se llevará a cavo con eventos y sus respectivos manejadores. Todo esto se hará programando defensivamente, para así controlar los errores.
#### Caso 1. Haciendo uso del método pipe.
El código es el siguiente:
```TypeScript
yargs(hideBin(process.argv))
/**
 * Command wc, to count the number of words, lines and characters from a text file.
 * Options:
 *    - l -> lines.
 *    - w -> words.
 *    - m -> characters.
 */
  .boolean(['l', 'w', 'm'])
  .command('wc', 'word count of a text file', {
    file: {
      description: 'the file\'s name',
      type: 'string',
      demandOption: true
    }
  }, (argv) => {
    readFile(argv.file, (err) => {
      if (err) {
        console.log(`No existe el fichero ${argv.file}`)
      }

      if (argv.l) {     
        const wcl = spawn('wc', ['-l', argv.file]);     
        const cut = spawn('cut', ['-d', ' ', '-f', '1']); 

        wcl.stdout.pipe(cut.stdin);
        cut.stdout.pipe(process.stdout);
      }

      if (argv.w) {        
        const wcw = spawn('wc', ['-w', argv.file]);     
        const cut = spawn('cut', ['-d', ' ', '-f', '1']); 

        wcw.stdout.pipe(cut.stdin);
        cut.stdout.pipe(process.stdout);
      }

      if (argv.m) {
        const wcm = spawn('wc', ['-m', argv.file]);     
        const cut = spawn('cut', ['-d', ' ', '-f', '1']); 

        wcm.stdout.pipe(cut.stdin);
        cut.stdout.pipe(process.stdout);
      }

      if (argv.l === undefined && argv.w === undefined && argv.m === undefined) {
        console.log('No ha utilizado ninguna de las opciones posibles (--l, --w, --m)');
      }
    })
  })
```
Como podemos observar en el código anterior se declaran de forma _booleana_ las 3 opciones posibles y en el comando _wc_ declaramos una opción obligatoria que es _file_, para indicar el fichero que se desea analizar.
\
\
Una vez introducido el comando por consola, se comprueba si dicho fichero existe, controlando así los errores, tal y como se pedía en el enunciado. Dependiendo de los argumentos pasados en la línea de comando se mostrará una opción u otra, en todos los casos, primero se ejecuta el comando _wc_ con la opción pertinente, gracias a la función _spawn()_, posteriormente haciendo uso de _pipe()_ pasamos la salida de _wc_ a la entrada del comando _cut_, para así obtener solo el número deseado, obviando el nombre del fichero. Finalmente, se envía la salida del comando _cut_ por la salida estándar, haciendo uso una vez más de _pipe()_. También se tiene en cuenta el caso de que el usuario no introduzca ninguna de las posibles opciones en el comando, en dicho caso saltará un mensaje indicado al usuario las posibles opciones a utilizar.
\
\
Ejemplos de uso:
```bash
$node dist/ej-guion/ejercicio-2/ej-2-pipe wc --file helloworld.txt --l
3
$node dist/ej-guion/ejercicio-2/ej-2-pipe wc --file helloworld.txt --w
4
$node dist/ej-guion/ejercicio-2/ej-2-pipe wc --file helloworld.txt --m
20
$node dist/ej-guion/ejercicio-2/ej-2-pipe wc --file helloworld.txt --l --w --m
3
4
20
$node dist/ej-guion/ejercicio-2/ej-2-pipe wc --file helloworld.txt
No ha utilizado ninguna de las opciones posibles (--l, --w, --m)
```
#### Caso 2. Sin hacer uso del método pipe.
El programa es el siguiente:
```TypeScript
yargs(hideBin(process.argv))
/**
 * Command wc, to count the number of words, lines and characters from a text file.
 * Options:
 *    - l -> lines.
 *    - w -> words.
 *    - m -> characters.
 */
  .boolean(['l', 'w', 'm'])
  .command('wc', 'word count of a text file', {
    file: {
      description: 'the file\'s name',
      type: 'string',
      demandOption: true
    }
  }, (argv) => {
    readFile(argv.file, (err) => {
      if (err) {
        console.log(`No existe el fichero ${argv.file}`)
      }

      const wc = spawn('wc', [argv.file]);

      let wcOutput = '';
      wc.stdout.on('data', (data) => wcOutput += data);

      wc.on('close', () => {
        const wcOutputArray = wcOutput.split(" ");        
        if (argv.l) {
          console.log(`El fichero ${argv.file} tiene ${wcOutputArray[1]} líneas.`);
        }
        if (argv.w) {
          console.log(`El fichero ${argv.file} tiene ${wcOutputArray[3]} palabras.`);
        }
        if (argv.m) {
          console.log(`El fichero ${argv.file} tiene ${wcOutputArray[4]} caracteres.`);
        }
        if (argv.l === undefined && argv.w === undefined && argv.m === undefined) {
          console.log('No ha utilizado ninguna de las opciones posibles (--l, --w, --m)');
        }
      });

      wc.on('error', (err) => {
        console.error('Error al ejecutar el comando', err);
      });
    })
  })
```
En esta ocasión no utilizamos el método pipe(), lo primero es ejecutar el comando _wc_ con el método _spawn()_ y guardar dichos datos en una variable, por si no llegaran todos a la vez, tal y como vimos en el aula haciendo uso del evento 'data'. A continuación, le damos forma a esos datos una vez se hayan terminado de obtener, gracias al método 'close', imprimiendo por pantalla solo aquella información solicitada por el usuario. Con este programa, vemos claramente la diferencia de usar eventos y sus manejadores, con los _pipe()_ del primer programa. En cuanto al control de errores, se repiten los comentados en el anterior ejercicio y además se añade un evento 'error', que salta cuando se produzca un error durante la ejecución del comando.
\
\
Ejemplos de uso:
```bash
$node dist/ej-guion/ejercicio-2/ej-2-nopipe wc --file helloworld.txt --l
El fichero helloworld.txt tiene 3 líneas.
$node dist/ej-guion/ejercicio-2/ej-2-nopipe wc --file helloworld.txt --w
El fichero helloworld.txt tiene 4 palabras.
$node dist/ej-guion/ejercicio-2/ej-2-nopipe wc --file helloworld.txt --m
El fichero helloworld.txt tiene 20 caracteres.
$node dist/ej-guion/ejercicio-2/ej-2-pipe wc --file helloworld.txt --l --w
El fichero helloworld.txt tiene 3 líneas.
El fichero helloworld.txt tiene 4 palabras.
$node dist/ej-guion/ejercicio-2/ej-2-pipe wc --file helloworld.txt
No ha utilizado ninguna de las opciones posibles (--l, --w, --m)
```
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