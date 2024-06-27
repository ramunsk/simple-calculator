import { ExpressionNode, NumberNode } from './ast';
import { Token, TokenType } from './token';

export class Parser {
    private tokens: Token[];
    private position: number;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.position = 0;
    }

    parse(): ExpressionNode | NumberNode {
        return this.expression();
    }

    private expression(): ExpressionNode | NumberNode {
        const leftNum = this.number();
        const operation = this.peek();

        if (operation?.type !== TokenType.Plus && operation?.type !== TokenType.Minus) {
            console.log('oi', operation?.type);
            return leftNum;
        }

        this.advance();
        const rightNum = this.number();

        return new ExpressionNode(leftNum, operation, rightNum);
    }

    private number(): NumberNode {
        const num = this.tokens[this.position];
        if (num?.type !== TokenType.Number) {
            throw new Error(`Expected number, found ${num?.value}`);
        }

        this.advance();
        return new NumberNode(Number(num.value));
    }

    private peek(offset = 0): Token | undefined {
        return this.tokens[this.position + offset];
    }

    private advance(): void {
        if (this.position === this.tokens.length - 1) {
            return;
        }
        this.position++;
    }
}
