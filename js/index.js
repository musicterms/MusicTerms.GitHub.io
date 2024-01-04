// set theme color as navbar background color
var nav_bar_color = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
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

function writeCookie(name, value) {
    document.cookie = `${name}=${value};path=/`;
}

function readAllCookies() {
    var cookies = document.cookie.split(';');
    var cookies_json = {};
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split('=');
        cookies_json[cookie[0].replaceAll(' ', '')] = cookie[1];
    }
    return cookies_json;
}

var switches = document.getElementsByClassName('switch');
var cookies = readAllCookies();
for (var i = 0; i < switches.length; i++) {
    if (cookies[switches[i].getAttribute('id')] && cookies[switches[i].getAttribute('id')] == 'true') switches[i].classList.add('checked');
    switches[i].addEventListener('click', function (e) {
        var switch_element = e.target;
        var switch_class = switch_element.getAttribute('class');
        cookies = readAllCookies();
        if (switch_class.includes('checked')) {
            switch_element.classList.remove('checked');
        } else {
            switch_element.classList.add('checked');
        }
    });
}


function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

document.getElementById('favorite_enable_switch').addEventListener('click', function (e) {
    var switch_element = e.target;
    var switch_class = switch_element.getAttribute('class');
    if (switch_class.includes('checked')) {
        writeCookie('favorite_enable_switch', 'true');
        document.getElementsByClassName('star_switch_icon')[0].replaceWith(createElementFromHTML('<icon class="icon file star_switch_icon" data-icon="star_full"></icon>'))
        document.getElementById('favorite_tip').classList.add('hidden_tip_settings');
        document.getElementById('fav_fol').classList.remove('hidden_zone');
        e.target.parentElement.classList.remove('line');
    } else {
        writeCookie('favorite_enable_switch', 'false');
        document.getElementsByClassName('star_switch_icon')[0].replaceWith(createElementFromHTML('<icon class="icon file star_switch_icon" data-icon="star_empty"></icon>'))
        e.target.parentElement.classList.add('line');
        document.getElementById('favorite_tip').classList.remove('hidden_tip_settings');
        document.getElementById('fav_fol').classList.add('hidden_zone');
    }
    icons();
});

function tryDelCookies() {
    confirm(`All of your data <span class="nowrap">would NOT be saved.</span> <br>Are you sure about that?`,
        function () {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
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
        });
}

function confirm(message, callback) {
    document.getElementById('confirm_tag').classList.remove('removed');
    document.getElementById('confirm_message').innerHTML = message;
    var confirm_fullscreen = document.getElementById('confirm_fullscreen');
    confirm_fullscreen.style.display = 'block';
    confirm_fullscreen.style.opacity = '1';
    document.getElementById('confirm-yes').addEventListener('click', function () {
        document.getElementById('confirm_tag').classList.add('removed');
        callback();
        confirm_fullscreen.style.opacity = '0';
        setTimeout(function () {
            confirm_fullscreen.style.display = 'none';
        }, 1000);
    });
    document.getElementById('confirm-no').addEventListener('click', function () {
        document.getElementById('confirm_tag').classList.add('removed');
        confirm_fullscreen.style.opacity = '0';
        setTimeout(function () {
            confirm_fullscreen.style.display = 'none';
        }, 1000);
    });
}