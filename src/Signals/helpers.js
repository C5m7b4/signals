import { Signal } from "./signal";
import { Computed } from "./computed";
import { Effect } from "./effect";

export function createSignal(initialValue) {
  return new Signal(initialValue);
}
export function createComputed(computeFn, dependencies) {
  return new Computed(computeFn, dependencies);
}
export function createEffect(effectFn) {
  return new Effect(effectFn);
}
export function executeEffects() {
  while (effectQueue.length > 0) {
    const effect = effectQueue.shift();
    effect._execute();
  }
}
