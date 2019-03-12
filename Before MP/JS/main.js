// Define my global variables 
var $square = $('.square');
var $message = $('#message');
var score = [0, 0];
var $player01Score = $('#player01Score');
var $player02Score = $('#player02Score');

var $player01Id = $('#player01Id')
var $player02Id = $('#player02Id')
var player01Id = $player01Id.text()
var player02Id = $player02Id.text()

var player01Name = 'player 1';
var player02Name = 'player 2';
var $player01Name = $('#player01Name')
var $player02Name = $('#player02Name')





// functions to run when the page loaded
$(document).ready(function () {
    changeCharacter();
    playButton();
})

// Welome
function changeCharacter() {
    $('#player01IdOptions').on('click', function () {
        if ($(event.target).text() == player02Id) {
            swal('Already Picked! pick another character.')
        } else {
            player01Id = $(event.target).text()
            $player01Id.text(player01Id)
        }
    }
    )

    $('#player02IdOptions').on('click', function () {
        if ($(event.target).text() == player01Id) {
            swal('Already Picked! pick another character.')
        } else {
            player02Id = $(event.target).text()
            $player02Id.text(player02Id)
        }
    }
    )
}

function getName() {

    if ($player01Name.val() != '') {
        player01Name = $player01Name.val()

    }
    if ($player02Name.val() != '') {
        player02Name = $player02Name.val()
    }

    $('#displayPlayer01Name').text(player01Name);
    $('#displayPlayer02Name').text(player02Name);
}


function playButton() {
    $('#play').on('click', function () {
        $('.welcome').css("display", "none");
        $('.game').css("visibility", "visible");

        getName();
        startGame();
        onClick();
    })
}






// Game functions
function startGame() {
    document.turn = player01Id;
    document.winner = null;
    document.numberOfMoves = 0;

    // $message.text(document.turn + '\'s turn');
    $('#newGame').on('click', newGame);
    switchDot();
}

function newGame() {
    for (let i in $square) {
        $square.eq(i).text('')
    }
    startGame();
}

function onClick() {
    $square.on('click', function () {
        if (player02Id == '🤖') {
            if (document.numberOfMoves == 5) {
                return
            }
            else if (document.winner == document.turn) {
                // $message.text(document.turn + ' Already Won!!!!');
            } else {
                if ($(event.target).text() == '') {
                    $(event.target).text(player01Id);
                    document.numberOfMoves++;
                    ai();
                    switchTurnAi();
                    console.log(document.numberOfMoves);

                    if (document.numberOfMoves == 5 && document.winner == null) {
                        swal("Draw");
                    }
                    switchDot();

                } else {
                    swal({

                        text: "Pick another square!",
                        icon: "warning",
                    });
                }
            }
        }
        else {
            if (document.numberOfMoves == 9) {
                return
            }
            else if (document.winner == document.turn) {
                // $message.text(document.turn + ' Already Won!!!!');
            } else {
                if ($(event.target).text() == '') {
                    $(event.target).text(document.turn);
                    document.numberOfMoves++;
                    switchTurn();
                    if (document.numberOfMoves == 9 && document.winner == null) {
                        $message.text('DRAW!!')
                    }
                    switchDot();

                } else {
                    swal({

                        text: "Pick another square!",
                        icon: "warning",
                    });
                }
            }
        }

    })
    resetScore();
}


function resetScore() {
    $('#resetScore').on('click', function () {
        score = [0, 0];
        $player01Score.text(score[0]);
        $player02Score.text(score[1]);
        newGame();
    })
}



function switchTurn() {
    if (checkWin(document.turn)) {
        // $message.text(document.turn + ' Won!!!!');
        swal(document.turn + "Won!");
        document.winner = document.turn;
        if (document.winner == player01Id) {
            score[0]++;
            $player01Score.text(score[0])
        } else if (document.winner == player02Id) {
            score[1]++;
            $player02Score.text(score[1])
        }

    } else {
        if (document.turn == player01Id) {
            document.turn = player02Id;

        } else {
            document.turn = player01Id;

        }
        if (document.numberOfMoves != 9) {
            // $message.text('It\'s ' + document.turn + ' turn')
        }
    }
}

function switchDot() {
    if (document.turn == player01Id) {
        $('#player01Dot').css('background-color', '#32CD32');
        $('#player02Dot').css('background-color', '#D3D3D3');
    }
    else if (document.turn == player02Id) {
        $('#player01Dot').css('background-color', '#D3D3D3');
        $('#player02Dot').css('background-color', '#32CD32');
    }

}


// Check win functions
function checkWin(move) {
    var result = false;
    if (checkRow(1, 2, 3, move) ||
        checkRow(4, 5, 6, move) ||
        checkRow(7, 8, 9, move) ||
        checkRow(1, 4, 7, move) ||
        checkRow(2, 5, 8, move) ||
        checkRow(3, 6, 9, move) ||
        checkRow(1, 5, 9, move) ||
        checkRow(3, 5, 7, move)) {
        result = true;
    }
    return result;


}

