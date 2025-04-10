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




// Define the types based on what getTopicContent returns
export interface UserProgress {
  id: string;
  userId: string;
  contentId: string;
  completed: boolean;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  contentId: string;
}

export interface VivaQuestion {
  id: string;
  question: string;
  answer: string;
  contentId: string;
}

export interface Working {
  id: string;
  contentId: string;
  explanation: string;
}

export interface Illustration {
  id: string;
  contentId: string;
  summary: string | null;
  tips: string[];
  images: string[];
  explanation: string;
}

export interface Implementation {
  id: string;
  contentId: string;
  intuition: string;
  approach: string;
  code: string; 
}

export interface Module {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  moduleId: string;
  createdAt: Date;
  updatedAt: Date;
  module: Module;
}

export interface Content {
  id: string;
  title: string;
  description: string;
  brief: string;
  photos: string[];
  complexityAnalysis: string | null;
  timeComplexity: string;
  spaceComplexity: string | null;
  applications: string[];
  advantages: string[];
  disadvantages: string[];
  iscompleted: boolean;
  videos: string[];
  testCases: string[];
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
  faq: FAQ[];
  vivaQuestions: VivaQuestion[];
  working: Working | null;
  illustration: Illustration | null;
  implementation: Implementation | null;
  UserProgress: UserProgress[];
  topic: Topic;
}

// This is what getTopicContent returns
export type TopicContentResponse = Content | null;