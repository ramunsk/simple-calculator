import { Lexer } from './lexer';

const args = process.argv;

const input = args[2];
if (!input) {
    console.log('Input was not provided!');
    process.exit(1);
}

const [error, tokens] = new Lexer(input).tokenize();
if (error) {
    console.log(error);
    process.exit(1);
}

console.log(tokens);
