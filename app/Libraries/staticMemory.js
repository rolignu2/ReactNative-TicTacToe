
export class StaticMemory  {

    static defaultGameOptions = {
        gameTypes : {
            name        : "Difficulty Level",
            types       : [
                {
                    name    : 'Clasic game',
                    order   : 3 ,
                    default : true 
                }
            ]
        },
        theme :{
            name   : "Theme",
            types  : [
                {
                    name        : 'DayTime',
                    color       : 'white',
                    back        : 'black',
                    opacity     : .9,
                    default     : true 
                },
                {
                    name        : 'Dark',
                    color       : 'black',
                    back        : 'white',
                    opacity     : .9,
                    default     : false  
                },
                {
                    name        : 'Blue',
                    color       : '#1c1570',
                    back        : 'white',
                    opacity     : .9,
                    default     : false  
                }
            ]
        },
        game  : {
            status :{
                active : true ,
                board  : [],
                winner : {
                    symbol : "",
                    tie    : false 
                }
            } ,
            p1 : {
                name        : "Player 1",
                score       : 0 ,
                symbol      : "X",
                date        : new Date(),
                moves       : [],
            },
            p2 : {
                name        : "Player 2",
                score       : 0 ,
                symbol      : "0",
                date        : new Date(),
                moves       : [],
            }
        }
    }

    static currentGame = {
         existGame      : false,
         gameData       : null 
    }

    static currentOptions = {
         theme          : null ,
         type           : null 
    }

    static setCurrentOptions = (type , theme )=>{
        if (type !== null  && theme !== null) 
            StaticMemory.currentOptions = { type , theme  };
        else {
            if (type !== null)  StaticMemory.currentOptions.type = type;
            if (theme !== null )  StaticMemory.currentOptions.theme = theme;
        }
    }

    static setCurrentTheme  = (theme) =>{
        StaticMemory.currentOptions.theme =  theme ;
    }

    static setCurrentGameType = (type) =>{
        StaticMemory.currentOptions.type=  type ;
    }

    static setCurrentGame = (game)=>{
        StaticMemory.currentGame.existGame  = true;
        StaticMemory.currentGame.gameData   = game;
    }

    static getCurrentGame = ()=>{
        return StaticMemory.currentGame ;
    }

    static getCurrentOptions = () =>{ return StaticMemory.currentOptions; }

}