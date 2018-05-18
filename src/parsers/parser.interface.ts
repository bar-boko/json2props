import KeyValue from './key-value.class';

export default interface IParser<T> {
	isAllowed: (key: string, value: T) => boolean;
	parse: (key: string, value: T) => KeyValue;
}
