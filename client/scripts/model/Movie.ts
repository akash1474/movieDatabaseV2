import axios,{AxiosResponse} from 'axios';

export default class MovieDB {
   static key='52c32975dd900aab51c8c8ff8606c9a6';

    static async getMovie(media:string,id:number) {
        return await axios(
            `https://api.themoviedb.org/3/${media}/${id}?api_key=${this.key}`
        ) as AxiosResponse;
    }

    static async getCredits(media:string,id:number) {
        return await axios(
            `https://api.themoviedb.org/3/${media}/${id}/credits?api_key=${this.key}`
        );
    }


    static async getVideos(media:string,id:number) {
        return await axios(
            `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${this.key}`
        );
    }


    static async getSimilar(media:string,id:number) {
        return await axios(
            `https://api.themoviedb.org/3/${media}/${id}/similar?api_key=${this.key}`
        );
    }


    static async getReviews(media:string,id:number) {
       return await axios(
            `https://api.themoviedb.org/3/${media}/${id}/reviews?api_key=${this.key}`
        );
    }

    
    static async getRecommendations(media:string,id:number) {
        return await axios(
            `https://api.themoviedb.org/3/${media}/${id}/recommendations?api_key=${this.key}`
        );
    }
}
