const Basedata = require('./base-data');
const BouquetModel = require('./models/bouquete-model');

class BouquetsData extends Basedata {
    constructor(db) {
       super(db, BouquetModel, BouquetModel);
    }
}

module.exports = BouquetsData;
