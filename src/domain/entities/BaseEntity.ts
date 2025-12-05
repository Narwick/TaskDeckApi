export class BaseEntity {
  [key: string]: any;
  set(obj: any) {
    for (const key in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        Object.prototype.hasOwnProperty.call(this, key)
      ) {
        (this as any)[key] = obj[key];
      }
    }
    return this;
  }
}
