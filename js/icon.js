var loaded_icons = {};

// Replace all <icon> to <svg>
var icon_holders = document.getElementsByTagName('icon');
async function icons() {
    if (icon_holders.length == 0) {
        return;
    }
    var icon = icon_holders[0].getAttribute('data-icon');
    var icon_element = icon_holders[0];
    var icon_parent = icon_element.parentElement;
    var svgUrl = `/icons/${icon}.svg`;
    if (loaded_icons[icon] == void 0) {
        await fetch(svgUrl)
            .then(response => response.text())
            .then(svg => {
                var span = document.createElement('span');
                span.innerHTML = svg;
                var icon_class = icon_element.getAttribute('class');
                span.setAttribute('class', icon_class);
                span.setAttribute('style', '--mask-i: url(' + svgUrl + ')');
                try { icon_parent.replaceChild(span, icon_element); } catch { }
                icons();
                loaded_icons[icon] = svg;
                if (storages.icon_cache_enable_switch == 'false') loaded_icons = {};
            });
    } else {
        var span = document.createElement('span');
        span.innerHTML = loaded_icons[icon];
        var icon_class = icon_element.getAttribute('class');
        span.setAttribute('class', icon_class);
        span.setAttribute('style', '--mask-i: url(' + svgUrl + ')');
        try { icon_parent.replaceChild(span, icon_element); } catch { }
        icons();
    }
}

icons();

function preloadIcon(icon) {
    if (loaded_icons[icon] == void 0) {
        fetch(`/icons/${icon}.svg`)
            .then(response => response.text())
            .then(svg => {
                loaded_icons[icon] = svg;
            });
    }
}

var folders = document.getElementsByClassName('folder');
var sets = document.getElementsByClassName('set');
// if a set contains more than one folder, add a class 'line' to the folders exclude the last one
for (var i = 0; i < sets.length; i++) {
    var set = sets[i];
    var folders = set.getElementsByClassName('folder');
    if (folders.length > 1) {
        for (var j = 0; j < folders.length - 1; j++) {
            if (!folders[j].classList.contains('no-line')) {
                folders[j].classList.add('line');
            }
        }
    }
}