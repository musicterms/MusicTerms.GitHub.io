let ENABLE_SERVICE_WORKER = true;

try {
    if (localStorage.getItem('service_worker') == 'false') {
        ENABLE_SERVICE_WORKER = false;
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (const registration of registrations) {
                registration.unregister();
            }
        });
    }
} catch { }

// Register service worker to control making site work offline
if ('serviceWorker' in navigator && ENABLE_SERVICE_WORKER) {
    navigator.serviceWorker.register('/service-worker.js')
}

try {
    let version = 'Version 1.2.4';
    document.getElementById('ver').innerHTML = version;
} catch { }

// set theme color as navbar background color
try {
    document.addEventListener('DOMContentLoaded', function () {
        var nav_bar_color = getComputedStyle(document.documentElement).getPropertyValue('--nav-color');
        var meta = document.createElement('meta');
        meta.setAttribute('name', 'theme-color');
        meta.setAttribute('content', nav_bar_color);
        document.head.appendChild(meta);
    });
} catch { }

// get the height of the navbar and set it as the margin-top of the contents
try {
    var nav_bar = document.getElementsByTagName('nav')[0];
    var nav_bar_height = nav_bar.offsetHeight;
    var content = document.getElementsByClassName('content');
    for (var i = 0; i < content.length; i++) {
        content[i].style.marginTop = nav_bar_height + 25 + nav_bar.offsetTop + 'px';
    }
} catch { }

function st_bar() {
    let local_status_bar = localStorage.getItem('status_bar') || 'black-translucent';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', local_status_bar);
    if (local_status_bar === 'black') {
        document.querySelector('nav').classList.add('black');
    } else {
        document.querySelector('nav').classList.remove('black');
    }
}
try { st_bar(); } catch { }


var date = document.getElementById('date');

function syncDate() {
    try { date.innerText = '25 Mar 2024' } catch { }
    var date_online;
    try {
        var version_file = fetch('https://raw.githubusercontent.com/musicterms/musicterms.github.io/main/VERSION?' + Math.random(),
            {
                method: 'GET',
                mode: 'cors',
            });
        version_file.then(function (response) {
            response.text().then(function (text) {
                var date_today_YYYYMMDD = new Date().toISOString().slice(0, 10).replace(/-/g, '');
                try { date_online = text.split('\n')[0].split(' = ')[1].replace('\r', ''); } catch { }
                try {
                    if (localStorage.version != date_online) {
                        localStorage.removeItem('data');
                        localStorage.removeItem('version');
                        sessionstorage.removeItem('tried_update');
                    }
                    if (date_online == date.innerText) {
                        console.log(`Version ${date.innerText} / ${date_online}.`);
                        sessionstorage.removeItem('tried_update');
                        date.innerText = `Synced`;
                        localStorage.setItem('version', date_online);
                    }
                    else if (localStorage['UPD' + date_today_YYYYMMDD] == 'true') {
                        console.log(`Version ${date.innerText} / ${date_online} error.`);
                        date.innerText = `Sync Failed`;
                        var all = document.getElementsByTagName('*');
                        for (var i = 0; i < all.length; i++) {
                            var element = all[i];
                            var element_href = element.getAttribute('href');
                            if (element_href) element.setAttribute('href', element_href + '?' + Math.random());
                            var element_src = element.getAttribute('src');
                            if (element_src) element.setAttribute('src', element_src + '?' + Math.random());
                        }
                        caches.delete('musicterms');
                    }

                    else {
                        if (navigator.onLine) {
                            Confirm(`You are not synchronized`, `Sync now?`, function () {
                                localStorage.removeItem('data');
                                localStorage.removeItem('version');
                                localStorage.setItem('UPD' + date_today_YYYYMMDD, 'true');
                                location.reload();
                            });
                            date.innerText = `Sync Failed`;
                            try { translate(); } catch { }
                            console.log(`Version ${date.innerText} / ${date_online} available.`);
                        }
                    }
                } catch { }
            });
        });
    } catch { }
}

syncDate();

window.addEventListener('online', syncDate);
window.addEventListener('offline', updateOnlineStatus);
window.addEventListener('DOMContentLoaded', updateOnlineStatus);

function updateOnlineStatus() {
    if (!navigator.onLine) {
        date.innerText = `Offline`;
    }
}

window.addEventListener('popstate', function (e) {
    e.preventDefault();
    window.history.forward();
});


function isTerm(k) {
    return k == 'terms' || k == '术语' || k == '術語';
}

var symbols = ['ppp', 'pp', 'p', 'mp', 'mf', 'f', 'ff', 'fff', 'sfz', 'sfp', 'sf', 'rfz', 'rf', 'fz', 'fp', 'mfp', 'mfz', 'rit.', 'riten.'];

function shouldShowTimeNewRoman(k) {
    return k == 'Short Forms' || k == 'Symbols' || k == '縮寫' || k == '缩写' || k == '符号' || k == '符號' || symbols.includes(k) || k == 'shortforms';
}

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
    setStyle(storages.new_look_enable_switch == 'true');
}

turnSwitches();

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function addFavoriteSwitch() {
    try {
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
    } catch { }
}

function setStyle(e) {
    var stylesheet = document.styleSheets[0];
    if (e) {
        var rules = stylesheet.cssRules;
        for (var i = 0; i < rules.length; i++) {
            stylesheet.deleteRule(i);
        }
        var s = document.createElement('link');
        s.rel = 'stylesheet';
        s.href = '/css/new.css';
        document.head.appendChild(s);

        // get all stylesheets
        var links = document.getElementsByTagName('link');
        // del style.css
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.includes('style.css')) {
                links[i].remove();
            }
        }

    } else {
        var links = document.getElementsByTagName('link');
        var isNewStyle = false;
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.includes('new.css')) {
                isNewStyle = true;
            }
        }
        if (isNewStyle) {
            var rules = stylesheet.cssRules;
            for (var i = 0; i < rules.length; i++) {
                stylesheet.deleteRule(i);
            }
            var s = document.createElement('link');
            s.rel = 'stylesheet';
            s.href = '/style.css';
            document.head.appendChild(s);

            // get all stylesheets
            var links = document.getElementsByTagName('link');
            // del style.css
            for (var i = 0; i < links.length; i++) {
                if (links[i].href.includes('new.css')) {
                    links[i].remove();
                }
            }
        }
    }
}

function tryDelCookies() {
    Confirm(`Reset All`, `All your data will be deleted.`,
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
            document.querySelectorAll('.small-title').forEach(function (e) {
                e.classList.add('hidden');
            });
            document.getElementById('nav-back').remove();
            document.getElementById('nav-text').innerText = 'A refresh is required';
            try { translate(); } catch { }
        });
}

function Confirm(title, message, callback) {
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