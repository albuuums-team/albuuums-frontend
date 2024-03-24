import { AlbumGallery } from "@/widgets/album-gallery/ui/album-gallery";
import { FunctionComponent } from "react";

interface AlbumPageProps {
  id: string;
}

export const AlbumPage: FunctionComponent<AlbumPageProps> = (props) => {
  const { id } = props;

  return <AlbumGallery id={id}></AlbumGallery>;
};
