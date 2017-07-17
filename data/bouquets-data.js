const Basedata = require('./base-data');
const BouquetModel = require('./models/bouquete-model');

class BouquetsData extends Basedata {
    constructor(db) {
        super(db, BouquetModel, BouquetModel);
    }

    // override base
    create(bouqueteModel) {
        bouqueteModel.dateCreated = new Date();
        bouqueteModel.viewsCount = 0;
        return super.create(bouqueteModel);
    }
}

module.exports = BouquetsData;
