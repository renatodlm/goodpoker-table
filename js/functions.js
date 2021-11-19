"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
    var player_box = document.getElementsByClassName('player-box');
    var player_hand = document.getElementsByClassName('player-hand');
    var area_item = document.getElementsByClassName('area-item');
    var blind_number = document.getElementsByClassName('blind-number');
    var indexRound = -1;
    var currentArray = 1;

    /*== ACTION TABLE end ==*/

    var play = document.getElementById("play");
    var next = document.getElementById("next");
    var prev = document.getElementById("prev");
    var allRounds = [], round = [];

    fetch("poker.json")
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            //console.log(json);

            allRounds = json;
            //console.log(allRounds[currentArray].rounds);

        });

    play.onclick = function (e) {
        var rounds = allRounds[currentArray].rounds;
        //play.classList.add('pause');
        play.setAttribute('id', 'pause');
        for (let i = 0; i < rounds.length + 1; ++i) {
            setTimeout(function timer() {
                document.getElementById("next").click();
            }, i * 1000);
        }

    }

    prev.disabled = true;
    /*ACTION TEST*/
    next.onclick = function (e) {
        actionReplayer(allRounds[currentArray]);
    }

    prev.onclick = function (e) {
        indexRound--;

        if (indexRound >= -1) {
            next.disabled = false;
            round = allRounds[currentArray].rounds[indexRound];

            if (indexRound == -1) {
                hole_cards_reverse();
                prev.disabled = true;
            } else {
                switch (round.action) {
                    case "FOLDS":
                        folds_reverse(round.player);
                        break;
                    case "CALLS":
                        blindCallBetRaise_reverse(indexRound, round.index, round.player, round.value, "CALLS", round.step);
                        setTimeout(function () {
                            deleteBlind(indexRound, round.player, round.step);
                        }, 300);
                        //document.getElementById("prev").click();
                        break;
                    case "RAISES":
                        blindCallBetRaise_reverse(indexRound, round.index, round.player, round.value, "RAISES", round.step);

                        setTimeout(function () {
                            deleteBlind(indexRound, round.player, round.step);
                        }, 300);
                        break;
                    case "FLOP":
                        flopTurnRiver_reverse(["1", "2", "3"], round.cards);
                        setTimeout(function () {
                            pot_calculate_reverse('HOLE_CARDS', round.step);
                            document.getElementById('pot-position').style.opacity = '0';
                            document.getElementById('pot-position').style.marginTop = '0';
                        }, 5);
                        var audio = new Audio('./sound/holeCards.wav');
                        audio.play();
                        break;
                    case "CHECKS":
                        for (var i = 0; i < player_box.length; ++i) {
                            if (player_box[i].getAttribute('data-player') == round.player) {
                                var item = player_box[i];
                                player_action_reverse(item, "CHECKS");
                            }
                        }
                        //document.getElementById("prev").click();
                        break;
                    case "BETS":
                        blindCallBetRaise_reverse(indexRound, round.index, round.player, round.value, "BETS", round.step);

                        setTimeout(function () {
                            deleteBlind(indexRound, round.player, round.step);
                        }, 300);
                        break;
                    case "TURN":
                        flopTurnRiver_reverse(["4"], round.cards);
                        setTimeout(function () {
                            pot_calculate_reverse('FLOP', round.step);
                            document.getElementById('pot-position').style.opacity = '1';
                            document.getElementById('pot-position').style.marginTop = '-100px';
                        }, 5);
                        var audio = new Audio('./sound/single_card.wav');
                        audio.play();
                        break;
                    case "RIVER":
                        flopTurnRiver_reverse(["5"], round.cards);
                        setTimeout(function () {
                            pot_calculate_reverse('TURN', round.step);
                            document.getElementById('pot-position').style.opacity = '1';
                            document.getElementById('pot-position').style.marginTop = '-100px';
                        }, 5);
                        var audio = new Audio('./sound/single_card.wav');
                        audio.play();
                        break;
                    case "UNCALLED_BET":
                        blindCallBetRaise(indexRound, round.actionIndex, round.player, round.value, "BETS", round.step);
                        folds_reverse(round.player);
                        break;
                    case "COLLECTED_FROM_POT":
                        var audio = new Audio('./sound/winReverse.wav');
                        audio.play();
                        pot_calculate_reverse('RIVER', round.step);
                        collected_pot_reverse(round.player, round.value);
                        foldsOthers_reverse(round.player);
                        setTimeout(function () {
                            //pot_calculate_reverse('RIVER', round.step);
                            document.getElementById('pot-position').style.opacity = '1';
                            document.getElementById('pot-position').style.marginTop = '-100px';
                        }, 500);
                        break;
                    case "DOENST_SHOW_HAND":
                        folds_reverse(round.player);
                        break;
                    case "SHOWS":
                        cards_shows_reverse(round.player, round.cards);
                        //folds_reverse(round.player);
                        break;
                    default:
                }
            }

        } else {
            next.disabled = false;
            prev.disabled = true;
        }

        //console.log(indexRound);

    }


    function actionReplayer(RoundArray) {

        if (indexRound < RoundArray.rounds.length) {

            round = RoundArray.rounds[indexRound];
            if (indexRound == -1) {
                hole_cards();
            } else {
                switch (round.action) {
                    case "FOLDS":
                        folds(round.player);
                        break;
                    case "CALLS":
                        createBlind(indexRound, round.player, round.step);

                        setTimeout(function () {
                            blindCallBetRaise(indexRound, round.index, round.player, round.value, "CALLS", round.step);
                        }, 1);

                        break;
                    case "RAISES":
                        createBlind(indexRound, round.player, round.step);
                        //console.log(round);
                        setTimeout(function () {
                            blindCallBetRaise(indexRound, round.index, round.player, round.value, "RAISES", round.step);
                        }, 5);
                        break;
                    case "FLOP":
                        pot_calculate('HOLE_CARDS', round.step);
                        flopTurnRiver(["1", "2", "3"], round.cards);
                        var audio = new Audio('./sound/holeCards.wav');
                        audio.play();
                        break;
                    case "CHECKS":
                        for (var i = 0; i < player_box.length; ++i) {
                            if (player_box[i].getAttribute('data-player') == round.player) {
                                var item = player_box[i];
                                player_action(item, "CHECKS");
                            }
                        }
                        break;
                    case "BETS":
                        createBlind(indexRound, round.player, round.step);

                        setTimeout(function () {
                            blindCallBetRaise(indexRound, round.index, round.player, round.value, "BETS", round.step);
                        }, 1);
                        break;
                    case "TURN":
                        pot_calculate('FLOP', round.step);
                        flopTurnRiver(["4"], round.cards);
                        var audio = new Audio('./sound/single_card.wav');
                        audio.play();
                        break;
                    case "RIVER":
                        pot_calculate('TURN', round.step);
                        flopTurnRiver(["5"], round.cards);
                        var audio = new Audio('./sound/single_card.wav');
                        audio.play();
                        break;
                    case "UNCALLED_BET":
                        blindCallBetRaise_reverse(indexRound, round.actionIndex, round.player, round.value, "BETS", round.step);
                        break;
                    case "COLLECTED_FROM_POT":
                        pot_calculate('RIVER', round.step);
                        foldsOthers(round.player);
                        setTimeout(function () {
                            collected_pot(round.player, round.value);

                            for (var i = 0; i < player_box.length; ++i) {
                                if (player_box[i].getAttribute('data-player') == round.player) {
                                    var item = player_box[i];
                                    player_action(item, "WIN");
                                }
                            }
                        }, 500);
                        break;
                    case "DOENST_SHOW_HAND":
                        for (var i = 0; i < player_box.length; ++i) {
                            if (player_box[i].getAttribute('data-player') == round.player) {
                                var item = player_box[i];
                                player_action(item, "DOENST_SHOW_HAND");
                            }
                        }
                        break;
                    case "SHOWS":
                        cards_shows(round.player, round.cards);
                        break;
                    default:
                }
            }

            setTimeout(function () {
                indexRound++;
                prev.disabled = false;

            }, 5);

        } else {
            next.disabled = true;
            prev.disabled = false;
        }

        //console.log(indexRound);
    }


    /*== HOLE CARDS ==*/
    function hole_cards() {
        var audio = new Audio('./sound/holeCards.wav');
        audio.play();
        setTimeout(function () {
            for (var i = 0; i < player_hand.length; ++i) {

                var item = player_hand[i];
                item.classList.add("hole-card");
                item.classList.remove("hole-card-reverse");
            }
        }, 150);
    }

    function hole_cards_reverse() {
        var audio = new Audio('./sound/holeCards.wav');
        audio.play();
        for (var i = 0; i < player_hand.length; ++i) {
            var item = player_hand[i];
            item.classList.remove("hole-card");
            item.classList.add("hole-card-reverse");
        }
    }
    /*== HOLE CARDS end ==*/


    /*== FOLDS ==*/
    function folds(namePlayer) {

        for (var i = 0; i < player_box.length; ++i) {
            if (player_box[i].getAttribute('data-player') == namePlayer) {
                var item = player_box[i];
                item.style.opacity = '0.2'
                player_action(item, 'FOLDS');
            }
        }

        for (var i = 0; i < player_hand.length; ++i) {
            if (player_hand[i].getAttribute('data-player') == namePlayer) {
                var item = player_hand[i];
                item.style.opacity = '0.05'
            }
        }
    }


    function foldsOthers(namePlayer) {

        for (var i = 0; i < player_box.length; ++i) {
            if (player_box[i].getAttribute('data-player') != namePlayer && player_box[i].style.opacity != '0.2') {
                var item = player_box[i];
                item.setAttribute('folds-other', 'FOLD_COLLECTED');
                item.style.opacity = '0.2'
                player_action(item, 'FOLDS');
            }
        }

        for (var i = 0; i < player_hand.length; ++i) {
            if (player_hand[i].getAttribute('data-player') != namePlayer && player_hand[i].style.opacity != '0.05') {
                var item = player_hand[i];
                item.setAttribute('folds-other', 'FOLD_COLLECTED');
                item.style.opacity = '0.05'
            }
        }

    }

    function foldsOthers_reverse(namePlayer) {

        for (var i = 0; i < player_box.length; ++i) {
            if (player_box[i].getAttribute('data-player') != namePlayer && player_box[i].getAttribute('folds-other') === 'FOLD_COLLECTED') {
                var item = player_box[i];
                item.setAttribute('folds-other', 'FOLD_COLLECTED_REMOVED');
                item.style.opacity = '1'
                //player_action(item, 'FOLDS');
            }
        }

        for (var i = 0; i < player_hand.length; ++i) {
            if (player_hand[i].getAttribute('data-player') != namePlayer && player_hand[i].getAttribute('folds-other') === 'FOLD_COLLECTED') {
                var item = player_hand[i];
                item.setAttribute('folds-other', 'FOLD_COLLECTED_REMOVED');
                item.style.opacity = '1'
            }
        }

    }

    function folds_reverse(namePlayer) {
        var audio = new Audio('./sound/foldsReverse.wav');
        audio.play();
        for (var i = 0; i < player_box.length; ++i) {
            if (player_box[i].getAttribute('data-player') == namePlayer) {
                var item = player_box[i];
                item.style.opacity = '1'
                player_action_reverse(item, "FOLDS");
            }
        }

        for (var i = 0; i < player_hand.length; ++i) {
            if (player_hand[i].getAttribute('data-player') == namePlayer) {
                var item = player_hand[i];
                item.style.opacity = '1'
            }
        }
    }

    /*== FOLDS end ==*/


    /*== AREA ACTION ==*/

    function createBlind(blindNumber = '1', playerNumber, currentStep) {

        let player = playerNumber;
        var area_item = document.getElementsByClassName('area-item');

        for (var i = 0; i < area_item.length; ++i) {
            if (area_item[i].getAttribute('data-player') == player && area_item[i].getAttribute('data-step') == currentStep) {
                var item = area_item[i];
                var element = document.createElement('div');
                element.classList.add('blind-number');
                element.setAttribute('data-blind', blindNumber);
                element.innerHTML = '<div class="area-chips">'
                element.innerHTML += '</div>';
                item.appendChild(element);
            }
        }
    }

    function deleteBlind(blindNumber = '1', playerNumber, currentStep) {

        let player = playerNumber;
        var area_item = document.getElementsByClassName('area-item');

        for (var i = 0; i < area_item.length; ++i) {
            if (area_item[i].getAttribute('data-player') == player && area_item[i].getAttribute('data-step') == currentStep) {
                var item = area_item[i];
                var blind = item.querySelectorAll('.blind-number');
                for (var j = 0; j < blind.length; ++j) {
                    if (blind[j].getAttribute('data-blind') == blindNumber) {
                        blind[j].remove();
                    }
                }

            }
        }
    }

    function blindCallBetRaise(index, blindNumber = '1', playerNumber, actionValue, playerAction = "CALLS", currentStep) {

        var area_item = document.getElementsByClassName('area-item');
        let player = playerNumber;
        let value = 0;
        let index_action = 0;
        index_action = index + '-' + player;
        var current_player_val = 0;
        var cblind;
        var blind_number;

        var offSetTopPlayerBox = 0;
        var offSetLeftPlayerBox = 0;
        var timeStep = 1;

        if (currentStep != 'HOLE_CARDS') {
            timeStep = 500;
        }

        for (var i = 0; i < player_box.length; ++i) {
            if (player_box[i].getAttribute('data-player') == player) {
                var item = player_box[i];
                offSetTopPlayerBox = item.offsetTop;
                offSetLeftPlayerBox = item.offsetLeft;
            }
        }

        //Adiciona 25% a posição
        offSetLeftPlayerBox = offSetLeftPlayerBox + ((parseFloat(25) * parseFloat(offSetLeftPlayerBox)) / 100);

        setTimeout(function () {
            for (var i = 0; i < area_item.length; ++i) {
                if (area_item[i].getAttribute('data-player') == player && area_item[i].getAttribute('data-step') == currentStep) {
                    var item = area_item[i];

                    item.style.opacity = '1';

                    current_player_val = item.querySelectorAll('.total-chips-value')[0].getAttribute('data-value');

                    value = actionValue + parseFloat(current_player_val);

                    item.querySelectorAll('.total-chips-value')[0].setAttribute('data-value', value.toPrecision(3));
                    item.querySelectorAll('.total-chips-value')[0].innerHTML = value.toPrecision(3);
                    if (value > 0) {
                        item.querySelectorAll('.total-chips-value')[0].classList.remove('calls-fade-reverse');
                        item.querySelectorAll('.total-chips-value')[0].classList.add('calls-fade');
                    }

                    blind_number = item.querySelectorAll('.blind-number');

                    blind_number.forEach((itemBlind) => {

                        if (itemBlind.getAttribute('data-blind') == blindNumber) {

                            itemBlind.classList.remove('calls-fade-reverse');
                            itemBlind.classList.add('calls-fade');

                            addChips(itemBlind.querySelectorAll('.area-chips')[0], index_action);

                            cblind = itemBlind.querySelectorAll('.blind');

                            cblind.forEach((cItem) => {
                                cItem.classList.add("calls-fade");
                                cItem.classList.remove("calls-fade-reverse");
                            });
                        }
                    });
                }
            }
        }, 1);

        for (var k = 0; k < player_box.length; ++k) {
            if (player_box[k].getAttribute('data-player') == player) {
                var item = player_box[k];
                action_calculation(item, actionValue);
                player_action(item, playerAction);
            }
        }
    }

    function blindCallBetRaise_reverse(index, blindNumber = '1', playerNumber, actionValue, playerAction = "CALLS", currentStep) {

        let player = playerNumber;
        var value = 0;
        let index_action = 0;
        index_action = index + '-' + player;
        var current_player_val = 0;

        for (var k = 0; k < player_box.length; ++k) {
            if (player_box[k].getAttribute('data-player') == player) {
                var item = player_box[k];
                action_calculation_reverse(item, actionValue);
                player_action_reverse(item, playerAction);
            }
        }
        setTimeout(function () {

            for (var i = 0; i < area_item.length; ++i) {
                if (area_item[i].getAttribute('data-player') == player && area_item[i].getAttribute('data-step') == currentStep) {

                    var item = area_item[i];

                    current_player_val = item.querySelectorAll('.total-chips-value')[0].getAttribute('data-value');

                    value = parseFloat(current_player_val) - actionValue;

                    item.querySelectorAll('.total-chips-value')[0].setAttribute('data-value', value.toPrecision(3));
                    item.querySelectorAll('.total-chips-value')[0].innerHTML = value.toPrecision(3);

                    current_player_val = item.querySelectorAll('.total-chips-value')[0].getAttribute('data-value');

                    if (value <= parseFloat(0)) {
                        item.style.opacity = '0';
                        item.querySelectorAll('.total-chips-value')[0].classList.add('calls-fade-reverse');
                        item.querySelectorAll('.total-chips-value')[0].classList.remove('calls-fade');
                    }

                    blind_number = item.querySelectorAll('.blind-number');

                    blind_number.forEach((itemBlind) => {
                        if (itemBlind.getAttribute('data-blind') == blindNumber) {

                            itemBlind.classList.remove('calls-fade');
                            itemBlind.classList.add('calls-fade-reverse');

                            addChips_remove(itemBlind);

                        }
                    });

                }
            }
        }, 5);
    }

    var current_val = 0, total = 0;
    function action_calculation(elementPlayer, actionValue) {
        if (typeof (elementPlayer.querySelectorAll('.player-total-value')[0] != 'undefined' && elementPlayer.querySelectorAll('.player-total-value')[0] != null)) {
            current_val = parseFloat(elementPlayer.querySelectorAll('.player-total-value')[0].innerText);
            total = parseFloat(current_val) - parseFloat(actionValue);
        }
        elementPlayer.querySelectorAll('.player-total-value')[0].innerText = total.toPrecision(3);
    }

    var current_val = 0, total = 0;
    function action_calculation_reverse(elementPlayer, actionValue) {
        current_val = parseFloat(elementPlayer.querySelectorAll('.player-total-value')[0].innerText);
        total = parseFloat(current_val) + parseFloat(actionValue);
        elementPlayer.querySelectorAll('.player-total-value')[0].innerText = total.toPrecision(3);
    }

    function player_action(elementPlayer, action = "CALLS") {
        elementPlayer.querySelectorAll('.player-action')[0].classList.remove('action-show-reverse');
        elementPlayer.querySelectorAll('.player-action')[0].innerHTML = action;
        elementPlayer.querySelectorAll('.player-action')[0].classList.add('action-show');
        if (action == "CALLS") {
            elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1.1)';
            elementPlayer.querySelectorAll('.player-action')[0].style.transition = 'ease 0.3s all';
            elementPlayer.querySelectorAll('.player-action')[0].style.background = '#56915d';
            elementPlayer.querySelectorAll('.player-action')[0].style.color = '#fff';
            elementPlayer.querySelectorAll('.player-action')[0].style.borderColor = '#56915d';
            setTimeout(function () {
                elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1)';
            }, 200);
            var audio = new Audio('./sound/blind.wav');
            audio.play();
        } else if (action == "BETS") {
            elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1.1)';
            elementPlayer.querySelectorAll('.player-action')[0].style.transition = 'ease 0.3s all';
            elementPlayer.querySelectorAll('.player-action')[0].style.background = '#e84407';
            elementPlayer.querySelectorAll('.player-action')[0].style.color = '#fff';
            elementPlayer.querySelectorAll('.player-action')[0].style.borderColor = '#e84407';
            setTimeout(function () {
                elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1)';
            }, 200);
            var audio = new Audio('./sound/blind.wav');
            audio.play();
        } else if (action == "CHECKS") {
            elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1.1)';
            elementPlayer.querySelectorAll('.player-action')[0].style.transition = 'ease 0.3s all';
            elementPlayer.querySelectorAll('.player-action')[0].style.background = '#fbb03b';
            elementPlayer.querySelectorAll('.player-action')[0].style.color = '#fff';
            elementPlayer.querySelectorAll('.player-action')[0].style.borderColor = '#fbb03b';
            setTimeout(function () {
                elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1)';
            }, 200);
            var audio = new Audio('./sound/checks.wav');
            audio.play();
        } else if (action == "FOLDS") {
            elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1.1)';
            elementPlayer.querySelectorAll('.player-action')[0].style.transition = 'ease 0.3s all';
            elementPlayer.querySelectorAll('.player-action')[0].style.background = 'transparent';
            elementPlayer.querySelectorAll('.player-action')[0].style.color = '#6d7177';
            elementPlayer.querySelectorAll('.player-action')[0].style.borderColor = '#6d7177';
            setTimeout(function () {
                elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1)';
            }, 200);
            var audio = new Audio('./sound/folds.wav');
            audio.play();
        } else if (action == "RAISES") {
            elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1.1)';
            elementPlayer.querySelectorAll('.player-action')[0].style.transition = 'ease 0.3s all';
            elementPlayer.querySelectorAll('.player-action')[0].style.background = '#d82337';
            elementPlayer.querySelectorAll('.player-action')[0].style.color = '#fff';
            elementPlayer.querySelectorAll('.player-action')[0].style.borderColor = '#d82337';
            setTimeout(function () {
                elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1)';
            }, 200);
            var audio = new Audio('./sound/raises.wav');
            audio.play();
        } else if (action == 'WIN') {
            elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1.1)';
            elementPlayer.querySelectorAll('.player-action')[0].style.transition = 'ease 0.3s all';
            elementPlayer.querySelectorAll('.player-action')[0].style.background = '#56915d';
            elementPlayer.querySelectorAll('.player-action')[0].style.color = '#fff';
            elementPlayer.querySelectorAll('.player-action')[0].style.borderColor = '#56915d';
            setTimeout(function () {
                elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1)';
            }, 200);
            var audio = new Audio('./sound/win.wav');
            audio.play();
        } else if (action == "DOENST_SHOW_HAND") {
            elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1.1)';
            elementPlayer.querySelectorAll('.player-action')[0].style.transition = 'ease 0.3s all';
            elementPlayer.querySelectorAll('.player-action')[0].style.background = '#fbb03b';
            elementPlayer.querySelectorAll('.player-action')[0].style.color = '#fff';
            elementPlayer.querySelectorAll('.player-action')[0].style.borderColor = '#fbb03b';
            setTimeout(function () {
                elementPlayer.querySelectorAll('.player-action')[0].style.transform = 'scale(1)';
            }, 200);
            var audio = new Audio('./sound/checks.wav');
            audio.play();
        }

    }

    function player_action_reverse(elementPlayer, action = "CALLS") {
        var audio = new Audio('./sound/foldsReverse.wav');
        audio.play();
        elementPlayer.querySelectorAll('.player-action')[0].classList.add('action-show-reverse');
        elementPlayer.querySelectorAll('.player-action')[0].innerHTML = action;
        elementPlayer.querySelectorAll('.player-action')[0].classList.remove('action-show');
    }



    function addChips(element, index) {
        var content = document.createElement('div');
        content.id = index;
        content.classList.add('index-item');
        content.innerHTML = '<div class="blind small-blind"><div class="chip chip-blue"></div><div class="chip chip-red"></div><div class="chip chip-red"></div><div class="chip chip-dark"></div><div class="chip chip-dark"></div><div class="chip chip-dark"></div></div>';
        element.appendChild(content);
    }

    function addChips_remove(element) {
        //id = '#' + index
        var audio = new Audio('./sound/blind.wav');
        audio.play();
        setTimeout(function () {
            element.remove();
        }, 300);
    }

    /*== AREA ACTION end ==*/


    /*== ACTION TABLE ==*/
    var community_cards = document.getElementsByClassName('flip-card');

    function flopTurnRiver(index, cards) {
        var k = 0;
        document.getElementById('pot-position').style.marginTop = '-100px';

        for (var i = 0; i < community_cards.length; ++i) {
            if (index.includes(community_cards[i].getAttribute('data-card'))) {
                var item = community_cards[i];
                item.classList.add("action-flip");
                item.classList.remove("action-flip-reverse");
                item.querySelectorAll('.flip-card-back')[0].querySelectorAll('.card')[0].classList.add('card-' + cards[k]);
                k++;
            }
        }
    }
    function flopTurnRiver_reverse(index, cards) {
        var k = 0;
        document.getElementById('pot-position').style.marginTop = '-100px';
        document.getElementById('pot-position').style.opacity = '1';

        for (var i = 0; i < community_cards.length; ++i) {
            if (index.includes(community_cards[i].getAttribute('data-card'))) {
                var item = community_cards[i];
                item.classList.remove("action-flip");
                item.classList.add("action-flip-reverse");
                item.querySelectorAll('.flip-card-back')[0].querySelectorAll('.card')[0].classList.add('card-' + cards[k]);
                k++;
            }
        }
    }
    /*== ACTION TABLE end ==*/

    /*== POT CALC==*/
    function pot_calculate(oldStep, newStep) {

        var audio = new Audio('./sound/pot_calc.wav');
        audio.play();

        let total_val = 0;
        let pot_top = document.getElementById('pot-position').offsetTop;
        let pot_left = document.getElementById('pot-position').offsetLeft;
        var current_player_val = 0;
        var newId;
        let clone;
        var current_total = 0;

        for (var i = 0; i < area_item.length; ++i) {

            var item = area_item[i];

            if (typeof (item.querySelectorAll('.total-chips-value')[0]) != 'undefined' && item.querySelectorAll('.total-chips-value')[0] != null && item.querySelectorAll('.total-chips-value')[0] != 0 && item.getAttribute('data-step') == oldStep) {


                newId = item.getAttribute('id') + '-clone-' + item.getAttribute('data-player');
                if (document.getElementById(newId)) {
                    document.getElementById(newId).remove();
                }

                clone = item.cloneNode(true);

                // Change the id attribute of the newly created element:
                clone.setAttribute('id', newId);
                clone.setAttribute('data-step', newStep);
                clone.innerHTML = '<div class="total-chips-value" data-value="0"></div>';
                //append new element clone
                document.getElementById('players').querySelectorAll('.t-row')[0].appendChild(clone);

                current_player_val = item.querySelectorAll('.total-chips-value')[0].getAttribute('data-value');
                total_val = parseFloat(total_val) + parseFloat(current_player_val);

                item.style.top = 'calc(' + pot_top + 'px - 35px)';
                item.style.left = 'calc(' + pot_left + 'px - 35px)';
                item.style.margin = 0;
                item.style.opacity = '0';
            }
        }

        current_total = document.getElementById('pot-totals').getAttribute('data-total');
        total_val = parseFloat(total_val) + parseFloat(current_total);
        document.getElementById('pot-totals').innerHTML = total_val.toPrecision(3);
        document.getElementById('pot-totals').setAttribute('data-total', total_val.toPrecision(3));
        document.getElementById('pot-position').style.opacity = '1';
    }

    function pot_calculate_reverse(oldStep, newStep) {

        //alert('OLD:' + oldStep + ' NEW:' + newStep)

        var audio = new Audio('./sound/pot_calc.wav');
        audio.play();

        var area_item = document.getElementsByClassName('area-item');

        var total_val = 0;
        var current_player_val = 0;
        var current_total = 0;


        for (var i = 0; i < area_item.length; ++i) {

            var item = area_item[i];

            if (typeof (item.querySelectorAll('.total-chips-value')[0]) != 'undefined' && item.querySelectorAll('.total-chips-value')[0] != null && item.querySelectorAll('.total-chips-value')[0] != 0 && item.getAttribute('data-step') === oldStep) {
                //console.log(clone);
                current_player_val = item.querySelectorAll('.total-chips-value')[0].getAttribute('data-value');
                total_val = total_val + parseFloat(current_player_val);

                item.style.top = item.getAttribute('data-start-top');
                item.style.left = item.getAttribute('data-start-left');
                item.style.marginLeft = item.getAttribute('data-start-mleft');
                item.style.marginRight = item.getAttribute('data-start-mright');
                item.style.opacity = '1';
            }
        }

        current_total = document.getElementById('pot-totals').getAttribute('data-total');
        console.log('Total Atual:' + current_total);
        total_val = parseFloat(current_total) - parseFloat(total_val);

        //console.log('Total:' + total_val);

        document.getElementById('pot-totals').innerHTML = total_val.toPrecision(3);
        document.getElementById('pot-totals').setAttribute('data-total', total_val.toPrecision(3));

        //document.getElementById('pot-position').removeAttribute("style");
    }


    /*== COLLECTED_FROM_POT==*/

    function collected_pot(player, value) {
        var audio = new Audio('./sound/pot_calc.wav');
        audio.play();

        var player_box = document.getElementsByClassName('player-box');

        for (var i = 0; i < player_box.length; ++i) {
            if (player_box[i].getAttribute('data-player') == player) {
                var item = player_box[i];

                action_calculation_reverse(item, value);

                var playerTopPosition = item.offsetTop;
                var playerLeftPosition = item.offsetLeft;

                var potPosition = document.getElementById('pot-position');

                potPosition.style.opacity = 0;
                potPosition.style.top = playerTopPosition + 'px';
                potPosition.style.left = playerLeftPosition + 'px';
                potPosition.style.margin = 0;
            }
        }
    }


    function collected_pot_reverse(player, value) {
        var audio = new Audio('./sound/pot_calc.wav');
        audio.play();

        var player_box = document.getElementsByClassName('player-box');

        for (var i = 0; i < player_box.length; ++i) {
            if (player_box[i].getAttribute('data-player') == player) {
                var item = player_box[i];

                action_calculation(item, value);

                var potPosition = document.getElementById('pot-position');

                potPosition.removeAttribute("style");
                potPosition.style.marginTop = '-100px';
            }
        }
    }

    /*== COLLECTED_FROM_POT end==*/


    /*== SHOWS ==*/
    function cards_shows(player, cards) {

        var audio = new Audio('./sound/single_card.wav');

        audio.play();
        setTimeout(function () {
            audio.pause();
            audio.play();
        }, 150);

        let card1 = 'card-' + cards[0];
        let card2 = 'card-' + cards[1];

        var player_hand = document.getElementsByClassName('player-hand');

        for (var i = 0; i < player_hand.length; ++i) {
            var item = player_hand[i];

            if (item.getAttribute('data-player') == player) {

                item.querySelectorAll('.flip-card')[0].classList.add('action-flip');
                item.querySelectorAll('.flip-card')[0].querySelectorAll('.flip-card-back')[0].querySelectorAll('.card')[0].classList.add(card1);

                item.querySelectorAll('.flip-card')[1].classList.add('action-flip');
                item.querySelectorAll('.flip-card')[1].querySelectorAll('.flip-card-back')[0].querySelectorAll('.card')[0].classList.add(card2);
            }
        }
    }

    function cards_shows_reverse(player, cards) {

        var audio = new Audio('./sound/single_card.wav');

        audio.play();
        setTimeout(function () {
            audio.pause();
            audio.play();
        }, 150);

        let card1 = 'card-' + cards[0];
        let card2 = 'card-' + cards[1];

        var player_hand = document.getElementsByClassName('player-hand');

        for (var i = 0; i < player_hand.length; ++i) {
            var item = player_hand[i];

            if (item.getAttribute('data-player') == player) {

                item.querySelectorAll('.flip-card')[0].classList.remove('action-flip');
                item.querySelectorAll('.flip-card')[0].querySelectorAll('.flip-card-back')[0].querySelectorAll('.card')[0].classList.remove(card1);

                item.querySelectorAll('.flip-card')[1].classList.remove('action-flip');
                item.querySelectorAll('.flip-card')[1].querySelectorAll('.flip-card-back')[0].querySelectorAll('.card')[0].classList.remove(card2);
            }
        }
    }
    /*== SHOWS end ==*/

});

