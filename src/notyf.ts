import { NotyfOptions, DEFAULT_OPTIONS } from "./notyf.options";
import { NotyfView } from './notyf.view';
import { NotyfNotification, NotyfType, NotyfArrayEvent, NotyfArray } from "./notyf.models";

export class Notyf {
  notifications: NotyfArray<NotyfNotification>;
  private view: NotyfView;
  options: NotyfOptions;

  constructor(opts?: Partial<NotyfOptions>) {
    this.notifications = new NotyfArray();
    this.view = new NotyfView();
    this.options = { ...DEFAULT_OPTIONS, ...opts };

    this.notifications.onupdate((elem, type) => {
      this.view.update(elem, type)
    });
  }

  alert(message: string)  {
    const notification = new NotyfNotification(
      NotyfType.Alert,
      message,
      this.options.delay,
      this.options.alertIcon
    );
    this._pushNotification(notification);
  }

  confirm(message: string) {
    const notification = new NotyfNotification(
      NotyfType.Confirm,
      message,
      this.options.delay,
      this.options.confirmIcon
    );
    this._pushNotification(notification);
  }

  private _pushNotification(notification: NotyfNotification) {
    this.notifications.push(notification);
    setTimeout(() => {
      const index = this.notifications.indexOf(notification);
      this.notifications.splice(index,1);
    }, notification.delay);
  }
}

// TODO: remove this
(window as any)['Notyf'] = Notyf;