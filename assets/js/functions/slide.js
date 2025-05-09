/**Cet objet va regrouper toutes les methodes de gestion de notre slide */

import { collectionMovie } from "./collection.js";

export const slideFunctions={
    /**Cette methode permet de creer les slides */
    createSlide:()=>{
        const data=JSON.parse(localStorage.getItem("data")) ;
        if (data==null || slidesContent==undefined) {
            return ;
        }
        slidesContent.innerHTML="" ;
        for (const genre in data) {
             let id=slideFunctions.setSlideMovie(genre) ;
             const movies=data[genre] ;
             const movie=collectionMovie.getMovie(id,movies) ;
             let slide=`
            <div class="slide-item">
                <div class="image">
                 <img src="${movie.image}" alt="Demon Slayer">
                </div>
                <div class="content absolute">
                     <div class="name mb-10">${movie.title}</div>
                     <div class="list-info mb-10">
                         <ul class="unlisted flex gap-10">
                             <li class="list-item">18+</li>
                             <li class="list-item">HD</li>
                             <li class="list-item">${movie.year}</li>
                             <li class="list-item">${movie.genre[0]}</li>
                             <li class="list-item">45mn</li>
                         </ul>
                     </div>
                     <div class="description">
                          ${movie.description}
                     </div>
                     <div class="director mt-5">
                         <strong>Realisateur : </strong>${movie.director}
                     </div>
                     <div class="ulistration-btn flex gap-20 mt-15">
                         <div class="btn-play btn">
                             play
                         </div>
                         <div class="btn-details btn">
                             45mn
                         </div>
                     </div>
                </div>
            </div>
             `;
            slidesContent.innerHTML+=slide ;
        }

    },
    /** cette methode permet de definir les films qui seront dans le slide  */
    setSlideMovie:(genre)=>{
        let id=0 ;
        if (genre=="action") {
            id=8 ;
        }
        if(genre=="drame"){
            id=18 ;
        }
        if(genre=="romance"){
            id=25 ;
        }
        if(genre=="fantastique"){
            id=42;
        }
        if(genre=="science-fiction"){
            id=50;
        }
        if(genre=="shonen"){
            id=36;
        }
        return id ;
    },
    hideSlide:(slides)=>{
        for (let index = 1; index < slides.length; index++) {
            const slide = slides[index];
            slide.style.display="none" ;
        }
    },
    handleSlide:(slides)=>{
        if (slides.length!==0) {
            let nextSlide ;
            nextSlide=(currentSlide+1)%slides.length ;
            slides[currentSlide].style.display="none" ;
            slides[nextSlide].style.display="block" ;
            slideFunctions.setClassActiveDots(nextSlide) ;
            currentSlide=nextSlide ;
        }
    },
    handleEventDots:(slides)=>{
        if (slides) {
            for (let index = 0; index < dots.length; index++){
                const dot = dots[index];
                dot.onclick=()=>{
                    slides[currentSlide].style.display="none" ;
                    slides[index].style.display="block" ;
                    slideFunctions.setClassActiveDots(index) ;
                    currentSlide=index ;
                }
                
            }
        }
    },
    setClassActiveDots:(index)=>{
        if (dots) {
            dots.forEach(dot => {
                dot.classList.remove("active") ;
            });
            dots[index].classList.add("active") ;
        }
    },
    eventBtnPlay:(btnPlays)=>{
       for (let index = 0; index < btnPlays.length; index++) {
         const btnPlay = btnPlays[index];
         btnPlay.onclick=()=>{
            collectionMovie.createPoppup() ;
         }
       }
    }
}


