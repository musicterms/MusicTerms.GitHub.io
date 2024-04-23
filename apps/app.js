var prev_session = localStorage.getItem('session')
const session = prev_session ? prev_session : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
localStorage.setItem('session', session)


document.head.innerHTML += `<style>body::before{background-image: url('${app_info.artwork}');}`

var search = new URLSearchParams(window.location.search)
let can_rate = search.get('rate')

if (can_rate === 'true') {
    localStorage.setItem(app_info.app_id, 'true')
}

function addRating(r) {
    if (localStorage.getItem(app_info.app_id) != 'true' || localStorage.getItem(`${app_info.app_id}+D`) === 'true') {
        return
    }
    fetch(`${server}/rating/${app}/${r}/${session}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors'
    }).then(data => {
        localStorage.setItem(`${app_info.app_id}+D`, 'true')
        localStorage.setItem(`${app_info.app_id}+R`, r)
        location.reload()
    })
}

document.getElementById('start_redirect').href = `/apps/redirect.html?app=${app_info.app_id}&url=${app_info.app_url}`

if (localStorage.getItem(app_info.app_id) === 'true') {
    document.querySelectorAll('.hid_rating').forEach(e => {
        e.classList.remove('hid_rating')
    })
}

if (localStorage.getItem(`${app_info.app_id}+D`) === 'true') {
    document.getElementById('rating_intro').innerHTML = 'You have <span class="nowrap">rated this app.</span>'
    active(localStorage.getItem(`${app_info.app_id}+R`))
    document.getElementById('submit_rating').style.display = 'none'
    document.getElementById('stars').disabled = true
}

function active(n) {
    for (let i = 0; i < 5; i++) {
        if (i < n) {
            document.querySelectorAll('.star')[i].style.color = 'gold'
        } else {
            document.querySelectorAll('.star')[i].style.color = '#dddddd'
        }
    }
}

function sendResult() {
    var stars = document.getElementById('stars').value
    addRating(stars)
}

var images = JSON.parse(app_info.screenshots)
var image_loop = document.querySelector('.image-loop')
images.forEach(i => {
    var img = document.createElement('img')
    img.src = i
    img.alt = `A Screenshot of ${app_info.name}.`
    image_loop.appendChild(img)
})

var search = new URLSearchParams(window.location.search)
var app_sourced = search.get('sourced')

if (app_sourced == app_info.app_id) {
    localStorage.setItem(app_info.app_id, 'true');
    var url_without_query = window.location.href.split('?')[0]
    window.history.replaceState({}, document.title, url_without_query)
    location.reload()
}

document.getElementById('raw_rating').href = `${server}/rating/${app}/raw`