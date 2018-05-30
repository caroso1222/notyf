import {
  IRenderedNotification,
  NotyfArrayEvent,
  NotyfNotification,
  NotyfType,
} from './notyf.models';

export class NotyfView {

  public animationEndEventName: string;
  public container: HTMLElement;
  private notifications: IRenderedNotification[] = [];

  constructor() {
    // Creates the main notifications container
    const docFrag = document.createDocumentFragment();
    const notyfContainer = this._createHTLMElement({ tagName: 'div', className: 'notyf' });
    docFrag.appendChild(notyfContainer);
    document.body.appendChild(docFrag);
    this.container = notyfContainer;

    // Identifies the main animation end event
    this.animationEndEventName = this._getAnimationEndEventName();
  }

  public update(notification: NotyfNotification, type: NotyfArrayEvent) {
    if (type === NotyfArrayEvent.Add) {
      this.addNotification(notification);
    } else if (type === NotyfArrayEvent.Remove) {
      this.removeNotification(notification);
    }
  }

  public removeNotification(notification: NotyfNotification) {
    const node = this._popRenderedNotification(notification).node;
    node.classList.add('notyf--disappear');
    let eventFn: (e: TransitionEvent) => void;
    node.addEventListener(this.animationEndEventName, eventFn = (event: TransitionEvent) => {
      if (event.target === node) {
        node.removeEventListener(this.animationEndEventName, eventFn);
        this.container.removeChild(node);
      }
    });
  }

  public addNotification(notification: NotyfNotification) {
    const node = this._renderNotification(notification);
    this.notifications.push({ notification, node });
  }

  private _renderNotification(notification: NotyfNotification): HTMLElement {
    let className: string;

    switch (notification.type) {
      case NotyfType.Alert:
        className = 'notyf--alert';
        break;
      case NotyfType.Confirm:
        className = 'notyf--confirm';
        break;
    }

    const card = this._buildNotificationCard(notification.message, notification.icon);
    card.classList.add(className);
    this.container.appendChild(card);
    return card;
  }

  private _popRenderedNotification(notification: NotyfNotification): IRenderedNotification {
    let idx = -1;
    for (let i = 0; i < this.notifications.length && idx < 0; i++) {
      if (this.notifications[i].notification === notification) {
        idx = i;
      }
    }
    if (idx !== -1) {
      return this.notifications.splice(idx, 1)[0];
    }
    return;
  }

  private _buildNotificationCard(messageText: string, iconClass: string): HTMLElement {
    // Create elements
    const notification = this._createHTLMElement({ tagName: 'div', className: 'notyf__toast'});
    const wrapper = this._createHTLMElement({ tagName: 'div', className: 'notyf__wrapper'});
    const iconContainer = this._createHTLMElement({ tagName: 'div', className: 'notyf__icon'});
    const icon = this._createHTLMElement({ tagName: 'i', className: iconClass});
    const message = this._createHTLMElement({ tagName: 'div', className: 'notyf__message'});

    message.innerHTML = messageText;

    // Build the card
    iconContainer.appendChild(icon);
    wrapper.appendChild(iconContainer);
    wrapper.appendChild(message);
    notification.appendChild(wrapper);

    return notification;
  }

  private _createHTLMElement({ tagName, className }:
    { tagName: keyof ElementTagNameMap, className: string }): HTMLElement {
    const elem = document.createElement(tagName);
    elem.className = className;
    return elem;
  }

  /**
   * Determine which animationend event is supported
   */
  private _getAnimationEndEventName(): string {
    const el = document.createElement('_fake');
    const transitions: {[key: string]: string} = {
      MozTransition: 'animationend',
      OTransition: 'oAnimationEnd',
      WebkitTransition: 'webkitAnimationEnd',
      transition: 'animationend',
    };
    let t: any;
    for (t in transitions) {
      if ( el.style[t] !== undefined ) {
        return transitions[t];
      }
    }
    // No supported animation end event. Using "animationend" as a fallback
    return 'animationend';
  }
}
