import { Book, CreateBookParams, UpdateBookParams } from './types';

export interface BookCrudService {
    createQueryContext(): BookQueryContext;
    find(ctx: BookQueryContext): Promise<Iterable<Book>>;
    create(params: CreateBookParams): Promise<Book>;
    update(params: UpdateBookParams): Promise<Book>;
    delete(bookId: number): Promise<boolean>;
}

export interface BookQueryContext {
    or(ctxList: BookQueryContext[]): BookQueryContext;
    and(ctxList: BookQueryContext[]): BookQueryContext;
    orderBy(value: { by: keyof Book; order: 'asc' | 'desc' }): BookQueryContext;
    bookId(value: number): BookQueryContext;
    title(value: string): BookQueryContext;
    author(value: string): BookQueryContext;
    isActive(value: boolean): BookQueryContext;
}
