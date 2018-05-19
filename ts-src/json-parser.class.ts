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
  private parsers: IParser<any>[];

  constructor(variables = {}, headers: string[] = []) {
    this.variables = variables;
    this.baseHeaders = headers;

    this.parsers = [
      new ArrayParser(),
      new VariableParser(variables),
      new SelfObjectParser(),
      new BasicParser(),
    ];
  }

  private getParser = (key: string, value: any) =>
    this.parsers.find(x => x.isAllowed(key, value));

  public parse(obj: object) {
    const result: KeyValue[] = [];
    const stack: ParsableObject[] = [{obj, headers: this.baseHeaders}];

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
  }
}
