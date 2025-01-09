"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiUrl = 'https://beaconapi.helpscout.net/v1/fc9c15f2-1b76-4f2b-91cd-0cfd95e44063/docs/articles?query=';
const searchInput = document.querySelector('#search');
const uList = document.querySelector('#list');
const messageSpan = document.querySelector('#message');
const onKeyUpThrottled = _.throttle(onKeyUp, 1000);
(function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
})();
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('keyup', onKeyUpThrottled);
function onKeyUp() {
    return __awaiter(this, void 0, void 0, function* () {
        if (searchInput.value.length < 3)
            return;
        let articles = yield search(searchInput.value);
        // console.log(articles);
        
        if (articles.items.length > 0) {
            messageSpan.setAttribute('hidden', '');
            uList.innerHTML = yield createList(articles.items);
        }
        else {
            messageSpan.removeAttribute('hidden');
            uList.innerHTML = '';
        }
    });
}
function search(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = `${apiUrl}${query}`;
        const result = yield fetch(request);
        return yield result.json();
    });
}
function createList(list) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(list);
        let listItems = ``;
        for (let item of list) {
            listItems += `<li><a target="_blank" href="${item.url}">${item.name}</a> <br> ${item.preview}...</li>`;
        }

        // Add the external link at the bottom of the list
        const query = encodeURIComponent(searchInput.value); // Ensure the query is URL-safe
        listItems += `<li class="last"><a target="_blank" href="https://docs.wp-rocket.me/search?query=${query}">
                      View the full search results about <strong>${searchInput.value}</strong> &rsaquo;&rsaquo;</a></li>`;
        return listItems;
    });
}
