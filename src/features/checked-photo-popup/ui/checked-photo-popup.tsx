import { FunctionComponent } from "react";

import { createDialog, useDialog } from "@/shared/libs/effector-dialog";

interface CheckedPhotoPopupProps {
  isVisible: boolean;
  close: () => void;
}

const CheckedPhotoPopup: FunctionComponent<CheckedPhotoPopupProps> = (
  props
) => {
  const { isVisible, close } = props;

  return <div></div>;
};

export default CheckedPhotoPopup;
