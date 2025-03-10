import { Monaco } from "@monaco-editor/react";

export interface Language {
  id: string;
  label:string;
  logoPath:string;
  monocoLanguage:string;
  defaulCode:string;
  pistonRuntime:LanguageRuntime;
}


export interface Theme {
    id: string;
    label: string;
    color: string;
  }
  

export interface LanguageRuntime {
    language:string;
    version:string;
}

export interface ExecuteCodeResponse{
    compile?:{
        output:string;
    },
    run?:{
        output:string;
        stderr:string;
    };
}

// export interface ExecutionResult {
//     code:string;
//     output:string;
//     error:string | null;
// }

// export interface CodeEditorState{
//     language:string;
//     output:string;
//     isRunning:boolean;
//     error:string | null;
//     theme:string;
//     fontSize:number;
//     editor: Monaco | null;
//     executionResult: ExecutionResult | null;
//     userInput: string;
//     testCases: string[];
//     testCaseResults: string[];

//     setEditor:(editor:Monaco) => void;
//     getCode: () => string;
//     setLanguage: (language: string) => void;
//     setTheme:(theme:string)=>void;
//     setFontSize: (fontSize:number) => void;
//     setUserInput:(input:string) => void;
//     setTestCases:(testCases:string[]) => void;
//     runCode: ()=> Promise<void>;
// }



export interface TestCase {
    input: string;
    expectedOutput: string;
  }
  
  export interface TestCaseResult {
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }
  
  export interface ExecutionResult {
    type:"Success" | "Compile Error" | "Runtime Error" | "Error";
    output?: string;
    message?:string;
    // error?: string | null;
  }

export interface RuntimeConfig {
    language: string;
    version: string;
  }
  
  export interface CodeEditorState {
    language: string;
    output: string;
    isRunning: boolean;
    error: string | null;
    theme: string;
    fontSize: number;
    editor: Monaco | null;
    executionResult: ExecutionResult | null;
    userInput: string;
    testCases: TestCase[];
    testCaseResults: TestCaseResult[];
  
    setEditor: (editor: Monaco) => void;
    getCode: () => string;
    setLanguage: (language: string) => void;
    setTheme: (theme: string) => void;
    setFontSize: (fontSize: number) => void;
    setUserInput: (input: string) => void;
    setTestCases: (testCases: TestCase[]) => void;
    runCode: () => Promise<void>;
    executeCode: (runtime: RuntimeConfig, code: string, userInput: string) => Promise<ExecutionResult>; 
    runAndVerifyCode: () => Promise<void>;
    runfloydAndVerifyCode: () => Promise<void>;
    runWarshallAndVerifyCode: () => Promise<void>;
    runTopologicalSortAndVerifyCode: ()=> Promise<void>;
  }
  
 
export interface ModulesType{
    id:string;
    name:string;
    description:string;
}

export interface Topics{
    id:string;
    name:string;
    description:string;
    code:string;
    
}

import { z } from "zod";

// Define the schema for an example
export const ExampleSchema = z.object({
  input: z.string(),
  output: z.string(),
});

// Infer the type from the schema
export type Example = z.infer<typeof ExampleSchema>;

// Define the type for the data returned by fetchQuestionData
export interface QuestionData {
  id: string;
  title: string;
  Questions?: {
    question: string;
    examples: Example[];
    constraints: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    averageTime: string;
  };
}