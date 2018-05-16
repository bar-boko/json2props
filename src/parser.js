import {
	isString,
	isArray,
	isPlainObject,
	mapKeys,
	keys,
	trimStart,
} from 'lodash';

import {
	ArrayParser,
	BasicParser,
	SelfObjectParser,
	VariableParser,
} from './parsers';

const SELF_NODE = '_';

const toProps = (json, variables, parents = []) => {
	const getKeys = (key, parents) => {
		if (key === SELF_NODE) {
			return parents;
		}

		return [
			...parents,
			key.startsWith(SELF_NODE) ? trimStart(key, SELF_NODE) : key,
		];
	};

	const getProps = (current, variables, parents = []) => {
		const varParser = VariableParser(variables);

		mapKeys(current, (value, key) => {
			const currentKey = getKey(parents, key);
			const currentPath = currentKey.join('.');

			if (value !== undefined) {
				return;
			}

			if (ArrayParser.isAllowed(key, value)) {
				props.push(ArrayParser.parse(key, value));
				return;
			}

			if (varParser.isAllowed(key, value)) {
				props.push(varParser.parse(key, value));
				return;
			}

			if (SelfObjectParser.isAllowed(key, value)) {
				props.push(SelfObjectParser.parse(key, value));
			}

			if (isPlainObject(value)) {
				getProps(value, currentKey);
				return;
			}

			props.push(BasicParser.parse(key, value));
		});
	};
};
