import {Face, Color, SuitLevel} from './types';
import {FaceGroup, SuitInfo} from './interfaces';

// 牌
export class Card {
    readonly face: Face;
    readonly color: Color;
    get faceName(): string {
        const faceNames: Array<string> = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', 'BlackJoker', 'RedJoker'];
        return faceNames[this.face];
    }
    get colorName(): string {
        const colorNames: Array<string> = ['', '♥️', '♠️', '♦️', '♣️'];
        return colorNames[this.color];
    }
    get name(): string {
        if (this.colorName) return `${this.colorName}${this.faceName}`;
        return this.faceName;
    }
    constructor(face: Face, color = Color.None) {
        if (face === Face.BlackJoker || face === Face.RedJoker) {
            if (color !== Color.None) throw new Error('invalid face and color');
        }
        else {
            if (color === Color.None) throw new Error('invalid face and color');
        }
        this.face = face;
        this.color = color;
    }
}

// 牌型
export class Suit {
    // 判断faceGroup中的元素face是否连续
    private static isConsequent(faceGroups: Array<FaceGroup>): boolean {
        if (faceGroups.length > 1 && faceGroups[faceGroups.length - 1].face > Face.Ace) return false;
        for (let i = 0; i < faceGroups.length - 1; i ++) {
            if (faceGroups[i + 1].face - faceGroups[i].face !== 1) return false;
        }
        return true;
    }
    // 获取最长的连续组
    private static getLongestConsequent(faceGroups: Array<FaceGroup>): Array<FaceGroup> {
        if (faceGroups.length <= 0) return [];
        if (faceGroups.length <= 1) return faceGroups;
        faceGroups = faceGroups.filter(fg => fg.face <= Face.Ace);
        const ConsequentInfos: Array<Array<FaceGroup>> = [];
        for (let i = 0; i < faceGroups.length - 1; i ++) {
            const current = faceGroups[i];
            const next = faceGroups[i + 1];
            if (next.face - current.face === 1) {
                const existedConsequentInfo = ConsequentInfos.find(ci => ci[ci.length - 1].face === current.face);
                if (existedConsequentInfo) existedConsequentInfo.push(faceGroups[i + 1]);
                else ConsequentInfos.push([faceGroups[i], faceGroups[i + 1]]);
            }
        }
        if (ConsequentInfos.length <= 0) return [faceGroups[faceGroups.length - 1]];
        ConsequentInfos.sort((a, b) => {
            if (a.length === b.length) {
                return b[0].face - a[0].face;
            }
            else {
                return b.length - a.length;
            }
        });
        return ConsequentInfos[0];
    }
    // 全部牌
    readonly cards: Array<Card>;
    // constructor
    constructor(cards: Array<Card>) {
        if (cards.length <= 0) throw new Error('invalid cards');
        this.cards = cards.sort((a, b) => a.face - b.face);
    }
    // 根据Face大小分组
    get faceGroups(): Array<FaceGroup> {
        const faceGroups: Array<FaceGroup> = [];
        for (let i = 0; i < this.cards.length; i ++) {
            const card: Card = this.cards[i];
            const faceGroup = faceGroups.find(fg => fg.face === card.face);
            if (faceGroup) faceGroup.num += 1;
            else faceGroups.push({face: card.face, num: 1});
        }
        faceGroups.sort((fgA, fgB) => {
            if (fgA.num === fgB.num) return fgA.face - fgB.face;
            else return fgB.num - fgA.num;
        });
        return faceGroups;
    }
    // 牌型信息
    get suitInfo(): SuitInfo {
        // SuitLevel.Jokers
        if (this.cards.length === 2 && this.cards.some(c => c.face === Face.BlackJoker) && this.cards.some(c => c.face === Face.RedJoker)) {
            return {level: SuitLevel.Jokers, signature: '', face: 0};
        }
        // SuitLevel.Bomb
        else if (this.faceGroups.length === 1 && this.faceGroups[0].num === 4) {
            return {level: SuitLevel.Bomb, signature: '', face: 0};
        }
        // SuitLevel.Single
        else {
            const level: SuitLevel = SuitLevel.Single;
            // A
            if (this.cards.length === 1) {
                return {level, signature: 'A', face: this.cards[0].face};
            }
            // AA
            if (this.faceGroups.length === 1 && this.faceGroups[0].num === 2) {
                return {level, signature: 'AA', face: this.faceGroups[0].face};
            }
            // A(n)
            if (this.faceGroups.length >= 5 && this.faceGroups.every(fg => fg.num === 1) && this.faceGroups[this.faceGroups.length - 1].face <= Face.Ace && Suit.isConsequent(this.faceGroups)) {
                return {level, signature: `A${this.faceGroups.length}`, face: this.faceGroups[0].face};
            }
            // AA(n)
            if (this.faceGroups.length >= 3 && this.faceGroups.every(fg => fg.num === 2) && this.faceGroups[this.faceGroups.length - 1].face <= Face.Ace && Suit.isConsequent(this.faceGroups)) {
                return {level, signature: `AA${this.faceGroups.length}`, face: this.faceGroups[0].face};
            }
            // AAAAB[B]
            if (this.faceGroups[0].num === 4) {
                if (this.cards.length === 6) return {
                    level,
                    signature: 'AAAAB',
                    face: this.faceGroups[0].face,
                };
                if (this.cards.length === 8) {
                    const restGroups = this.faceGroups.slice(1);
                    if (restGroups.length === 1) {
                        return {level, signature: 'AAAABB', face: restGroups[0].face};
                    }
                    if (restGroups.length === 2 && restGroups.every(fg => fg.num === 2)) {
                        return {level, signature: 'AAAABB', face: this.faceGroups[0].face};
                    }
                }
            }
            // AAA[B][B]{n}
            const threeGroups = this.faceGroups.filter(fg => fg.num === 3);
            if (threeGroups.length > 0) {
                if (Suit.isConsequent(threeGroups)) {
                    // AAA{n}
                    if (threeGroups.length * 3 === this.cards.length) return {
                        level,
                        signature: `AAA${threeGroups.length}`,
                        face: threeGroups[0].face,
                    };
                    // AAABB{n}
                    const notThreeGroups = this.faceGroups.filter(fg => fg.num !== 3);
                    if (notThreeGroups.every(fg => fg.num === 2 || fg.num === 4)) {
                        let pairNum = 0;
                        notThreeGroups.forEach(fg => {
                            pairNum += fg.num / 2;
                        });
                        if (pairNum === threeGroups.length) return {
                            level,
                            signature: `AAABB${threeGroups.length}`,
                            face: threeGroups[0].face,
                        };
                    }
                }
                const consequentGroups = Suit.getLongestConsequent(threeGroups);
                // AAAB{n}
                for (let i = 0; i < consequentGroups.length; i ++) {
                    const groupLenght = consequentGroups.length - i;
                    if (this.cards.length === groupLenght * 4) {
                        return {
                            level,
                            signature: `AAAB${groupLenght}`,
                            face: consequentGroups[i].face,
                        };
                    }
                }
            }
        }
        return {level: SuitLevel.None, signature: '', face: 0};
    }
    // 牌型等级
    get level(): SuitLevel {
        return this.suitInfo.level;
    }
    // 牌面大小
    get face(): Face {
        return this.suitInfo.face;
    }
    // 牌型特征码
    get signature(): string {
        return this.suitInfo.signature;
    }
    // 比较大小
    biggerThan(suit: Suit): boolean {
        if (this.level > suit.level) return true;
        if (this.level === suit.level && this.signature === suit.signature && this.face > suit.face) return true;
        return false;
    }
}

// 牌包
export class Pack {
    readonly cards: Array<Card>;
    get sortedCards(): Array<Card> {
        const cards: Array<Card> = [];
        this.cards.forEach(c => {
            cards.push(c);
        });
        return cards.sort((a, b) => {
            const faceDiff: number = a.face - b.face;
            if (faceDiff === 0) return a.color - b.color;
            return faceDiff;
        });
    }
    constructor(cards: Array<Card>) {
        this.cards = cards;
    }
    pop(card?: Card): Card {
        const index = card ? this.cards.indexOf(card) : Math.floor(Math.random() * this.cards.length);
        const toBeRemove: Card = card ? card : this.cards[index];
        this.cards.splice(index, 1);
        return toBeRemove;
    }
    push(card: Card): void {
        this.cards.push(card);
    }
}

// player
export class Player {
    pack: Pack;
    constructor() {
        this.pack = new Pack([]);
    }
}
