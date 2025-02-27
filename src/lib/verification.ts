import type { NextApiRequest, NextApiResponse } from 'next';
import Parser, { Language } from 'tree-sitter';

export interface ASTNode {
  type: string;
  text: string;
  startPosition: { row: number; column: number };
  endPosition: { row: number; column: number };
  children: ASTNode[];
}

export interface ASTRule {
  nodeType: string;
  name?: string;              // Expected function or variable name
  recursive?: boolean;        // Should the function call itself
  mustCallFunction?: string;  // For example, a call to "merge"
}

export interface VerificationRule {
  astRules: ASTRule[];
  propertyTests: ((input: number[], output: number[]) => boolean)[];
}

// Define merge sort rules
export const mergeSortVerification: VerificationRule = {
  astRules: [
    { nodeType: 'FunctionDeclaration', name: 'mergeSort', recursive: true },
    { nodeType: 'VariableDeclaration', name: 'mid' },
    { nodeType: 'CallExpression', mustCallFunction: 'merge' },
  ],
  propertyTests: [
    // For sorting: output must be ordered and contain exactly the input elements.
    (input: number[], output: number[]): boolean => {
      const isSorted = output.every((v, i) => i === 0 || v >= output[i - 1]);
      const sortedInput = [...input].sort((a, b) => a - b);
      const sortedOutput = [...output].sort((a, b) => a - b);
      return (
        isSorted &&
        sortedInput.length === sortedOutput.length &&
        sortedInput.every((val, i) => val === sortedOutput[i])
      );
    },
  ],
};

export async function externalGenerateAST(
  code: string,
  language: string
): Promise<{ ast: ASTNode | null; error: string | null }> {
  try {
    const response = await fetch('/api/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, code }),
    });
    const data = await response.json();
    if (data.error) return { ast: null, error: data.error };
    return { ast: data.ast as ASTNode, error: null };
  } catch (err) {
    console.error('AST generation error:', err);
    return { ast: null, error: 'Error generating AST' };
  }
}

function checkForRule(ast: ASTNode, rule: ASTRule): boolean {
  if (rule.nodeType === 'FunctionDeclaration' && rule.name) {
    return ast.text.includes(rule.name);
  }
  if (rule.nodeType === 'VariableDeclaration' && rule.name) {
    return ast.text.includes(rule.name);
  }
  if (rule.nodeType === 'CallExpression' && rule.mustCallFunction) {
    return ast.text.includes(rule.mustCallFunction);
  }
  return false;
}

export function verifyAST(ast: ASTNode, rules: ASTRule[]): boolean {
  return rules.every(rule => checkForRule(ast, rule));
}

export function verifyProperties(
  rule: VerificationRule,
  input: number[],
  output: number[]
): boolean {
  return rule.propertyTests.every(test => test(input, output));
}

export async function verifyMergeSortProgram(
  code: string,
  testInput: number[],
  testOutput: number[]
): Promise<{ passed: boolean; details: string }> {
  const rule = mergeSortVerification;

  // Generate AST using our Next.js API endpoint
  const astResult = await externalGenerateAST(code, 'c'); // Adjust language as needed
  if (astResult.error) {
    return { passed: false, details: `AST generation failed: ${astResult.error}` };
  }

  const ast = astResult.ast;
  if (!ast) {
    return { passed: false, details: 'AST parsing resulted in null AST' };
  }

  const astValid = verifyAST(ast, rule.astRules);
  if (!astValid) {
    return { passed: false, details: 'AST verification failed: required constructs missing' };
  }

  const propertiesValid = verifyProperties(rule, testInput, testOutput);
  if (!propertiesValid) {
    return { passed: false, details: 'Property-based tests failed: output does not meet invariants' };
  }

  return { passed: true, details: 'Merge sort implementation verified successfully.' };
}
