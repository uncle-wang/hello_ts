import $ from 'jquery';
import {Face, Color} from './types';
import {Card, Pack, Player} from './classes';

let currentIndex: number = 0;

const panel: Player = new Player($('.panel .cards'));

const players: Array<Player> = [
    new Player($('.players .cards:nth-child(1)')),
    new Player($('.players .cards:nth-child(2)')),
    new Player($('.players .cards:nth-child(3)')),
];

function init(): void {
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
    let i = 0;
    while (pack.length > 3) {
        players[i].push(pack.pop());
        i = (i + 1) % players.length;
    }
    while (pack.length > 0) {
        players[0].push(pack.pop());
    }
    players.forEach(player => {
        player.drawCards();
    });
}

function next(): void {
    currentIndex = (currentIndex + 1) % players.length;
    $('.players .cards').removeClass('current');
    $('.players .cards').eq(currentIndex).addClass('current');
    if (players[currentIndex] === panel.$list.data('sourcePlayer')) {
        panel.setCards([]);
        panel.drawCards();
        $('#pass').attr('disabled', 'disabled');
    }
    else {
        $('#pass').removeAttr('disabled');
    }
}

export default {
    init,
    next,
    panel,
    players,
    get currentPlayer(): Player {
        return players[currentIndex];
    },
};
