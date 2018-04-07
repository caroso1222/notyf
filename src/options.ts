export interface NotyfOptions {
  delay: number;
  alertIcon: string;
  confirmIcon: string;
}

export const DEFAULT_OPTIONS: NotyfOptions = {
  delay: 2000,
  alertIcon: 'notyf__icon--alert',
  confirmIcon: 'notyf__icon--confirm' 
}
