import HomeScreen               from "../Screens/home";
import TicNewGame               from "../Screens/game/newGame";
import TicCurrentGame           from "../Screens/game/currentGame";
import TicHistory               from "../Screens/history";


export default {
    Home : {
        screen : HomeScreen 
    },
    NewGameScreen : {
        screen : TicNewGame
    },
    CurrentGameScreen : {
        screen : TicCurrentGame
    },
    HistoryScreen : {
        screen : TicHistory
    }
}