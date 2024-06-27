import { Token } from './token';

export type ASTNodeKind = 'number' | 'expression';

export abstract class ASTNode {
    abstract readonly kind: ASTNodeKind;
}

export class NumberNode extends ASTNode {
    override readonly kind = 'number';
    readonly value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }
}

export class ExpressionNode extends ASTNode {
    override readonly kind = 'expression';
    readonly left: ASTNode;
    readonly operator: Token;
    readonly right: ASTNode;

    constructor(left: NumberNode | ExpressionNode, operator: Token, right: NumberNode | ExpressionNode) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}
