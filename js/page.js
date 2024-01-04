var currentPage = 'page-1';

var lists = {
    'terms': { 'name': 'Terms', 'path': 'source/terms/source.json' },
    'criticism': { 'name': 'Criticism', 'path': 'source/italian/criticism.json' },
    'directions': { 'name': 'Directions', 'path': 'source/italian/directions.json' },
    'dynamics': { 'name': 'Dynamics', 'path': 'source/italian/dynamics.json' },
    'generalterms/words': { 'name': 'General', 'path': 'source/italian/g-terms.json' },
    'instruments': { 'name': 'Instruments', 'path': 'source/italian/instruments.json' },
    'moods': { 'name': 'Moods', 'path': 'source/italian/moods.json' },
    'patterns': { 'name': 'Patterns', 'path': 'source/italian/patterns.json' },
    'roles': { 'name': 'Roles', 'path': 'source/italian/roles.json' },
    'staging': { 'name': 'Staging', 'path': 'source/italian/staging.json' },
    'techniques': { 'name': 'Techniques', 'path': 'source/italian/techniques.json' },
    'tempo': { 'name': 'Tempo', 'path': 'source/italian/tempo.json' },
    'voices': { 'name': 'Voices', 'path': 'source/italian/voices.json' },
}

function addHrefHistory(page, e) {
    if (cookies.locaion_save_enable_switch == 'false') return;
    window.history.pushState({}, 'Title', '?page=' + page + '&e=' + e);
}

var toDoForPages = {
    'page-1': function () {
        document.getElementById('nav-back').classList.add('hidden');
        document.getElementById('nav-text').innerText = 'Music Terminology';
        document.getElementById('nav-back-text').innerText = '';
        addHrefHistory('page-1', 'true');
        document.title = 'Music Terminology | Home';
    },
    'page-list-of-words': function (e) {
        document.getElementById('nav-back-text').innerText = 'Folders';
        document.getElementById('nav-back').classList.remove('hidden');
        try {
            addHrefHistory('page-list-of-words', e);
            document.getElementById('nav-text').innerText = lists[e].name;
            document.title = 'Music Terminology | ' + lists[e].name;;
            fetch(lists[e].path).then(function (response) {
                return response.json();
            }).then(function (json) {
                if (e == 'terms') loadTerms(json);
                else loadLangWords(json);
            });
        } catch { }
    },
    'word-details': function (e) {
        document.getElementById('nav-back').classList.remove('hidden');
        document.getElementById('nav-back-text').innerText = document.getElementById('nav-text').innerText;
        document.getElementById('nav-text').innerText = 'Details'
        document.title = 'Music Terminology | Details'
        var word;
        if (e[0].italian != void 0) word = e[0].italian;
        document.getElementById('word').innerText = word;
        document.getElementById('translate').innerText = e[0].translation;
        document.getElementById('definition').innerText = e[0].definition;
        setFavoriteStar(word);
    },
    'term-details': function (e) {
        document.getElementById('nav-back').classList.remove('hidden');
        document.getElementById('nav-text').innerText = 'Details';
        document.title = 'Music Terminology | Details'
        document.getElementById('nav-back-text').innerText = e[0];
        var j = JSON.parse(e[1]);
        console.log(e);
        document.getElementById('term').innerText = j.name;
        document.getElementById('definition-of-term').innerText = j.definition.replaceAll('&#39;', "'");
        setFavoriteStar(j.name);
    },
    'settings': function () {
        document.getElementById('nav-text').innerText = 'Settings';
        document.getElementById('nav-back-text').innerText = 'Folders';
        document.getElementById('nav-back').classList.remove('hidden');
        document.title = 'Music Terminology | Settings'
        addHrefHistory('settings', 'true');
    },
    'search': async function () {
        document.getElementById('nav-text').innerText = 'Search';
        document.getElementById('nav-back-text').innerText = 'Folders';
        document.getElementById('nav-back').classList.remove('hidden');
        document.title = 'Music Terminology | Search'
        var time = Date.now();
        let results = await search('');
        time = (Date.now() - time) / 1000;
        document.getElementById('search_receipt').innerText = `${results.length} results found in ${time}s.`;
        results.forEach(result => {
            searchResult(result);
        });
    },
    'favorites': function () {
        document.getElementById('nav-text').innerText = 'Favorites';
        document.getElementById('nav-back-text').innerText = 'Folders';
        document.getElementById('nav-back').classList.remove('hidden');
        document.title = 'Music Terminology | Favorites'
        var page = document.getElementById('favorites');
        var content = page.getElementsByClassName('content')[0];
        var cookies = readAllCookies();
        if (cookies.favorites == void 0 || cookies.favorites == '{}') {
            content.innerHTML = '<h1 class="center">No Favorite Items.</h1>';
            return;
        }
        var favorites = JSON.parse(cookies.favorites);
        var keys = Object.keys(favorites);
        content.innerHTML = '';
        var div = document.createElement('div');
        div.setAttribute('class', 'set');
        console.log(favorites);
        for (var i = 0; i < keys.length; i++) {
            var span = document.createElement('span');
            span.setAttribute('class', 'folder full-width-line');
            if (favorites[keys[i]].treat_as_word) {
                var j = favorites[keys[i]];
                span.setAttribute('onclick', `word({"italian": "${j.term}", "translation": "${j.translation}", "definition": "${j.definition}"}, "${j.term}")`);
            } else {
                var j = favorites[keys[i]];
                var a = ['Favorites', JSON.stringify({ "name": j.term, "definition": j.definition })];
                span.setAttribute('onclick', `term(${JSON.stringify(a)})`);
            }
            span.innerText = keys[i];
            var icon = createElementFromHTML('<icon class="icon more" data-icon="forward"></icon>');
            span.appendChild(icon);
            div.appendChild(span);
        }
        div.lastChild.classList.remove('full-width-line');
        content.appendChild(div);
        icons();
    }
}

