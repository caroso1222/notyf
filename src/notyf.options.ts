export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export type NotyfHorizontalPosition = 'left' | 'center' | 'right';
export type NotyfVerticalPosition = 'top' | 'center' | 'bottom';

export interface INotyfPosition {
  x: NotyfHorizontalPosition;
  y: NotyfVerticalPosition;
}

export enum NotyfEvent {
  Dismiss = 'dismiss',
  Click = 'click',
}

export interface INotyfIcon {
  className: string;
  tagName: keyof ElementTagNameMap;
  text: string;
  color: string;
}

export interface INotyfNotificationOptions {
  type: string;
  className: string;
  duration: number;
  icon: string | INotyfIcon | false;
  /**
   * @deprecated Use `background` instead. Removal target: v4.0.0.
   */
  backgroundColor: string;
  background: string;
  message: string;
  ripple: boolean;
  position: INotyfPosition;
  dismissible: boolean;
}

export interface INotyfOptions {
  types: Array<DeepPartial<INotyfNotificationOptions>>;
  duration: number;
  ripple: boolean;
  position: INotyfPosition;
  dismissible: boolean;
}

export const DEFAULT_OPTIONS: INotyfOptions = {
  types: [
    {
      type: 'success',
      className: 'notyf__toast--success',
      backgroundColor: '#3dc763',
      icon: {
        className: 'notyf__icon--success',
        tagName: 'i',
      },
    },
    {
      type: 'error',
      className: 'notyf__toast--error',
      backgroundColor: '#ed3d3d',
      icon: {
        className: 'notyf__icon--error',
        tagName: 'i',
      },
    },
  ],
  duration: 2000,
  ripple: true,
  position: {
    x: 'right',
    y: 'bottom',
  },
  dismissible: false,
};
