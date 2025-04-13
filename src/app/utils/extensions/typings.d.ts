export { }
declare global {
  export interface Array<T> {

    /**Dizi içerisindeki verileri ascending olarak(A-Z) sıralar */
    sortBy(this: number[]): T[];

    /**Dizi içerisindeki verileri descending olarak (Z-A) sıralar */
    reverseBy(this: number[]): T[];
  }
}
