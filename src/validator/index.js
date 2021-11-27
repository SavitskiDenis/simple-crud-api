class Validator {
    constructor (config) {
        if (!config || typeof config !== 'object') {
            throw new Error('Not correct config');
        }

        this.config = config;
    }

    validate (value) {
        if (Array.isArray(value) || typeof value !== 'object' || !value) {
            throw new Error('Value is not a object');
        }

        for (const prop in this.config) {
            if (this.config[prop].required && !value.hasOwnProperty(prop)) {
                throw new Error(`Not found required field: ${prop}`);
            }

            // check string
            if (value[prop] && this.config[prop].type === 'string' && typeof value[prop] !== 'string') {
                throw new Error(`Field ${prop} is not a string`);
            }

            // check numbers
            if (value[prop] && this.config[prop].type === 'number' && typeof value[prop] !== 'number') {
                throw new Error(`Field ${prop} is not a number`);
            }

            // check array
            if (value[prop] && this.config[prop].type === 'array') {
                if (!Array.isArray(value[prop])) {
                    throw new Error(`Field ${prop} is not a array`);
                }

                // check array item type
                if (this.config[prop].item && typeof this.config[prop].item.type === 'string') {
                    for (let i = 0; i < value[prop].length; i++) {
                        if (typeof value[prop][i] !== this.config[prop].item.type) {
                            throw new Error(`Value by index ${i} of ${prop} array is not ${this.config[prop].item.type}`);
                        }
                    }
                }
            }
        }
    }
}

module.exports = Validator;