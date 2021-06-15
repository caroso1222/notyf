type EventCallback<E> = (event: E) => void;

export default class EventEmitter< EventMap extends any > {
  
  protected listeners: {

    [K in keyof EventMap]?: EventCallback< EventMap[K] >[]

  } = {}

  constructor() {}

  on<Event extends keyof EventMap>(eventType: Event, cb: EventCallback< EventMap[Event] >) {
    const callbacks: EventCallback< EventMap[Event] >[] = this.listeners[eventType] ?? [];
    this.listeners[eventType] = callbacks.concat([cb]);
  }

  triggerEvent<Event extends keyof EventMap>(eventType: Event, event: EventMap[ Event ]) {
    const callbacks: EventCallback< EventMap[Event] >[] = this.listeners[eventType] ?? [];
    callbacks.forEach((callback: EventCallback< EventMap[Event] >) => callback(event));
  }

}