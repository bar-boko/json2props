import {isString} from 'lodash';

const VAR_PREFIX = '@';

export default class VariableParser {
  constructor(variables = {}) {
    this.variables = variables;
  }

  isAllowed = (key, value) => isString(value) && value.startsWith(VAR_PREFIX);
  parse = (key, value) => {
    const varName = value.replace(VAR_PREFIX, '');
    const varValue = this.variables[varName];

    if (!varValue) {
      throw new Error(`There's no variable named ${varName}`);
    }

    return {key, value: varValue};
  };
}
