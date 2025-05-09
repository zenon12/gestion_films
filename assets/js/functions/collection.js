
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
    displayMovies:(movies)=>{
        if (!moviesContent) {
            return ;
        }
        moviesContent.innerHTML="" ;
        movies.forEach(movieData => {
            let img=collectionMovie.createElt("img") ;
            img.src=movieData.image ;
            img.alt=movieData.title ;
            let btnPlay=collectionMovie.createElt("div","btn-play btn",[],"play") ;
            let movie=collectionMovie.createElt("div","movies-item flex gap-10 mb-20",[
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
                    collectionMovie.createElt("div","inline-group flex gap-20 mt-15",[
                        btnPlay,
                        collectionMovie.createElt("div","time btn",[],"45mn")
                    ])
                ])
            ])
            moviesContent.appendChild(movie) ;
            btnPlay.onclick=()=>{
                collectionMovie.createPoppup(movieData)
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
        poppup.style.display="none" ;
     }
    },
    /**Cette function permet de creer un element node et ses fils */
    createElt(elt,eltClass,contentNode=[],textContent=''){
    const eltNode=document.createElement(elt) ;
    eltClass? eltNode.className=eltClass : null ;
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




