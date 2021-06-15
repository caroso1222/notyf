type EventCallback = (event: any) => void;

export default class EventeListener {
  protected listeners: Partial<Record<string, EventCallback[]>> = {};

  constructor() {}

  public on(eventType: string, cb: EventCallback) {
    const callbacks = this.listeners[eventType] || [];
    this.listeners[eventType] = callbacks.concat([cb]);
  }

  protected triggerEvent(eventType: string, event?: any) {
    const callbacks = this.listeners[eventType] || [];
    callbacks.forEach((callback: EventCallback) => callback(event));
  }
}
