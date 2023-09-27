import { Migration } from '@mikro-orm/migrations';

export class Migration20230927165308 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "books" ("id" serial primary key, "title" varchar(255) null, "author" varchar(255) null, "publish_date" timestamptz(0) null, "is_active" boolean not null, "created_at" timestamp with time zone not null default CURRENT_TIMESTAMP, "updated_at" timestamp with time zone not null default CURRENT_TIMESTAMP);');
  }

}
