import {mapKeys, isPlainObject} from 'lodash';

import KeyValue from './parsers/key-value.class';
import IParser from './parsers/parser.interface';

import BasicParser from './parsers/basic.parser';
import ArrayParser from './parsers/array.parser';
import SelfObjectParser, {getKey} from './parsers/self-object.parser';
import VariableParser, {VariableMap} from './parsers/variable.parser';

export type ParsableObject = {obj: any; headers: string[]};

export default class JsonParser {
	private variables: VariableMap;
	private baseHeaders: string[];
	private parsers: {[id: string]: IParser<any>};

	constructor(variables = {}, headers = []) {
		this.variables = variables;
		this.baseHeaders = headers;

		this.parsers = {
			basic: new BasicParser(),
			array: new ArrayParser(),
			selfObject: new SelfObjectParser(),
			variable: new VariableParser(variables),
		};
	}

	parse(obj: object) {
		const result: KeyValue[] = [];
		const stack: ParsableObject[] = [{obj, headers: this.baseHeaders}];

		while (stack.length > 0) {
			const current = stack.shift();

			mapKeys(current.obj, (value, key) => {
				const currentKey = getKey(key, current.headers);
				const currentKeyPath = currentKey.join();
				let currentParser: IParser<any> = this.parsers.basic;

				if (value === undefined) {
					return null;
				}

				if (this.parsers.array.isAllowed(key, value)) {
					currentParser = this.parsers.array;
				} else if (this.parsers.variable.isAllowed(key, value)) {
					currentParser = this.parsers.variable;
				} else if (this.parsers.selfObject.isAllowed(key, value)) {
					currentParser = this.parsers.selfObject;
				}

				if (isPlainObject(value)) {
					stack.push({obj: value, headers: currentKey});
				}

				return result.push(currentParser.parse(key, value));
			});
		}

		return result;
	}
}
