import {isPlainObject, keys, trimStart} from 'lodash';

import KeyValue from './key-value.class';
import IParser from './parser.interface';

const SELF_NODE = '_';

const getChildrenKeys = (value: object) => {
	const childKeys: string[] = keys(value);

	return (
		childKeys &&
		childKeys.filter(x => x != SELF_NODE).map(x => trimStart(x, SELF_NODE))
	);
};

export default class SelfObjectParser implements IParser<object> {
	isAllowed: (key: string, value: object) => boolean = (key, value) =>
		isPlainObject(value) && key.startsWith(SELF_NODE);
	parse: (key: string, value: object) => KeyValue = (key, value) => ({
		key,
		value: getChildrenKeys(value),
	});
}

export const getKey = (key: string, headers: string[]) => {
	if (key === SELF_NODE) {
		return headers;
	}

	return [
		...headers,
		key.startsWith(SELF_NODE) ? trimStart(key, SELF_NODE) : key,
	];
};
