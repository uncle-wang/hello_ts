// 花色
export enum Color {
    None,
    Heart,
    Spade,
    Diamond,
    Club,
}
// 牌面
export enum Face {
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
    Two,
    BlackJoker,
    RedJoker,
}
// 牌型
export enum SuitLevel {
    // 无效牌
    None,
    // 单牌、连对、飞机、四带、顺子
    Single,
    // 炸弹
    Bomb,
    // 王炸
    Jokers,
}
