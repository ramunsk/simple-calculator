import { ASTNode, ExpressionNode, NumberNode } from './ast';

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
        if (this.node instanceof NumberNode) {
            return this.visitNumber(this.node);
        }

        return 'AST:\n' + this.visitExpression(this.node as ExpressionNode);
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
