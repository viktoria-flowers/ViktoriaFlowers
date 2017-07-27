const ModelState = require('../model-state');
const { ObjectID } = require('mongodb');
const constants = require('../../app/utils/constants');

class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.validator = validator;
        this.collectionName = ModelClass.name.toLowerCase() + 's';
        this.collection = db.collection(this.collectionName);
    }

    getAll(filters, sortObj, page, size) {
        page = page || 1;
        size = size || constants.DEFAULT_PAGE_SIZE;
        sortObj = sortObj || {};

        const skipVal = (page - 1) * size;
        if (filters) {
            return this.collection
                .find(filters)
                .sort(sortObj)
                .skip(skipVal)
                .limit(size)
                .toArray();
        }

        return this.collection
            .find()
            .sort(sortObj)
            .skip(skipVal)
            .limit(size)
            .toArray();
    }

    findById(id) {
        if (id || !ObjectID.isValid(id)) {
            return Promise.reject(['invalid-id']);
        }

        return this.collection.findOne({ _id: new ObjectID(id) })
            .then((model) => {
                if (!model) {
                    return Promise.resolve(null);
                }

                return Promise.resolve(model);
            });
    }

    findAllRecordsByIds(ids) {
        // console.log(ids);
        // const searchedIds = ids.map(((obj) => {
        //      return new ObjectID(obj._id);
        // }));
let searchedIds = ids.map(function (obj){ return new ObjectID(obj._id)});

this.collection.find({ "_id": { "$in": searchedIds }});
        // console.log(searchedIds);
        // this.collection.find({
        //     '_id': { '$in':
        //         searchedIds,
        //     },
        // });
    }

    create(model) {
        const modelState = this.validate(model);
        if (!modelState.isValid) {
            return Promise.reject(modelState.errors);
        }
        return this.collection.insert(model)
            .then((status) => {
                // contains the object with generated Id from mongo
                return status.ops[0];
            });
    }

    removeObjectById(obj) {
        return this.collection.remove({
            _id: new ObjectID(obj._id),
        });
    }

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
