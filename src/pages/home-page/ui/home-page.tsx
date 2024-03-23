"use client";

import AddAlbumCard from "@/entities/add-album-card/ui/add-album-card";
import { AddAlbumDialog } from "@/features/add-album-dialog";
import { useDialog } from "@/shared/libs/effector-dialog";
import { dialog } from "../model";

export const HomePage = () => {
  const { isVisible, open, close } = useDialog(dialog);

  return (
    <div>
      <AddAlbumCard
        onClick={() => {
          open();
        }}
      ></AddAlbumCard>
      <AddAlbumDialog
        onClose={() => close()}
        isVisible={isVisible}
      ></AddAlbumDialog>
    </div>
  );
};
