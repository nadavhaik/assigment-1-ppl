import * as R from "ramda"

export function averageGradesOver60_regular_version(grades: number[]) {
    let gradesSum = 0;
    let counter = 0;
    for (let i = 0; i < grades.length; i++) {
        if (grades[i] > 60) {
            gradesSum += grades[i];
            counter++;
        }
    }
    return gradesSum / counter;
}


export const averageGradesOver60_functional_version: (grades:number[]) => number = (grades: number[]) =>
    R.reduce((x:number,y:number): number => x+y,0,
        R.filter((x)=>x>60,grades))/R.filter((x)=>x>60,grades).length
