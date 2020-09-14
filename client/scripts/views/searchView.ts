import { Movie } from '../base';
import {renderMovieAddScreen,renderMovie} from './movieView';
import {Elements} from '../base';
export const renderResults = (data: Movie[],container:HTMLDivElement,isOnline:boolean) => {
    container.innerHTML = '';

    if(isOnline){
           data.forEach((movie)=>{
                   if(movie.media_type==="movie"){
                    if (movie.poster_path === null) {
                        return;
                    }
                   if (movie.release_date === undefined) {return;}
                    const el=`<div data-id="${movie.id}" data-type="${movie.media_type}" id="open-movie-info" class="search__results--movie">
                            <img id="open-movie-info" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" height="75" width="60"/>
                            <div class="movie__stats">
                                <div class="movie__name">${movie.title}</div>
                                <div class="movie__rating">${movie.vote_average}</div>
                            </div>
                            <div data-id="${movie.id}" class="movie__addbtn">
                                <svg class="icon">
                                    <use xlink:href="assets.svg#icon-add"></use>
                                </svg>
                            </div>
                        </div>`;
                        container.insertAdjacentHTML('beforeend',el);
                      }else{
                          if (movie.poster_path === null) {
                        return;
                          }
                          if (movie.first_air_date === undefined) {return;}

                          const el=`<div data-id="${movie.id}" data-type="${movie.media_type}" id="open-movie-info" class="search__results--movie">
                                  <img id="open-movie-info" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" height="75" width="60"/>
                                  <div class="movie__stats">
                                      <div class="movie__name">${movie.name}</div>
                                      <div class="movie__rating">${movie.vote_average}</div>
                                  </div>
                                  <div data-id="${movie.id}" class="movie__addbtn">
                                      <svg class="icon">
                                          <use xlink:href="assets.svg#icon-add"></use>
                                      </svg>
                                  </div>
                              </div>`;
                              container.insertAdjacentHTML('beforeend',el);
                      }
                });

           const movieContainer=document.querySelector('.search__results')! as HTMLDivElement;
           movieContainer.addEventListener('click',(e)=>{
               const target=e.target! as HTMLDivElement;
               const id=(target.closest(".search__results--movie")! as HTMLDivElement)!.dataset.id;
               const type=(target.closest(".search__results--movie")! as HTMLDivElement)!.dataset.type;
               const isAddScreen=target.className==="movie__addbtn";
               if(isAddScreen){
                   renderMovieAddScreen(+id!,type!);
                   Elements.movieAddScreen.style.display="grid";
               }else{
                   renderMovie(+id!,type!);
                   Elements.movieScreen.style.display="grid";
               }
           });


    }else{
            data.forEach((movie) => {
        if (movie.release_date === undefined) {
            return;
        }
        if (movie.poster_path === null) {
            return;
        }

        
        const releaseYear = movie.release_date.split('-')[0];
        const el = `<div data-id="${movie.id}" class="movie">
                        <img id="open-movie-info" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" height="80" width="65" alt="" class="movie-image" />
                        <div class="movie-rating">${movie.vote_average}</div>
                        <div class="movie-info">
                            <p class="movie-name">${movie.title}(${releaseYear})</p>
                            <div class="movie-add">
                                <svg class="icon-add">
                                    <use xlink:href="assets.svg#icon-Bag"></use>
                                </svg>
                            </div>
                            <div class="movie-stats">
                                <p class="movie-size">1.25GB</p>
                                <p class="movie-quality">720p</p>
                            </div>
                        </div>
                    </div>`;

        container.insertAdjacentHTML('beforeend', el);
    });
    }
};
