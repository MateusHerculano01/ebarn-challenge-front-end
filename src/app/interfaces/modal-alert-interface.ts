export interface ModalAlertInterface {
  title: string;
  content: string;
  confirm?: string;
  cancel?: string;
  hideCancel?: boolean;
  alignButtons?: 'start' | 'center' | 'end';
}
