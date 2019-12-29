export class SagaRegistry {
  constructor() {
    this._emitChange = null;
    this._sagas = {};
  }

  getSagas() {
    return { ...this._sagas };
  }

  register(name, saga) {
    this._sagas = { ...this._sagas, [name]: saga };
    if (this._emitChange) {
      this._emitChange(this.getSagas());
    }
  }

  setChangeListener(listener) {
    this._emitChange = listener;
  }
}

const sagaRegistry = new SagaRegistry();
export default sagaRegistry;
