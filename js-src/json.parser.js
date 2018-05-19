import {mapKeys, isPlainObject} from 'lodash';

import BasicParser from './parsers/basic.parser';
import ArrayParser from './parsers/array.parser';
import SelfObjectParser, {getKey} from './parsers/self-object.parser';
import VariableParser, {VariableMap} from './parsers/variable.parser';

export default class JsonParser {
  constructor(variables = {}, headers = []) {
    this.variables = variables;
    this.baseHeaders = headers;

    this.parsers = [
      new ArrayParser(),
      new VariableParser(variables),
      new SelfObjectParser(),
      new BasicParser(),
    ];
  }

  getParser = (key, value) => this.parsers.find(x => x.isAllowed(key, value));

  parse = obj => {
    const result = [];
    const stack = [{obj, headers: this.baseHeaders}];

    while (stack.length > 0) {
      const current = stack.shift();

      mapKeys(current.obj, (value, key) => {
        const currentKey = getKey(key, current.headers);
        const currentKeyPath = currentKey.join('.');

        if (value === undefined) {
          return null;
        }

        if (isPlainObject(value)) {
          stack.push({obj: value, headers: currentKey});
        }

        const currentParser = this.getParser(key, value);
        return currentParser
          ? currentParser.parse(currentKeyPath, value)
          : null;
      });
    }

    return result;
  };
}
