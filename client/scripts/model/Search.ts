import axios, { AxiosResponse } from "axios";
import { Elements } from "../base";
interface responseData {
    results: any[];
    page: number;
    total_pages: number;
    total_results: number;
}
export default class Search {
    static async getResult(query: string) {
        const key = "52c32975dd900aab51c8c8ff8606c9a6";
        if (query === "#trending") {
            var data = (await axios.get(
                `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`
            )) as AxiosResponse<responseData>;
            Elements.searchTitle.innerText = "Trending";
            return data.data.results;
        } else {
            Elements.searchTitle.innerText = "Search Results ";
            var data = (await axios.get(
                `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${query}`
            )) as AxiosResponse<responseData>;
            return data.data.results;
        }
    }
}
