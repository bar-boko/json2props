import {isArray} from 'lodash';

const ARRAY_DIVIDER = ' ';

export default {
	isAllowed: (key, value) => isArray(value),
	parse: (key, value) => ({key, value: value.join(ARRAY_DIVIDER)}),
};
