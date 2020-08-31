import $ from 'jquery';
import {Face, Color, SuitLevel} from './types';
import {Card, Suit, Pack, Player} from './classes';
import control from './control';

function checkSubmitable(): void {
    const $submit = $('#submit');
    if (control.currentPlayer.suit.valid && control.currentPlayer.suit.biggerThan(control.panel.suit)) $submit.removeAttr('disabled');
    else $submit.attr('disabled', 'disabled');
}

$('.players .cards').delegate('.card', 'click', function() {
    const $card = $(this);
    const player: Player = $card.parent().data('player');
    const card: Card = $card.data('card');
    card.selected = !card.selected;
    $card.toggleClass('selected');
    player.drawCards();
    checkSubmitable();
});

$('#submit').click(function() {
    if (!control.currentPlayer.suit.valid) return;
    if (!control.currentPlayer.suit.biggerThan(control.panel.suit)) return;
    control.panel.setCards(control.currentPlayer.selectedCards);
    control.panel.$list.data('sourcePlayer', control.currentPlayer);
    control.currentPlayer.popSelected();
    control.panel.drawCards();
    if (control.currentPlayer.length <= 0) {
        alert('over');
        window.location.href = window.location.href;
    }
    control.currentPlayer.drawCards();
    control.next();
    checkSubmitable();
});
$('#pass').click(function() {
    control.next();
});

control.init();
