var currentPage = 'page-1';

var language = location.href.split('/')[3];
var is_definition_or_languge = language == 'en' ? 'definition' : language || 'definition';

var lists = {
    'terms': { 'name': 'Terms', 'path': 'source/terms/source.json' },
    'criticism': { 'name': 'Criticism', 'path': 'source/italian/criticism.json' },
    'directions': { 'name': 'Directions', 'path': 'source/italian/directions.json' },
    'dynamics': { 'name': 'Dynamics', 'path': 'source/italian/dynamics.json' },
    'generalterms/words': { 'name': 'General', 'path': 'source/italian/g-terms.json' },
    'instruments': { 'name': 'Instruments', 'path': 'source/italian/instruments.json' },
    'moods/expressions': { 'name': 'Moods', 'path': 'source/italian/moods.json' },
    'patterns': { 'name': 'Patterns', 'path': 'source/italian/patterns.json' },
    'roles': { 'name': 'Roles', 'path': 'source/italian/roles.json' },
    'staging': { 'name': 'Staging', 'path': 'source/italian/staging.json' },
    'techniques': { 'name': 'Techniques', 'path': 'source/italian/techniques.json' },
    'tempo': { 'name': 'Tempo', 'path': 'source/italian/tempo.json' },
    'voices': { 'name': 'Voices', 'path': 'source/italian/voices.json' },
    'german': { 'name': 'German', 'path': 'source/german/german.json' },
    'french': { 'name': 'French', 'path': 'source/french/french.json' },
    'symbolsfordynamics': { 'name': 'Symbols', 'path': 'source/terms/symbol.json' },
    // zh-CN
    '术语': { 'name': 'Terms', 'path': 'source/terms/source.json' },
    '评论': { 'name': 'Criticism', 'path': 'source/italian/criticism.json' },
    '指示': { 'name': 'Directions', 'path': 'source/italian/directions.json' },
    '力度': { 'name': 'Dynamics', 'path': 'source/italian/dynamics.json' },
    '常用术语/词语': { 'name': 'General', 'path': 'source/italian/g-terms.json' },
    '乐器': { 'name': 'Instruments', 'path': 'source/italian/instruments.json' },
    '情绪/表情': { 'name': 'Moods', 'path': 'source/italian/moods.json' },
    '模式/形态': { 'name': 'Patterns', 'path': 'source/italian/patterns.json' },
    '角色': { 'name': 'Roles', 'path': 'source/italian/roles.json' },
    '指挥': { 'name': 'Staging', 'path': 'source/italian/staging.json' },
    '技巧': { 'name': 'Techniques', 'path': 'source/italian/techniques.json' },
    '速度': { 'name': 'Tempo', 'path': 'source/italian/tempo.json' },
    '人声': { 'name': 'Voices', 'path': 'source/italian/voices.json' },
    '德语': { 'name': 'German', 'path': 'source/german/german.json' },
    '法语': { 'name': 'French', 'path': 'source/french/french.json' },
    '力度符号': { 'name': 'Symbols', 'path': 'source/terms/symbol.json' },
    // zh
    '術語': { 'name': 'Terms', 'path': 'source/terms/source.json' },
    '評論': { 'name': 'Criticism', 'path': 'source/italian/criticism.json' },
    '指示': { 'name': 'Directions', 'path': 'source/italian/directions.json' },
    '力度': { 'name': 'Dynamics', 'path': 'source/italian/dynamics.json' },
    '常用術語/詞語': { 'name': 'General', 'path': 'source/italian/g-terms.json' },
    '樂器': { 'name': 'Instruments', 'path': 'source/italian/instruments.json' },
    '情緒/表情': { 'name': 'Moods', 'path': 'source/italian/moods.json' },
    '模式/形態': { 'name': 'Patterns', 'path': 'source/italian/patterns.json' },
    '角色': { 'name': 'Roles', 'path': 'source/italian/roles.json' },
    '指揮': { 'name': 'Staging', 'path': 'source/italian/staging.json' },
    '技巧': { 'name': 'Techniques', 'path': 'source/italian/techniques.json' },
    '速度': { 'name': 'Tempo', 'path': 'source/italian/tempo.json' },
    '人聲': { 'name': 'Voices', 'path': 'source/italian/voices.json' },
    '德文': { 'name': 'German', 'path': 'source/german/german.json' },
    '法文': { 'name': 'French', 'path': 'source/french/french.json' },
    '力度符號': { 'name': 'Symbols', 'path': 'source/terms/symbol.json' },
}

