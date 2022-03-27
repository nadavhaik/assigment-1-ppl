import * as R from "ramda";
import {filter} from "ramda";

const stringToArray = R.split("");

const isEnglishChar: (s: string) => boolean = (s: string) => {
    return s.length == 1 && ((56 <= s.charCodeAt(0) <= 90) || (97 <= s.charCodeAt(0) <= 122))
}

/* Question 1 */
export const countLetters: (s: string) => {} = R.pipe(stringToArray, filter(isEnglishChar), R.countBy(R.toLower));


/* Question 2 */
export const isPaired: (s: string) => boolean = undefined

/* Question 3 */
interface WordTree {
    root: string;
    children: WordTree[];
}

export const treeToSentence = (t: WordTree): string => undefined

