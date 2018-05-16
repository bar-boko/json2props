import {isPlainObject} from 'lodash';

const SELF_NODE = '_';

const getChildrenKeys = value => {
	const childKeys = keys(value);

	return (
		childKeys &&
		childKeys
			.filter(x => x !== SELF_NODE_CHAR)
			.map(x => trimStart(x, SELF_NODE_CHAR))
	);
};

export default {
	isAllowed: (key, value) => isPlainObject(value) && key.startsWith(SELF_NODE),
	parse: (key, value) => ({key, value: getChildrenKeys(value)}),
};
