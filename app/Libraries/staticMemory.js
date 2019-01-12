
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
                    opacity     : .9,
                    default     : true 
                },
                {
                    name        : 'Dark',
                    color       : 'black',
                    opacity     : .9,
                    default     : false  
                },
                {
                    name        : 'Blue',
                    color       : '#1c1570',
                    opacity     : .9,
                    default     : false  
                }
            ]
        }
    }

    static currentGame = {
         existGame      : false,
         gameData       : []
    }

    static currentOptions = {
         theme          : null ,
         type           : null 
    }

    static setCurrentOptions = (type , theme )=>{
        StaticMemory.currentOptions = { type , theme  };
    }

}