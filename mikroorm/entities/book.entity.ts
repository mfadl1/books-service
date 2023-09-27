import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Book } from '../../types';

@Entity({ tableName: 'books' })
export class BookModel implements Book {
    @PrimaryKey({ autoincrement: true })
    readonly id!: number;

    @Property({ nullable: true })
    title!: string;

    @Property({ nullable: true })
    author!: string;

    @Property({ nullable: true, fieldName: 'publish_date' })
    publishDate!: Date;

    @Property({ nullable: false, fieldName: 'is_active' })
    isActive!: boolean;

    @Property({
        defaultRaw: 'CURRENT_TIMESTAMP',
        columnType: 'timestamp with time zone',
        fieldName: 'created_at',
    })
    readonly createdAt!: Date;

    @Property({
        defaultRaw: 'CURRENT_TIMESTAMP',
        columnType: 'timestamp with time zone',
        fieldName: 'updated_at',
    })
    updatedAt!: Date;
}
