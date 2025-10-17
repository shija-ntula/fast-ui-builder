import { alertHandler } from "../index"

export enum Alert {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

// Utility function to show alerts
export const showAlert = async (
  title: string,
  message: string,
  alert: Alert = Alert.SUCCESS,
) => {
  alertHandler(title, message, alert);
}