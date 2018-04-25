import { NotyfOptions, DEFAULT_OPTIONS } from "./options";

export enum NotyfType {
  Alert, Confirm
}

export class Notyf {
  notifications: HTMLElement[];
  options: NotyfOptions;
  animationEndEventName: string;
  container: HTMLElement;

  constructor(opts?: NotyfOptions) {
    // List of notifications currently active
    this.notifications = [];
    this.options = {...DEFAULT_OPTIONS, ...opts};

    // Creates the main notifications container
    var docFrag = document.createDocumentFragment();
    const notyfContainer = this._createHTLMElement({ tagName: 'div', className: 'notyf' });
    docFrag.appendChild(notyfContainer);
    document.body.appendChild(docFrag);
    this.container = notyfContainer;

    // Identifies the main animation end event
    this.animationEndEventName = this._getAnimationEndEventName();
  }

  alert(message: string) {
    this._renderNotification(message, NotyfType.Alert);
  }

  confirm(message: string) {
    this._renderNotification(message, NotyfType.Confirm);
  }

  private _renderNotification(message: string, type: NotyfType) {
    let className: string;

    switch(type) {
      case NotyfType.Alert:
        className = 'notyf--alert';
        break;
      case NotyfType.Confirm:
        className = 'notyf--confirm';
        break;
    }

    const card = this._buildNotificationCard(message, this.options.confirmIcon);
    card.classList.add(className);
    this.container.appendChild(card);
    this.notifications.push(card);
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


    setTimeout(() => {
      notification.classList.add('notyf--disappear');
      let eventFn: (e: TransitionEvent) => void;
      notification.addEventListener(this.animationEndEventName,  eventFn = (event: TransitionEvent) => {
        if (event.target === notification) {
          notification.removeEventListener(this.animationEndEventName, eventFn);
          this.container.removeChild(notification);
        }
      });
      var index = this.notifications.indexOf(notification);
      this.notifications.splice(index,1);
    }, this.options.delay);

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
    var el = document.createElement('_fake');
    var transitions: {[key: string]: string} = {
      'transition':'animationend',
      'OTransition':'oAnimationEnd',
      'MozTransition':'animationend',
      'WebkitTransition':'webkitAnimationEnd'
    }
    let t: any;
    for(t in transitions){
      if( el.style[t] !== undefined ){
        return transitions[t];
      }
    }
    console.warn('Notyf Warning: No supported animation end event. Using "animationend" as a fallback');
    return 'animationend';
  }

}
