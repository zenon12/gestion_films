import { collectionMovie } from "./functions/collection.js"
import { setUpListener } from "./functions/listerner.js";
import { slideFunctions } from "./functions/slide.js"

window.onload=()=>{
    collectionMovie.getData(API) ;
    collectionMovie.displayMovies(collectionMovie.getDataByGenre("action"),moviesContent) ;
    /** Les fonctions de gestion du slide*/
    slideFunctions.createSlide() ;
    const slides=document.querySelectorAll(".slide-items .slide-item") ;
    const btnPlays=document.querySelectorAll(".slide-item .btn-play") ;
    slideFunctions.eventBtnPlay(btnPlays) ;
    slideFunctions.hideSlide(slides) ;
    setInterval(()=>{
        slideFunctions.handleSlide(slides) ;
    },10000) ;
    slideFunctions.handleEventDots(slides) ;
    /** Les abonnements */
    setUpListener() ;  
}