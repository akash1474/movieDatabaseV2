import Search from './model/Search';
// import MovieDB from './model/Movie';
import lottie from 'lottie-web';
import { Elements, Movie } from './base';
import { renderResults } from './views/searchView';
import {renderMovie} from './views/movieView';
import Bucket from './bucket';
import Login from './views/auth';
// const state={};

async function searchQuery(isOnline:boolean) {
    const query = Elements.onlineSearchInput.value;
    if (!query) {
        return;
    }
    if(isOnline){
        const searchResults = (await Search.getResult(query)) as Movie[];
        console.log('SearchResults', searchResults);
        renderResults(searchResults,Elements.searchResultsOnline,true);
    }else{
        
        // renderResults()
    }
}

// console.log(movies);

lottie.loadAnimation({
    container: document.querySelector('.recently__animation')!, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'lander.json', // the path to the animation json
});

document.body.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
        const target=e.target! as HTMLInputElement;
        if(target.id==="online-search"){
            searchQuery(true);
        }else if (target.id==="online-search"){
            searchQuery(false);
        }
    }
});

//loginScreen
Elements.developerLogin.addEventListener('click', (_) => {
    Elements.loginScreen.style.display = 'grid';
});

Elements.loginClose.addEventListener('click', (_) => {
    Elements.loginScreen.style.display = 'none';
});

Elements.loginScreen.addEventListener('click', (e: MouseEvent) => {
    if ((e.target! as Element).className === 'login__screen') {
        Elements.loginScreen.style.display = 'none';
    }
});

//BucketList
Elements.bucketIcon.addEventListener('click', (_) => {
    Elements.bucketList.style.transform = "translateY(0)";
    Elements.bucketList.style.opacity = "1";
    Elements.bucketList.style.zIndex = "5";
    Bucket.render();
});

//Movies List Screen
Elements.recentMoreBtn.addEventListener('click',(_)=>{
    Elements.moviesScreen.style.display="grid";
});

Elements.moviesScreenClose.addEventListener('click',(_)=>{
    Elements.moviesScreen.style.display="none";
});

Elements.moviesScreen.addEventListener('click',(e:MouseEvent)=>{
    if((e.target! as Element).className==='movie__list--screen'){
        Elements.moviesScreen.style.display="none";
    }
});

//Movie Information Screen
Elements.movieScreen.addEventListener('click',(e)=>{
    if((e.target! as Element).className==='movie__screen'){
        Elements.movieScreen.style.display="none";
        Elements.movieScreen.innerHTML="";
    }
});


Login();

// Elements.movieScreenClose.addEventListener('click',(_)=>{
//     Elements.movieScreen.style.display="none";
// });

Elements.movieImage.addEventListener('click',(_)=>{
    console.log("Clicked!!")
    Elements.movieScreen.style.display="grid";
   renderMovie(+Elements.movieImage.dataset.id!);
});

Elements.searchResults.addEventListener('click',(e)=>{
    const target=(e.target! as HTMLDivElement)!;
    if(target.className==='movie-add'){
        Bucket.addToBucket({
           id:+target.dataset.id!,
           title:target.dataset.title!,
           size:+target.dataset.size!,
       },target);
    }
});


Elements.moviesContainer.addEventListener('click',(e)=>{
    console.log(Elements.moviesContainer.children);
    const target =e.target! as HTMLDivElement;
    if(target.className==='bucket__add--popup'){
        Bucket.addToBucket({
           id:+target.dataset.id!,
           title:target.dataset.title!,
           size:+target.dataset.size!,
       },target);
    }
})

Elements.listSearch.addEventListener('input',(e)=>{
    const value=(e.target! as HTMLInputElement).value;
    const children=Array.from(Elements.moviesContainer.children)as HTMLDivElement[];
    if(value){
        children.forEach((el)=>{
            if(el.dataset.title!.toLowerCase().indexOf(value.toLowerCase())>-1){
                el.style.display="flex";
            }else{
                el.style.display="none";
            }
    });
    }else{
        children.forEach(el=>{
            el.style.display="flex";
        })
    }
});

Elements.searchInput.addEventListener('input',(e)=>{
    const value=(e.target! as HTMLInputElement).value;
    const children=Array.from(Elements.searchResults.children)as HTMLDivElement[];
    if(value){
        children.forEach((el)=>{
            if(el.dataset.title!.toLowerCase().indexOf(value.toLowerCase())>-1){
                el.style.display="flex";
            }else{
                el.style.display="none";
            }
    });
    }else{
        children.forEach(el=>{
            el.style.display="flex";
        })
    }
});






/////////////////////////////////////////////
/// TODO
/// Create a agrigation pipeline for getting the overall stats of entire database
/// make changes in the places if they use GB ----
/// Find a way to search for the movieScreen
/// differentiate the enter results for hardisk and online-search
/// Work on the Movies List Screen
/// Create a login successfull popup Card
/// Create a git repository
/// Launch the app to heroku
/// Test the app
/// Add all the movies in hardisk to server