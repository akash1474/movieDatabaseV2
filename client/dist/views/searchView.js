import { Elements } from '../base';
export const renderResults = (data) => {
    Elements.searchResults.innerHTML = '';
    data.forEach((movie) => {
        if (movie.release_date === undefined) {
            return;
        }
        if (movie.poster_path === null) {
            return;
        }
        const releaseYear = movie.release_date.split('-')[0];
        const el = `<div class="movie">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" height="80" width="65" alt="" class="movie-image" />
    <div class="movie-rating">${movie.vote_average}</div>
    <div class="movie-info">
        <p class="movie-name">${movie.title}(${releaseYear})</p>
        <div class="movie-add">
            <svg class="icon-add">
                <use xlink:href="./assets/assets.svg#icon-Bag"></use>
            </svg>
        </div>
        <div class="movie-stats">
            <p class="movie-size">1.25GB</p>
            <p class="movie-quality">720p</p>
        </div>
    </div>
</div>`;
        Elements.searchResults.insertAdjacentHTML('beforeend', el);
    });
};
//# sourceMappingURL=searchView.js.map