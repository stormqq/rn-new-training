export enum ToastType {
  INFO,
  ERROR,
  SUCCESS,
}

export const TOAST_COLORS: Record<ToastType, string> = {
  [ToastType.SUCCESS]: "#098013",
  [ToastType.ERROR]: "#800328",
  [ToastType.INFO]: "#4f4a4b",
};
