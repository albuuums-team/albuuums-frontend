import { FunctionComponent, HTMLAttributes } from "react";

import style from "./add-album-card.module.css";

import { LuPlus } from "react-icons/lu";

interface AddAlbumCardProps {
  onClick: () => void;
  extraProps?: HTMLAttributes<HTMLDivElement>;
}

const AddAlbumCard: FunctionComponent<AddAlbumCardProps> = (props) => {
  const { onClick, extraProps } = props;

  return (
    <div className={style.card} {...extraProps} onClick={onClick}>
      <LuPlus fontSize={40} color="#fff"></LuPlus>
    </div>
  );
};

export default AddAlbumCard;
