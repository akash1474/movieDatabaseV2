import {Elements,Movie} from '../base';
import MovieDB from '../model/Movie';
import Axios from 'axios';

const renderSimilarMovies=async (id:number)=>{
	const similardata=await MovieDB.getSimilar("movie",id);
	const similarMovies:Movie[]=similardata.data.results;
	const similarContainer=document.querySelector('.movies__body')! as HTMLDivElement;
	similarMovies.forEach(movie=>{
		const el=`<div class="similar__movie">
                            <img style="cursor:pointer;" data-id="${movie.id}" id="open-movie-info" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="info__poster" alt="">
                            <div class="similar__movie--title">${movie.title}</div>
                        </div>`;
        similarContainer.insertAdjacentHTML("beforeend",el);
	});

	similarContainer.addEventListener("click",(e)=>{
		if((e.target! as HTMLImageElement).id==='open-movie-info'){
			renderMovie(+(e.target! as HTMLImageElement).dataset.id!,"movie");
		}
	});
};


export const renderMovie=async (id:number,type:string)=>{

	let data;

    if(type==="movie"){
      data=await MovieDB.getMovie("movie",id);
    }else{
        data=await MovieDB.getMovie("tv",id);
    }

	const movie:Movie=data.data;
	let genre='';
	if(movie.genres){
		let imax=movie.genres.length-1;
		if(movie.genres.length>4){
			imax=3
		}
		for(var i=0;i<=imax;i++){
		genre+=`<div class="gener">${movie.genres![i].name}</div>`;
	}
	}
	const el=`<div class="movie">
                <div class="movie__header">
                    <div class="movie__title">Movie Information</div>
                    <button class="close__btn--movieInfo">
                        <svg class="icon-close">
                            <use xlink:href="assets.svg#icon-cross"></use>
                        </svg>
                    </button>
                </div>
                <div class="movie__poster">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" id="info__poster">
                    <div class="movie__rating">${movie.vote_average}</div>
                </div>
                <div class="movie__name">${type==="movie"?movie.title:movie.name}</div>
                <div class="movie__year">${type==="movie"?movie.release_date:movie.first_air_date}</div>
                <div class="movie__geners">
                    ${genre}
                </div>
                <div class="movie__overview">${movie.overview}</div>
                ${type==="movie"?
                    `<div class="movies__scroll">
                    <div class="scroll__header">Similar Movies</div>
                    <div class="movies__body"></div>
                </div>`:""}}
            </div>`;

	Elements.movieScreen.innerHTML=el;
	document.querySelector('.close__btn--movieInfo')!.addEventListener('click',(_)=>{
    Elements.movieScreen.style.display="none";
    Elements.movieScreen.innerHTML="";
	});

	if(type!=="tv"){
        renderSimilarMovies(id);
    }
}


