export const enum TokenType {
    Number = 'Number',
    Plus = 'Plus',
    Minus = 'Minus',
    EOF = 'EOF',
}

export interface Token {
    readonly type: TokenType;
    readonly value: string;
    readonly position: number;
}
