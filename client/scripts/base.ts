export const Elements = {
    //Hardrive Search
    searchInput: document.getElementById('database-search')! as HTMLInputElement,
    searchResults: document.querySelector('.search-results')! as HTMLDivElement,
    searchTitle: document.querySelector('.search-title')! as HTMLParagraphElement,
    searchButton: document.querySelector('.icon-search')! as HTMLDivElement,
    //Login
    developerLogin:document.querySelector('.center__top--user')! as HTMLDivElement,
    loginClose:document.querySelector('.login__close')! as HTMLDivElement,
    loginScreen:document.querySelector('.login__screen')! as HTMLDivElement,
    //Bucket List
    bucketIcon:document.querySelector('.bucket__icon')! as HTMLDivElement,
    bucketList:document.querySelector('.bucket__list')! as HTMLDivElement,
    // Movies List
    moviesScreen:document.querySelector('.movie__list--screen')! as HTMLDivElement,
    moviesScreenClose:document.querySelector('.close__btn--list')! as HTMLDivElement,
    recentMoreBtn:document.querySelector('.recent__more--btn')! as HTMLDivElement,
    moviesContainer:document.querySelector('.movies__container')! as HTMLDivElement,
    listSearch:document.getElementById('list__search')! as HTMLInputElement,
    //Online Search
    onlineSearchInput:document.getElementById('online-search')! as HTMLInputElement,
    searchResultsOnline:document.querySelector('.search__results')! as HTMLDivElement,
    //MovieInfo Screen
    movieScreen:document.querySelector('.movie__screen')! as HTMLDivElement,
    movieImage:document.getElementById('open-movie-info')! as HTMLImageElement,
    //Movie Add Screen
    movieAddScreen:document.querySelector('.movie__add--screen')! as HTMLDivElement,
};

interface Genre{
    id:number,
    name:string,
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    id: number;
    original_language: string;
    original_title: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    genres?:Genre[],
    overview?:string,
    tagline?:string,
    status?:string,
}
