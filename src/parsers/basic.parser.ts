import {isArray, isPlainObject} from 'lodash';

import KeyValue from './key-value.class';
import IParser from './parser.interface';

const ARRAY_DIVIDER = ' ';

export default class ArrayParser implements IParser<any> {
	isAllowed: (key: string, value: object) => boolean = (key, value) =>
		!isPlainObject(value) && !isArray(value);
	parse: (key: string, value: any) => KeyValue = (key, value) => ({key, value});
}
