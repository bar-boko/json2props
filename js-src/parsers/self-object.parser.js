import {isPlainObject, keys, trimStart} from 'lodash';

const SELF_NODE = '_';

const getChildrenKeys = value => {
  const childKeys = keys(value);

  return (
    childKeys &&
    childKeys.filter(x => x != SELF_NODE).map(x => trimStart(x, SELF_NODE))
  );
};

export default class SelfObjectParser {
  isAllowed = (key, value) => isPlainObject(value) && key.startsWith(SELF_NODE);
  parse = (key, value) => ({
    key,
    value: getChildrenKeys(value),
  });
}

export const getKey = (key, headers) => {
  if (key === SELF_NODE) {
    return headers;
  }

  return [
    ...headers,
    key.startsWith(SELF_NODE) ? trimStart(key, SELF_NODE) : key,
  ];
};
