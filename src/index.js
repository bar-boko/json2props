import JsonParser from "./parsers/json.parser";
import { argv } from "argh";
import { readFileSync } from "fs";
const { parse } = JSON;

const readJson = path => parse(readFileSync(path));

const data = argv.data && readJson(argv.file) || {};
const variables = argv.vars && readJson(argv.vars) || {};
const headers = argv.headers && argv.headers.split(',') || [];

const parser = new JsonParser(variables, headers);
const result = parser.parse(data);

const text = result.map(({ key, value }) => `${key} = ${value}`).join("\n");
console.log(text);
