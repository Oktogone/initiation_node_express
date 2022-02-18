const fs = require('fs');
const util = require('util');
/**
 * On veut faire async/await avec fs.readFile -> util.promisfy
 */
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class ContactController {

    constructor(data){
        this.dataFile = `./data/${data}.json`;
    }

    async loadFile(){
        const data =  await readFile(this.dataFile, 'utf-8');
        return JSON.parse(data).produits;
    }

    async addEntry(name, email, message){
        const data = (await this.loadFile()) || [];
        data.unshift({ name, email, message });

        return writeFile(this.dataFile, JSON.stringify(data));
    }
}
module.exports = ContactController;