var path_list = lists;

let data = {};
let dataLoaded = false;
let dataCache = new Map();

async function preloadData() {
    // try get from local storage
    if (localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'));
        dataLoaded = true;
        return;
    }
    for (let key in path_list) {
        let response = await fetch('/' + path_list[key]['path']);
        data[key] = await response.json();
    }
    localStorage.setItem('data', JSON.stringify(data));
    dataLoaded = true;
}

let lastInput = '';
let lastResults = [];

function levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function removeDuplicates(array, key) {
    let result = [];
    let map = new Map();

    for (let item of array) {
        let term = item[key];
        if (!map.has(term.toLowerCase())) {
            map.set(term.toLowerCase(), term);
            result.push(item);
        } else {
            let existingTerm = map.get(term.toLowerCase());
            if (existingTerm[0] === existingTerm[0].toLowerCase() && term[0] === term[0].toUpperCase()) {
                let index = result.findIndex(i => i[key] === existingTerm);
                if (index !== -1) {
                    result[index] = item;
                }
                map.set(term.toLowerCase(), term);
            }
        }
    }

    return result;
}

async function search(input) {
    input = input.toLowerCase();
    let exactMatches = [];
    let partialMatches = [];
    let fuzzyMatches = [];

    if (!dataLoaded) await preloadData();

    if (input.trim() === '') {
        for (let key in data) {
            if (isTerm(key)) {
                for (let category in data[key]) {
                    for (let term in data[key][category]) {
                        exactMatches.push({ term: term, e: JSON.stringify([category, data[key][category][term]]) });
                    }
                }
            } else {
                for (let word in data[key]) {
                    exactMatches.push({ term: word, e: JSON.stringify(data[key][word]) });
                }
            }
        }
    } else {
        for (let key in data) {
            if (isTerm(key)) {
                for (let category in data[key]) {
                    for (let term in data[key][category]) {
                        let processedTerm = term.toLowerCase();
                        if (processedTerm === input) {
                            exactMatches.push({ term: term, e: JSON.stringify([category, data[key][category][term]]) });
                        } else if (processedTerm.includes(input)) {
                            partialMatches.push({ term: term, e: JSON.stringify([category, data[key][category][term]]) });
                        } else if (levenshteinDistance(processedTerm, input) <= 2) {
                            fuzzyMatches.push({ term: term, e: JSON.stringify([category, data[key][category][term]]) });
                        }
                    }
                }
            } else {
                for (let word in data[key]) {
                    let processedWord = word.toLowerCase();
                    if (processedWord === input) {
                        exactMatches.push({ term: word, e: JSON.stringify(data[key][word]) });
                    } else if (processedWord.includes(input)) {
                        partialMatches.push({ term: word, e: JSON.stringify(data[key][word]) });
                    } else if (levenshteinDistance(processedWord, input) <= 2) {
                        fuzzyMatches.push({ term: word, e: JSON.stringify(data[key][word]) });
                    }
                }
            }
        }
    }

   // Sort results by alphabetical order
   exactMatches.sort((a, b) => a.term.localeCompare(b.term));
   partialMatches.sort((a, b) => a.term.localeCompare(b.term));
   fuzzyMatches.sort((a, b) => a.term.localeCompare(b.term));

   lastInput = input;
   lastResults = removeDuplicates(exactMatches.concat(partialMatches, fuzzyMatches), 'term');

   if (storages.data_cache_enable_switch == 'true') {
       dataCache.set(input, lastResults);
   }

   return lastResults;
}

//

function searchResult(result) {
    let term = result.term;
    let e = result.e;
    if (term == void 0 || e == void 0) return;
    let element = document.createElement('span');
    element.setAttribute('onclick', `details('${term}', '${e}')`);
    element.setAttribute('class', 'folder full-width-line');
    element.innerText = term;
    let icon = document.createElement('icon');
    icon.classList.add('icon');
    icon.classList.add('more');
    icon.setAttribute('data-icon', 'forward');
    element.appendChild(icon);
    document.getElementById('search-result-list').appendChild(element);
    icons();
}

document.getElementById('search-input').addEventListener('input', async function (e) {
    var time = Date.now();
    let input = e.target.value;
    let results = await search(input);
    time = (Date.now() - time) / 1000;
    document.getElementById('search-result-list').innerHTML = '';
    document.getElementById('search_receipt').innerText = `${results.length} results found in ${time} seconds.`;
    if (storages.data_cache_enable_switch == 'true') document.getElementById('search_receipt').innerText = `${results.length} results found in ${time} seconds by Power Search.`;
    results.forEach(result => {
        searchResult(result);
    });
    // remove the last line
    document.getElementById('search-result-list').lastChild.classList.remove('full-width-line');
});




var element_star_icon_full = createElementFromHTML('<icon class="icon file star_switch_icon" data-icon="star_full"></icon>');
var element_star_icon_empty = createElementFromHTML('<icon class="icon file star_switch_icon" data-icon="star_empty"></icon>');

if (storages.favorite_enable_switch == 'true') {
    document.getElementsByClassName('star_switch_icon')[0].replaceWith(element_star_icon_full);
    preloadIcon('star_empty');
} else {
    document.getElementsByClassName('star_switch_icon')[0].replaceWith(element_star_icon_empty);
    preloadIcon('star_full');
}