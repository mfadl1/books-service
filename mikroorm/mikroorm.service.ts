import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { BookModel } from './entities/book.entity';
import { Book, CreateBookParams, UpdateBookParams } from '../types';
import { BookCrudService, BookQueryContext } from '../interface';

export class BookServiceMikroOrm implements BookCrudService {
    constructor(private entityManager: EntityManager) {}

    createQueryContext(): BookQueryContextMikroOrm {
        return new BookQueryContextMikroOrm();
    }

    public async find(ctx: BookQueryContextMikroOrm): Promise<Iterable<Book>> {
        const em = this.entityManager.fork();
        const { where, options } = ctx.buildContext();
        const book = await em.find(BookModel, where, {
            ...(options as any),
            populate: ['productDetail'],
        });

        return book;
    }

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
            throw new Error(
                'Failed to delete reservation: check your parameter!',
            );

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
            throw new Error(
                'Failed to delete reservation: check your parameter!',
            );

        book.isActive = false;
        await em.flush();
        return true;
    }
}

export class BookQueryContextMikroOrm implements BookQueryContext {
    private ctx: {
        where: FilterQuery<BookModel>;
        options: FindOptions<BookModel, keyof BookModel>;
    } = {
        where: {},
        options: {},
    };

    constructor(ctx?: {
        where: FilterQuery<BookModel>;
        options: FindOptions<BookModel, keyof BookModel>;
    }) {
        this.ctx = ctx || {
            where: {},
            options: {},
        };
    }

    or(ctxList: BookQueryContextMikroOrm[]): BookQueryContext {
        const where = this.ctx.where;
        this.ctx.where = {
            $or: [where],
        };

        for (let idxCtx = 0; idxCtx < ctxList.length; idxCtx++) {
            const ctxData = ctxList[idxCtx];
            this.ctx.where.$or?.push(ctxData.ctx.where);
        }

        return this;
    }

    and(ctxList: BookQueryContextMikroOrm[]): BookQueryContext {
        const where = this.ctx.where;
        this.ctx.where = {
            $and: [where],
        };

        for (let idxCtx = 0; idxCtx < ctxList.length; idxCtx++) {
            const ctxData = ctxList[idxCtx];
            this.ctx.where.$and?.push(ctxData.ctx.where);
        }

        return this;
    }

    orderBy(value: {
        by: keyof Book;
        order: 'asc' | 'desc';
    }): BookQueryContext {
        this.ctx.options.orderBy = {
            [value.by]: value.order,
        };

        return this;
    }

    bookId(value: number): BookQueryContext {
        Object.assign(this.ctx.where, {
            id: {
                $like: `%${value}%`,
            },
        } as FilterQuery<BookModel>);
        return this;
    }

    title(value: string): BookQueryContext {
        Object.assign(this.ctx.where, {
            title: {
                $like: `%${value}%`,
            },
        } as FilterQuery<BookModel>);
        return this;
    }

    author(value: string): BookQueryContext {
        Object.assign(this.ctx.where, {
            author: {
                $like: `%${value}%`,
            },
        } as FilterQuery<BookModel>);
        return this;
    }

    isActive(value: boolean): BookQueryContext {
        Object.assign(this.ctx.where, {
            isActive: value,
        } as FilterQuery<BookModel>);
        return this;
    }

    buildContext() {
        return this.ctx;
    }
}
