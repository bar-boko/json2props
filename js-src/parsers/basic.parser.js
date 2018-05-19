import {isPlainObject, isArray} from 'lodash';

export default class BasicParser {
  isAllowed = (key, value) => !isPlainObject(value) && !isArray(value);
  parse = (key, value) => ({ key, value });
};