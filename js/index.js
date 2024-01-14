// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
}


// set theme color as navbar background color
var nav_bar_color = getComputedStyle(document.documentElement).getPropertyValue('--nav-color');
var meta = document.createElement('meta');
meta.setAttribute('name', 'theme-color');
meta.setAttribute('content', nav_bar_color);
document.head.appendChild(meta);

// get the height of the navbar and set it as the margin-top of the contents
var nav_bar = document.getElementsByTagName('nav')[0];
var nav_bar_height = nav_bar.offsetHeight;
var content = document.getElementsByClassName('content');
for (var i = 0; i < content.length; i++) {
    content[i].style.marginTop = nav_bar_height + 25 + 'px';
}

try { date.innerText = '13 Jan 2024' } catch { }

var date_online;
try {
    var version_file = fetch('https://raw.githubusercontent.com/musicterms/musicterms.github.io/main/VERSION?' + Math.random(),
        {
            method: 'GET',
            mode: 'cors',
        });
    version_file.then(function (response) {
        response.text().then(function (text) {
            date_online = text.split('\n')[0].split(' = ')[1].replace('\r', '');
            if (date_online == date.innerText) {
                console.warn(`Version ${date.innerText} / ${date_online}.`);
                sessionstorage.removeItem('tried_update');
                date.innerText = `Synced`;
                var all = document.getElementsByTagName('*');
                for (var i = 0; i < all.length; i++) {
                    var element = all[i];
                    var element_href = element.getAttribute('href');
                    if (element_href) element.setAttribute('href', element_href + '?' + Math.random());
                    var element_src = element.getAttribute('src');
                    if (element_src) element.setAttribute('src', element_src + '?' + Math.random());
                }
            }
            else if (sessionstorage.tried_update == 'true') {
                console.warn(`Version ${date.innerText} / ${date_online} error.`);
                date.innerText = `Sync Failed`;
            }
            else {
                confirm(`You are not synchronized`, `Sync now?`, function () {
                    localStorage.removeItem('data');
                    localStorage.removeItem('version');
                    sessionstorage.removeItem('tried_update');
                    location.reload();
                    sessionstorage.setItem('tried_update', 'true');
                });
                date.innerText = `Sync Failed`;
                try { translate(); } catch { }
                console.warn(`Version ${date.innerText} / ${date_online} available.`);
            }
        });
    });
} catch { }

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
window.addEventListener('DOMContentLoaded', updateOnlineStatus);

function updateOnlineStatus() {
    if (!navigator.onLine) {
        date.innerText = `Offline`;
    }
}

window.addEventListener('popstate', function (e) {
    console.log(this.location.href);
    var search = this.location.href.split('?')[1];
    if (!search) return;
    var location_page = search.split('page=')[1].split('&')[0];
    var location_e = search.split('e=')[1];
    openPage(location_page, location_e);
});


function isTerm(k) {
    return k == 'terms' || k == '术语' || k == '術語';
}

// announce to the server of a new visit
var url = 'https://musicterms.onrender.com/api/';

var sessionstorage = window.sessionStorage;
var session_id = sessionstorage.getItem('session_id');
if (!session_id) {
    session_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionstorage.setItem('session_id', session_id);
}

try {
    fetch(`${url}visit/?session_id=${session_id}`, {
        method: 'GET'
    });
} catch { }

function writeStorage(key, value) {
    localStorage.setItem(key, value);
}

function readAllStorage() {
    var storage_json = {};
    for (var i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        storage_json[key] = window.localStorage.getItem(key);
    }
    return storage_json;

}

var storages = readAllStorage();

function turnSwitches() {
    var switches = document.getElementsByClassName('switch');
    for (var i = 0; i < switches.length; i++) {
        if (storages[switches[i].getAttribute('id')] && storages[switches[i].getAttribute('id')] == 'true') switches[i].classList.add('checked');
        switches[i].addEventListener('click', function (e) {
            var switch_element = e.target;
            var switch_class = switch_element.getAttribute('class');
            storages = readAllStorage();
            if (switch_class.includes('checked')) {
                switch_element.classList.remove('checked');
            } else {
                switch_element.classList.add('checked');
            }
        });
    }
    addFavoriteSwitch();
}

turnSwitches();

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function addFavoriteSwitch() {
    document.getElementById('favorite_enable_switch').addEventListener('click', function (e) {
        if (readAllStorage().favorite_enable_switch == 'true') {
            writeStorage('favorite_enable_switch', 'true');
            document.getElementsByClassName('star_switch_icon')[0].replaceWith(createElementFromHTML('<icon class="icon file star_switch_icon" data-icon="star_full"></icon>'))
            document.getElementById('favorite_tip').classList.add('hidden_tip_settings');
            document.getElementById('fav_fol').classList.remove('hidden_zone');
            e.target.parentElement.classList.remove('line');
        } else {
            writeStorage('favorite_enable_switch', 'false');
            document.getElementsByClassName('star_switch_icon')[0].replaceWith(createElementFromHTML('<icon class="icon file star_switch_icon" data-icon="star_empty"></icon>'))
            e.target.parentElement.classList.add('line');
            document.getElementById('favorite_tip').classList.remove('hidden_tip_settings');
            document.getElementById('fav_fol').classList.add('hidden_zone');
        }
        icons();
    });
}

function tryDelCookies() {
    confirm(`Reset All`, `All your data will be deleted.`,
        function () {
            window.localStorage.clear();
            var settings = document.getElementById('settings');
            sets = settings.getElementsByClassName('set');
            for (var i = 0; i < sets.length - 1; i++) {
                sets[i].classList.add('removed');
            }
            folders = sets[sets.length - 1].getElementsByClassName('folder');
            for (var i = 1; i < folders.length; i++) {
                folders[i].classList.add('removed');
            }
            folders[0].classList.remove('line');
            document.getElementById('nav-back').remove();
            document.getElementById('nav-text').innerText = 'A refresh is required';
            try { translate(); } catch { }
        });
}

function confirm(title, message, callback) {
    var alert_fullscreen = document.getElementById('alert-fullscreen');
    var alert_title = document.getElementById('alert-title');
    var alert_text = document.getElementById('alert-text');
    var alert_cancel = document.getElementById('alert-cancel');
    var alert_confirm = document.getElementById('alert-confirm');
    alert_title.innerHTML = title;
    alert_text.innerHTML = message;
    alert_fullscreen.style.display = 'flex';
    alert_fullscreen.style.opacity = '1';
    alert_fullscreen.style.animation = 'fade-in .1s ease-in-out';
    alert_cancel.onclick = function () {
        alert_fullscreen.style.opacity = '0';
        alert_fullscreen.style.animation = 'fade-out .1s ease-in-out';
        setTimeout(function () {
            alert_fullscreen.style.display = 'none';
        }, 100);
    }
    alert_confirm.onclick = function () {
        alert_fullscreen.style.opacity = '0';
        alert_fullscreen.style.animation = 'fade-out .1s ease-in-out';
        setTimeout(function () {
            alert_fullscreen.style.display = 'none';
        }, 100);
        callback();
    }

    try { translate(); } catch { }
}

if (typeof getTranslateOf == 'undefined') {
    function getTranslateOf(text, l = language) {
        return text;
    }
}