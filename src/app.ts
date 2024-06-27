import { Lexer } from './lexer';
import { Parser } from './parser';
import { AstVisualizer, ExpressionEvaluator, ExpressionFormatter } from './visitor';

const args = process.argv;
args.shift();
args.shift();

const shouldFormat = args.includes('--format');
const shouldPrintAst = args.includes('--ast');

const input = args.find((a) => !a.startsWith('--'));
if (!input) {
    console.log('Input was not provided!');
    process.exit(1);
}

const [error, tokens] = new Lexer(input).tokenize();
if (error) {
    console.log(error);
    process.exit(1);
}

let ast;

try {
    ast = new Parser(tokens!).parse();
} catch (error) {
    console.log(error);
    process.exit(1);
}

if (shouldFormat) {
    const pretty = new ExpressionFormatter(ast).format();
    console.log(pretty);
}

if (shouldPrintAst) {
    const astString = new AstVisualizer(ast).visualize();
    console.log(astString);
}

const result = new ExpressionEvaluator(ast).evaluate();
console.log(result);
