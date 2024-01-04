document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});
document.addEventListener('doubleclick', function (e) {
    e.preventDefault();
});
var allElements = document.getElementsByTagName('*');
for (let i = 0; i < allElements.length; i++) {
    allElements[i].addEventListener('click', function (e) {
        e.preventDefault();
    });
}

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
        // cookies
        var cookies = readAllCookies();
        if (cookies.favorites == void 0) {
            cookies.favorites = JSON.stringify({});
        }
        var favorites = JSON.parse(cookies.favorites);
        if (favorites[result.term] == void 0) {
            favorites[result.term] = result;
            e.target.classList.add('stared');
        } else {
            delete favorites[result.term];
            e.target.classList.remove('stared');
        }
        writeCookie('favorites', JSON.stringify(favorites));
    });
}