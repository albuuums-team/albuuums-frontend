import { dialogCoreApi } from "./model";

export const createDialog = () => {
  const dialogId = Symbol();

  const $visible = dialogCoreApi.$visibleDialogs.map((visibleDialogs) =>
    visibleDialogs.includes(dialogId)
  );

  const open = dialogCoreApi.open.prepend(() => dialogId);
  const close = dialogCoreApi.close.prepend(() => dialogId);

  return {
    $visible,
    open,
    close,
  };
};
