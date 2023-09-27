import { BookCrudService } from './interface';

export const API = {
    BookQuery: Symbol.for('BookQuery'),
};

export type APIInstance = BookCrudService;

export interface Driver {
    init(): Promise<void>;
    destroy(): Promise<void>;
    get(api: Symbol): APIInstance;
}