loadLangWords = function (json) {
    document.getElementById('list-of-words-content').innerHTML = '<div id="outer-list" class="set"></div>';
    document.getElementById('outer-list').innerHTML = '';
    for (var i = 0; i < Object.keys(json).length; i++) {
        var element = document.createElement('span');
        element.setAttribute('onclick', `word(${JSON.stringify(json[Object.keys(json)[i]])}, '${Object.keys(json)[i]}')`);
        element.setAttribute('class', 'folder full-width-line');
        element.innerText = Object.keys(json)[i];
        var icon = document.createElement('icon');
        icon.classList.add('icon');
        icon.classList.add('more');
        icon.setAttribute('data-icon', 'forward');
        element.appendChild(icon);
        document.getElementById('outer-list').appendChild(element);
        icons();
    }
    document.getElementById('outer-list').lastChild.classList.remove('full-width-line');
}

loadTerms = function (json) {
    var keys = Object.keys(json);
    document.getElementById('list-of-words-content').innerHTML = '';
    for (var i = 0; i < keys.length; i++) {
        var content = json[keys[i]];
        var title = keys[i];
        var content = document.getElementById('list-of-words-content');
        content.innerHTML += `<font class="small-title">${title}</font>`;
        var div_set = document.createElement('div');
        div_set.setAttribute('class', 'set');
        for (var j = 0; j < Object.keys(json[keys[i]]).length; j++) {
            var span = document.createElement('span');
            span.setAttribute('class', 'folder full-width-line');
            span.setAttribute('onclick', `term(['${title}', '${JSON.stringify(json[keys[i]][Object.keys(json[keys[i]])[j]])}'])`);
            span.innerText = Object.keys(json[keys[i]])[j];
            var icon = document.createElement('icon');
            icon.classList.add('icon');
            icon.classList.add('more');
            icon.setAttribute('data-icon', 'forward');
            span.appendChild(icon);
            div_set.appendChild(span);
        }
        div_set.lastChild.classList.remove('full-width-line');
        content.appendChild(div_set);
        icons();
    }

}

