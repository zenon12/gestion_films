
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
        collectionMovie.displayMovies(collectionMovie.getDataByGenre(genre),moviesContent) ;
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
       // moviesItems.classList.add("list-details","movies","flex","jcsb","wrap");
       container.innerHTML="" ;
       const formContainer=collectionMovie.createElt("div","form-container") ;
       const moviesItems=collectionMovie.createElt("div","list-details movies flex jcsb wrap");
       collectionMovie.displayMovies(movies,moviesItems) ;
       container.appendChild(moviesItems) ;
       container.appendChild(formContainer) ;
    },
    addMovieOnContainer:(movies)=>{
        const moviesItems=document.createElement("div") ;
        moviesItems.className="list-details movies flex jcsb wrap" ;
        // container.innerHTML="" ;
        // movies.forEach(movieData => {
        //     let movie=`
        //        <div class="movies-item flex gap-10 mb-20">
        //                 <div class="movie-image">
        //                     <img src="${movieData.image}" alt="${movieData.title}">
        //                 </div>
        //                 <div class="movie-description">
        //                     <div class="movie-name">
        //                       ${movieData.title}
        //                     </div>
        //                     <div class="list-info mb-10">
        //                         <ul class="unlisted flex gap-10">
        //                             <li class="list-item">${movieData.year}</li>
        //                             <li class="list-item">18+</li>
        //                             <li class="list-item">${(movieData.genre)[0]}</li>
        //                             <li class="list-item">22mn</li>
        //                         </ul>
        //                     </div>
        //                     <div class="movie-details mb-10">
        //                       ${movieData.description}
        //                     </div>
        //                     <div class="director mb-10">
        //                         <strong>Realisateur : </strong>${movieData.director}
        //                     </div>
        //                     <div class="inline-group flex gap-20 mt-15">
        //                         <div class="btn-play btn">
        //                             play
        //                         </div>
        //                         <div class="time btn">
        //                             Info
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //     ` ;
        //     moviesItems.innerHTML+=movie ;
        // });
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
    displayFileImage:()=>{
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
        const data=JSON.parse(localStorage.getItem("data")) ;
        let search=ev.target.value ;
        let filterTab=[] ;
        let i=0 ;
        let tampon
        if (search=="") {
            return ;
        }
        for (const genreMovie in data){
            const movies=data[genreMovie] ;
            if (filterMovie=="year") {
                tampon=movies.filter((movie)=>listenerFunction.filterByYear(movie,search)) ;
            }
            if (filterMovie=="title") {
                tampon=movies.filter((movie)=>listenerFunction.filterByTitle(movie,search)) ;
            }
            if (filterMovie=="director") {
                tampon=movies.filter((movie)=>listenerFunction.filterByDirector(movie,search)) ;
            }
            if (tampon.length !==0) {
                tampon.forEach(element => {
                    filterTab[i]=element ;
                    i++ ;
                });
            }
        }
        if (filterTab.length==0) {
            let error=`<h1 class="error">Film introuvable!</h1>`;
            container.innerHTML=error ;
            return ;
        }
        // collectionMovie.displayMovies(filterTab) ;
        container.innerHTML="" ;
        const formContainer=collectionMovie.createElt("div","form-container") ;
        const moviesItems=collectionMovie.createElt("div","list-details movies flex jcsb wrap");
        collectionMovie.displayMovies(filterTab,moviesItems) ;
        container.appendChild(moviesItems) ;
        container.appendChild(formContainer) ;
    },
    filterByTitle:({title},search)=>{
        title=title.toLowerCase() ;
        search=(search.trim()).toLowerCase() ;
        return title.includes(search) ;
    },
    filterByDirector:({director},search)=>{
        director=director.toLowerCase() ;
        search=(search.trim()).toLowerCase() ;
        return director.includes(search) ;
    },
    filterByYear:({year},searchYear)=>{
        if (year==searchYear) {
            return true  ;
        }else{
            return false ;
        }
    },
    displayFilters:(ev)=>{
        filterContent.classList.remove("none") ;
    },
    closedFilters:(ev)=>{
        filterContent.classList.add("none") ;
    },
    handleFilters:(ev)=>{
        filterMovie=ev.target.textContent ;
        listFilters.forEach(element => {
            element.style.backgroundColor="" ;
        });
        ev.target.style.backgroundColor="#00ffff" ;

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
    inputFile?  inputFile.onchange=listenerFunction.displayFileImage:null ;
    //Cette événement me permet de fermer le poppup update form 
    //et de gerer la mise à jour 
    document.addEventListener("click",(ev)=>{
        //element.matches(),permet de comparer la classe de l'element et la classe donné en paramètre
        if(ev.target.matches(".danger")) {
            const updateForm=document.querySelector(".add-movie-form.update-form") ;
            ev.preventDefault() ;
            if(updateForm) {
                updateForm.remove();
            }
        }
        if (ev.target.matches(".btn-submit")) {
            ev.preventDefault() ;
            const updateForm=document.querySelector(".add-movie-form.update-form") ;
            updateForm.remove();
            alert("votre film a été modifier avec succes")
        }
        //Gestion de la suppression d'un film 
        if (ev.target.matches(".fas.fa-times")) {
            let closedParent=ev.target.parentNode ;
            let movie=closedParent.parentNode ;
            if (movie.classList.contains("movies-item")) {
                movie.remove() ;
            }
        }
    })
    //la gestion de la recherche et du filtrage 
    searchInput? searchInput.onclick=listenerFunction.displayFilters:null ;
    searchInput? searchInput.onchange=listenerFunction.filterMovies:null ;
    listFilters.forEach(filter => {
        filter? filter.onclick=listenerFunction.handleFilters:null ;
    });
    closedFilter? closedFilter.onclick=listenerFunction.closedFilters:null ;
}