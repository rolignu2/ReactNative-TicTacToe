import Storage                  from 'react-native-storage';
import { AsyncStorage }         from 'react-native';
import { StaticMemory } from './staticMemory';

export default class TicTacStorage  {

    static getInstance = ()=>{
        global.storage = new Storage({
            size                : 3000,
            storageBackend      : AsyncStorage,
            defaultExpires      : 1000 * 3600 * 720,
            enableCache         : true,
            sync                : {}
        });
    }

    constructor (){
        this.storageKeys = {
            gameOptions         : "gameOPtions",
            gameHistory         : "gameHis",
            game                : "currentGame"
        }
    }


    verifyStorage = ( callback =()=>{}) =>{
       Promise.all([
            storage.getAllDataForKey(this.storageKeys.gameOptions),
            storage.getAllDataForKey(this.storageKeys.game)
       ]).then( values =>{
             if (values instanceof Array){
                 if(values[0].length === 0){ // for exists game options 
                     const options = StaticMemory.defaultGameOptions;
                     this.setGameOptions( options.gameTypes.types[0], options.theme.types[0]);
                 }else {
                     const storageOptions = values[0][0];
                     StaticMemory.setCurrentOptions(storageOptions.type , storageOptions.theme);
                 }

                 if (values[1].length !== 0){ // for exists current game 
                     StaticMemory.currentGame.existGame = true ;
                 }else {

                 }
             }
             callback(true)
       });
    }

    getGameOptions = ( callback = ()=>{}  )=>{
        storage.getAllDataForKey(this.storageKeys.gameOptions).then( values =>{
              if ( values instanceof Array )
                if (values.length !== 0) {
                    callback( { status : true , value : values[0] } )
                    return;
                }
            
            callback({ status : false , value : null  })
        });
    }

    setGameOptions = ( gameType ={} , gameTheme ={} )=>{
        StaticMemory.setCurrentOptions(gameType , gameTheme);
        global.storage.save({
            key         : this.storageKeys.gameOptions,
            id          : 'G001',
            data        : {
                type    : gameType ,
                theme   : gameTheme
            }
        });
    }



}