import { AlbumPage } from "@/fsd-pages/album-page";
import { FunctionComponent } from "react";

interface PageProps {
  params: { id: string };
}

const Page: FunctionComponent<PageProps> = (props) => {
  const { params } = props;

  return <AlbumPage id={params.id}></AlbumPage>;
};

export default Page;
