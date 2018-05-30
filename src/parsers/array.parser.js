import { isArray } from "lodash";

const ARRAY_DIVIDER = " ";

export default class ArrayParser {
  isAllowed(key, value) {
    return isArray(value);
  }

  parse(key, value) {
    return { key, value: value.join(ARRAY_DIVIDER) };
  }
}
