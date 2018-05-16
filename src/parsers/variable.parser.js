import {isString} from 'lodash';

const VAR_PREFIX = '@';

export default variables => ({
	isAllowed: (key, value) =>
		isString(value) && value && value.startsWith(VAR_PREFIX),
	parse: (key, value) => {
		const varName = value.replace(VAR_PREFIX, '');
		const varValue = variables[varName];

		if (!varValue) {
			return;
		}

		return {key, value: varValue};
	},
});
