const ModelState = require('../model-state');
const { ObjectID } = require('mongodb');
const DEFAULT_SIZE = 12;

class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.validator = validator;
        this.collectionName = ModelClass.name.toLowerCase() + 's';
        this.collection = db.collection(this.collectionName);
    }

    getAll(filters, page, size) {
        page = page || 1;
        size = size || DEFAULT_SIZE;
        const skipVal = (page - 1) * size;
        if (filters) {
            return this.collection
                .find(filters)
                .skip(skipVal)
                .limit(size)
                .toArray();
        }

        return this.collection
                .find()
                .skip(skipVal)
                .limit(size)
                .toArray();
    }

    findById(id) {
        return this.collection.findOne({ _id: new ObjectID(id) })
            .then((model) => {
                return new Promise((resolve, reject) => {
                    if (!model) {
                        return resolve(null);
                    }

                    return resolve(model);
                });
            });
    }

    create(model) {
        const modelState = this.validate(model);
        if (!modelState.isValid) {
            return Promise.reject(modelState.errors);
        }
        return this.collection.insert(model)
            .then((status) => {
                // conatins the created Id
                return status.ops[0];
                // return model;
            });
    }

    updateWholeObjectById(model) {
        return this.collection.replaceOne({
            _id: model._id,
        }, model);
    }

    // to do isActive: false give it dinamically
    updateParamsById(model, props) {
        return this.collection.updateOne(
            { _id: new ObjectID(model._id) },
            {
                $set: props,
            }
        );
    }

    validate(model) {
        if (!this.validator || typeof this.validator.isValid !== 'function') {
            return ModelState.valid();
        }

        return this.validator.isValid(model);
    }
}

module.exports = BaseData;
