import { NotyfArray, NotyfNotification } from './notyf.models';
import {
  DEFAULT_OPTIONS,
  INotyfOptions,
  INotyfNotificationOptions,
  DeepPartial,
  NotyfEvent,
} from './notyf.options';
import { NotyfView } from './notyf.view';

/**
 * Main controller class. Defines the main Notyf API.
 */
export default class Notyf {
  public notifications: NotyfArray<NotyfNotification>;
  public options: INotyfOptions;

  public dismiss = this._removeNotification;
  private view: NotyfView;

  constructor(opts?: Partial<INotyfOptions>) {
    this.notifications = new NotyfArray();
    this.view = new NotyfView();
    const types = this.registerTypes(opts);
    this.options = { ...DEFAULT_OPTIONS, ...opts };
    this.options.types = types;

    this.notifications.onUpdate((elem, type) => this.view.update(elem, type));

    this.view.on(NotyfEvent.Dismiss, ({ target, event }) => {
      this._removeNotification(target);
      // tslint:disable-next-line: no-string-literal
      target['triggerEvent'](NotyfEvent.Dismiss, event);
    });

    // tslint:disable-next-line: no-string-literal
    this.view.on(NotyfEvent.Click, ({ target, event }) => target['triggerEvent'](NotyfEvent.Click, event));
  }

  public error(payload: string | Partial<INotyfNotificationOptions>) {
    const options = this.normalizeOptions('error', payload);
    return this.open(options);
  }

  public success(payload: string | Partial<INotyfNotificationOptions>) {
    const options = this.normalizeOptions('success', payload);
    return this.open(options);
  }

  public open(options: DeepPartial<INotyfNotificationOptions>) {
    const defaultOpts = this.options.types.find(({ type }) => type === options.type) || {};
    const config = { ...defaultOpts, ...options };
    this.assignProps(['ripple', 'position', 'dismissible'], config);
    const notification = new NotyfNotification(config);
    this._pushNotification(notification);
    return notification;
  }

  public dismissAll() {
    while (this.notifications.splice(0, 1));
  }

  /**
   * Assigns properties to a config object based on two rules:
   * 1. If the config object already sets that prop, leave it as so
   * 2. Otherwise, use the default prop from the global options
   *
   * It's intended to build the final config object to open a notification. e.g. if
   * 'dismissible' is not set, then use the value from the global config.
   *
   * @param props - properties to be assigned to the config object
   * @param config - object whose properties need to be set
   */
  private assignProps(
    props: Array<Exclude<keyof INotyfOptions, 'types'>>,
    config: DeepPartial<INotyfNotificationOptions>,
  ) {
    props.forEach((prop) => {
      // intentional double equality to check for both null and undefined
      (config[prop] as any) = config[prop] == null ? this.options[prop] : config[prop];
    });
  }

  private _pushNotification(notification: NotyfNotification) {
    this.notifications.push(notification);
    const duration =
      notification.options.duration !== undefined ? notification.options.duration : this.options.duration;
    if (duration) {
      setTimeout(() => this._removeNotification(notification), duration);
    }
  }

  private _removeNotification(notification: NotyfNotification) {
    const index = this.notifications.indexOf(notification);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  private normalizeOptions(
    type: 'success' | 'error',
    payload: string | DeepPartial<INotyfNotificationOptions>,
  ): DeepPartial<INotyfNotificationOptions> {
    let options: DeepPartial<INotyfNotificationOptions> = { type };
    if (typeof payload === 'string') {
      options.message = payload;
    } else if (typeof payload === 'object') {
      options = { ...options, ...payload };
    }
    return options;
  }

  private registerTypes(opts?: Partial<INotyfOptions>): Array<DeepPartial<INotyfNotificationOptions>> {
    const incomingTypes = ((opts && opts.types) || []).slice();
    const finalDefaultTypes = DEFAULT_OPTIONS.types.map((defaultType) => {
      // find if there's a default type within the user input's types, if so, it means the user
      // wants to change some of the default settings
      let userTypeIdx = -1;
      incomingTypes.forEach((t, idx) => {
        if (t.type === defaultType.type) userTypeIdx = idx;
      });
      const userType = userTypeIdx !== -1 ? incomingTypes.splice(userTypeIdx, 1)[0] : {};
      return { ...defaultType, ...userType };
    });
    return finalDefaultTypes.concat(incomingTypes);
  }
}
