import type { ID, ISODateTimeString } from "./common";
import type { PublicUser } from "./user";

export type ArtworkCategory =
  | "PAINTING"
  | "PHOTO"
  | "DIGITAL"
  | "PRINT"
  | "ILLUSTRATION"
  | "OTHER";

export type ArtworkStatus = "PUBLIC" | "HIDDEN" | "SOLD" | "DELETED";

export type ArtworkFiles = {
  original_url: string;
  thumbnail_url: string;
  gallery_urls?: string[];
};

export type Artwork = {
  artwork_id: ID;
  title: string;
  description?: string;
  tags: string[];
  category?: ArtworkCategory;
  price: number;
  files: ArtworkFiles;
  seller: {
    id: ID;
    display_name: string;
    avatar_url?: string;
  };
  status: ArtworkStatus;
  created_at: ISODateTimeString;
  updated_at?: ISODateTimeString;
};

export type ArtworkSummary = {
  artwork_id: ID;
  title: string;
  thumbnail_url: string;
  price: number;
  category?: ArtworkCategory;
  seller_id: ID;
  seller_display_name?: string;
};

export type ArtworkListQuery = {
  q?: string;
  category?: string;
  tags?: string[];
  price_min?: number;
  price_max?: number;
  sort?: "latest" | "price_low" | "price_high" | "popular";
  page?: number;
  page_size?: number;
};

export type ArtworkListResponse = {
  items: ArtworkSummary[];
  total_count: number;
  page: number;
  page_size: number;
};

export type ArtworkCreateRequest = {
  title: string;
  description?: string;
  tags?: string[];
  category?: string;
  price: number;
  // files: multipart/form-data (클라이언트에서 FormData로 전송)
};

export type ArtworkCreateResponse = {
  artwork_id: ID;
  title: string;
  created_at: ISODateTimeString;
  files: ArtworkFiles;
};

export type ArtworkSellerProfile = Pick<PublicUser, "userId" | "displayName" | "avatarUrl" | "roles">;
