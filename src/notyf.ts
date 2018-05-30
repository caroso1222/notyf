import {
  NotyfArray,
  NotyfArrayEvent,
  NotyfNotification,
  NotyfType,
} from './notyf.models';
import { DEFAULT_OPTIONS, INotyfOptions } from './notyf.options';
import { NotyfView } from './notyf.view';

/**
 * Main controller class. Defines the main Notyf API.
 */
export default class Notyf {
  public notifications: NotyfArray<NotyfNotification>;
  public options: INotyfOptions;
  private view: NotyfView;

  constructor(opts?: Partial<INotyfOptions>) {
    this.notifications = new NotyfArray();
    this.view = new NotyfView();
    this.options = { ...DEFAULT_OPTIONS, ...opts };

    this.notifications.onupdate((elem, type) => {
      this.view.update(elem, type);
    });
  }

  public alert(message: string)  {
    const notification = new NotyfNotification(
      NotyfType.Alert,
      message,
      this.options.delay,
      this.options.alertIcon,
    );
    this._pushNotification(notification);
  }

  public confirm(message: string) {
    const notification = new NotyfNotification(
      NotyfType.Confirm,
      message,
      this.options.delay,
      this.options.confirmIcon,
    );
    this._pushNotification(notification);
  }

  private _pushNotification(notification: NotyfNotification) {
    this.notifications.push(notification);
    setTimeout(() => {
      const index = this.notifications.indexOf(notification);
      this.notifications.splice(index, 1);
    }, notification.delay);
  }
}
