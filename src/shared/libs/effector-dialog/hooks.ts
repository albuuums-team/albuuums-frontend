import { useUnit } from "effector-react";

import { createDialog } from "./createDialog";

export const useDialog = (dialog: ReturnType<typeof createDialog>) => {
  const [isVisible, open, close] = useUnit([
    dialog.$visible,
    dialog.open,
    dialog.close,
  ]);

  return {
    isVisible,
    open,
    close,
  };
};
