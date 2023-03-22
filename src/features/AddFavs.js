
export const addRevoveFav = e =>{

    const favMovies = localStorage.getItem('favs')
    let tempMovies;
    if(!favMovies){
        tempMovies = []
    }else{
        tempMovies = JSON.parse(favMovies)
    }

    const movieData = {
        description: e.description,
        id:e.id,
        imgUrl: e.imgUrl,
        title: e.title
      }
      let isMovieInFavs = tempMovies.filter( fav => {
        return fav.id === e.id
      } )
  
      if (isMovieInFavs.length === 0){
        tempMovies.push(movieData)      
      }else {
        tempMovies = tempMovies.filter( fav=> {
          return fav.id !== movieData.id
        } )
      }    
      localStorage.setItem('favs', JSON.stringify(tempMovies))     
            
}