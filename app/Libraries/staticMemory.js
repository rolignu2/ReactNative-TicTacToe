
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

    static getCurrentOptions = () =>{ return StaticMemory.currentOptions; }

}