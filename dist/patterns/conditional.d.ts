import { BasePattern } from "./base";
/** Conditional pattern */
export declare class ConditionalPattern extends BasePattern {
    /** Parser method */
    execute(): void;
    /** Returns the full condition to be injected in the 'if' statement */
    private condition;
    /** Convert the condition short code to tester method */
    protected tester(condition: string): string;
    /** Convert the input variable to the real variable */
    protected variable(variable: string): string;
}
