var path_list = lists;

let data = {};

async function preloadData() {
    for (let key in path_list) {
        let response = await fetch('/' + path_list[key]['path']);
        data[key] = await response.json();
    }
}

async function search(input) {
    input = input.toLowerCase();
    if (cookies.data_cache_enable_switch == 'false') data = {};
    if (Object.keys(data).length === 0) await preloadData();

    let results = [];
    for (let key in data) {

        console.log(key);
        if (key == 'terms' || key == '术语') {
            for (let category in data[key]) {
                for (let term in data[key][category]) {
                    if (term.toLowerCase().includes(input)) {
                        results.push({ term: term, e: JSON.stringify([category, data[key][category][term]]) });
                    }
                }
            }
        } else {
            for (let word in data[key]) {
                if (word.toLowerCase().includes(input)) {
                    results.push({ term: word, e: JSON.stringify(data[key][word]) });
                }
            }
        }
    }

    // Sort results by alphabetical order
    results.sort((a, b) => a.term.localeCompare(b.term));

    for (let i = 0; i < results.length; i++) {
        for (let j = i + 1; j < results.length; j++) {
            if (results[i].term.toLowerCase() == results[j].term.toLowerCase()) {
                results.splice(i, 1);
                j--;
            }
        }
    }

    return results;
}

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
    document.getElementById('search_receipt').innerText = `${results.length} results found in ${time}s.`;
    results.forEach(result => {
        searchResult(result);
    });
    // remove the last line
    document.getElementById('search-result-list').lastChild.classList.remove('full-width-line');
});

var element_star_icon_full = createElementFromHTML('<icon class="icon file star_switch_icon" data-icon="star_full"></icon>');
var element_star_icon_empty = createElementFromHTML('<icon class="icon file star_switch_icon" data-icon="star_empty"></icon>');

if (cookies.favorite_enable_switch == 'true') {
    document.getElementsByClassName('star_switch_icon')[0].replaceWith(element_star_icon_full);
    preloadIcon('star_empty');
} else {
    document.getElementsByClassName('star_switch_icon')[0].replaceWith(element_star_icon_empty);
    preloadIcon('star_full');
}