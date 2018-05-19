import {isString} from 'lodash';

import KeyValue from './key-value.class';
import IParser from './parser.interface';

const VAR_PREFIX = '@';

export type VariableMap = {[id: string]: string};

export default class VariableParser implements IParser<string> {
  private variables: VariableMap;

  constructor(variables: VariableMap = {}) {
    this.variables = variables;
  }

  isAllowed: (key: string, value: string) => boolean = (key, value) => {
    return isString(value) && value.startsWith(VAR_PREFIX);
  };
  parse: (key: string, value: string) => KeyValue = (key, value) => {
    const varName = value.replace(VAR_PREFIX, '');
    const varValue = this.variables[varName];

    if (!varValue) {
      throw new Error(`There's no variable named ${varName}`);
    }

    return {key, value: varValue};
  };
}
