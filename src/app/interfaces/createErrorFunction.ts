// Como exemplo, assumindo createError retorna um Error
// export type CreateErrorFunction = (message: string | Error, status?: number) => Error;
export type CreateErrorFunction = (status?: number, message?: string | Error) => Error;
