import { ASTNode, ExpressionNode, NumberNode } from './ast';
import { TokenType } from './token';

export abstract class ASTNodeVisitor<T> {
    abstract visitExpression(node: ExpressionNode): T;
    abstract visitNumber(node: NumberNode): T;
}

export class AstVisualizer extends ASTNodeVisitor<string> {
    private padding: number;
    private node: ASTNode;

    constructor(node: ASTNode) {
        super();
        this.node = node;
        this.padding = 0;
    }

    visualize(): string {
        const result =
            this.node instanceof NumberNode
                ? this.visitNumber(this.node)
                : this.visitExpression(this.node as ExpressionNode);
        const separator = '-'.repeat(30);
        return `${separator}\nAST:\n${result}\n${separator}`;
    }

    override visitExpression(node: ExpressionNode): string {
        let result = '';
        if (node.left instanceof NumberNode) {
            result += this.visitNumber(node.left);
        } else {
            result += '\n';
            this.padding += 2;
            result += ' '.repeat(this.padding) + this.visitExpression(node.left as ExpressionNode);
            this.padding -= 2;
        }

        result += ` ${node.operator.value} `;

        if (node.right instanceof NumberNode) {
            result += this.visitNumber(node.right);
        } else {
            result += '\n';
            this.padding += 2;
            result += ' '.repeat(this.padding) + this.visitExpression(node.right as ExpressionNode);
            this.padding -= 2;
        }
        return result;
    }

    override visitNumber(node: NumberNode): string {
        return node.value.toString();
    }
}

export class ExpressionEvaluator extends ASTNodeVisitor<number> {
    private node: ASTNode;

    constructor(node: ASTNode) {
        super();
        this.node = node;
    }

    evaluate(): string {
        const result =
            this.node instanceof NumberNode
                ? this.visitNumber(this.node)
                : this.visitExpression(this.node as ExpressionNode);
        return `Result is: ${result}`;
    }

    override visitExpression(node: ExpressionNode): number {
        let left =
            node.left instanceof NumberNode ? node.left.value : this.visitExpression(node.left as ExpressionNode);
        let right =
            node.right instanceof NumberNode ? node.right.value : this.visitExpression(node.right as ExpressionNode);

        return node.operator.type === TokenType.Plus ? left + right : left - right;
    }
    override visitNumber(node: NumberNode): number {
        return node.value;
    }
}

export class ExpressionFormatter extends ASTNodeVisitor<string> {
    private node: ASTNode;

    constructor(node: ASTNode) {
        super();
        this.node = node;
    }

    format(): string {
        const result =
            this.node instanceof NumberNode
                ? this.visitNumber(this.node)
                : this.visitExpression(this.node as ExpressionNode);
        const separator = '-'.repeat(30);
        return `${separator}\nPretty print:\n${result}\n${separator}`;
    }

    override visitExpression(node: ExpressionNode): string {
        let left =
            node.left instanceof NumberNode
                ? this.visitNumber(node.left)
                : this.visitExpression(node.left as ExpressionNode);
        let right =
            node.right instanceof NumberNode
                ? this.visitNumber(node.right)
                : this.visitExpression(node.right as ExpressionNode);

        return `${left}${node.operator.value} ${right}`;
    }
    override visitNumber(node: NumberNode): string {
        return `${node.value} `;
    }
}
