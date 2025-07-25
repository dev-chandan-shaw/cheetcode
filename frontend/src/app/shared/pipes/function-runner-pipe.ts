import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'functionRunner',
  standalone: true // It's good practice to make new pipes standalone
})
export class FunctionRunnerPipe implements PipeTransform {
  /**
   * Executes a function with the provided arguments.
   * @param value The value from the left of the pipe (ignored).
   * @param fn The function to execute.
   * @param args The arguments to pass to the function.
   * @returns The result of the function call.
   */
  transform(value: unknown, fn: (...args: any[]) => any, ...args: any[]): any {
    // The 'value' is ignored, and the function is called only with the
    // arguments provided after the function name in the template.
    return fn(...args);
  }
}