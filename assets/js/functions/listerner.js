
/** les gestionnaires d'abonnément */

import { collectionMovie } from "./collection.js";

const listenerFunction={
    displaySubNav:()=>{
        subNav.classList.toggle("none") ;
    },
    /**Cette fonction permet de rendre interactive la page list */
    handleListPage:(ev)=>{
        let element=ev.target ;
        let genre=ev.target.textContent ;
        collectionMovie.displayMovies(collectionMovie.getDataByGenre(genre)) ;
        listenerFunction.removeActive() ;
        element.classList.add("active") ;
    },
    removeActive:()=>{
        genres.forEach(genre => {
            genre.classList.remove("active") ;
        });
    },
    handleSubNav:(ev)=>{
        let genre=ev.target.textContent ;
        let movies=collectionMovie.getDataByGenre(genre) ;
        const moviesItems=document.createElement("div") ;
       // moviesItems.classList.add("list-details","movies","flex","jcsb","wrap");
        moviesItems.className="list-details movies flex jcsb wrap" ;
        container.innerHTML="" ;
        movies.forEach(movieData => {
            let movie=`
               <div class="movies-item flex gap-10 mb-20">
                        <div class="movie-image">
                            <img src="${movieData.image}" alt="${movieData.title}">
                        </div>
                        <div class="movie-description">
                            <div class="movie-name">
                              ${movieData.title}
                            </div>
                            <div class="list-info mb-10">
                                <ul class="unlisted flex gap-10">
                                    <li class="list-item">${movieData.year}</li>
                                    <li class="list-item">18+</li>
                                    <li class="list-item">${(movieData.genre)[0]}</li>
                                    <li class="list-item">22mn</li>
                                </ul>
                            </div>
                            <div class="movie-details mb-10">
                              ${movieData.description}
                            </div>
                            <div class="director mb-10">
                                <strong>Realisateur : </strong>${movieData.director}
                            </div>
                            <div class="inline-group flex gap-20 mt-15">
                                <div class="btn-play btn">
                                    play
                                </div>
                                <div class="time btn">
                                    Info
                                </div>
                            </div>
                        </div>
                    </div>
            ` ;
            moviesItems.innerHTML+=movie ;
        });
        container.appendChild(moviesItems) ;
    },
    toggleDisplayMobile:()=>{
        menuMobile.classList.toggle("none") ;
    },
    managerMenuMobile: ()=>{
        if (menuMobile && menuMobile.style.display === "none") {
            menuMobile.style.display="block" ;
            menuMobile.classList.add("rightToleft");
        }else if (menuMobile){
            menuMobile.classList.add("leftToright");
            setTimeout(()=>{
                menuMobile.style.display="none" ;
                menuMobile.classList.remove("rightToleft");
                menuMobile.classList.remove("leftToright");
           },1200) ;
        }
    },
    managerForm:(ev)=>{
        ev.preventDefault() ;
        const formData=new FormData(form) ;
        //Envoi des données au serveur avec la fonction fetch() ;
        alert("votre film a été ajouter avec succes")
        form.reset() ;
        fileContent.innerHTML="" ;
    },
    dispalayFileImage:()=>{
        const file=inputFile.files[0] ;
        let reader=new FileReader() ;

        reader.onload=()=>{
            const img=new Image(250,210) ;
            img.src=reader.result ;
            fileContent.innerHTML="" ;
            fileContent.appendChild(img) ;
        }
        if (file) {
            reader.readAsDataURL(file) ;
        }
    },
    filterMovies:(ev)=>{
        console.log("recherche");
    }
}



/** La mise en place des abonnéments */

export const setUpListener=()=>{
    categorie?categorie.onclick=listenerFunction.displaySubNav:null ;
    subNav?subNav.onmouseleave=listenerFunction.displaySubNav:null ;
    if (genres && genres.length!==0) {
        genres.forEach(genre => {
            genre?genre.onclick=listenerFunction.handleListPage:null ;
        });
    }
    subNavCategories.forEach(subNavCategorie => {
        subNavCategorie.onclick=listenerFunction.handleSubNav ;
    });
    collapse? collapse.onclick=listenerFunction.managerMenuMobile:null ;
    //ajout de film via un formulaire 
    btnForm?  btnForm.onclick=listenerFunction.managerForm:null ;
    //affichage de l'image ajouter au niveau de la page d'ajout
    inputFile?  inputFile.onchange=listenerFunction.dispalayFileImage:null ;
    //Cette événement me permet de fermer le poppup update form 
    //et de gerer la mise à jour 
    document.addEventListener("click",(ev)=>{
        ev.preventDefault() ;
        //element.matches(),permet de comparer la classe de l'element et la classe donné en paramètre
        if(ev.target.matches(".danger")) {
            const updateForm=document.querySelector(".add-movie-form.update-form") ;
            if(updateForm) {
                updateForm.remove();
            }
        }
        if (ev.target.matches(".btn-submit")) {
            const updateForm=document.querySelector(".add-movie-form.update-form") ;
            updateForm.remove();
            alert("votre film a été modifier avec succes")
        }
    })
    //la gestion de la recherche et du filtrage 
    searchInput? searchInput.onchange=listenerFunction.filterMovies:null ;
}