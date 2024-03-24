export interface Tag {
  tag: string;
  fileAlbumId: number;
}

export interface File {
  id: number;
  name: string;
  pinned_at: string;
  pinned_by: number;
  type: string;
  file_id: number;
  tags: Tag[];
}

export interface Album {
  id: number;
  name: string;
  album_cover_id: number;
  private: boolean;
  editor: boolean;
  description: string;
  files: File[];
  tags: string[];
}
