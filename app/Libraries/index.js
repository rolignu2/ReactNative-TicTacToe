
class TicSolve {

    static gameStatus = {
         INCOMPLETE : 0 ,
         COMPLETE   : 1 ,
         TIE        : 2 ,
    }

    static getResult = ( board , symbol , order = 3 )=>{

        const moves     = TicSolve._countMoves(board);

        let   result    = {
            status      : TicSolve.INCOMPLETE,
            winning     : symbol,
            winningLine : []
        };

        if (moves < 5 ) return result;

        let line;
        let i = 0 ;

        // check diagonal winner
        for (i = 0 ; i < order ; i++){
            line = board[i].join('');
            if (TicSolve._verifyLine(line , symbol)){
                result.status           = TicSolve.COMPLETE;
                result.winningLine      = [[i,0], [i,1], [i,2]];
                return result;
            }
        }

        
        for (let i = 0 ; i < order ; i++){
            let column = [board[0][j],board[1][j],board[2][j]];
            line       = column.join('');
            if (TicSolve._verifyLine(line , symbol)){
                result.status           = TicSolve.COMPLETE;
                result.winningLine      = [[0,j], [1,j], [2,j]];
                return result
            }
        }

        let d1  = [board[0][0],board[1][1],board[2][2]];
        line    = d1.join('');

        if (TicSolve._verifyLine(line , symbol)){
            result.status           = TicSolve.COMPLETE;
            result.winningLine      = [[0,0], [1,1], [2,2]] ;
            return result
        }

        let d2  = [board[0][2],board[1][1],board[2][0]];
        line    = d2.join('');

        if (TicSolve._verifyLine(line , symbol)){
            result.status           = TicSolve.COMPLETE;
            result.winningLine      = [[0,2], [1,1], [2,0]];
            return result
        }


        if (moveCount(board) === Math.pow(order , 2)){
            result.status           = TicSolve.COMPLETE;
            result.winningLine      = [[0,2], [1,1], [2,0]];
            return result;
        }

        return result;

    }

    static createMove = (board , symbol , col , row )=>{
       
    }

    static _countMoves = (board) => {

        let count = 0 ;

        for (let i = 0; i<board.length; i++){
            for (let j = 0 ; j<board[i].length ; j++){
              if (board[i][j]!=""){
                count++
              }
            }
        }

        return count;
    }

    static _verifyLine = (line , symbol) =>{
        return line === symbol.repeat(3)
    }


}