function addHrefHistory(page, e) {
    if (storages.locaion_save_enable_switch == 'false') return;
    window.history.pushState({}, 'Title', '?page=' + page + '&e=' + e);
}

var toDoForPages = {
    'page-1': function () {
        document.getElementById('nav-back').classList.add('hidden');
        document.getElementById('nav-text').innerText = getTranslateOf('Music Terminology');
        document.getElementById('nav-back-text').innerText = '';
        addHrefHistory('page-1', 'true');
        document.title = 'Music Terminology | Home';
        try { translate(); } catch { }
    },
    'page-list-of-words': function (e) {
        document.getElementById('nav-back-text').innerText = 'Folders';
        document.getElementById('nav-back').classList.remove('hidden');
        try {
            addHrefHistory('page-list-of-words', e);
            document.getElementById('nav-text').innerText = getTranslateOf(lists[e].name);
            document.title = 'Music Terminology | ' + lists[e].name;
            fetch('/' + lists[e].path).then(function (response) {
                return response.json();
            }).then(function (json) {
                if (isTerm(e)) loadTerms(json);
                else if (shouldShowTimeNewRoman(e)) loadLangWords(json, true);
                else loadLangWords(json);
            });
        } catch { }
        try { translate(); } catch { }
    },
    'word-details': function (e) {
        document.getElementById('nav-back').classList.remove('hidden');
        document.getElementById('nav-back-text').innerText = document.getElementById('nav-text').innerText;
        document.getElementById('nav-text').innerText = getTranslateOf('Details');
        document.title = 'Music Terminology | Details';
        var word = e[0].word;
        document.getElementById('word').innerText = word;
        if (shouldShowTimeNewRoman(word)) document.getElementById('word').classList.add('times-new-roman');
        document.getElementById('translate').innerText = e[0].translation;
        document.getElementById('definition').innerText = e[0][is_definition_or_languge];
        setFavoriteStar(word);
        try { translate(); } catch { }
    },
    'term-details': function (e) {
        document.getElementById('nav-back').classList.remove('hidden');
        document.getElementById('nav-text').innerText = getTranslateOf('Details');
        document.title = 'Music Terminology | Details';
        document.getElementById('nav-back-text').innerText = e[0];
        var j = JSON.parse(e[1]);
        document.getElementById('term').innerText = j.name;
        document.getElementById('definition-of-term').innerText = j[is_definition_or_languge].replaceAll('&#39;', "'");
        setFavoriteStar(j.name);
        try { translate(); } catch { }
    },
    'settings': function () {
        document.getElementById('nav-text').innerText = getTranslateOf('Settings');
        document.getElementById('nav-back-text').innerText = 'Folders';
        document.getElementById('nav-back').classList.remove('hidden');
        document.title = 'Music Terminology | Settings'
        addHrefHistory('settings', 'true');
        try { translate(); } catch { }
    },
    'search': async function () {
        document.getElementById('nav-text').innerText = getTranslateOf('Search');
        document.getElementById('nav-back-text').innerText = 'Folders';
        document.getElementById('nav-back').classList.remove('hidden');
        document.title = 'Music Terminology | Search'
        addHrefHistory('search', 'true');
        try { translate(); } catch { }
    },
    'favorites': function () {
        document.getElementById('nav-text').innerText = getTranslateOf('Favorites');
        document.getElementById('nav-back-text').innerText = 'Folders';
        document.getElementById('nav-back').classList.remove('hidden');
        document.title = 'Music Terminology | Favorites'
        var page = document.getElementById('favorites');
        var content = page.getElementsByClassName('content')[0];
        var storages = readAllStorage();
        if (storages.favorites == void 0 || storages.favorites == '{}') {
            content.innerHTML = '<h1 class="center">No Favorite Items.</h1>';
            try { translate(); } catch { }
            return;
        }
        var favorites = JSON.parse(storages.favorites);
        var keys = Object.keys(favorites);
        console.log(favorites);
        content.innerHTML = '';
        var div = document.createElement('div');
        div.setAttribute('class', 'set');
        for (var i = 0; i < keys.length; i++) {
            var span = document.createElement('span');
            span.setAttribute('class', 'folder full-width-line');
            if (favorites[keys[i]].treat_as_word) {
                var j = favorites[keys[i]];
                span.setAttribute('onclick', `word({"word": "${j.term}", "translation": "${j.translation}", "${is_definition_or_languge}": "${j.definition}"}, "${j.term}")`);
            } else {
                var j = favorites[keys[i]];
                var a = ['Favorites', JSON.stringify({ "name": j.term, "definition": j[is_definition_or_languge] })];
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
        addHrefHistory('favorites', 'true');
        try { translate(); } catch { }
    }
}

loadLangWords = function (json, times_new_roman = false) {
    document.getElementById('list-of-words-content').innerHTML = '<div id="outer-list" class="set"></div>';
    document.getElementById('outer-list').innerHTML = '';
    for (var i = 0; i < Object.keys(json).length; i++) {
        var element = document.createElement('span');
        element.setAttribute('onclick', `word(${JSON.stringify(json[Object.keys(json)[i]])}, '${Object.keys(json)[i]}')`);
        element.setAttribute('class', 'folder full-width-line');
        if (times_new_roman) element.classList.add('times-new-roman');
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

function openPage(page, e) {
    if (page == currentPage) return;
    if (document.getElementById(page) == null) return;
    sessionStorage[`${currentPage}-scroll`] = document.documentElement.scrollTop;
    var pageElement = document.getElementById(page);
    var currentPageElement = document.getElementById(currentPage);
    currentPageElement.style.position = 'absolute';
    pageElement.style.position = 'absolute';
    pageElement.style.display = 'block';
    currentPageElement.style.left = '0';
    pageElement.style.left = '0';
    if (toDoForPages[page]) {
        toDoForPages[page](e);
    }
    currentPageElement.style.zIndex = '1';
    pageElement.style.zIndex = '2';
    currentPageElement.style.display = 'none';
    currentPageElement.style.position = 'relative';
    pageElement.style.position = 'relative';
    pageElement.style.animation = '';
    currentPageElement.style.animation = '';
    document.documentElement.scrollTop = sessionStorage[`${page}-scroll`] || 0;
    pageHistory.push(page);
    currentPage = page;
}

function changePage(page, e, back = false) {
    if (page == currentPage) return;
    if (document.getElementById(page) == null) return;
    sessionStorage[`${currentPage}-scroll`] = document.documentElement.scrollTop;
    var pageElement = document.getElementById(page);
    var currentPageElement = document.getElementById(currentPage);
    currentPageElement.style.position = 'absolute';
    pageElement.style.position = 'absolute';
    pageElement.style.display = 'block';
    currentPageElement.style.left = '0';
    pageElement.style.left = '0';
    if (toDoForPages[page]) {
        toDoForPages[page](e);
    }
    if (back) {
        pageElement.style.zIndex = '1';
        currentPageElement.style.zIndex = '2';
        currentPageElement.style.animation = 'page-leave 0.33s';
        pageElement.style.animation = 'page-appears 0.33s';
    } else {
        currentPageElement.style.animation = 'page-left 0.28s';
        pageElement.style.animation = 'page-enter 0.33s';
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
        document.documentElement.scrollTop = sessionStorage[`${page}-scroll`] || 0;
    }, 300);
    pageHistory.push(page);
    currentPage = page;
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
    if (Object.keys(parsed).includes('word')) {
        changePage('word-details', [parsed, term]);
    } else if (Object.keys(parsed[1]).includes('name')) {
        changePage('term-details', ['Search', JSON.stringify(parsed[1])]);
    }
}

function setFavoriteStar(term) {
    var storages = readAllStorage();
    var stars = document.getElementsByClassName('favorite_star');
    if (storages.favorite_enable_switch != 'true') {
        for (var i = 0; i < stars.length; i++) {
            stars[i].classList.add('removed');
        }
        return;
    } else {
        for (var i = 0; i < stars.length; i++) {
            stars[i].classList.remove('removed');
        }
    }
    if (storages.favorites == void 0) {
        storages.favorites = JSON.stringify({});
    }
    var favorites = JSON.parse(storages.favorites);
    for (var i = 0; i < stars.length; i++) {
        if (favorites[term] != void 0) {
            stars[i].classList.add('stared');
        } else {
            stars[i].classList.remove('stared');
        }
    }
}

if (readAllStorage().favorite_enable_switch == 'true') {
    document.getElementById('fav_fol').classList.remove('hidden_zone');
    try { translate() } catch { }
}

async function searchAll() {
    var time = Date.now();
    let results = await search('');
    time = (Date.now() - time) / 1000;
    document.getElementById('search_receipt').innerText = `${results.length} results found in ${time}s.`;
    results.forEach(result => {
        searchResult(result);
    });
}