function checkRow(a, b, c, move) {
    var result = false;
    if (getSquareValue(a) == move && getSquareValue(b) == move && getSquareValue(c) == move) {
        return result = true;
    }
    return result = false;
}

function getSquareValue(number) {
    return $('#square' + number).text();
}



//Ai functions
function ai() {
    if (document.numberOfMoves == '1' && getSquareValue(5) == player01Id) {
        $square.eq(0).text(player02Id);

    } else if (document.numberOfMoves == '1' && getSquareValue(5) != player01Id) {
        $square.eq(4).text(player02Id);
    }
    //try to win 
    else if (getSquareValue(1) == player02Id && getSquareValue(2) == player02Id && getSquareValue(3) == '') {
        $square.eq(2).text(player02Id);
    } else if (getSquareValue(1) == player02Id && getSquareValue(4) == player02Id && getSquareValue(7) == '') {
        $square.eq(6).text(player02Id);
    } else if (getSquareValue(2) == player02Id && getSquareValue(3) == player02Id && getSquareValue(1) == '') {
        $square.eq(0).text(player02Id);
    } else if (getSquareValue(3) == player02Id && getSquareValue(5) == player02Id && getSquareValue(7) == '') {
        $square.eq(6).text(player02Id);
    } else if (getSquareValue(3) == player02Id && getSquareValue(6) == player02Id && getSquareValue(9) == '') {
        $square.eq(8).text(player02Id);
    } else if (getSquareValue(4) == player02Id && getSquareValue(5) == player02Id && getSquareValue(6) == '') {
        $square.eq(5).text(player02Id);
    } else if (getSquareValue(5) == player02Id && getSquareValue(6) == player02Id && getSquareValue(4) == '') {
        $square.eq(3).text(player02Id);
    } else if (getSquareValue(2) == player02Id && getSquareValue(5) == player02Id && getSquareValue(8) == '') {
        $square.eq(7).text(player02Id);
    } else if (getSquareValue(5) == player02Id && getSquareValue(8) == player02Id && getSquareValue(2) == '') {
        $square.eq(1).text(player02Id);
    } else if (getSquareValue(4) == player02Id && getSquareValue(7) == player02Id && getSquareValue(1) == '') {
        $square.eq(0).text(player02Id);
    } else if (getSquareValue(5) == player02Id && getSquareValue(7) == player02Id && getSquareValue(3) == '') {
        $square.eq(2).text(player02Id);
    } else if (getSquareValue(7) == player02Id && getSquareValue(8) == player02Id && getSquareValue(9) == '') {
        $square.eq(8).text(player02Id);
    } else if (getSquareValue(8) == player02Id && getSquareValue(9) == player02Id && getSquareValue(7) == '') {
        $square.eq(6).text(player02Id);
    } else if (getSquareValue(5) == player02Id && getSquareValue(9) == player02Id && getSquareValue(1) == '') {
        $square.eq(0).text(player02Id);
    } else if (getSquareValue(6) == player02Id && getSquareValue(9) == player02Id && getSquareValue(3) == '') {
        $square.eq(2).text(player02Id);
    } else if (getSquareValue(3) == player02Id && getSquareValue(9) == player02Id && getSquareValue(6) == '') {
        $square.eq(5).text(player02Id);
    } else if (getSquareValue(1) == player02Id && getSquareValue(7) == player02Id && getSquareValue(4) == '') {
        $square.eq(3).text(player02Id);
    } else if (getSquareValue(1) == player02Id && getSquareValue(3) == player02Id && getSquareValue(2) == '') {
        $square.eq(1).text(player02Id);
    } else if (getSquareValue(7) == player02Id && getSquareValue(9) == player02Id && getSquareValue(8) == '') {
        $square.eq(7).text(player02Id);
    }
    else if (getSquareValue(1) == player02Id && getSquareValue(5) == player02Id && getSquareValue(9) == '') {
        $square.eq(8).text(player02Id);
    }
    // block traps 
    else if (getSquareValue(2) == player01Id && getSquareValue(6) == player01Id && getSquareValue(3) == '') {
        $square.eq(2).text(player02Id);
    }
    else if (getSquareValue(2) == player01Id && getSquareValue(4) == player01Id && getSquareValue(1) == '') {
        $square.eq(0).text(player02Id);
    }
    else if (getSquareValue(4) == player01Id && getSquareValue(8) == player01Id && getSquareValue(7) == '') {
        $square.eq(6).text(player02Id);
    }
    else if (getSquareValue(8) == player01Id && getSquareValue(6) == player01Id && getSquareValue(9) == '') {
        $square.eq(8).text(player02Id);
    }
    // 2 in line
    else if (getSquareValue(1) == player01Id && getSquareValue(2) == player01Id && getSquareValue(3) == '') {
        $square.eq(2).text(player02Id);
    } else if (getSquareValue(1) == player01Id && getSquareValue(4) == player01Id && getSquareValue(7) == '') {
        $square.eq(6).text(player02Id);
    } else if (getSquareValue(2) == player01Id && getSquareValue(3) == player01Id && getSquareValue(1) == '') {
        $square.eq(0).text(player02Id);
    } else if (getSquareValue(3) == player01Id && getSquareValue(5) == player01Id && getSquareValue(7) == '') {
        $square.eq(6).text(player02Id);
    } else if (getSquareValue(3) == player01Id && getSquareValue(6) == player01Id && getSquareValue(9) == '') {
        $square.eq(8).text(player02Id);
    } else if (getSquareValue(4) == player01Id && getSquareValue(5) == player01Id && getSquareValue(6) == '') {
        $square.eq(5).text(player02Id);
    } else if (getSquareValue(5) == player01Id && getSquareValue(6) == player01Id && getSquareValue(4) == '') {
        $square.eq(3).text(player02Id);
    } else if (getSquareValue(2) == player01Id && getSquareValue(5) == player01Id && getSquareValue(8) == '') {
        $square.eq(7).text(player02Id);
    } else if (getSquareValue(5) == player01Id && getSquareValue(8) == player01Id && getSquareValue(2) == '') {
        $square.eq(1).text(player02Id);
    } else if (getSquareValue(4) == player01Id && getSquareValue(7) == player01Id && getSquareValue(1) == '') {
        $square.eq(0).text(player02Id);
    } else if (getSquareValue(5) == player01Id && getSquareValue(7) == player01Id && getSquareValue(3) == '') {
        $square.eq(2).text(player02Id);
    } else if (getSquareValue(7) == player01Id && getSquareValue(8) == player01Id && getSquareValue(9) == '') {
        $square.eq(8).text(player02Id);
    } else if (getSquareValue(8) == player01Id && getSquareValue(9) == player01Id && getSquareValue(7) == '') {
        $square.eq(6).text(player02Id);
    } else if (getSquareValue(5) == player01Id && getSquareValue(9) == player01Id && getSquareValue(1) == '') {
        $square.eq(0).text(player02Id);
    } else if (getSquareValue(6) == player01Id && getSquareValue(9) == player01Id && getSquareValue(3) == '') {
        $square.eq(2).text(player02Id);
    } else if (getSquareValue(3) == player01Id && getSquareValue(9) == player01Id && getSquareValue(6) == '') {
        $square.eq(5).text(player02Id);
    } else if (getSquareValue(1) == player01Id && getSquareValue(7) == player01Id && getSquareValue(4) == '') {
        $square.eq(3).text(player02Id);
    } else if (getSquareValue(1) == player01Id && getSquareValue(3) == player01Id && getSquareValue(2) == '') {
        $square.eq(1).text(player02Id);
    } else if (getSquareValue(7) == player01Id && getSquareValue(9) == player01Id && getSquareValue(8) == '') {
        $square.eq(7).text(player02Id);
    }
    // random square 
    else {
        if (getSquareValue(2) == '') {
            $square.eq(1).text(player02Id);
        } else if (getSquareValue(3) == '') {
            $square.eq(2).text(player02Id);
        } else if (getSquareValue(4) == '') {
            $square.eq(3).text(player02Id);
        } else if (getSquareValue(5) == '') {
            $square.eq(4).text(player02Id);
        } else if (getSquareValue(6) == '') {
            $square.eq(5).text(player02Id);
        } else if (getSquareValue(7) == '') {
            $square.eq(6).text(player02Id);
        } else if (getSquareValue(8) == '') {
            $square.eq(7).text(player02Id);
        } else if (getSquareValue(9) == '') {
            $square.eq(8).text(player02Id);
        }
    }
}


function switchTurnAi() {
    if (checkWin(player01Id)) {
        swal(player01Id + "Won!");
        document.turn = player01Id
        document.winner = document.turn;
        score[0]++;
        $player01Score.text(score[0])
    } else if (checkWin(player02Id)) {
        // swal(player02Id + "Won!");
        swal({
            title: "I win",
            icon: '../tenor.gif',

        });
        document.turn = player02Id
        document.winner = document.turn;
        score[1]++;
        $player02Score.text(score[1])

    }
    // else {
    //     if (document.turn == player01Id) {
    //         document.turn = player02Id;

    //     } else {
    //         document.turn = player01Id;

    //     }
    //     if (document.numberOfMoves != 9) {
    //         // $message.text('It\'s ' + document.turn + ' turn')
    //     }
    // }
}


