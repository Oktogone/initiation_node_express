const fs = require('fs');
const util = require('util');
/**
 * On veut faire async/await avec fs.readFile -> util.promisfy
 */
const readFile = util.promisify(fs.readFile);

class CatalogController {
  constructor(data) {
    this.dataFile = `./data/${data}.json`;
  }

  async loadFile() {
    const data =  await readFile(this.dataFile, 'utf-8');
    return JSON.parse(data).produits;
  }

  async getDiscs() {
    const data = await this.loadFile();
    return data.map((disc) => (
        { id: disc.id, title: disc.title, band: disc.band, image: disc.image}));
  }

  async getDisc(id) {
    const data = await this.loadFile();

    const disc = data.find( (d) => {d.id == id});
    if(!disc) return null;

    return { id: disc.id, title: disc.title, band: disc.band, image: disc.image};
  }
};

module.exports = CatalogController;