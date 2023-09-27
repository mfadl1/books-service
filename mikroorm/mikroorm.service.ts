import { EntityManager } from "@mikro-orm/core";
import { BookModel } from "./entities/book.entity";
import { Book, CreateBookParams, UpdateBookParams } from "../types";
import { BookCrudService } from "../interface";

export class BookServiceMikroOrm implements BookCrudService {
  constructor(private entityManager: EntityManager) {}

  public async create(params: CreateBookParams): Promise<Book> {
    const em = this.entityManager.fork();
    const now = new Date();
    const book = em.create(BookModel, {
      title: params.title,
      author: params.author,
      publishDate: params.publishDate,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    await em.flush();
    return book;
  }

  public async update(params: UpdateBookParams): Promise<Book> {
    const em = this.entityManager.fork();
    const book = await em.findOne(BookModel, {
        id: params.id,
      });
      if (!book)
        throw new Error("Failed to delete reservation: check your parameter!");
  
      book.title = params.bookDetail.title;
      book.author = params.bookDetail.author;
      book.publishDate = params.bookDetail.publishDate;
      await em.flush();
    return book;
  }

  public async delete(bookId: number): Promise<boolean> {
    const em = this.entityManager.fork();

    const book = await em.findOne(BookModel, {
      id: bookId,
    });
    if (!book)
      throw new Error("Failed to delete reservation: check your parameter!");

    book.isActive = false;
    await em.flush();
    return true;
  }
}
