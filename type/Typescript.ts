export type TPost = {
  albumId: string;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type TJoke = {
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

export type TUser = {
  name: string;
  avatar: string;
  createdAt: string;
  id: string;
};
