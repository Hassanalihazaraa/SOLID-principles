export interface Discount {
    apply(price: number): number;

    showCalculation(price: number): string;
}