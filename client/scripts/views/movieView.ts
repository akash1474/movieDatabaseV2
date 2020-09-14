import {Elements,Movie} from '../base';
import MovieDB from '../model/Movie';
import Axios from 'axios';

// const downloadResources=async()=>{
//     const data=await Axios.get('http://localhost:3000/api/v1/movies');
//     console.log(data.data.data);
// }

// downloadResources();


const renderSimilarMovies=async (id:number)=>{
	const similardata=await MovieDB.getSimilar("movie",id);
	const similarMovies:Movie[]=similardata.data.results;
	console.log(similarMovies);
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
			renderMovie(+(e.target! as HTMLImageElement).dataset.id!);
		}
	});
};


export const renderMovie=async (id:number)=>{

	const data=await MovieDB.getMovie("movie",id);
	const movie:Movie=data.data;
	console.log(movie);
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
                <div class="movie__name">${movie.title}</div>
                <div class="movie__year">${movie.release_date}</div>
                <div class="movie__geners">
                    ${genre}
                </div>
                <div class="movie__overview">${movie.overview}</div>
                <div class="movies__scroll">
                    <div class="scroll__header">Similar Movies</div>
                    <div class="movies__body"></div>
                </div>
            </div>`;

	Elements.movieScreen.innerHTML=el;
	document.querySelector('.close__btn--movieInfo')!.addEventListener('click',(_)=>{
    Elements.movieScreen.style.display="none";
    Elements.movieScreen.innerHTML="";
	});

	renderSimilarMovies(id);
}


export const renderMovieAddScreen=async(id:number)=>{
	const data=await MovieDB.getMovie("movie",id);
	const movie:Movie=data.data;
	console.log(movie);
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
                <div class="movie__name">${movie.title}</div>
                <div class="movie__year">${movie.release_date}</div>
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
                    <div class="submit__button">Insert</div>
                </div>
            </div>`;

    Elements.movieAddScreen.innerHTML=el;
    document.getElementById('close-btn-movie-add')!.addEventListener("click",_=>{
    	Elements.movieAddScreen.style.display="none";
    	Elements.movieAddScreen.innerHTML="";
    });


    document.querySelector(".submit__button")!.addEventListener('click',async(_)=>{
        try{
        const size=(document.getElementById("movie__size")!as HTMLInputElement).value;
        if(size){
            const unit=(document.getElementById("size__unit")!as HTMLSelectElement).value;
            const movieData={
                title:movie.title,
                posterPath:movie.poster_path,
                releaseDate:new Date(movie.release_date).toISOString(),
                size:unit==="GB"?(+size*1024).toFixed(2):+size,
                movieId:movie.id,
                genres:movie.genres,
                overview:movie.overview,
                voteAverage:movie.vote_average,
                quality:(document.getElementById("movie__quality")!as HTMLSelectElement).value,
            }
            console.log(movieData); 
            const res=await Axios.post('http://localhost:3000/api/v1/movies',movieData);
            console.log(res);
        }else{
            alert("Please provide the size!!!");
        }
    }catch(err){
        console.log(err.response.data.message);
        alert(err.response.data.message);
    }
    });
};