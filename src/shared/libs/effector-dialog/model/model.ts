import { createEvent, createStore, sample } from "effector";

type DialogId = symbol;

const $visibleDialogs = createStore<DialogId[]>([]);

const open = createEvent<DialogId>();
const close = createEvent<DialogId>();

sample({
  clock: open,
  source: $visibleDialogs,
  fn: (visibleDialog, openingDialog) => {
    if (visibleDialog.includes(openingDialog)) {
      return visibleDialog;
    }

    return visibleDialog.concat(openingDialog);
  },
  target: $visibleDialogs,
});

sample({
  clock: close,
  source: $visibleDialogs,
  fn: (visibleDialog, closingDialog) => {
    if (!visibleDialog.includes(closingDialog)) {
      return visibleDialog;
    }

    return visibleDialog.filter((dialogId) => dialogId !== closingDialog);
  },
  target: $visibleDialogs,
});

export const dialogCoreApi = {
  $visibleDialogs,
  open,
  close,
};
