const STARTED=0;
const ENDED=1;

const playerSpan=document.getElementById("player");

const gameTable=document.getElementById("game");

const game={

    turn:'X',
    state:STARTED,
    move:0
}
function endGame(winner) {
    if (winner) {
        alert('Game Over | Winner = ' + winner)
    } else {
        alert('Game Over | Draw')
    }
    game.state = ENDED
}
function restart() {
    if (Math.random() > 0.5) game.turn = 'O'
    else game.turn = 'X'

    game.state = STARTED
    game.move = 0

    Array.from(document.getElementsByTagName('td')).forEach(cell => {
        cell.textContent = ''
    })
}
function nextTurn()
{
    if(game.state==ENDED)
    {
        return ;
    }
    game.move++;
    if(game.turn=='X')
    game.turn='O';
    else{
        game.turn='X';    
    }
    playerSpan.textContent=game.turn;
  //  console.log(playerSpan);
  if(game.move==9)
  {
    endGame();
  }
    
}
function isSeqCaptured(arrayOf3Cells) {
    let winnningCombo = game.turn + game.turn + game.turn
    if (arrayOf3Cells.map(i => i.textContent).join('') === winnningCombo) {
        endGame(game.turn)
    }
}

function isRowCapture(row)
{
    let tableRow=Array.from(gameTable.children[0].children[row-1].children);

    

     isSeqCaptured(tableRow);

}

function isColCapture(col)
{
    let tableCol=[
        gameTable.children[0].children[0].children[col-1],
        gameTable.children[0].children[1].children[col-1],
        gameTable.children[0].children[2].children[col-1]
   
    ]
 
     

  isSeqCaptured(tableCol);
    
}
function isDiaCapture(row, col) {
    if (row !== col && (row + col) !== 4) return;
    let diag1 = [
        gameTable.children[0].children[0].children[0],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[2]
    ]
    let diag2 = [
        gameTable.children[0].children[0].children[2],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[0]
    ]
    isSeqCaptured(diag1)
    isSeqCaptured(diag2)


}


function boxClicked(row,col){

    //console.log(row,col);
    let clickedBox =gameTable.children[0].children[row-1].children[col-1];
    clickedBox.textContent=game.turn;

    isRowCapture(row)
    isColCapture(col)
    isDiaCapture(row,col)
    nextTurn();
    
}