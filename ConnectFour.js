$("#bt").fadeOut("fast"); //hide Refresh buttom
// Getting players names:
// palyerOne = Blue
var palyer1 = prompt("Player One: Enter Your Name , you will be Blue");
var palyer1Color = 'rgb(86, 151, 255)'; //this format becouse we use jjou to change the color in this format

var palyer2 = prompt("Player Two: Enter Your Name, you will be Red");
var palyer2Color = 'rgb(237, 45, 73)';// palyerTwo = Red

var table = $('table tr'); // get rows:
// var game_on = true;

var curruntPlayer = 1; //first player is 1
var currentName = palyer1; // set first player namr
var cureentColour = palyer1Color; // set first player color
// console.log("the " + cureentColour) //test

//ask player one to start playing:
$("h3").text(palyer1 + ": it is your turn, please pick a column to drop your blue chip.");
//checking for clicks:
$('.board button').on('click', function () {
    var col = $(this).closest('td').index(); //which col was clicked
    // console.log("the " + col);  //test
    var avaiaboBottom = checkBottom(col); // get the row by checking the bottom available,,
    // console.log("the " + avaiaboBottom);  //test
    // console.log("the " + cureentColour);  //test
    changeColor(avaiaboBottom, col, cureentColour); //apply player move

    //check for win:
    if (horizWinCheck() || verticWinCheck() || diagWinCheck()) {
        $('h1').text(currentName + " has won!").css(winEfeect)
        $("h2").text("Refresh your browser to play again!").css("fontSize", "25px");
        $("h3").fadeOut('fast');
        // SHOW Refresh buttom:
        $("#bt").fadeIn("fast").on('click', function () {
            window.location.reload("Refresh")
        })
    }

    //in case of NO WIN: Continue!!
    // change player:
    curruntPlayer = curruntPlayer * -1;

    if (curruntPlayer === 1) {
        currentName = palyer1; // set first player namr
        cureentColour = palyer1Color; // set first player color;
        $("h3").text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
    } else {
        currentName = palyer2; // set first player namr
        cureentColour = palyer2Color; // set first player color
        $("h3").text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
    }

})


// js object hold the css effevt for winner:
var winEfeect = {
    "fontSize": "70px",
    "color": getRandomColor()
}

//to generate rondom colors:
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// find the cell color:
function returColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// change the cell color:
function changeColor(rowIndex, colIndex, color) {
    // console.log(color)
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// check col bottom:
// it takes a col and return its buttom: means we look for first gray avialble..
function checkBottom(colIndex) { //takes the col we looking for its bottom
    var colorReport = returColor(5, colIndex); //returColor(rowIndex, colIndex) -- 5? we start checking from the bottom
    for (let row = 5; row > -1; row--) {
        colorReport = returColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)') { //if it's gray means this the bottom
            return row
        }
    }
}

// // color match check: looking for 4 matches..
// // four same color cells not gray and not undefined
function colorMatch(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// // announce winer horizantally:
// //checkes 4 same color in horia 6 rows * 4 checks
function horizWinCheck() {
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (colorMatch( // colorMatch(takes 4 parameters)
                returColor(r, c),     // check one === one
                returColor(r, c + 1), // check one === two
                returColor(r, c + 2), // check one === three
                returColor(r, c + 3) // check one === four
            )) {
                console.log("horizo win");
                winReport(r, c); // winnig annouc
                return true;
            }

            else {
                continue;
            }
        }
    }
}

// // announce winer vertically:
// //checkes 4 same color in vertical 7 cols * 3 checks
function verticWinCheck() {
    for (let c = 0; c < 7; c++) {
        for (let r = 0; r < 3; r++) {
            if (colorMatch( // colorMatch(takes 4 parameters)
                returColor(r, c),     // check one === one
                returColor(r + 1, c), // check one === two
                returColor(r + 2, c), // check one === three
                returColor(r + 3, c) // check one === four
            )) {
                console.log("vertical win");
                winReport(r, c); // winnig annouc
                return true;
            } else {
                continue;
            }
        }
    }
}

// // announce winer Diagonal:
// //checkes 4 same color in Diagonal 5 cols * 7 checks
function diagWinCheck() {
    for (let c = 0; c < 5; c++) {
        for (let r = 0; r < 7; r++) {
            if (colorMatch( // colorMatch(takes 4 parameters)
                returColor(r, c),
                returColor(r + 1, c + 1),
                returColor(r + 2, c + 2),
                returColor(r + 3, c + 3)
            )) {
                console.log("Diagonal win");
                winReport(r, c); // winnig annouc
                return true;
            } else if (colorMatch( // colorMatch(takes 4 parameters)
                returColor(r, c),
                returColor(r - 1, c + 1),
                returColor(r - 2, c + 2),
                returColor(r - 3, c + 3)
            )) {
                console.log("Diagonal win");
                winReport(r, c); // winnig annouc
                return true;
            }

            else {
                continue;
            }
        }
    }
}

// // to get the win game details:
function winReport(rowNum, colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}