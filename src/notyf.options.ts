export interface INotyfOptions {
  delay: number;
  alertIcon: string;
  confirmIcon: string;
}

export const DEFAULT_OPTIONS: INotyfOptions = {
  alertIcon: 'notyf__icon--alert',
  confirmIcon: 'notyf__icon--confirm',
  delay: 2000,
};
