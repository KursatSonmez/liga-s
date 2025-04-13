export { }
declare global {
  export interface Array<T> {

    /**Dizi içerisindeki verileri ascending olarak(A-Z) sıralar */
    sortBy(this: T[], field?: (keyof T)): T[];

    /**Dizi içerisindeki verileri descending olarak (Z-A) sıralar */
    reverseBy(this: T[], field?: (keyof T)): T[];

    orderBy(this: T[], ...fields?: string[]): T[];
  }
}
