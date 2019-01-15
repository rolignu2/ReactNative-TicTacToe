
export class TicSolve {

    static gameStatus = {
         INCOMPLETE : 0 ,
         WINNER     : 1 ,
         TIE        : 2 ,
    }

    static getResult = ( board , symbol , order = 3 )=>{


        const moves     = TicSolve._countMoves(board);

        let   result    = {
            status      : TicSolve.gameStatus.INCOMPLETE,
            winning     : symbol,
            winningLine : []
        };

        if (moves < 5 ) return result;

        let line;
        let i = 0 ;

        for (i = 0 ; i < order ; i++){
            line = board[i].join('');
            if (TicSolve._verifyLine(line , symbol)){
                result.status           = TicSolve.gameStatus.WINNER;
                result.winningLine      = [[i,0], [i,1], [i,2]];
                return result;
            }
        }

        
        for (let i = 0 ; i < order ; i++){
            let column = [board[0][i],board[1][i],board[2][i]];
            line       = column.join('');
            if (TicSolve._verifyLine(line , symbol)){
                result.status           = TicSolve.gameStatus.WINNER;
                result.winningLine      = [[0,i], [1,i], [2,i]];
                return result
            }
        }

        let d1  = [board[0][0],board[1][1],board[2][2]];
        line    = d1.join('');

        if (TicSolve._verifyLine(line , symbol)){
            result.status           = TicSolve.gameStatus.WINNER;
            result.winningLine      = [[0,0], [1,1], [2,2]] ;
            return result
        }

        let d2  = [board[0][2],board[1][1],board[2][0]];
        line    = d2.join('');

        if (TicSolve._verifyLine(line , symbol)){
            result.status           = TicSolve.gameStatus.WINNER;
            result.winningLine      = [[0,2], [1,1], [2,0]];
            return result
        }

        if (TicSolve._countMoves(board) === Math.pow(order , 2)){
            result.status           = TicSolve.gameStatus.TIE;
            result.winningLine      = [];
            return result;
        }

        return result;

    }

    static _countMoves = (board) => {

        let count = 0 ;

        for (let i = 0; i<board.length; i++){
            for (let j = 0 ; j<board[i].length ; j++){
              if (board[i][j]  !== ""){
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