import {isArray} from 'lodash';

const ARRAY_DIVIDER = ' ';

export default class ArrayParser {
  isAllowed = (key, value) => isArray(value);
  parse = (key, value) => ({
    key,
    value: value.join(ARRAY_DIVIDER),
  });
}
