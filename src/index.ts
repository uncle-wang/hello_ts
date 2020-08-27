import {Face, Color} from './types';
import {Card, Suit, Pack, Player} from './classes';

const pack: Pack = new Pack([
    new Card(Face.Three, Color.Heart),
    new Card(Face.Three, Color.Spade),
    new Card(Face.Three, Color.Club),
    new Card(Face.Three, Color.Diamond),
    new Card(Face.Four, Color.Heart),
    new Card(Face.Four, Color.Spade),
    new Card(Face.Four, Color.Club),
    new Card(Face.Four, Color.Diamond),
    new Card(Face.Five, Color.Heart),
    new Card(Face.Five, Color.Spade),
    new Card(Face.Five, Color.Club),
    new Card(Face.Five, Color.Diamond),
    new Card(Face.Six, Color.Heart),
    new Card(Face.Six, Color.Spade),
    new Card(Face.Six, Color.Club),
    new Card(Face.Six, Color.Diamond),
    new Card(Face.Seven, Color.Heart),
    new Card(Face.Seven, Color.Spade),
    new Card(Face.Seven, Color.Club),
    new Card(Face.Seven, Color.Diamond),
    new Card(Face.Eight, Color.Heart),
    new Card(Face.Eight, Color.Spade),
    new Card(Face.Eight, Color.Club),
    new Card(Face.Eight, Color.Diamond),
    new Card(Face.Nine, Color.Heart),
    new Card(Face.Nine, Color.Spade),
    new Card(Face.Nine, Color.Club),
    new Card(Face.Nine, Color.Diamond),
    new Card(Face.Ten, Color.Heart),
    new Card(Face.Ten, Color.Spade),
    new Card(Face.Ten, Color.Club),
    new Card(Face.Ten, Color.Diamond),
    new Card(Face.Jack, Color.Heart),
    new Card(Face.Jack, Color.Spade),
    new Card(Face.Jack, Color.Club),
    new Card(Face.Jack, Color.Diamond),
    new Card(Face.Queen, Color.Heart),
    new Card(Face.Queen, Color.Spade),
    new Card(Face.Queen, Color.Club),
    new Card(Face.Queen, Color.Diamond),
    new Card(Face.King, Color.Heart),
    new Card(Face.King, Color.Spade),
    new Card(Face.King, Color.Club),
    new Card(Face.King, Color.Diamond),
    new Card(Face.Ace, Color.Heart),
    new Card(Face.Ace, Color.Spade),
    new Card(Face.Ace, Color.Club),
    new Card(Face.Ace, Color.Diamond),
    new Card(Face.Two, Color.Heart),
    new Card(Face.Two, Color.Spade),
    new Card(Face.Two, Color.Club),
    new Card(Face.Two, Color.Diamond),
    new Card(Face.BlackJoker, Color.None),
    new Card(Face.RedJoker, Color.None),
]);

const players: Array<Player> = [new Player(), new Player(), new Player()];

let i = 0;

while (pack.cards.length > 3) {
    players[i].pack.push(pack.pop());
    i = (i + 1) % players.length;
}

const player = players[0];

player.pack.sortedCards.forEach(card => {
    const $card = document.createElement('li');
    $card.classList.add('card');
    $card.innerHTML = `
        <div class="face">${card.face}</div>
        <div class="color">${card.color}</div>
    `;
    const $list = document.querySelector('.cards');
    if ($list) {
        $list.appendChild($card);
    }
});
