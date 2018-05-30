import { mapKeys, isPlainObject } from "lodash";

import BasicParser from "./basic.parser";
import ArrayParser from "./array.parser";
import SelfObjectParser, { getKey } from "./self-object.parser";
import VariableParser, { VariableMap } from "./variable.parser";

export default class JsonParser {
  constructor(variables = {}, headers = []) {
    this.variables = variables;
    this.baseHeaders = headers;

    this.parsers = [
      new ArrayParser(),
      new VariableParser(variables),
      new SelfObjectParser(),
      new BasicParser()
    ];
  }

  getParser(key, value) {
    return this.parsers.find(x => x.isAllowed(key, value));
  }

  parse(obj) {
    const result = [];
    const stack = [{ obj, headers: this.baseHeaders }];

    while (stack.length > 0) {
      const current = stack.shift();
      mapKeys(current.obj, (value, key) =>
        this.mapEntry(result, stack, key, value)
      );
    }

    return result;
  }

  mapEntry(result, stack, key, value) {
    const currentKey = getKey(key, current.headers);
    const currentKeyPath = currentKey.join(".");

    if (value === undefined) {
      return null;
    }

    if (isPlainObject(value)) {
      stack.push({ obj: value, headers: currentKey });
    }

    const currentParser = this.getParser(key, value);
    return currentParser
      ? result.push(currentParser.parse(currentKeyPath, value))
      : null;
  }
}
