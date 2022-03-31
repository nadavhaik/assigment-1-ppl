import * as R from "ramda";

const stringToArray = R.split("");
const arrayToString: (arr: string[]) => string = (arr: string[]) => arr.join('')
const deleteLastChar: (s: string) =>  string = (s: string) => s.substring(0, s.length-1)

/* Question 1 */
const isEnglishChar: (s: string) => boolean = (s: string) =>
    s.length == 1 &&
        ((56 <= s.charCodeAt(0) && s.charCodeAt(0) <= 90) || (97 <= s.charCodeAt(0) && s.charCodeAt(0) <= 122))

export const countLetters: (s: string) => {} = R.pipe(stringToArray, R.filter(isEnglishChar), R.countBy(R.toLower))

/* Question 2 */
const bracketCloses: (c1: string, c2: string) => boolean = (opener: string, closer: string) =>
    (opener === "{" && closer === "}") || (opener === "(" && closer === ")") || (opener === "[" && closer === "]")
const isOpeningBracket: (c: string) => boolean = (c: string) =>
    c === "{" || c === "[" || c === "("
const isClosingBracket: (c: string) => boolean = (c: string) =>
    c === "}" || c === "]" || c === ")"
const isBracket: (c: string) => boolean = (c: string) => isOpeningBracket(c) || isClosingBracket(c)

const deleteFirstChar: (s: string) => string = (s: string) => s.substring(1)
const firstChar: (s: string) => string = (s: string) => s.charAt(0)
const lastChar: (s: string) => string = (s: string) => s.charAt(s.length-1)
const addStrings: (s1: string, s2: string) => string = (s1: string, s2: string) => s1 + s2

export const recIsPaired: (bracketsString: string, stackString: string) => boolean =
    (bracketsString: string, stackString: string) =>
        (bracketsString === "") ? stackString === "" :
        isOpeningBracket(firstChar(bracketsString)) ?
            recIsPaired(deleteFirstChar(bracketsString), addStrings(stackString, firstChar(bracketsString))) :
        /** else: bracketsString starts with a closing bracket **/
        stackString === "" || !bracketCloses(lastChar(stackString), firstChar(bracketsString)) ? false :
        // ** else: brackets do close **/
        recIsPaired(deleteFirstChar(bracketsString), deleteLastChar(stackString))


export const isPaired: (s: string) => boolean = (s: string) =>
    recIsPaired(arrayToString(stringToArray(s).filter(isBracket)), "")

/* Question 3 */
export interface WordTree {
    root: string;
    children: WordTree[];
}

const recTreeToSentence: (t: WordTree) => string = (t: WordTree) =>
    t.root + " " + arrayToString(R.map(recTreeToSentence, t.children))

export const treeToSentence: (t: WordTree) => string = R.pipe(recTreeToSentence, deleteLastChar)