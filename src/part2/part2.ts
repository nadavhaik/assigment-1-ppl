import * as R from "ramda";

const stringToArray = R.split("");
const arrayToString = (strings: string[]) => R.reduce((s1, s2: string) => s1+s2, "", strings)

/* Question 1 */
const isEnglishChar: (s: string) => boolean = (s: string) =>
    s.length == 1 && ((56 <= s.charCodeAt(0) && s.charCodeAt(0) <= 90) ||
        (97 <= s.charCodeAt(0) && s.charCodeAt(0) <= 122))

export const countLetters: (s: string) => {} = R.pipe(stringToArray, R.filter(isEnglishChar), R.countBy(R.toLower))

const filterPairs: (s: string, leftBracket: string, rightBracket: string) => string[] =
    (s: string, leftBracket: string, rightBracket: string) =>
        R.pipe(stringToArray, R.filter((c) => c == leftBracket || c == rightBracket))(s)

/* Question 2 */
const specificIsPaired: (s: string, leftBracket: string, rightBracket: string) =>
    boolean = (s: string, leftBracket: string, rightBracket: string) =>
        leftBracket.length == 1 && rightBracket.length == 1 &&
            arrayToString(filterPairs(s, leftBracket, rightBracket)) ===
            (leftBracket + rightBracket).repeat(filterPairs(s, leftBracket, rightBracket).length/2)

export const isPaired: (s: string) => boolean = (s: string) => specificIsPaired(s, "(", ")")
    && specificIsPaired(s, "[", "]") && specificIsPaired(s, "{", "}")

/* Question 3 */
export interface WordTree {
    root: string;
    children: WordTree[];
}

const recTreeToSentence: (x: WordTree) => string = (t: WordTree) =>
    t.root + " " + arrayToString(R.map(recTreeToSentence, t.children))
const deleteLastChar = (s: string) => s.substring(0, s.length-1)

export const treeToSentence: (t: WordTree) => string = R.pipe(recTreeToSentence, deleteLastChar)