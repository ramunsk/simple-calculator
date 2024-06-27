import { Lexer } from './lexer';
import { Parser } from './parser';
import { AstVisualizer, ExpressionEvaluator } from './visitor';

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

try {
    const ast = new Parser(tokens!).parse();
    const astString = new AstVisualizer(ast).visualize();
    console.log(astString);

    const result = new ExpressionEvaluator(ast).evaluate();
    console.log(result);
} catch (error) {
    console.log(error);
    process.exit(1);
}
