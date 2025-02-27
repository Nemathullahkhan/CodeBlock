import type { NextApiRequest, NextApiResponse } from 'next';
import Parser, { Language } from 'tree-sitter';

export type ASTNode = {
  type: string;
  text: string;
  startPosition: { row: number; column: number };
  endPosition: { row: number; column: number };
  children: ASTNode[];
};

function nodeToJSON(node: Parser.SyntaxNode): ASTNode {
  return {
    type: node.type,
    text: node.text,
    startPosition: node.startPosition,
    endPosition: node.endPosition,
    children: node.children.map(child => nodeToJSON(child)),
  };
}

async function loadLanguage(language: string): Promise<Language> {
  let langModule;
  if (language === 'c') {
    langModule = await import('tree-sitter-c');
  } else if (language === 'cpp') {
    langModule = await import('tree-sitter-cpp');
  } else if (language === 'java') {
    langModule = await import('tree-sitter-java');
  } else if (language === 'python') {
    langModule = await import('tree-sitter-python');
  } else {
    throw new Error('Unsupported language');
  }

  return langModule.default as Language; // Explicitly cast `default` as `Language`
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { language, code } = req.body;
  if (!language || !code) {
    res.status(400).json({ error: 'Missing language or code' });
    return;
  }
  try {
    const langModule = await loadLanguage(language);
    const parser = new Parser();
    parser.setLanguage(langModule); // Now correctly typed
    const tree = parser.parse(code);
    const ast = nodeToJSON(tree.rootNode);
    res.status(200).json({ ast });
  } catch (error) {
    console.error('AST generation error:', error);
    res.status(500).json({ error: 'Error found in parse.ts' });
  }
}
