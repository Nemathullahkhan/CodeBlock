// // lib/actions/complexityAnalysis.ts
// import { parse } from "@babel/parser";
// import traverse from "@babel/traverse";
// import { PerformanceObserver, performance } from "perf_hooks";

// export async function calculateTimeAndSpaceComplexity(code: string) {
//   // Static analysis to identify loops and recursive calls
//   const ast = parse(code, {
//     sourceType: "module",
//     plugins: ["jsx"],
//   });

//   let timeComplexity = "O(1)";
//   let spaceComplexity = "O(1)";

//   traverse(ast, {
//     ForStatement(path) {
//       timeComplexity = "O(n)";
//     },
//     WhileStatement(path) {
//       timeComplexity = "O(n)";
//     },
//     FunctionDeclaration(path) {
//       if (path.node.body.body.some((n) => n.type === "ReturnStatement")) {
//         timeComplexity = "O(n)";
//       }
//     },
//   });

//   // Runtime profiling to measure execution time and memory usage
//   const startTime = performance.now();
//   const startMemory = process.memoryUsage().heapUsed;

//   // Execute the code (optional, for runtime profiling)
//   eval(code);

//   const endTime = performance.now();
//   const endMemory = process.memoryUsage().heapUsed;

//   const executionTime = endTime - startTime;
//   const memoryUsage = endMemory - startMemory;

//   // Adjust complexity based on runtime behavior
//   if (executionTime > 1000) {
//     timeComplexity = "O(n^2)";
//   }
//   if (memoryUsage > 1024 * 1024) {
//     spaceComplexity = "O(n)";
//   }

//   return { timeComplexity, spaceComplexity };
// }