/// <reference types="react" />
export declare function useGuaranteedMemo<T>(fn: () => T, deps: React.DependencyList): T;