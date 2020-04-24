import {
  IRenderedNotification,
  NotyfArrayEvent,
  NotyfNotification,
} from './notyf.models';

export class NotyfView {

  public a11yContainer!: HTMLElement;
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
    this._createA11yContainer();
  }

  public update(notification: NotyfNotification, type: NotyfArrayEvent) {
    if (type === NotyfArrayEvent.Add) {
      this.addNotification(notification);
    } else if (type === NotyfArrayEvent.Remove) {
      this.removeNotification(notification);
    }
  }

  public removeNotification(notification: NotyfNotification) {
    const renderedNotification = this._popRenderedNotification(notification);
    let node!: HTMLElement;
    if (!renderedNotification) {
      return;
    }
    node = renderedNotification.node;
    node.classList.add('notyf__toast--disappear');
    let handleEvent: (e: Event) => void;
    node.addEventListener(this.animationEndEventName, handleEvent = (event: Event) => {
      if (event.target === node) {
        node.removeEventListener(this.animationEndEventName, handleEvent);
        this.container.removeChild(node);
      }
    });
  }

  public addNotification(notification: NotyfNotification) {
    const node = this._renderNotification(notification);
    this.notifications.push({ notification, node });
    // For a11y purposes, we still want to announce that there's a notification in the screen
    // even if it comes with no message.
    this._announce(notification.options.message || 'Notification');
  }

  private _renderNotification(notification: NotyfNotification): HTMLElement {
    const card = this._buildNotificationCard(notification);
    const className = notification.options.className;
    if (className) {
      card.classList.add(...className.split(' '));
    }
    this.container.appendChild(card);
    return card;
  }

  private _popRenderedNotification(notification: NotyfNotification): IRenderedNotification | undefined {
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

  private _buildNotificationCard(notification: NotyfNotification): HTMLElement {
    const { options } = notification;
    const iconOpts = options.icon;

    // Create elements
    const notificationElem = this._createHTLMElement({ tagName: 'div', className: 'notyf__toast'});
    const ripple = this._createHTLMElement({ tagName: 'div', className: 'notyf__ripple'});
    const wrapper = this._createHTLMElement({ tagName: 'div', className: 'notyf__wrapper'});
    const message = this._createHTLMElement({ tagName: 'div', className: 'notyf__message'});

    message.innerHTML = options.message || '';
    const color = options.backgroundColor;

    // build the icon and append it to the card
    if (iconOpts && typeof iconOpts === 'object') {
      const iconContainer = this._createHTLMElement({ tagName: 'div', className: 'notyf__icon'});
      const icon = this._createHTLMElement({
        tagName: iconOpts.tagName || 'i',
        className: iconOpts.className,
        text: iconOpts.text,
        html: iconOpts.html,
      });
      if (color) {
        icon.style.color = color;
      }
      iconContainer.appendChild(icon);
      wrapper.appendChild(iconContainer);
    }

    wrapper.appendChild(message);
    notificationElem.appendChild(wrapper);

    // add ripple if applicable, else just paint the full toast
    if (color) {
      if (options.ripple) {
        ripple.style.backgroundColor = color;
        notificationElem.appendChild(ripple);
      } else {
        notificationElem.style.backgroundColor = color;
      }
    }
    return notificationElem;
  }

  private _createHTLMElement({ tagName, className, text, html }:
    { tagName: keyof ElementTagNameMap, className?: string, text?: string, html?: string }): HTMLElement {
    const elem = document.createElement(tagName);
    if (className) {
      elem.className = className;
    }
    if (html?.trim()) {
      elem.innerHTML = html;
    }
    elem.textContent = text || null;
    return elem;
  }

  /**
   * Creates an invisible container which will announce the notyfs to
   * screen readers
   */
  private _createA11yContainer() {
    const a11yContainer = this._createHTLMElement({ tagName: 'div', className: 'notyf-announcer' });
    a11yContainer.setAttribute('aria-atomic', 'true');
    a11yContainer.setAttribute('aria-live', 'polite');
    // Set the a11y container to be visible hidden. Can't use display: none as
    // screen readers won't read it.
    a11yContainer.style.border = '0';
    a11yContainer.style.clip = 'rect(0 0 0 0)';
    a11yContainer.style.height = '1px';
    a11yContainer.style.margin = '-1px';
    a11yContainer.style.overflow = 'hidden';
    a11yContainer.style.padding = '0';
    a11yContainer.style.position = 'absolute';
    a11yContainer.style.width = '1px';
    a11yContainer.style.outline = '0';
    document.body.appendChild(a11yContainer);
    this.a11yContainer = a11yContainer;
  }

  /**
   * Announces a message to screenreaders.
   */
  private _announce(message: string) {
    this.a11yContainer.textContent = '';

    // This 100ms timeout is necessary for some browser + screen-reader combinations:
    // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
    // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
    //   second time without clearing and then using a non-zero delay.
    // (using JAWS 17 at time of this writing).
    // https://github.com/angular/material2/blob/master/src/cdk/a11y/live-announcer/live-announcer.ts
    setTimeout(() => {
      this.a11yContainer.textContent = message;
    }, 100);
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
