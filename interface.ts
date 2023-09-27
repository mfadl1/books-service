import { Book, CreateBookParams, UpdateBookParams } from "./types";

export interface BookCrudService {
    create(params: CreateBookParams): Promise<Book>
    update(params: UpdateBookParams): Promise<Book>
    // createQueryContext(): ProductQueryContext;
    // findAndCount(ctx: ProductQueryContext): Promise<{
    //     data: Iterable<Book>;
    //     count: number;
    // }>;
    delete(bookId: number): Promise<boolean>;
}