export const renderMovieAddScreen=async(id:number,type:string)=>{
    let data;

        if(type==="movie"){
          data=await MovieDB.getMovie("movie",id);
        }else{
            data=await MovieDB.getMovie("tv",id);
        }	
    const movie:Movie=data.data;
	let genre='';
	if(movie.genres){
		let imax=movie.genres.length-1;
		if(movie.genres.length>3){
			imax=2
		}
		for(var i=0;i<=imax;i++){
		genre+=`<div class="gener">${movie.genres![i].name}</div>`;
	}
	}
	const el=`<div class="movie__add">
                <div class="movie__header">
                    <div class="movie__title">Personal Database Insertion</div>
                    <button id="close-btn-movie-add" class="close__btn">
                        <svg class="icon-close">
                            <use xlink:href="assets.svg#icon-cross"></use>
                        </svg>
                    </button>
                </div>
                <div class="movie__poster">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" id="info__poster">
                    <div class="movie__rating">${movie.vote_average}</div>
                </div>
                <div class="movie__name">${type==="movie"?movie.title:movie.name}</div>
                <div class="movie__year">${type==="movie"?movie.release_date:movie.first_air_date}</div>
                <div class="movie__geners">${genre}</div>
                <div class="movie__overview">${movie.overview}</div>

                <div class="movie__submit">
                    <div class="submit__inputs">
                        <input type="text" name="movie__size" id="movie__size" placeholder="Size">
                        <select id="size__unit">
                            <option value="MB">MB</option>
                            <option value="GB">GB</option>
                        </select>
                    </div>
                    <select id="movie__quality">
                            <option value="480p">480p</option>
                            <option value="720p">720p</option>
                            <option value="1080p">1080p</option>
                            <option value="4k">4k</option>
                    </select>
                    <select id="item__type">
                            <option value="movie">Movie</option>
                            <option value="tv">TV</option>
                    </select>
                </div>
                <div class="submit__button"><svg id="add-spinner" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background:transparent;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="32" stroke-width="8" stroke="#fff" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.5847953216374269s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
</circle>
</svg>Insert</div>
            </div>`;

    Elements.movieAddScreen.innerHTML=el;
    document.getElementById('close-btn-movie-add')!.addEventListener("click",_=>{
    	Elements.movieAddScreen.style.display="none";
    	Elements.movieAddScreen.innerHTML="";
    });

    const submitButton= document.querySelector(".submit__button")!;
    const spinner=document.getElementById('add-spinner')!;
   submitButton.addEventListener('click',async(_)=>{
        try{
        const size=(document.getElementById("movie__size")!as HTMLInputElement).value;
        if(size){
            spinner.style.display="block";
            const successEl=`<svg id="icon-check-circle" viewBox="0 0 24 24" style="
    height: 20px;
    width: 20px;
    display:block;
    fill:#fff;
    padding:2px 15px;
">
<path d="M21 11.080v0.92c-0.001 2.485-1.009 4.733-2.64 6.362s-3.88 2.634-6.365 2.632-4.734-1.009-6.362-2.64-2.634-3.879-2.633-6.365 1.009-4.733 2.64-6.362 3.88-2.634 6.365-2.633c1.33 0.001 2.586 0.289 3.649 0.775 0.502 0.23 1.096 0.008 1.325-0.494s0.008-1.096-0.494-1.325c-1.327-0.606-2.866-0.955-4.479-0.956-3.037-0.002-5.789 1.229-7.78 3.217s-3.224 4.74-3.226 7.777 1.229 5.789 3.217 7.78 4.739 3.225 7.776 3.226 5.789-1.229 7.78-3.217 3.225-4.739 3.227-7.777v-0.92c0-0.552-0.448-1-1-1s-1 0.448-1 1zM21.293 3.293l-9.293 9.302-2.293-2.292c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l3 3c0.391 0.391 1.024 0.39 1.415 0l10-10.010c0.39-0.391 0.39-1.024-0.001-1.414s-1.024-0.39-1.414 0.001z"></path>
</svg>`;
            const unit=(document.getElementById("size__unit")!as HTMLSelectElement).value;
            const movieData={
                title:type!=="tv"?movie.title:movie.name,
                posterPath:movie.poster_path,
                category:(document.getElementById("item__type")!as HTMLSelectElement).value,
                releaseDate:new Date(type!=="tv"?movie.release_date!:movie.first_air_date!).toISOString(),
                size:unit==="GB"?(+size*1024).toFixed(2):+size,
                movieId:movie.id,
                genres:movie.genres,
                overview:movie.overview,
                voteAverage:movie.vote_average,
                quality:(document.getElementById("movie__quality")!as HTMLSelectElement).value,
            }
            await Axios.post('https://hardrive-database-1474.herokuapp.com/api/v1/movies',movieData);
            submitButton.innerHTML=successEl;
        }else{
            alert("Please provide the size!!!");
            spinner.style.display="none";
        }
    }catch(err){
        spinner.style.display="none";
        alert(err.response.data.message);
    }
    });
};