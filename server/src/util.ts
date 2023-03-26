export const SPECIAL_CHARACTERS = "!£$%^&*(){}[]:@;#~.,?/|`¬0123456789".split("");

export function randint(l: number, u: number): number {
    return Math.round(Math.random() * (u - l) + l);
}

function listAppearances(list: any[], target: any): number {
    let appearances: number = 0;
    for (let el of list) {
        if (el == target) appearances++;
    }
    return appearances;
}

export function getStrength(password: string): number {
    let strength: number = 0;
    let seenCharacters: string[] = [];
    for (let char of password.split("")) {
        seenCharacters.push(char);
        if (SPECIAL_CHARACTERS.includes(char)) {
            strength += 2 * (1 / listAppearances(seenCharacters, char));
        } else {
            strength += 1 / listAppearances(seenCharacters, char);
        }
    }
    return strength;
}