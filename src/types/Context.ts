export interface IAlertContextType {
  isAlertOpen: boolean;
  alertMessage: string;
  openAlert: (message: string) => void;
}