var pageHistory = ['page-1'];

function changePage(page, e, back = false) {
    // to the top
    window.scrollTo(0, 0);
    if (page == currentPage) return;
    if (document.getElementById(page) == null) return;
    var pageElement = document.getElementById(page);
    var currentPageElement = document.getElementById(currentPage);
    currentPageElement.style.position = 'absolute';
    pageElement.style.position = 'absolute';
    pageElement.style.display = 'block';
    currentPageElement.style.left = '0';
    pageElement.style.left = '0';
    if (back) {
        pageElement.style.zIndex = '1';
        currentPageElement.style.zIndex = '2';
        currentPageElement.style.animation = 'page-leave 0.3s cubic-bezier(0.65, 0.8, 0.87, 0.92)';
        pageElement.style.animation = 'page-appears 0.3s cubic-bezier(0.65, 0.8, 0.87, 0.92)';
    } else {
        currentPageElement.style.animation = 'page-left 0.3s cubic-bezier(0.65, 0.8, 0.87, 0.92)';
        pageElement.style.animation = 'page-enter 0.3s cubic-bezier(0.65, 0.8, 0.87, 0.92)';
        currentPageElement.style.zIndex = '1';
        pageElement.style.zIndex = '2';
    }
    setTimeout(function () {
        currentPageElement.style.zIndex = '1';
        pageElement.style.zIndex = '2';
        currentPageElement.style.display = 'none';
        currentPageElement.style.position = 'relative';
        pageElement.style.position = 'relative';
        pageElement.style.animation = '';
        currentPageElement.style.animation = '';
    }, 300);
    pageHistory.push(page);
    currentPage = page;
    if (toDoForPages[currentPage]) {
        toDoForPages[currentPage](e);
    }
}

function goBack() {
    if (pageHistory.length == 0) {
        return;
    }
    pageHistory.pop();
    var page = pageHistory.pop();
    changePage(page, true, true);
}

function openFolder(element) {
    changePage('page-list-of-words', element.innerText.toLowerCase().replaceAll(' ', ''));
}
document.getElementById('nav-back').addEventListener('click', goBack);

function word(json, word) {
    changePage('word-details', [json, word]);
}

function term(array) {
    changePage('term-details', array);
}

var query = window.location.search.substring(1);

try {
    var page = query.split('&')[0].split('=')[1];
    var e = query.split('&')[1].split('=')[1];
    page = decodeURIComponent(page);
    e = decodeURIComponent(e);
    if (page != void 0 || e != void 0) {
        changePage(page, e);
    }
} catch { }

function details(term, e) {
    var parsed = JSON.parse(e);
    if (Object.keys(parsed).includes('italian')) {
        changePage('word-details', [parsed, term]);
    } else if (Object.keys(parsed[1]).includes('lang')) {
        changePage('term-details', ['Search', JSON.stringify(parsed[1])]);
    }
}

function setFavoriteStar(term) {
    var cookies = readAllCookies();
    var stars = document.getElementsByClassName('favorite_star');
    if (cookies.favorite_enable_switch != 'true') {
        for (var i = 0; i < stars.length; i++) {
            stars[i].classList.add('removed');
        }
        return;
    } else {
        for (var i = 0; i < stars.length; i++) {
            stars[i].classList.remove('removed');
        }
    }
    if (cookies.favorites == void 0) {
        cookies.favorites = JSON.stringify({});
    }
    var favorites = JSON.parse(cookies.favorites);
    for (var i = 0; i < stars.length; i++) {
        if (favorites[term] != void 0) {
            stars[i].classList.add('stared');
        } else {
            stars[i].classList.remove('stared');
        }
    }
}

if (readAllCookies().favorite_enable_switch == 'true') {
    document.getElementById('fav_fol').classList.remove('hidden_zone');
}