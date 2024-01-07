import { executeEffects } from "./helpers";

export class Signal {
  constructor(initialValue) {
    this._value = initialValue;
    this._dependents = [];
    //this._currentAccessed = null;
  }

  get value() {
    if (currentAccessed) {
      this._addDependent(currentAccessed);
    }
    return this._value;
  }

  set value(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._notifyDependents();
      //this._currentAccessed = newValue;
      executeEffects();
    }
  }

  _addDependent(dependent) {
    if (!this._dependents.includes(dependent)) {
      this._dependents.push(dependent);
    }
  }

  _removeDependent(dependent) {
    this._dependents = this._dependents.filter((dep) => dep !== dependent);
  }

  _notifyDependents() {
    for (const dependent of this._dependents) {
      dependent._update();
    }
  }
}
