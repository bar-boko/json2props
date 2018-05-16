import {isPlainObject, isArray} from 'lodash';

export default {
	isAllowed: (key, value) => !isPlainObject(value) && !isArray(value),
	parse: (key, value) => ({key, value}),
};
