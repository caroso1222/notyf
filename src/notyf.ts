import {
  NotyfArray,
  NotyfNotification,
} from './notyf.models';
import { DEFAULT_OPTIONS, INotyfOptions, INotyfNotificationOptions, DeepPartial } from './notyf.options';
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
    const types = this.registerTypes(opts);
    this.options = { ...DEFAULT_OPTIONS, ...opts };
    this.options.types = types;

    this.notifications.onupdate((elem, type) => {
      this.view.update(elem, type);
    });
  }

  public error(payload: string | Partial<INotyfNotificationOptions>)  {
    const options = this.normalizeOptions('error', payload);
    this.open(options);
  }

  public success(payload: string | Partial<INotyfNotificationOptions>) {
    const options = this.normalizeOptions('success', payload);
    this.open(options);
  }

  public open(options: DeepPartial<INotyfNotificationOptions>) {
    const defaultOpts = this.options.types.find(({type}) => type === options.type) || {};
    const config = {...defaultOpts, ...options};
    config.ripple = config.ripple === undefined ? this.options.ripple : config.ripple;
    config.position = config.position || this.options.position;
    const notification = new NotyfNotification(config);
    this._pushNotification(notification);
  }

  private _pushNotification(notification: NotyfNotification) {
    this.notifications.push(notification);
    const duration = notification.options.duration || this.options.duration;
    setTimeout(() => {
      const index = this.notifications.indexOf(notification);
      if(index !== -1){
        this.notifications.splice(index, 1);         
      }
    }, duration);
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
    const incomingTypes = (opts && opts.types || []).slice();
    const finalTypes = DEFAULT_OPTIONS.types.map(defaultType => {
      // find if there's a default type within the user input's types, if so, it means the user
      // wants to change some of the default settings
      const userTypeIdx = incomingTypes.findIndex((t) => t.type === defaultType.type);
      const userType = userTypeIdx !== -1 ? incomingTypes.splice(userTypeIdx, 1)[0] : {};
      return { ...defaultType, ...userType };
    });
    return finalTypes.concat(incomingTypes);
  }
}
