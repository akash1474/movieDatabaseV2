var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { Elements } from '../base';
export default class Search {
    static getResult(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = '52c32975dd900aab51c8c8ff8606c9a6';
            if (query === '#trending') {
                var data = (yield axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`));
                Elements.searchTitle.innerText = 'Trending';
                return data.data.results;
            }
            else {
                Elements.searchTitle.innerText = 'Search Results ';
                var data = (yield axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${query}`));
                return data.data.results;
            }
        });
    }
}
//# sourceMappingURL=Search.js.map