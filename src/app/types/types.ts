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
    output: string;
    error: string | null;
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
    executeCode: (runtime: RuntimeConfig, code: string, userInput: string) => Promise<string>;
    runAndVerifyCode: () => Promise<void>;
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