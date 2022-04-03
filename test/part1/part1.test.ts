import {averageGradesOver60_regular_version, averageGradesOver60_functional_version} from "../../src/part1/part1";
import * as R from "ramda"

describe("averageGradesOver60", () => {
    it("checksThatFunctionsAreEqual", () => {
        let gradesLists: number[][] = [
            [],
            [0],
            [100],
            [60],
            [61],
            [60.1],
            [10, 0, 12.5],
            R.range(0, 101),
            [30.5, 12.4, 73, 60, 74, 60.1]
        ]
        gradesLists.forEach((grades: number[]) =>
            expect(averageGradesOver60_regular_version(grades))
                .toBe(averageGradesOver60_functional_version(grades))
        )
    })
});