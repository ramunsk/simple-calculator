import { Token, TokenType } from './token';

export class Lexer {
    private readonly source: string;
    private position: number;
    private tokens: Token[];
    private currentChar: string | null;

    constructor(source: string) {
        this.source = source;
        this.position = 0;
        this.currentChar = source[0] || null;
        this.tokens = [];
    }

    tokenize(): [string | undefined, Token[] | undefined] {
        if (!this.source.length) {
            return [undefined, [{ type: TokenType.EOF, value: '', position: 0 }]];
        }

        while (this.currentChar !== null) {
            const currentChar = this.currentChar!;

            if (/\s/.test(currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (/\d/.test(currentChar)) {
                const position = this.position;
                const numValue = this.number();
                this.addToken(TokenType.Number, numValue, position);
                continue;
            }

            switch (this.currentChar) {
                case '+':
                    this.addToken(TokenType.Plus, '+');
                    this.advance();
                    break;
                case '-':
                    this.addToken(TokenType.Minus, '-');
                    this.advance();
                    break;
                default:
                    return [`Unexpected character '${currentChar}' at position ${this.position}`, undefined];
            }
        }
        return [undefined, this.tokens];
    }

    private skipWhitespace(): void {
        while (this.currentChar !== undefined && /\s/.test(this.currentChar!)) {
            this.advance();
        }
    }

    private addToken(type: TokenType, value: string, position = this.position): void {
        this.tokens.push({ type, value, position: position });
    }

    private number(): string {
        let result = '';
        while (this.currentChar !== null && /\d/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return result;
    }

    private advance(): void {
        this.position++;
        this.currentChar = this.position < this.source.length ? this.source[this.position]! : null;
    }
}
