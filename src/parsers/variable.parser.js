import { isString, trimStart, trimEnd } from "lodash";

const variableRegex = /\@\{[A-Za-z0-9_]+\}/g;
const VAR_PREFIX = "@";

const cleanVarSyntax = variable => trimEnd(trimStart(variable, '@{'), '}');

export default class VariableParser {
  constructor(variables = {}) {
    this.variables = variables;
  }

  isAllowed(key, value) {
    return isString(value) && variableRegex.test(value);
  }

  parse(key, value) {
    let variable;

    while((variable = variableRegex.exec(value))) {
      const varName = cleanVarSyntax(variable);
      const varValue = this.variables[varName];

      if(!varValue) {
        throw Error(`Missing Variable: ${varName}`);
      }

      value = value.replace(variable, varName);
    }

    return {key, value};
  }
}
