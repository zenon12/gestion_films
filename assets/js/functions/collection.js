
export const collectionMovie={
    /** Cette function permet de recuperer les données en local sous format json */
    getData:async(API)=>{
        if (localStorage.getItem("data")==null) {
            let response=await fetch(API) ;
            if (response.ok) {
                let data=(await response.json())[0] ;
                localStorage.setItem("data",JSON.stringify(data)) ;
            }
        }
    },
    /** Cette fonction permet de recuperer un element du tableau apartir d'un ID 
      * et d'un tableau données en parametre
    */
    getMovie:(id,movies)=>{
        return (movies.filter(movie => movie.id==id))[0] ;
    },
    /** Cette fonction nous permet d'afficher les films 
     * elle reçoit le tableau de film en parametre
    */
    displayMovies:(movies,movieContainer)=>{
        if (!movieContainer) {
            return ;
        }
        movieContainer.innerHTML="" ;
        movies.forEach(movieData => {
            let img=collectionMovie.createElt("img") ;
            img.src=movieData.image ;
            img.alt=movieData.title ;
            let btnPlay=collectionMovie.createElt("div","btn-play btn",[],"play") ;
            let update=collectionMovie.createElt("div","update btn",[],"edit") ;
            let movie=collectionMovie.createElt("div","movies-item relative flex gap-10 mb-20",[
                collectionMovie.createElt("div","delete-movie absolute",[
                    collectionMovie.createElt("i","fas fa-times")
                ]),
                collectionMovie.createElt("div","movie-image",[img]),
                collectionMovie.createElt("div","movie-description",[
                    collectionMovie.createElt("div","movie-name",[],movieData.title),
                    collectionMovie.createElt("div","list-info mb-10",[
                        collectionMovie.createElt("ul","unlisted flex gap-10",[
                            collectionMovie.createElt("li","list-item",[],movieData.year),
                            collectionMovie.createElt("li","list-item",[],"18+"),
                            collectionMovie.createElt("li","list-item",[],(movieData.genre)[0])
                        ])
                    ]),
                    collectionMovie.createElt("div","movie-details mb-10",[],movieData.description),
                    collectionMovie.createElt("div","director mb-10",[
                        collectionMovie.createElt("strong","",[],"Realisateur : ")
                    ],movieData.director),
                    collectionMovie.createElt("div","inline-group flex gap-20 mt-15",[btnPlay,update])
                ])
            ])
            movieContainer.appendChild(movie) ;
            btnPlay.onclick=()=>{
                collectionMovie.createPoppup(movieData) ;
            }
            update.onclick=()=>{
                collectionMovie.updateMovie(movieData) ;
            }        
        });
    },
    /**Cette fonction permet de recuperer les données en fonction d'un genre données 
     * en parametre
     */
    getDataByGenre:(categorie)=>{
        const data=JSON.parse(localStorage.getItem("data")) ;
        for (const genre in data) {
           if (genre==categorie) {
              return data[genre] ;
           }
        }
    },
    /** Cette fonction permet d'avoir un poppup */
    createPoppup:(movieData)=>{
    let source=collectionMovie.createElt("source") ;
    source.src="" ;
    source.type="" ;
    let video=collectionMovie.createElt("video","",[source]) ;
    video.controls=true ;
    let poppup=collectionMovie.createElt("div","poppup fixed",[
        collectionMovie.createElt("div","poppup-content",[
            collectionMovie.createElt("div","poppup-ulistration",[
                video
            ])
        ])
     ])
     container.appendChild(poppup) ;
     poppup.onclick=()=>{
        poppup.remove() ;
     }
    },
    // updateMovie:(movieData)=>{
    // let source=collectionMovie.createElt("source") ;
    // source.src="" ;
    // source.type="" ;
    // let video=collectionMovie.createElt("video","",[source]) ;
    // video.controls=true ;
    // let poppup=collectionMovie.createElt("div","poppup fixed",[
    //     collectionMovie.createElt("div","add-movie-form",[
    //         collectionMovie.createElt("form","update-form",[
    //             collectionMovie.createElt("div","form-title",[
    //                 collectionMovie.createElt("h2","",[],"Modifier le film")
    //             ]),
    //             collectionMovie.createElt("div","form-inline",[
    //                 collectionMovie.createElt("input","")
    //             ])
    //         ])
    //     ])
    //  ])
    //  container.appendChild(poppup) ;
    //  poppup.onclick=()=>{
    //     poppup.style.display="none" ;
    //  }
    // },
    updateMovie:(movieData)=>{
       let poppup=`
       <div class="add-movie-form update-form poppup fixed flex jcc">
            <div class="update-content flex jcc">
                <form action="" method="post" id="add-movie-form" enctype="multipart/form-data">
                    <div class="form-title">
                        <h2>Modifier le film</h2>
                        <div class="form-inline">
                            <label for="movie_name">Nom du film</label>
                            <input type="text" name="title" value="${movieData.title}" id="movie_name">
                        </div>
                        <div class="form-inline">
                            <label for="year">Année de publication</label>
                            <input type="number" name="year" value="${movieData.year}" id="year">
                        </div>
                        <div class="form-inline">
                            <label for="genre">Genre</label>
                            <select name="genre" id="genre">
                                <option value="action">action</option>
                                <option value="drame">drame</option>
                                <option value="fantastique">fantastique</option>
                                <option value="shonen">shonen</option>
                                <option value="romance">romance</option>
                                <option value="science fiction">science fiction</option>
                            </select>
                        </div>
                        <div class="form-inline">
                            <label for="director">Nom du realisateur</label>
                            <input type="text" name="director" value="${movieData.director}" id="director">
                        </div>
                        <div class="form-inline">
                            <label for="image">Image du film</label>
                            <div class="form-file-ulistration">
                               <img src="${movieData.image}" alt="" width="250" height="210">
                            </div>
                            <input type="file" name="image" id="image" accept=".jpeg,.png,.jpg">
                        </div>
                        <div class="form-inline">
                            <label for="description">Description du film</label>
                            <textarea name="description" id="description" cols="30" rows="10">${movieData.description}</textarea>
                        </div>
                        <div class="form-inline btn-group">
                            <button type="submit" id="btn-submit" class="btn-submit">Modifier</button>
                            <button type="reset" id="btn-cancel" class="danger">Annuler</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
       `;
       if (updateContainer) {
          updateContainer.innerHTML=poppup ;
       }
    // container.innerHTML+=poppup  le innerHTML supprimer les evenements deja definie
    },
    /**Cette function permet de creer un element node et ses fils */
    createElt(elt,eltClass,contentNode=[],textContent='',inputValue=""){
    const eltNode=document.createElement(elt) ;
    eltClass? eltNode.className=eltClass : null ;
    if (inputValue!=="") {
        eltNode.value=inputValue ;
    }
    if (contentNode.length !==0) {
        contentNode.forEach(childNode => {
            eltNode.appendChild(childNode) ;
        });
    }
    if (textContent!=='') {
       eltNode.appendChild(document.createTextNode(textContent)) ;
    }
      return eltNode ;
   }

}




