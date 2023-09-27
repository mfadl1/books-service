export interface Book {
  id: number;
  title: string;
  author: string;
  publishDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookParams {
  title: string;
  author: string;
  publishDate: Date;
}

export interface UpdateBookParams {
  id: number;
  bookDetail: {
    title: string;
    author: string;
    publishDate: Date;
  };
}
