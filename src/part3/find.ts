import { Result, makeFailure, makeOk, bind, either } from "../lib/result";
import * as R from "ramda";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult = <T>(pred: (x: T) => boolean, arr: T[]): Result<T> => {
    try {
        return makeOk(findOrThrow(pred, arr))
    } catch (e) {
        return makeFailure("No element found.")
    }
}

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

const isEven = (x: number) => x % 2 === 0
const square = (x: number) => x * x

export const returnSquaredIfFoundEven_v2 = (a: number[]):  Result<number> =>
    bind(findResult(isEven, a), R.pipe(square, makeOk))

export const returnSquaredIfFoundEven_v3 =(a: number[]):  number =>
    either(findResult(isEven, a), square, () => -1)