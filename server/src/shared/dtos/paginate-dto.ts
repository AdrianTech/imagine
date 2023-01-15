import { Expose } from "class-transformer";

export class Meta {
    @Expose()
    itemsPerPage: any
    @Expose()
    totalItems: any
    @Expose()
    currentPage: any
    @Expose()
    totalPages: any
    @Expose()
    sortBy: any
    @Expose()
    search: any
    @Expose()
    searchBy: any
    @Expose()
    filter: any
}

export class Links {
    first: any
    @Expose()
    previous: any
    @Expose()
    current: any
    @Expose()
    next: any
    @Expose()
    last: any
}