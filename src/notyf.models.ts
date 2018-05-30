export enum NotyfType {
  Alert, Confirm,
}

export class NotyfNotification {
  constructor(
    public type: NotyfType,
    public message: string,
    public delay: number,
    public icon: string,
  ) { }
}

export interface IRenderedNotification {
  notification: NotyfNotification;
  node: HTMLElement;
}

export enum NotyfArrayEvent {
  Add, Remove,
}

type NotyfArrayEventFn<T> = (elem: T, event: NotyfArrayEvent, elems: T[]) => void;

export class NotyfArray<T> {
  private notifications: T[] = [];
  private updateFn: NotyfArrayEventFn<T>;

  public push(elem: T) {
    this.notifications.push(elem);
    this.updateFn(elem, NotyfArrayEvent.Add, this.notifications);
  }

  public splice(index: number, num: number) {
    const elem = this.notifications.splice(index, num)[0];
    this.updateFn(elem, NotyfArrayEvent.Remove, this.notifications);
  }

  public indexOf(elem: T) {
    return this.notifications.indexOf(elem);
  }

  public onupdate(fn: NotyfArrayEventFn<T>) {
    this.updateFn = fn;
  }
}
