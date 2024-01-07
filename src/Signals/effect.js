export class Effect {
  constructor(effectFn) {
    this._effectFn = effectFn;
    this._isStale = true;
    this.currentAccessed = null;
    this._execute();
    //this._effectQueue = [];
  }

  _execute() {
    if (this._isStale) {
      currentAccessed = this;
      this._effectFn();
      currentAccessed = null;
    }
    this._isStale = false;
  }

  _update() {
    if (!this._isStale) {
      this._isStale = true;
      effectQueue.push(this);
    }
  }
}
