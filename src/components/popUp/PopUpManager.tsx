import {RefObject} from 'react';

class PopupManager {
  _defaultModal?: RefObject<any> = undefined;

  register(_ref: RefObject<any>) {
    this._defaultModal = _ref;
  }

  unregister(_ref: RefObject<any>) {
    if (this._defaultModal) {
      this._defaultModal = undefined;
    }
  }

  getDefault() {
    return this._defaultModal;
  }
}

export default new PopupManager();
