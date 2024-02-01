var currentPage = 'page-1';

var language = location.href.split('/')[3];
var is_definition_or_languge = language == 'en' ? 'definition' : language || 'definition';

var initTermsList = function () {
    // Initalization of the list json
    let p = (p, f) => {
        return `source/${p}/${f}.json`;
    }
    var o = {
        'terms': { 'name': 'Terms', 'path': p('terms', 'source') },
        'criticism': { 'name': 'Criticism', 'path': p('italian', 'criticism') },
        'directions': { 'name': 'Directions', 'path': p('italian', 'directions') },
        'dynamics': { 'name': 'Dynamics', 'path': p('italian', 'dynamics') },
        'generalterms/words': { 'name': 'General', 'path': p('italian', 'g-terms') },
        'instruments': { 'name': 'Instruments', 'path': p('italian', 'instruments') },
        'moods/expressions': { 'name': 'Moods', 'path': p('italian', 'moods') },
        'patterns': { 'name': 'Patterns', 'path': p('italian', 'patterns') },
        'roles': { 'name': 'Roles', 'path': p('italian', 'roles') },
        'staging': { 'name': 'Staging', 'path': p('italian', 'staging') },
        'techniques': { 'name': 'Techniques', 'path': p('italian', 'techniques') },
        'tempo': { 'name': 'Tempo', 'path': p('italian', 'tempo') },
        'voices': { 'name': 'Voices', 'path': p('italian', 'voices') },
        'german': { 'name': 'German', 'path': p('german', 'german') },
        'french': { 'name': 'French', 'path': p('french', 'french') },
        'symbolsfordynamics': { 'name': 'Symbols', 'path': p('terms', 'symbol') },
    };

    // Other languages
    var l = new Map([
        ['zh-CN', ['术语', '评论', '指示', '力度', '常用术语/词语', '乐器', '情绪/表情', '模式/形态', '角色', '指挥', '技巧', '速度', '人声', '德语', '法语', '力度符号']],
        ['zh', ['術語', '評論', '指示', '力度', '常用術語/詞語', '樂器', '情緒/表情', '模式/形態', '角色', '指揮', '技巧', '速度', '人聲', '德文', '法文', '力度符號']]
    ])

    var i = Object.keys(o);

    l.forEach((e) => {
        for (let j = 0; j < i.length; j++) {
            o[e[j]] = o[i[j]];
        }
    });

    return o;
}

var lists = initTermsList();

function addHrefHistory(page, e) {
    // if (storages.locaion_save_enable_switch == 'false') return;
    // window.history.pushState({}, 'Title', '?page=' + page + '&e=' + e);
    return;
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
        document.getElementById('list-of-words-content').style.opacity = '0';
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
        else document.getElementById('word').classList.remove('times-new-roman');
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
        try { addLoadEvent(); } catch { }
        document.getElementById('nav-text').innerText = getTranslateOf('Search');
        document.getElementById('nav-back-text').innerText = 'Folders';
        document.getElementById('nav-back').classList.remove('hidden');
        document.title = 'Music Terminology | Search'
        var e = location.search.split('e=');
        e = e[e.length - 1] || 'true';
        if (e != 'true') {
            async function a() {
                document.getElementById('search-input').value = decodeURIComponent(e);
                var time = Date.now();
                let input = decodeURIComponent(e);
                let results = await search(input);
                time = (Date.now() - time) / 1000;
                document.getElementById('search-result-list').innerHTML = '';
                document.getElementById('search_receipt').innerText = `${results.length} results found in ${time} seconds.`;
                if (storages.data_cache_enable_switch == 'true') document.getElementById('search_receipt').innerText = `${results.length} results found in ${time} seconds by Power Search.`;
                processResults(results);
                // remove the last line
                document.getElementById('search-result-list').lastChild.classList.remove('full-width-line');
            }
            a();
        }

        addHrefHistory('search', e);
        if (storages.data_experiment_enable_switch == 'true') {
            var label = document.querySelector('label.text');
            if (label.lastChild.tagName != 'BUTTON') {
                label.innerHTML += `<button class="fit" onclick="location.href='/app/ocr.html'">
                    <icon data-icon="lens_blur"></icon>
                </button>`;
            }
        }
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
    document.getElementById('list-of-words-content').style.opacity = '1';
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
        document.getElementById('list-of-words-content').style.opacity = '1';
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
        currentPageElement.style.animation = 'page-leave 0.32s';
        pageElement.style.animation = 'page-appears 0.32s';
        currentPageElement.style.transform = 'translateX(100%)';
        pageElement.style.opacity = '1';
        pageElement.style.transform = 'scale(1)';
    } else {
        currentPageElement.style.animation = 'page-left 0.27s';
        pageElement.style.animation = 'page-enter 0.32s';
        currentPageElement.style.zIndex = '1';
        pageElement.style.zIndex = '2';
        currentPageElement.style.transform = 'translateX(-100%)';
        pageElement.style.opacity = '1';
        pageElement.style.transform = 'scale(1)';

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
    try { addLoadEvent(); } catch { }
    var time = Date.now();
    let results = await search('');
    time = (Date.now() - time) / 1000;
    document.getElementById('search_receipt').innerText = `${results.length} results found in ${time}s.`;
    results.forEach(result => {
        searchResult(result);
    });
}