import { makeAutoObservable } from 'mobx';
import { ToastProps } from '@blueprintjs/core';

class Toasts {
  private _toasts: ToastProps[] = [];
  get toasts() {
    return this._toasts;
  }

  addToast = (toast: ToastProps) => {
    this._toasts.push(toast);
  };

  removeToast = (toast: ToastProps) => {
    this._toasts = this._toasts.filter(t => t !== toast);
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default new Toasts();
