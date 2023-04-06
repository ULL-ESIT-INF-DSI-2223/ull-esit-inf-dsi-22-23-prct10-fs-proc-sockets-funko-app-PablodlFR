# Práctica 9 - Aplicación de registro de Funko Pops
Esta práctica consiste en la elaboración de una aplicación que nos permita registar las colecciones de Funko Pops de los usuarios. Haciendo estas persistentes gracias a la API síncrona de Node.js para trabajar con el sistema de ficheros. Además se mostrará el ejercicio realizado en la hora de prácticas (PE101).
\
\
El código fuente de ambos ejercicios se encuentra organizado en diferentes directorios y se hace uso de sintaxis ES para importar/exportar las distintas entidades.
## Ejercicio de clase
El ejercicio de clase consiste en implementar un algoritmo haciendo uso del patrón _Template Method_ con los pasos indicados en el enunciado.
\
\
La clase abstracta que actúa de plantilla (_FilterMapReduceTemplate_) es la siguiente:
```TypeScript
/**
 * Abstract class for Template Method.
 */
export abstract class FilterMapReduceTemplate {
  /**
   * Abstract method that will be implemented in subclasses.
   * @param list List of numbers.
   * @param initialValor Initial accumulator valor.
   */
  protected abstract reduce(list: number[], initialValor): number;

  /**
   * Filter's method.
   * @param list List of numbers.
   * @param callback function to filter.
   * @returns Filtered number list.
   */
  public filter(list: number[], callback: (num: number) => boolean) {
    const result: number[] = [];
    
    for (let i = 0; i < list.length; i++) {
      if (callback(list[i]) === true) {
        result.push(list[i])
      }
    }
    return result;
  }

  /**
   * Map's method.
   * @param list List of numbers.
   * @param callback function to map.
   * @returns Maped number list.
   */
  public map(list: number[], callback) {
    const result: number[] = []
    for (let i = 0; i < list.length; i++) {
      result.push(callback(list[i]));
    }
    return result;
  } 

  /**
   * Hook's method before map.
   * @param list List of numbers.
   */
  protected beforeMap(list: number[]) {
    console.log(`Lista antes de Map: ${list}`)
  }

  /**
   * Hook's method after map.
   * @param list List of numbers.
   */
  protected afterMap(list: number[]) {
    console.log(`Lista después de Map: ${list}`)
  }

  /**
   * Hook's method before filter.
   * @param list List of numbers.
   */
  protected beforeFilter(list: number[]) {
    console.log(`Lista antes de Filter: ${list}`)
  }

  /**
   * Hook's method after filter.
   * @param list List of numbers.
   */
  protected afterFilter(list: number[]) {
    console.log(`Lista después de Filter: ${list}`)
  }

  /**
   * Hook's method before reduce.
   * @param list List of numbers.
   */
  protected beforeReduce(list: number[]) {
    console.log(`Lista antes del Reduce: ${list}`)
  }

  /**
   * Hook's method after reduce.
   * @param num Number that reduced the list.
   */
  protected afterReduce(num: number) {
    console.log(`Lista después del Reduce: ${num}`)
  }

  /**
   * Skeleton algorithm.
   * @param list List of numbers.
   */
  public run(list: number[]) {
    let red = 0;

    this.beforeFilter(list);
    list = this.filter(list, isPar)
    this.afterFilter(list);
    this.beforeMap(list);
    list = this.map(list, addOne)
    this.afterMap(list);     
    this.beforeReduce(list);
    red = this.reduce(list, 0);
    this.afterReduce(red);

    return red;
  }
}
```
Como podemos ver se implementan los métodos _map_ y _filter_ sin hacer uso de sus homónimos en TypeScript y se ha declarado _reduce_ como un método abstracto, tal y como es indicado en el enunciado. Además, también se han implementado varios métodos _hook_ antes y despúes de las operaciones anterioremente mencionadas. Finalmente se crea el esqueleto del algoritmo que contiene todas las operaciones y los métodos _hook_ en los lugares correspondientes.
\
\
A continuación se han desarrollado cuatro subclases que heredan de la clase anteriormente mencionada (_FilterMapAddReduce_, _FilterMapSubReduce_, _FilterMapProdReduce_, _FilterMapDivReduce_) las cuales concretan el método _reduce_ anteriormente declarado como abstracto. Estas clases son las siguientes:
\
\
_FilterMapAddReduce_:
```TypeScript
/**
 * Class that implements the reduce abtract's method of superclass for add.
 */
export class FilterMapAddReduce extends FilterMapReduceTemplate {
  /**
   * Reduce's add method.
   * @param list List of numbers.
   * @param initialValor Initial accumulator valor.
   * @returns The reduced valor.
   */
  public reduce(list: number[], initialValor): number {
    let cont = initialValor;
    for (let i = 0; i < list.length; i++) {
      cont += list[i];
    }
    return cont;
  }
}
```
_FilterMapSubReduce_:
```TypeScript
/**
 * Class that implements the reduce abtract's method of superclass for sub.
 */
export class FilterMapSubReduce extends FilterMapReduceTemplate {
  /**
   * Reduce's sub method.
   * @param list List of numbers.
   * @param initialValor Initial accumulator valor.
   * @returns The reduced valor.
   */
  public reduce(list: number[], initialValor): number {
    let cont = initialValor;
    for (let i = 0; i < list.length; i++) {
      cont -= list[i];
    }
    return cont;
  }
}
```
_FilterMapProdReduce_:
```TypeScript
/**
 * Class that implements the reduce abtract's method of superclass for product.
 */
export class FilterMapProdReduce extends FilterMapReduceTemplate {
  /**
   * Reduce's product method.
   * @param list List of numbers.
   * @param initialValor Initial accumulator valor.
   * @returns The reduced valor.
   */
  public reduce(list: number[], initialValor): number {
    if (initialValor === 0) {
      initialValor = 1;
    }
    let cont = initialValor;
    for (let i = 0; i < list.length; i++) {
      cont *= list[i];
    }
    return cont;
  }
}
```
_FilterMapDivReduce_:
```TypeScript
/**
 * Class that implements the reduce abtract's method of superclass for division.
 */
export class FilterMapDivReduce extends FilterMapReduceTemplate {
  /**
   * Reduce's division method.
   * @param list List of numbers.
   * @param initialValor Initial accumulator valor.
   * @returns The reduced valor.
   */
  public reduce(list: number[], initialValor): number {
    if (initialValor === 0) {
      initialValor = 1;
    }
    let cont = initialValor;
    for (let i = 0; i < list.length; i++) {
      cont /= list[i];
    }
    return cont;
  }
}
```
Además se han creado dos funciones con el fin de pasarlas por parámetro a la hora de probar el método _map_ y _filter_.
\
\
_AddOne_ (Suma 1 a cada uno de los números de la lista):
```TypeScript
/**
 * Add one to a number.
 * @param num Number that will be added.
 * @returns The result's number.
 */
export function addOne(num: number) {
  return num + 1;
}
```
_isPar_ (Comprueba si un número es par):
```TypeScript
/**
 * Check if a number is par.
 * @param num Number that will be checked.
 * @returns True if is par.
 */
export function isPar(num: number) {
  if (num % 2 === 0) {
    return true;
  }
}
```
Por último se han realizado las pruebas pertinentes en la traza de cada una de las cuatro subclases anteriormente mencionadas, siendo dichas pruebas y su cubrimiento los siguientes:
```
  ✔ FilterMapAddReduce().run(list) should return 15
  ✔ FilterMapAddReduce().run(list2) should return 8
  ✔ FilterMapAddReduce().run(list3) should return 21

  ✔ FilterMapSubReduce().run(list) should return 15
  ✔ FilterMapSubReduce().run(list2) should return 8
  ✔ FilterMapSubReduce().run(list3) should return 21

  ✔ FilterMapProdReduce().run(list) should return 105
  ✔ FilterMapProdReduce().run(list2) should return 15
  ✔ FilterMapProdReduce().run(list3) should return 315

  ✔ FilterMapDivReduce().run(list) should return 0.009523809523809523
  ✔ FilterMapDivReduce().run(list2) should return 8
  ✔ FilterMapDivReduce().run(list3) should return 21

----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |     100 |      100 |     100 |     100 |                   
 filtermapaddreduce.ts      |     100 |      100 |     100 |     100 |                   
 filtermapdivreduce.ts      |     100 |      100 |     100 |     100 |                   
 filtermapprodreduce.ts     |     100 |      100 |     100 |     100 |                   
 filtermapreducetemplate.ts |     100 |      100 |     100 |     100 |                   
 filtermapsubreduce.ts      |     100 |      100 |     100 |     100 |                   
 functions.ts               |     100 |      100 |     100 |     100 |                   
----------------------------|---------|----------|---------|---------|-------------------
```
## Ejercicio de guion - Aplicación de registro de Funko Pops
Esta práctica tiene como finalidad implementar una aplicación para almacenar distintos Funko Pops en formato JSON pertenecientes a la colección de un usuario.
\
\
Lo primero es crear una clase Funko con los elementos indicados en el guion de la práctica. La clase desarrollada es la siguiente:
```TypeScript
/**
 * Class to create a Funko with a method to print it.
 */
export class Funko {
  /**
   * Funko's constructor
   * @param id Number Funko's ID.
   * @param name String Funko's name.
   * @param description String Funko's description.
   * @param type Funko's type.
   * @param genre Funko's genre.
   * @param franchise String Funko's franchise.
   * @param franchiseNumber Number Funko's franchise number.
   * @param exclusive Boolean to check if the Funko is exclusive or not.
   * @param specialFeatures String for Funko's special features.
   * @param marketValue Number for the Funko's market value.
   */
  constructor(private id: number, private name: string, private description: string, private type: Type, private genre: Genre, private franchise: FranchiseType, private franchiseNumber: number, private exclusive: boolean, private specialFeatures: string, private marketValue: number){
  }

  /**
   * Print the Funko's information.
   * @returns String with the Funko's information.
   */
  print() {
    let str = "";
    str = "ID: " + this.id + "\nName: " + this.name + "\nDescription: " + this.description + "\nType: " + this.type + "\nGenre: " + this.genre + "\nFranchise: " + this.franchise + "\nFranchise Number: " + this.franchiseNumber + "\nExclusive: " + this.exclusive + "\nSpecial Features: " + this.specialFeatures + "\n";
    if (this.marketValue <= 25) {
      str += chalk.red("Market Value: " + this.marketValue + "€");
    } else if (this.marketValue > 25 && this.marketValue <= 50) {
      str += chalk.hex('#FFA500')("Market Value: " + (this.marketValue + "€"));
    } else if (this.marketValue > 50 && this.marketValue <= 75) {
      str += chalk.yellow("Market Value: " + (this.marketValue + "€"));
    } else if (this.marketValue > 75 && this.marketValue <= 100) {
      str += chalk.green("Market Value: " + (this.marketValue + "€"));
    }
    return str;
  }  
}
```
Como podemos ver es una clase muy simple, donde se implementa el constructor con los atributos indicados y después tenemos una función _print()_ para imprimir por pantalla toda la información perteneciente a un Funko. Además, tal y como se indica en el guion, se han creado una serie de enumerados y tipo de datos para los atributos del tipo de Funko, género y franquicia, estos son los siguientes:
```TypeScript
/**
 * Enum to set the Funko's type.
 */
export enum Type {
  POP = "Pop!",
  POP_RIDES = "Pop! Rides",
  VINYL_SODA = "Vinyl Soda",
  VINYL_GOLD = "Vinyl Gold",
}

/**
 * Enum to set the Funko's genre.
 */
export enum Genre {
  ANIMATION = "Animación",
  MOVIES_AND_TV = "Películas y TV",
  VIDEOGAMES = "Videojuegos",
  SPORTS = "Deportes",
  MUSIC = "Música",
  ANIME = "Anime",
}

/**
 * New type for the Funko's franchise.
 */
type FranchiseType = "The Big Bang Theory" | "Detective Conan" | "Mario Bros" | "Pokémon" | "Sonic The Hedgehog"
```
Una vez creada la clase, pasamos a la parte donde gestionamos las colecciones de los usuarios mediante la línea de comandos usando el paquete _yargs_. Todo esto se encuentra en un fichero homónimo (yargs.ts). La gestión de las colecciones se realizará de la siguiente manera:
\
\
En la raíz del proyecto tenemos el directorio _collections_, donde dentro de cada uno se encuentran tantos subdirectorios como usuarios, cada uno con el nombre del usuario, es de esta forma por la que sabemos si un usario tiene o no una colección y por último, dentro de cada directorio de usuario tenemos los Funkos en ficheros _JSON_ separados tal y como se pide en la práctica.
\
\
A continuación pasaremos a comentar los distintos comandos implementados y su funcionamiento. Para todos se ha utilizado la API síncrona de Node.js con el fin de trabajar con el sistema de fichero.
### Añadir un Funko a la lista
El comando _add_ nos debe permitir añadir un Funko al directorio del usuario en cuestión con la información pasada por la línea de comandos.
\
\
El comando desarrollado es el siguiente:
```TypeScript
/**
 * Command add, to add a Funko to a user list.
 */
  .command('add', 'Adds a funko', {
    id: {
      description: 'Funko ID',
      type: 'number',
      demandOption: true
    },
    user: {
      description: 'User',
      type: 'string',
      demandOption: true
    },
    name: {
      description: 'Funko Name',
      type: 'string',
      demandOption: true
    },
    desc: {
      description: 'Funko description',
      type: 'string',
      demandOption: true
    },
    type: {
      description: 'Funko type',
      type: 'string',
      demandOption: true
    },
    genre: {
      description: 'Genre of the funko series',
      type: 'string',
      demandOption: true
    },
    franch: {
      description: 'Funko franchise',
      type: 'string',
      demandOption: true
    },
    franchnum: {
      description: 'Funko franchise number',
      type: 'number',
      demandOption: true
    },
    excl: {
      description: 'Is a exclusive funko?',
      type: 'boolean',
      demandOption: true
    },
    spcfeat: {
      description: 'Funko special features',
      type: 'string',
      demandOption: true
    },
    market: {
      description: 'Funko market value',
      type: 'number',
      demandOption: true
    }
  
  }, (argv) => {
    const dirPath = `collections/${argv.user}`;
    let exist = false;
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        const filePath = `${dirPath}/${file}`;
        const data = fs.readFileSync(filePath, 'utf-8');
        const funkoJSON = JSON.parse(data); 
        if (funkoJSON.id === argv.id) {
          console.log(chalk.red.bold(`Ya existe un Funko con el ID = ${argv.id} en la colección de ${argv.user}`));
          exist = true;
        }
      });  
          
      if (exist === false) {
        const funkosJSON = {
          id: argv.id,
          name: argv.name,
          description: argv.desc,
          type: argv.type,
          genre: argv.genre,
          franchise: argv.franch,
          franchiseNumber: argv.franchnum,
          exclusive: argv.excl,
          specialFeatures: argv.spcfeat,
          marketValue: argv.market        
        }
        fs.writeFileSync(`${dirPath}/${argv.name}.json`, JSON.stringify(funkosJSON));
        console.log(chalk.green.bold(`Nuevo Funko con el ID = ${argv.id} se ha añadido a la colección de ${argv.user}`));
      }
    } else {
      console.log(chalk.red.bold(`El usuario ${argv.user} no tiene una colección`));
      return;
    }
  })
``` 
Primero indicamos los parámetros que podrán ser usado en la línea de comandos, en este caso son todos los atributos que los Funkos, ya que deseamos crear uno y añadirlo a la lista del usuario. A continuación, comprobamos si existe un directorio con el nombre indicado en el parámetro usuario, en caso de que no existir, se envía un mensaje de error en rojo, haciendo uso del paquete _chalk_ como indica el guion. Si el directorio del usuario existe, pasa a comprobar que la colección de dicho usuario no tiene un Funko con la misma ID, si se encuentra el dicho Funko se vuelve a enviar un mensaje de error. Una vez pasadas estas comprobaciones, creamos un _JSON_ con los datos pasados por la línea de comando y creamos el fichero que contendrá la información del Funko en el directorio del usuario, haciendo uso de _writeFileSync()_. Por último, se envía un mensaje informativo al usuario usando _chalk_ en verde para indicar que todo ha funcionado correctamente.
### Modificar un Funko de la lista
En el caso de modificar un Funko debemos de seleccionar mediante la ID cuál deseamos modificar y los parámetros que queremos cambiar.
\
\
El comando _update_ es el siguiente:
```TypeScript
  /**
   * Command update, to update a Funko from a user list.
   */
  .command('update', 'update a funko', {
    id: {
      description: 'Funko ID',
      type: 'number',
      demandOption: true
    },
    user: {
      description: 'User',
      type: 'string',
      demandOption: true
    },
    name: {
      description: 'Funko Name',
      type: 'string',
      demandOption: false
    },
    desc: {
      description: 'Funko description',
      type: 'string',
      demandOption: false
    },
    type: {
      description: 'Funko type',
      type: 'string',
      demandOption: false
    },
    genre: {
      description: 'Genre of the funko series',
      type: 'string',
      demandOption: false
    },
    franch: {
      description: 'Funko franchise',
      type: 'string',
      demandOption: false
    },
    franchnum: {
      description: 'Funko franchise number',
      type: 'number',
      demandOption: false
    },
    excl: {
      description: 'Is a exclusive funko?',
      type: 'boolean',
      demandOption: false
    },
    spcfeat: {
      description: 'Funko special features',
      type: 'string',
      demandOption: false
    },
    market: {
      description: 'Funko market value',
      type: 'number',
      demandOption: false
    }

  }, (argv) => {
    const dirPath = `collections/${argv.user}`;
    let exist = false;
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        const filePath = `${dirPath}/${file}`;
        const data = fs.readFileSync(filePath, 'utf-8');
        const funkoJSON = JSON.parse(data); 
        if (funkoJSON.id === argv.id) {          
          exist = true;
          if (argv.name != undefined) {   
            fs.renameSync(filePath, `${dirPath}/${argv.name}.json`)         
            funkoJSON.name = argv.name;
          } else {
            const fileName = path.parse(filePath).name;
            funkoJSON.name = fileName;
          }
          if (argv.desc != undefined) {
            funkoJSON.desc = argv.desc;
          }
          if (argv.type != undefined) {
            funkoJSON.type = argv.type;
          }
          if (argv.genre != undefined) {
            funkoJSON.genre = argv.genre;
          }
          if (argv.franch != undefined) {
            funkoJSON.franch = argv.franch;
          }
          if (argv.franchnum != undefined) {
            funkoJSON.franchnum = argv.franchnum;
          }
          if (argv.excl != undefined) {
            funkoJSON.excl = argv.excl;
          }
          if (argv.spcfeat != undefined) {
            funkoJSON.spcfeat = argv.spcfeat;
          }
          if (argv.market != undefined) {
            funkoJSON.marketValue = argv.market;
          }
          fs.writeFileSync(`${dirPath}/${funkoJSON.name}.json`, JSON.stringify(funkoJSON, null, 2));
          console.log(chalk.green.bold(`El Funko con el ID = ${argv.id} ha sido actualizado en la colección de ${argv.user}`));
          exist = true;
        }        
      });
      if (exist === false) {
        console.log(chalk.red.bold(`No existe ningún funko con el ID = ${argv.id} en la colección de ${argv.user}`));
      }  
    } else {
      console.log(chalk.red.bold(`El usuario ${argv.user} no tiene una colección`));
      return;
    }
  })
```
En este caso, las opciones del _yargs_ relacionadas con los atributos a modificar no son obligatorios ya que, solo se indicarán aquellos que se deseen modificar. Se vuelven a realizar las comprobaciones relacionadas con la existencia del usuario y del Funko con la ID proporcionada. A continuación se comprueba que atributos han sido indicados para su modificación, es decir, que no sea _undefined_, tras esto, se escribe en el fichero los cambios y se envía un mensaje con el _chalk_ en verde para informar al usuario que todo ha ido correctamente.
\
\
En este comando cabe destacar el apartado del nombre del Funko, ya que el fichero JSON recibe el nombre del Funko, es por ello que, si se cambia el nombre del Funko por la línea de comando se renombra también el nombre del fichero haciendo uso de _renameSync()_.
### Eliminar un Funko de la lista
En este apartado se deberá pasar un ID y eliminar el Funko correspondiente, siempre y cuando dicha ID exista en algún Funko.
\
\
El comando _remove_ es el siguiente:
```TypeScript
/**
   * Command remove, to remove a Funko from a list.
   */
    .command('remove', 'Remove a funko from the collection', {
      id: {
        description: 'Funko ID',
        type: 'number',
        demandOption: true
      },
      user: {
        description: 'User',
        type: 'string',
        demandOption: true
      }
  }, (argv) => {
    const dirPath = `collections/${argv.user}`;
      if (fs.existsSync(dirPath)) {
        let found = false;
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
          const filePath = `${dirPath}/${file}`;
          const data = fs.readFileSync(filePath, 'utf-8');
          const funkoJSON = JSON.parse(data);
          if (funkoJSON.id === argv.id) {
            fs.unlinkSync(filePath);
            console.log(chalk.green.bold(`Se ha eliminado correctamente el Funko con el ID = ${argv.id} en la colección de ${argv.user}`))
            found = true;       
          }    
        });
        if (found == false) {
          console.log(chalk.red.bold(`No existe ningún Funko con el ID = ${argv.id} en la colección de ${argv.user}`));
        }
      } else {
        console.log(chalk.red.bold(`El usuario ${argv.user} no tiene una colección`));
        return;
      }
  })
```
Este comando tiene un funcionamiento más sencillo que los anteriores, vuelve a realizar las comprobaciones y en el caso de que se encuentra en la colección un Funko con la ID propocionada, el fichero correspondiente a este es borrado usando el comando _unlinkSync()_.
### Listar los Funkos existentes en una lista
Este comando tiene el objetivo de mostrar por pantalla todos los Funkos pertenecientes a la colección de un usuario. En la parte del valor de mercado, se han creado cuatro rangos, mostando con chalk el color de cada uno de ellos de forma distinta, tal y como, se pide en el guion. Los rangos son los siguiente:
* [0, 25] -> Rojo.
* (25, 50] -> Naranja.
* (50 ,75] -> Amarillo.
* (75, 100] -> Verde.
\
\
El comando _list_ es el siguiente:
```TypeScript
/**
   * Commando list, to list the whole Funko's collection from a user.
   */
  .command('list', 'List a funko collection', {
    user: {
      description: 'User',
      type: 'string',
      demandOption: true
    }
  }, (argv) => {
    const dirPath = `collections/${argv.user}`;
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      console.log(chalk.white.bold(`${argv.user} Funko Pop collection`));
      console.log("----------------------------");
      files.forEach(file => {
        const filePath = `${dirPath}/${file}`;
        const data = fs.readFileSync(filePath, 'utf-8');
        const funkoJSON = JSON.parse(data);        
        const funko = new Funko(funkoJSON.id, funkoJSON.name, funkoJSON.description, funkoJSON.type, funkoJSON.genre, funkoJSON.franchise, funkoJSON.franchiseNumber, funkoJSON.exclusive, funkoJSON.specialFeatures, funkoJSON.marketValue);
        console.log(funko.print());    
        console.log("----------------------------");  
      });
    } else {
      console.log(chalk.red.bold(`El usuario ${argv.user} no tiene una colección`));
      return;
    }
  })
```
Realiza las comprobaciones pertinentes, enviando mensajes de error siempre que sea necesario y por cada uno de los archivos JSON que se encuentran en el directorio del usuario, es decir, por cada Funko de la colección, se lee, se parsea el JSON y con los valores correspondientes se llama al constructor de la clase Funko y posteriormente al método _print()_ y nos muestra toda la colección por pantalla.
### Mostrar la información de un funko concreto existente en la lista
Este comando tiene el objetivo de mostrar un único Funko de la colección, siendo este el correpondiente al ID pasado por línea de comandos. En este comando también se tiene en cuenta el código de color para el valor de mercado mencionado en el comando anterior.
\
\
El comando _read_ es el siguiente:
```TypeScript
/**
   * Command read, to read a concret Funko from a user collection.
   */
  .command('read', 'Show a concrete funko from the collection', {
    id: {
      description: 'Funko ID',
      type: 'number',
      demandOption: true
    },
    user: {
      description: 'User',
      type: 'string',
      demandOption: true
    }
  }, (argv) => {
    const dirPath = `collections/${argv.user}`;
    if (fs.existsSync(dirPath)) {
      let found = false;
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        const filePath = `${dirPath}/${file}`;
        const data = fs.readFileSync(filePath, 'utf-8');
        const funkoJSON = JSON.parse(data);
        if (funkoJSON.id === argv.id) {
          const funko = new Funko(funkoJSON.id, funkoJSON.name, funkoJSON.description, funkoJSON.type, funkoJSON.genre, funkoJSON.franchise, funkoJSON.franchiseNumber, funkoJSON.exclusive, funkoJSON.specialFeatures, funkoJSON.marketValue);      
          console.log(funko.print());   
          found = true;       
        }    
      });
      if (found == false) {
        console.log(chalk.red.bold(`No existe ningún funko con el ID = ${argv.id} en la colección de ${argv.user}`));
      }
    } else {
      console.log(chalk.red.bold(`El usuario ${argv.user} no tiene una colección`));
      return;
    }
  })
```
La principal diferencia respecto al comando _list_ es que en este caso tenemos un _if()_ que comprueba si el ID del Funko es el mismo que el pasado por la línea de comando, si es así, lo muestra y si no hay un Funko con la ID proporcionada, muestra su respectivo mensaje de error.
### Funcionamiento
A continuación, veremos el funcionamiento de todos los comandos mostrados anteriormente.
#### _Add_
```
$node dist/funko-pops/yargs.js add --user pablo --id 3 --name "Ran Mouri" --desc "Classic Ran Mouri 1996" --type "Pop!" --genre "Anime" --franch "Detective Conan" --franchnum 42 --excl false --spcfeat "No tiene ninguna característica especial" --market 75
Nuevo Funko con el ID = 3 se ha añadido a la colección de pablo [VERDE]

$node dist/funko-pops/yargs.js add --user pablo --id 3 --name "Ran Mouri" --desc "Classic Ran Mouri 1996" --type "Pop!" --genre "Anime" --franch "Detective Conan" --franchnum 42 --excl false --spcfeat "No tiene ninguna característica especial" --market 75
Ya existe un Funko con el ID = 3 en la colección de pablo [ROJO]

$node dist/funko-pops/yargs.js add --user pedro --id 3 --name "Ran Mouri" --desc "Classic Ran Mouri 1996" --type "Pop!" --genre "Anime" --franch "Detective Conan" --franchnum 42 --excl false --spcfeat "No tiene ninguna característica especial" --market 75
El usuario pedro no tiene una colección
```
#### _Update_
```
$node dist/funko-pops/yargs.js update --user pablo --id 3 market 100
El Funko con el ID = 3 ha sido actualizado en la colección de pablo [VERDE]

$node dist/funko-pops/yargs.js update --user pablo --id 17 market 100
No existe ningún funko con el ID = 17 en la colección de pablo [ROJO]

$node dist/funko-pops/yargs.js update --user pedro --id 17 market 100
El usuario pedro no tiene una colección [ROJO]
```
#### _List_
```
$node dist/funko-pops/yargs.js list --user pablo
pablo Funko Pop collection
----------------------------
ID: 2
Name: Ai Haibara
Description: Classic Ai Haibara 1998
Type: Pop!
Genre: Anime
Franchise: Detective Conan
Franchise Number: 4
Exclusive: true
Special Features: No tiene ninguna característica especial
Market Value: 33€ [NARANJA]
----------------------------
ID: 1
Name: Conan Edogawa
Description: Classic Conan Edogawa 1996
Type: Pop!
Genre: Anime
Franchise: Detective Conan
Franchise Number: 1
Exclusive: true
Special Features: No tiene ninguna característica especial
Market Value: 100€ [VERDE]
----------------------------
ID: 4
Name: Kogoro Mouri
Description: Classic Kogoro Mouri 1996
Type: Pop!
Genre: Anime
Franchise: Detective Conan
Franchise Number: 33
Exclusive: false
Special Features: No tiene ninguna característica especial
Market Value: 12€ [ROJO]
----------------------------
ID: 3
Name: Ran Mouri
Description: Classic Ran Mouri 1996
Type: Pop!
Genre: Anime
Franchise: Detective Conan
Franchise Number: 42
Exclusive: false
Special Features: No tiene ninguna característica especial
Market Value: 75€ [AMARILLO]
----------------------------
```
#### _Read_
```
$node dist/funko-pops/yargs.js read --user pablo --id 1
ID: 1
Name: Conan Edogawa
Description: Classic Conan Edogawa 1996
Type: Pop!
Genre: Anime
Franchise: Detective Conan
Franchise Number: 1
Exclusive: true
Special Features: No tiene ninguna característica especial
Market Value: 100€ [VERDE]

$node dist/funko-pops/yargs.js read --user pablo --id 34
No existe ningún funko con el ID = 34 en la colección de pablo [ROJO]
```
#### _Remove_
```
$node dist/funko-pops/yargs.js remove --user pablo --id 3
Se ha eliminado correctamente el Funko con el ID = 3 en la colección de pablo [VERDE]

$node dist/funko-pops/yargs.js remove --user pablo --id 31
No existe ningún Funko con el ID = 31 en la colección de pablo [ROJO]
```
En los ejemplos anteriores se indica al lado de cada mensaje el color correspondite que tiene, gracias al uso del _chalk_, ya que al ser bloques de texto, en _markdown_ no se pueden poner colores. Seguidamente veremos una serie de imágenes sacadas directamente desde la consola para mostrar el correcto funcionamiento de este paquete.
\
![Imagen mostrando el uso de chalk](https://i.postimg.cc/Kc3n5Vkb/Captura-de-pantalla-de-2023-04-02-15-26-11.png)
\
![Imagen mostrando el uso de chalk](https://i.postimg.cc/cC3w4gyC/Captura-de-pantalla-de-2023-04-02-15-34-26.png)
\
![Imagen mostrando el uso de chalk](https://i.postimg.cc/V6pX89h2/Captura-de-pantalla-de-2023-04-02-15-35-08.png)
\
\
También se realizaron las pruebas correspondientes de la clase Funko que consta de un único método _print()_:
```
  function print test
    ✔ funko1.print() should return funko1
    ✔ funko2.print() should return funko2
    ✔ funko3.print() should return funko3
    ✔ funko4.print() should return funko4

-----------------------------|---------|----------|---------|---------|-------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------|---------|----------|---------|---------|-------------------
 funko-pops                  |     100 |    94.44 |     100 |     100 |                   
  funko.ts                   |     100 |    92.85 |     100 |     100 | 37                
  utilities.ts               |     100 |      100 |     100 |     100 |                   
-----------------------------|---------|----------|---------|---------|-------------------
```
## Conclusión
Con lo mostrado en este informe hemos aprendido varias cosas, principalemente relacionadas con el uso de la API síncrona de Node.js para trabajar con el sistema de ficheros, característica que hasta esta práctica no hemos visto y es fundamental saber trabajar con ficheros en cualquier lenguaje de programación.
\
\
También quiero destacar los dos paquetes implementados en esta práctica, primero el _chalk_, que nos permite dar color a los elementes que aparecen por consola, muy útil para destacar cierta información y dar otra perspectiva al cliente que use el programa. Y el más importante, el _yargs_ que nos ha permitido crear nuestros propios comandos para interactuar con nuestra aplicación, no solo nos ha servido para conocer una nueva forma de interactuar con nuestros programas, sino también para hacernos una idea de cómo funcionan los comandos, con sus parámetros y opciones que usamos de forma tan habitual en _bash_.
\
\
Al igual que en la práctica anterior se han incluido los flujos de trabajo de GitHub Actions:
* Tests: [![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-PablodlFR/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-PablodlFR/actions/workflows/node.js.yml)
* Coveralls: [![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-PablodlFR/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-PablodlFR?branch=main)
* Sonar-Cloud: [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-PablodlFR&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-PablodlFR)

## Bibliografía
Para la realización de esta práctica se han consultado las siguientes fuentes bibliográficas:
* [Guion de la práctica 9](https://ull-esit-inf-dsi-2223.github.io/prct09-filesystem-funko-app/)
* [API Síncrona](https://nodejs.org/docs/latest-v19.x/api/fs.html)
* [Yargs](https://www.npmjs.com/package/yargs)
* [Chalk](https://www.npmjs.com/package/chalk)