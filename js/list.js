"use strict";

document.addEventListener("DOMContentLoaded", function (event) {

    /**
     * 0 = 8;
     * 1 = 9;
     * 2 = 7;
     * 3 = 6;
     * 4 = 5;
     * 5 = 4;
     * 6 = 3;
     * 7 = 2;
     */
    var currentIndex = 1;

    fetch("poker.json")
        .then(function (response) {
            return response.json();
        }).then(function (json) {

            let content_positions = '';
            let id = 1;
            let pLeft = '0';
            let pRight = '0';
            let pTop = '0';
            let mLeft = '0';
            let mRight = '0';

            //Area Positions
            let aLeft = '0';
            let aRight = '0';
            let aTop = '0';
            let aBottom = '0';

            totalPlayers = json[currentIndex].players.length;
            //console.log(totalPlayers);


            content_positions += '<div class="t-row h-100">';
            for (var i = 1; i < totalPlayers; ++i) {
                id = i + 1;

                //Reset default values
                pLeft = '0';
                pRight = '0';
                pTop = '0';
                mLeft = '0';
                mRight = '0';

                //Reset default values
                aLeft = '0';
                aRight = '0';
                aTop = '0';
                aBottom = '0';

                switch (totalPlayers) {
                    case 7:
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '5%';

                                aLeft = '25%';
                                aTop = 'calc(25% + 10px)';
                                break;
                            case 3:
                                pLeft = '25%';
                                pTop = '-50px';

                                aLeft = '35%';
                                aTop = 'calc(25% - 25px)';
                                break;
                            case 4:
                                pLeft = '50%';
                                pTop = '-50px';

                                aTop = 'calc(25% - 25px)';
                                aLeft = '50%';
                                break;
                            case 5:
                                pLeft = '75%';
                                pTop = '5%';

                                aLeft = 'calc(50% + 130px)';
                                aTop = 'calc(25% - 25px)';
                                break;
                            case 6:
                                pLeft = 'calc(0px)';
                                pTop = '35%';

                                aTop = '36%';
                                aLeft = 'calc(25% - 40px)';
                                break;
                            case 7:
                                pLeft = 'calc(75%)';
                                pTop = '35%';

                                aTop = '36%';
                                aLeft = 'calc(56% + 100px)';
                                break;
                            default:
                        }
                        break;
                    case 6:
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '15%';

                                aTop = '30%';
                                aLeft = '25%';
                                break;
                            case 3:
                                pLeft = '25%';
                                pTop = '-50px';

                                aLeft = '35%';
                                aTop = 'calc(25% - 25px)';
                                break;
                            case 4:
                                pLeft = '75%';
                                pTop = '15%';

                                aTop = '30%';
                                aLeft = 'calc(50% + 170px)';
                                break;
                            case 5:
                                pLeft = '0';
                                pTop = '50%';

                                aTop = '50%';
                                aLeft = '26%';
                                break;
                            case 6:
                                pLeft = '75%';
                                pTop = '50%';

                                aTop = '50%';
                                aLeft = 'calc(50% + 130px)';
                                break;
                            default:
                        }
                        break;
                    case 5:
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '5%';

                                aLeft = '25%';
                                aTop = 'calc(25% + 10px)';
                                break;
                            case 3:
                                pLeft = '75%';
                                pTop = '5%';

                                aLeft = 'calc(50% + 130px)';
                                aTop = 'calc(25% - 25px)';
                                break;
                            case 4:
                                pLeft = '0';
                                pTop = '40%';

                                aTop = '50%';
                                aLeft = '26%';
                                break;
                            case 5:
                                pLeft = '75%';
                                pTop = '40%';

                                aTop = '50%';
                                aLeft = 'calc(50% + 130px)';
                                break;
                            default:
                        }
                        break;
                    case 4:
                        switch (id) {
                            case 2:
                                pLeft = 'calc(0px - 100px)';
                                pTop = '35%';

                                aTop = '36%';
                                aLeft = 'calc(25% - 40px)';
                                break;
                            case 3:
                                pLeft = '25%';
                                pTop = '-50px';

                                aLeft = '35%';
                                aTop = 'calc(25% - 25px)';
                                break;
                            case 4:
                                pLeft = 'calc(75% + 100px)';
                                pTop = '35%';

                                aTop = '36%';
                                aLeft = 'calc(56% + 90px)';
                                break;
                            default:
                        }
                        break;
                    case 3:
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '5%';

                                aLeft = '25%';
                                aTop = 'calc(25% + 10px)';
                                break;
                            case 3:
                                pLeft = '75%';
                                pTop = '5%';

                                aLeft = 'calc(50% + 130px)';
                                aTop = 'calc(25% - 25px)';
                                break;
                            default:
                        }
                        break;
                    case 2:
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '5%';

                                aLeft = '25%';
                                aTop = 'calc(25% + 10px)';
                                break;
                            default:
                        }
                        break;
                    default: //BTN
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '5%';

                                aLeft = '25%';
                                aTop = 'calc(25% + 10px)';
                                break;
                            case 3:
                                pLeft = '25%';
                                pTop = '-50px';

                                aLeft = '35%';
                                aTop = 'calc(25% - 25px)';
                                break;
                            case 4:
                                pLeft = '50%';
                                pTop = '-50px';

                                aTop = 'calc(25% - 25px)';
                                aLeft = '50%';
                                break;
                            case 5:
                                pLeft = '75%';
                                pTop = '5%';

                                aLeft = 'calc(50% + 130px)';
                                aTop = 'calc(25% - 25px)';
                                break;
                            case 6:
                                pLeft = 'calc(0px - 100px)';
                                pTop = '35%';

                                aTop = '36%';
                                aLeft = 'calc(25% - 40px)';
                                break;
                            case 7:
                                pLeft = 'calc(75% + 100px)';
                                pTop = '35%';

                                aTop = '36%';
                                aLeft = 'calc(56% + 90px)';
                                break;
                            case 8:
                                pLeft = '0';
                                pTop = '65%';

                                aTop = '50%';
                                aLeft = '26%';
                                break;
                            case 9:
                                pLeft = '75%';
                                pTop = '65%';

                                aTop = '50%';
                                aLeft = 'calc(50% + 130px)';
                                break;
                            default:
                        }
                }


                //position
                content_positions += '<div id="position-' + id + '" class="t-col player-box" style="right:' + pRight + ';left:' + pLeft + ';top:' + pTop + ';margin-left:' + mLeft + ';margin-right:' + mRight + '"></div>';

                //cards
                content_positions += '<div id="cards-' + id + '" class="player-hand" style="right:' + pRight + ';left:' + pLeft + ';top:' + pTop + ';margin-left:' + mLeft + ';margin-right:' + mRight + '"></div>';

                //area action
                content_positions += '<div id="area-' + id + '" class="area-item" style="opacity:0;right:' + aRight + ';left:' + aLeft + ';top:' + aTop + ';margin-left:' + mLeft + ';margin-right:' + mRight + '" data-total-players="' + totalPlayers + '" data-step="HOLE_CARDS" data-start-left="' + aLeft + '" data-start-top="' + aTop + '" data-start-mleft="' + mLeft + '" data-start-mright="' + mRight + '"><div class="total-chips-value" data-value="0"></div></div>';

            }

            //HH position
            id = 1;

            pRight = '0';
            pLeft = 'calc(25% + 100px)';
            pTop = '75%';
            mLeft = '0';
            mRight = '0';

            //Area Positions
            aLeft = 'calc(35% + 100px)';
            aRight = '0';
            aTop = 'calc(50% - 20px)';
            aBottom = '0';


            //position
            content_positions += '<div id="position-' + id + '" class="t-col player-box hh-player" style="right:' + pRight + ';left:' + pLeft + ';top:' + pTop + ';margin-left:' + mLeft + ';margin-right:' + mRight + '"></div>';

            //cards
            content_positions += '<div id="cards-' + id + '" class="player-hand hh-player" style="right:' + pRight + ';left:' + pLeft + ';top:' + '50%' + ';margin-left:' + mLeft + ';margin-right:' + mRight + '"></div>';

            //area action
            content_positions += '<div id="area-' + id + '" class="area-item hh-player" style="opacity:0;right:' + aRight + ';left:' + aLeft + ';top:' + aTop + ';margin-left:' + mLeft + ';margin-right:' + mRight + '" data-total-players="' + totalPlayers + '" data-step="HOLE_CARDS" data-left="' + aLeft + '" data-top="' + aTop + '"><div class="total-chips-value" data-value="0"></div></div>';


            content_positions += '<div id="pot-position">';
            content_positions += '<div class="pot-table">';
            content_positions += '<div class="area-chips justify-content-center">';
            content_positions += '<div class="blind small-blind">';
            content_positions += '<div class="chip chip-pot"></div>';
            content_positions += '<div class="chip chip-pot"></div>';
            content_positions += '<div class="chip chip-pot"></div>';
            content_positions += '<div class="chip chip-pot"></div>';
            content_positions += '</div>';
            content_positions += '</div>';
            content_positions += '</div>';
            content_positions += '<div class="total-pot-value">POT:<span id="pot-totals" data-total="0">0</span></div>';
            content_positions += '</div>';
            content_positions += '</div>';

            document.getElementById('players').innerHTML = content_positions;

            let isDealer = '';
            let content = '';
            let position = 0;
            let elementId = '';
            let elementAreaId = '';
            var elArea;
            var elPosition;
            var nameWithSpace = '';
            var totalPlayers = 0;
            var smallAndBigBlindIndex = -1;
            var contentBlind = '';

            var p0 = 0, p2 = 2, p3 = 3, p4 = 4, p5 = 5, p6 = 6, p7 = 7, p8 = 8, p9 = 9;


            if (json[currentIndex].hhPlayer) {

                if (json[currentIndex].hhPlayer.gamePosition == 'BTN') {
                    isDealer = 'dealer-button';
                } else {
                    isDealer = '';
                }

                content += '<div class="player-info ' + isDealer + ' ' + json[currentIndex].hhPlayer.gamePosition + '">';
                content += '<div class="player-hero">Hero</div>';
                content += '<div class="player-name">' + json[currentIndex].hhPlayer.nickname + '</div>';
                content += '<div class="player-index">#' + json[currentIndex].hhPlayer.p_ID + '</div>';
                content += '<div class="player-total-value">' + json[currentIndex].hhPlayer.chips + '</div>';
                content += '</div>';
                content += '<div class="player-statistics">';
                content += '<ul>';
                content += '<li>';
                content += '<div class="statistics-name">VPIP</div>';
                content += '<div class="statistics-valeu">21</div>';
                content += '</li>';
                content += '<li>';
                content += '<div class="statistics-name">PFR</div>';
                content += '<div class="statistics-valeu">0</div>';
                content += '</li>';
                content += '<li>';
                content += '<div class="statistics-name">3Fld</div>';
                content += '<div class="statistics-valeu">-</div>';
                content += '</li>';
                content += '<li>';
                content += '<div class="statistics-name">FldSd</div>';
                content += '<div class="statistics-valeu">89</div>';
                content += '</li>';
                content += '<li>';
                content += '<div class="statistics-name">BBs</div>';
                content += '<div class="statistics-valeu">36</div>';
                content += '</li>';
                content += '</ul>';
                content += '</div>';
                content += '<div class="player-action">';
                content += '</div>';

                elPosition = document.getElementById('position-1');
                elPosition.innerHTML = content;
                elPosition.setAttribute('data-player', json[currentIndex].hhPlayer.nickname);

                elArea = document.getElementById('area-1')
                elArea.setAttribute('data-player', json[currentIndex].hhPlayer.nickname);

                //Definindo o blind idenficador
                smallAndBigBlindIndex = -1;

                if ((json[currentIndex].hhPlayer.smallBlind != 'undefined' && json[currentIndex].hhPlayer.smallBlind != null)) {

                    var elArea = document.getElementById('area-1');

                    //Definindo valor do smallBlind na listagem e mostrando
                    elArea.querySelectorAll('.total-chips-value')[0].setAttribute('data-value', json[currentIndex].hhPlayer.smallBlind);
                    elArea.querySelectorAll('.total-chips-value')[0].innerHTML = json[currentIndex].hhPlayer.smallBlind;

                    //delay para mostrar
                    setTimeout(function () {
                        elArea.style.opacity = '1';
                        //elArea.querySelectorAll('.total-chips-value')[0].classList.add('calls-fade');
                    }, 5);

                    var element = document.createElement('div');
                    element.classList.add('blind-number');
                    element.setAttribute('data-blind', smallAndBigBlindIndex);

                    contentBlind = '<div class="area-chips">'
                    contentBlind += '<div id="' + smallAndBigBlindIndex + '-' + json[currentIndex].hhPlayer.nickname + '" class="index-item">';
                    contentBlind += '<div class="blind small-blind calls-fade">';
                    contentBlind += '<div class="chip chip-blue"></div>';
                    contentBlind += '<div class="chip chip-red"></div>';
                    contentBlind += '<div class="chip chip-red"></div>';
                    contentBlind += '<div class="chip chip-dark"></div>';
                    contentBlind += '<div class="chip chip-dark"></div>';
                    contentBlind += '<div class="chip chip-dark"></div>';
                    contentBlind += '</div></div>';
                    contentBlind += '</div>';

                    element.innerHTML = contentBlind;
                    elArea.appendChild(element);

                } else if (json[currentIndex].hhPlayer.bigBlind != 'undefined' && json[currentIndex].hhPlayer.bigBlind != null) {

                    var elArea = document.getElementById('area-1');
                    //Definindo valor do bigBlind na listagem e mostrando
                    elArea.querySelectorAll('.total-chips-value')[0].setAttribute('data-value', json[currentIndex].hhPlayer.bigBlind);
                    elArea.querySelectorAll('.total-chips-value')[0].innerHTML = json[currentIndex].hhPlayer.bigBlind;


                    //delay para mostrar
                    setTimeout(function () {
                        elArea.style.opacity = 1;
                        //elArea.querySelectorAll('.total-chips-value')[0].classList.add('calls-fade');
                    }, 5);

                    var element = document.createElement('div');
                    element.classList.add('blind-number');
                    element.setAttribute('data-blind', smallAndBigBlindIndex);

                    contentBlind = '<div class="area-chips">'
                    contentBlind += '<div id="' + smallAndBigBlindIndex + '-' + json[currentIndex].hhPlayer.nickname + '" class="index-item">';
                    contentBlind += '<div class="blind small-blind calls-fade">';
                    contentBlind += '<div class="chip chip-blue"></div>';
                    contentBlind += '<div class="chip chip-red"></div>';
                    contentBlind += '<div class="chip chip-red"></div>';
                    contentBlind += '<div class="chip chip-dark"></div>';
                    contentBlind += '<div class="chip chip-dark"></div>';
                    contentBlind += '<div class="chip chip-dark"></div>';
                    contentBlind += '</div></div>';
                    contentBlind += '</div>';

                    element.innerHTML = contentBlind;
                    elArea.appendChild(element);
                }

            }


            json[currentIndex].players.forEach((item) => {

                isDealer = '';
                content = '';
                position = 0;
                elementId = '';
                elementAreaId = '';
                elArea = '';

                id = position = parseInt(item.position) + 1;
                pRight = '0';
                pLeft = '0';
                pTop = '5%';
                mLeft = '0';
                mRight = '0';

                switch (totalPlayers) {
                    case 7:
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '5%';
                                break;
                            case 3:
                                pLeft = '-25%';
                                pTop = '-50px';
                                break;
                            case 4:
                                pLeft = '-50%';
                                pTop = '-50px';
                                break;
                            case 5:
                                pLeft = '-75%';
                                pTop = '5%';
                                break;
                            case 6:
                                pLeft = '-0';
                                pTop = '-25%';
                                break;
                            case 7:
                                pLeft = '-auto';
                                pTop = '-25%';
                                break;
                            default:
                        }
                    case 6:
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '5%';
                                break;
                            case 3:
                                pLeft = '25%';
                                pTop = '-50px';
                                break;
                            case 4:
                                pLeft = '50%';
                                pTop = '-50px';
                                break;
                            case 5:
                                pLeft = '75%';
                                pTop = '5%';
                                break;
                            case 6:
                                pLeft = 'calc(0px - 100px)';
                                pTop = '35%';
                                break;
                            default:
                        }
                        break;
                    case 5:
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '5%';
                                break;
                            case 3:
                                pLeft = '75%';
                                pTop = '5%';
                                break;
                            case 4:
                                pLeft = '0';
                                pTop = '65%';
                                break;
                            case 5:
                                pLeft = '75%';
                                pTop = '65%';
                                break;
                            default:
                        }
                        break;
                    case 4:
                        switch (id) {
                            case 2:
                                pLeft = 'calc(0px - 100px)';
                                pTop = '35%';
                                break;
                            case 3:
                                pLeft = '25%';
                                pTop = '-50px';
                                break;
                            case 4:
                                pLeft = '75%';
                                pTop = '35%';
                                mRight = '-100px';
                                break;
                            default:
                        }
                        break;
                    case 3:
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '5%';
                                break;
                            case 3:
                                pLeft = '75%';
                                pTop = '5%';
                                break;
                            default:
                        }
                        break;
                    case 2:
                        switch (id) {
                            case 2:
                                pLeft = '0';
                                pTop = '5%';
                                break;
                            default:
                        }
                        break;
                    default: //BTN
                        switch (id) {
                            case 2:
                                pLeft = '-0';
                                pTop = '-0';
                                break;
                            case 3:
                                pLeft = '-25%';
                                pTop = '0px';
                                break;
                            case 4:
                                pLeft = '-50%';
                                pTop = '-50px';
                                break;
                            case 5:
                                pLeft = '-75%';
                                pTop = '-0';
                                break;
                            case 6:
                                pLeft = '-0';
                                pTop = '-25%';
                                break;
                            case 7:
                                pLeft = '-75%';
                                pTop = '-25%';
                                break;
                            case 8:
                                pLeft = '-0';
                                pTop = '-50%';
                                break;
                            case 9:
                                pLeft = '-75%';
                                pTop = '-50%';
                                break;
                            default:
                        }
                }


                if (json[currentIndex].hhPlayer.nickname != item.nickname) {
                    if (item.gamePosition == 'BTN') {
                        isDealer = 'dealer-button';
                    } else {
                        isDealer = '';
                    }
                    nameWithSpace = item.nickname.split('&').join(' ');
                    content += '<div class="player-statistics">';
                    content += '<ul>';
                    content += '<li>';
                    content += '<div class="statistics-name">VPIP</div>';
                    content += '<div class="statistics-valeu">21</div>';
                    content += '</li>';
                    content += '<li>';
                    content += '<div class="statistics-name">PFR</div>';
                    content += '<div class="statistics-valeu">0</div>';
                    content += '</li>';
                    content += '<li>';
                    content += '<div class="statistics-name">3Fld</div>';
                    content += '<div class="statistics-valeu">-</div>';
                    content += '</li>';
                    content += '<li>';
                    content += '<div class="statistics-name">FldSd</div>';
                    content += '<div class="statistics-valeu">89</div>';
                    content += '</li>';
                    content += '<li>';
                    content += '<div class="statistics-name">BBs</div>';
                    content += '<div class="statistics-valeu">36</div>';
                    content += '</li>';
                    content += '</ul>';
                    content += '</div>';
                    content += '<div class="player-info ' + isDealer + ' ' + item.gamePosition + '">';
                    content += '<div class="player-name">' + nameWithSpace + '</div>';
                    content += '<div class="player-index">#' + item.p_ID + '</div>';
                    content += '<div class="player-total-value">' + item.chips + '</div>';
                    content += '</div>';
                    content += '<div class="player-action">';
                    content += '</div>';


                    elementId = 'position-' + id;

                    elPosition = document.getElementById(elementId);
                    // alert(elementId);
                    elPosition.innerHTML = content;
                    elPosition.setAttribute('data-player', item.nickname);

                    elementAreaId = 'area-' + id;
                    elArea = document.getElementById(elementAreaId);
                    elArea.setAttribute('data-player', item.nickname);

                    //Definindo o blind idenficador
                    smallAndBigBlindIndex = -1;

                    if (item.smallBlind != 'undefined' && item.smallBlind != null) {

                        var elArea = document.getElementById(elementAreaId);
                        //Definindo valor do smallBlind na listagem e mostrando
                        var currentElementTotal = elArea.querySelectorAll('.total-chips-value')[0];
                        currentElementTotal.setAttribute('data-value', item.smallBlind);
                        currentElementTotal.innerHTML = item.smallBlind;

                        //delay para mostrar
                        setTimeout(function () {
                            elArea.style.opacity = '1';
                            //currentElementTotal.classList.add('calls-fade');
                        }, 5);

                        var element = document.createElement('div');
                        element.classList.add('blind-number');
                        element.setAttribute('data-blind', smallAndBigBlindIndex);

                        contentBlind = '<div class="area-chips">'
                        contentBlind += '<div id="' + smallAndBigBlindIndex + '-' + item.nickname + '" class="index-item">';
                        contentBlind += '<div class="blind small-blind calls-fade">';
                        contentBlind += '<div class="chip chip-blue"></div>';
                        contentBlind += '<div class="chip chip-red"></div>';
                        contentBlind += '<div class="chip chip-red"></div>';
                        contentBlind += '<div class="chip chip-dark"></div>';
                        contentBlind += '<div class="chip chip-dark"></div>';
                        contentBlind += '<div class="chip chip-dark"></div>';
                        contentBlind += '</div></div>';
                        contentBlind += '</div>';

                        element.innerHTML = contentBlind;
                        elArea.appendChild(element);

                    } else if (item.bigBlind != 'undefined' && item.bigBlind != null) {

                        var elArea = document.getElementById(elementAreaId);

                        //Definindo valor do bigBlind na listagem e mostrando
                        var currentElementTotal = elArea.querySelectorAll('.total-chips-value')[0];
                        currentElementTotal.setAttribute('data-value', item.bigBlind);
                        currentElementTotal.innerHTML = item.bigBlind;

                        //delay para mostrar
                        setTimeout(function () {
                            elArea.style.opacity = '1';
                            //currentElementTotal.classList.add('calls-fade');
                        }, 5);


                        var element = document.createElement('div');
                        element.classList.add('blind-number');
                        element.setAttribute('data-blind', smallAndBigBlindIndex);

                        contentBlind = '<div class="area-chips">'
                        contentBlind += '<div id="' + smallAndBigBlindIndex + '-' + item.nickname + '" class="index-item">';
                        contentBlind += '<div class="blind small-blind calls-fade">';
                        contentBlind += '<div class="chip chip-blue"></div>';
                        contentBlind += '<div class="chip chip-red"></div>';
                        contentBlind += '<div class="chip chip-red"></div>';
                        contentBlind += '<div class="chip chip-dark"></div>';
                        contentBlind += '<div class="chip chip-dark"></div>';
                        contentBlind += '<div class="chip chip-dark"></div>';
                        contentBlind += '</div></div>';
                        contentBlind += '</div>';

                        element.innerHTML = contentBlind;
                        elArea.appendChild(element);
                    }
                }
            });

            json[currentIndex].players.forEach((item) => {

                content = '';
                position = 0;
                elementId = '';

                id = position = parseInt(item.position) + 1;

                if (json[currentIndex].hhPlayer.nickname != item.nickname) {

                    content += '<div class="player-cards">';
                    if (item.hand) {
                        r++;
                        item.hand.forEach((card) => {
                            r++;
                            content += '<div class="flip-card" data-hand-card="' + r + '">';
                            content += '<div class="flip-card-inner">';
                            content += '<div class="flip-card-front">';
                            content += '<div class="card"></div>';
                            content += '</div>';
                            content += '<div class="flip-card-back">';
                            content += '<div class="card card-' + card + '"></div>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                        })
                    } else {
                        content += '<div class="flip-card" data-hand-card="1">';
                        content += '<div class="flip-card-inner">';
                        content += '<div class="flip-card-front">';
                        content += '<div class="card"></div>';
                        content += '</div>';
                        content += '<div class="flip-card-back">';
                        content += '<div class="card"></div>';
                        content += '</div>';
                        content += '</div>';
                        content += '</div>';
                        content += '<div class="flip-card" data-hand-card="2">';
                        content += '<div class="flip-card-inner">';
                        content += '<div class="flip-card-front">';
                        content += '<div class="card"></div>';
                        content += '</div>';
                        content += '<div class="flip-card-back">';
                        content += '<div class="card"></div>';
                        content += '</div>';
                        content += '</div>';
                        content += '</div>';
                    }
                    content += '</div>';


                    elementId = 'cards-' + id;
                    // alert(elementId);
                    document.getElementById(elementId).innerHTML = content;
                    document.getElementById(elementId).setAttribute('data-player', item.nickname);
                } else {
                    content += '<div class="player-cards">';
                    if (json[currentIndex].hhPlayer.hand) {
                        var r = 0;
                        json[currentIndex].hhPlayer.hand.forEach((card) => {
                            r++;
                            content += '<div class="flip-card action-flip" data-hand-card="' + r + '">';
                            content += '<div class="flip-card-inner">';
                            content += '<div class="flip-card-front">';
                            content += '<div class="card"></div>';
                            content += '</div>';
                            content += '<div class="flip-card-back">';
                            content += '<div class="card card-' + card + '"></div>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                        })
                    } else {
                        content += '<div class="flip-card" data-hand-card="1">';
                        content += '<div class="flip-card-inner">';
                        content += '<div class="flip-card-front">';
                        content += '<div class="card"></div>';
                        content += '</div>';
                        content += '<div class="flip-card-back">';
                        content += '<div class="card"></div>';
                        content += '</div>';
                        content += '</div>';
                        content += '</div>';
                        content += '<div class="flip-card" data-hand-card="2">';
                        content += '<div class="flip-card-inner">';
                        content += '<div class="flip-card-front">';
                        content += '<div class="card"></div>';
                        content += '</div>';
                        content += '<div class="flip-card-back">';
                        content += '<div class="card"></div>';
                        content += '</div>';
                        content += '</div>';
                        content += '</div>';
                    }
                    content += '</div>';

                    elementId = 'cards-' + 1;
                    // alert(elementId);
                    document.getElementById(elementId).innerHTML = content;
                    document.getElementById(elementId).setAttribute('data-player', item.nickname);
                }
            });
        });

    //  const query = JSON.parse(json);
});