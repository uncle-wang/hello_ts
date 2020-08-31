import {Face, SuitLevel} from './types';
import {Card} from './classes';

export interface FaceGroup {
    face: Face;
    num: number;
}

export interface SuitInfo {
    /*
        单牌: A
        顺子: A5、A6...
        对牌: AA
        连对: AA3、AA4...
        三带: AAA1
        三带一: AAAB1
        三带二: AAABB1
        飞机: AAA2、AAA3...、AAAB2、AAAB3...、AAABB2、AAABB3...
        四带: AAAAB、AAAABB
    */
    signature: string;
    level: SuitLevel;
    face: Face;
}

export interface PlayerCard {
    selected: boolean;
    card: Card;
}
