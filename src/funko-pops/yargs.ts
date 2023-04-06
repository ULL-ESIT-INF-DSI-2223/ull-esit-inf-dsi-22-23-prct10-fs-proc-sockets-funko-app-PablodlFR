import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { Funko } from './funko';

import * as fs from 'fs';
import * as path from 'path'
import chalk = require('chalk');

yargs(hideBin(process.argv))
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
        fs.writeFileSync(`${dirPath}/${argv.name}.json`, JSON.stringify(funkosJSON, null, 2));
        console.log(chalk.green.bold(`Nuevo Funko con el ID = ${argv.id} se ha añadido a la colección de ${argv.user}`));
      }
    } else {
      console.log(chalk.red.bold(`El usuario ${argv.user} no tiene una colección`));
      return;
    }
  })
  
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
  .help()
  .argv;






