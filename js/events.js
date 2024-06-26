document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});
document.addEventListener('doubleclick', function (e) {
    e.preventDefault();
});
var allElements = document.getElementsByTagName('*');
for (let i = 0; i < allElements.length; i++) {
    allElements[i].addEventListener('click', function (e) {
        if (e.target.tagName == 'INPUT' || e.target.tagName == 'A') return;
        e.preventDefault();
    });
}

localStorage.setItem('started_app', 'true');

var favorite_stars = document.getElementsByClassName('favorite_star');
for (let i = 0; i < favorite_stars.length; i++) {
    favorite_stars[i].addEventListener('click', function (e) {
        var content = e.target.parentElement.parentElement;
        var is_word = content.getElementsByTagName('footer')[0].innerText.includes("authoritative");
        var result = {};
        if (is_word) {
            var word = content.getElementsByTagName('h1')[0].innerText;
            var translate = content.getElementsByTagName('h3')[0].innerText;
            var definition = content.getElementsByTagName('p')[0].innerText;
            result = { "term": word, "translation": translate, "definition": definition, "treat_as_word": is_word };
        } else {
            var term = content.getElementsByTagName('h1')[0].innerText;
            var definition = content.getElementsByTagName('p')[0].innerText;
            result = { "term": term, "definition": definition, "treat_as_word": is_word };
        }
        // storages
        var storages = readAllStorage();
        if (storages.favorites == void 0) {
            storages.favorites = JSON.stringify({});
        }
        var favorites = JSON.parse(storages.favorites);
        if (favorites[result.term] == void 0) {
            favorites[result.term] = result;
            e.target.classList.add('stared');
        } else {
            delete favorites[result.term];
            e.target.classList.remove('stared');
        }
        writeStorage('favorites', JSON.stringify(favorites));
    });
}

let is_on_mobile = window.innerWidth < 800;

let is_in_PWA = window.matchMedia('(display-mode: standalone)').matches;

let is_on_mobile_browser = is_on_mobile && !is_in_PWA;

if (is_on_mobile_browser && !location.search.includes('add_to_home_screen') && localStorage.selectedHS != 'True') {
    if (window.confirm('It is recommended to use the app after adding it to the home screen for a better experience. It is not compolsory, you can still use the app in the browser with some features missing.')) {
        location.href = '/app/?add_to_home_screen'
        localStorage.selectedHS = 'True';
    } else {
        localStorage.selectedHS = 'True';
    }
}
