import * as R from "ramda";
import {keys} from "ramda";

// General functions:
const stringToArray = R.split("");
const arrayToString = (strings: string[]) => R.reduce((s1, s2: string) => s1+s2, "", strings)
const deleteLastChar = (s: string) => s.substring(0, s.length-1)
/* Question 1 */
const isEnglishChar: (s: string) => boolean = (s: string) =>
    s.length == 1 &&
        ((56 <= s.charCodeAt(0) && s.charCodeAt(0) <= 90) || (97 <= s.charCodeAt(0) && s.charCodeAt(0) <= 122))

export const countLetters: (s: string) => {} = R.pipe(stringToArray, R.filter(isEnglishChar), R.countBy(R.toLower))

/* Question 2 */
const numberOfOccurrences = (s: string, char: string) => stringToArray(s).filter(R.equals(char)).length
const prefixAt = (s: string) => (i: number) => s.substring(0, i)
const allPrefixes = (s: string) => R.map(prefixAt(s), R.range(0, s.length+1))
const validPrefix = (leftBracket: string, rightBracket: string) =>
    (prefix: string) =>
        numberOfOccurrences(prefix, leftBracket) >= numberOfOccurrences(prefix, rightBracket)

const specificIsPaired: (s: string, leftBracket: string, rightBracket: string) => boolean =
    (s: string, leftBracket: string, rightBracket: string) =>
        numberOfOccurrences(s, leftBracket) === numberOfOccurrences(s, rightBracket) &&
        R.all(validPrefix(leftBracket, rightBracket), allPrefixes(s))

export const isPaired: (s: string) => boolean = (s: string) => specificIsPaired(s, "(", ")")
    && specificIsPaired(s, "[", "]") && specificIsPaired(s, "{", "}")

/* Question 3 */
export interface WordTree {
    root: string;
    children: WordTree[];
}

const recTreeToSentence: (t: WordTree) => string = (t: WordTree) =>
    t.root + " " + arrayToString(R.map(recTreeToSentence, t.children))

export const treeToSentence: (t: WordTree) => string = R.pipe(recTreeToSentence, deleteLastChar)