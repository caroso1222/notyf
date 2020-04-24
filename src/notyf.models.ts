import { INotyfNotificationOptions, DeepPartial } from './notyf.options';

export class NotyfNotification {
  constructor(public options: DeepPartial<INotyfNotificationOptions>) {}
}

export interface IRenderedNotification {
  notification: NotyfNotification;
  node: HTMLElement;
}

export enum NotyfArrayEvent {
  Add, Remove,
}

export type NotyfArrayEventFn<T> = (elem: T, event: NotyfArrayEvent, elems: T[]) => void;

export class NotyfArray<T> {
  private notifications: T[] = [];
  private updateFn!: NotyfArrayEventFn<T>;

  public push(elem: T) {
    this.notifications.push(elem);
    this.updateFn(elem, NotyfArrayEvent.Add, this.notifications);
  }

  public splice(index: number, num: number) {
    const elem = this.notifications.splice(index, num)[0];
    this.updateFn(elem, NotyfArrayEvent.Remove, this.notifications);
    return elem;
  }

  public indexOf(elem: T) {
    return this.notifications.indexOf(elem);
  }

  public onUpdate(fn: NotyfArrayEventFn<T>) {
    this.updateFn = fn;
  }
}
