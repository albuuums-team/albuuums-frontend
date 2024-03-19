import { useEvent, useStore } from "effector-react";

import { createDialog } from "./createDialog";

export const useDialog = (dialog: ReturnType<typeof createDialog>) => {
  const isVisible = useStore(dialog.$visible);

  const open = useEvent(dialog.open);
  const close = useEvent(dialog.close);

  return {
    isVisible,
    open,
    close,
  };
};
