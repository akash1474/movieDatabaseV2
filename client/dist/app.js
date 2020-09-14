var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Search from './model/Search';
import lottie from 'lottie-web';
import { Elements } from './base';
import { renderResults } from './views/searchView';
function searchQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = Elements.searchInput.value;
        if (!query) {
            return;
        }
        const searchResults = (yield Search.getResult(query));
        console.log('SearchResults', searchResults);
        renderResults(searchResults);
    });
}
document.body.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        searchQuery();
    }
});
lottie.loadAnimation({
    container: document.querySelector('.recently__animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lander.json',
});
//# sourceMappingURL=app.js.map