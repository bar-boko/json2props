import {isPlainObject, isArray} from 'lodash';

export default class BasicParser {
    isAllowed(key, value) {
        return !isPlainObject(value) && !this.isArray(value);
    }

    parse(key, value) {
        return ({key, value});
    }
};