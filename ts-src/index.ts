import JsonParser from './json-parser.class';
import KeyValue from './parsers/key-value.class';

const json = {
  _sources: {
    a1: {
      type: 'Hello',
      bind: '10.2.2.2',
      channels: ['c1'],
      _interceptors: {
        i1: {
          type: '111',
        },
        i2: {
          type: '222',
        },
      },
    },
  },
  _channels: {
    c1: {
      _: 'Hello Hello Hello',
      type: 'memory',
      capacity: 200,
    },
    c2: {
      type: 'memory',
      capacity: 100,
    },
  },
};

const parser = new JsonParser({}, ['agent1']);
const results: KeyValue[] = parser.parse(json);
const {stringify} = JSON;

results.forEach(keyValue => {
  console.log(keyValue.key, '=', keyValue.value);
});

console.log('Hello World');
