// Written by: ReTrn
// This is a stand-alone JavaScript file than other Web App included scripts. It give online user the access of the terms.
// Better for SEO to accept this. Faster loading for fewer data.

// Get ?w= from URL
var urlQuery = window.location.search
var urlParams = new URLSearchParams(urlQuery)

var wanted = urlParams.get('w') || ''
wanted = wanted.charAt(0).toUpperCase() + wanted.slice(1) // First letter to uppercase

var urlLang = urlParams.get('l') || ''

var language = navigator.language || navigator.userLanguage
language = language.split('-')[0]

// Try get from local storage
var l = localStorage.getItem('language')
if (l != null) {
    language = l
}

// If the user's language is not in the list, set it to English
if (language != 'en' && language != 'zh' && language != 'zh-CN') {
    language = 'en'
}

if (urlLang != '') {
    language = urlLang
}

// Set language to local storage
localStorage.setItem('language', language)
try { translate() } catch { }

var localTranslate = {
    "The Meaning & definition of _?": {
        "zh-CN": "_? 的意思和定义",
        "zh": "_? 的意思和定義"
    },
    "The meaning and definition of _?.": {
        "zh-CN": "_? 的意思和定义。",
        "zh": "_? 的意思和定義。"
    },
}

// translate in application/ld+json
var jsonLD = document.querySelectorAll('script[type="application/ld+json"]')
for (var i = 0; i < jsonLD.length; i++) {
    var json = JSON.parse(jsonLD[i].innerText)
    json.inLanguage = language
    jsonLD[i].innerText = JSON.stringify(json)
}

// Set lang tag
document.getElementsByTagName('html')[0].setAttribute('lang', language)

var localStorageFetched = localStorage.getItem(wanted)
var localStorageFetchedAll = localStorage.getItem('saved')

var is_definition_or_languge = language == 'en' ? 'definition' : language || 'definition'

var initTermsList = function () {
    // Initalization of the list json
    let p = (p, f) => {
        return `/source/${p}/${f}.json`
    }
    var o = {
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
    }

    return o
}

var pathList = initTermsList()

var today = new Date()
var expireDate = new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000) // expire after 4 weeks

if (localStorage.getItem('expire') > expireDate) {
    localStorage.removeItem('saved')
    localStorage.setItem('expire', expireDate)
}

// If the word is in the local storage, display it
if (localStorageFetched != null) {
    var localStorageFetched = JSON.parse(localStorageFetched)
    document.getElementById('word').innerHTML = localStorageFetched.word
    document.getElementById('translate').innerHTML = localStorageFetched.translation
    document.getElementById('definition').innerHTML = localStorageFetched[is_definition_or_languge]
}

// If the word is not in the local storage, fetch pathList until it finds the word.
// For every thing it fetch, it saves it to the local storage.
// If local storage contains the pathList, it will not fetch it again.
try {
    var broken = false
    if (localStorageFetched == null) {
        for (var i in pathList) {
            if (broken) break
            if (localStorageFetchedAll == null) {
                fetch(pathList[i].path)
                    .then(response => response.json())
                    .then(data => {
                        Object.keys(data).forEach(function (key) {
                            if (key.toLowerCase() == wanted.toLowerCase() && !broken && data[key].word != void 0) {
                                document.getElementById('word').innerHTML = data[key].word
                                document.getElementById('translate').innerHTML = data[key].translation
                                document.getElementById('definition').innerHTML = data[key][is_definition_or_languge]
                                localStorage.setItem(key, JSON.stringify(data[key]))
                                broken = true
                                try { translate() } catch { }
                            }
                        })
                    })
            }
        }
    }
} catch (e) {
    console.error(e)
}
try {
    if (document.getElementById('word').innerText == '') {
        document.getElementById('word').innerHTML = 'Word not found'
        document.getElementById('translate').innerHTML = '（；´д｀）ゞ'
        document.getElementById('definition').innerHTML = `<font>It seems the word you’re looking for isn’t in our database.</font><br><font>Make sure you are from valid ways and you have spelled the word correctly.</font><br><font class='gray'><font>Our</font> <b>Power Search</b> <font>feature can still help you find what you need, even with typos.</font></font>`

        var icon = document.querySelectorAll('span.detail')[0]
        icon.innerHTML = '🔍'
        try { translate() } catch { }
    }
} catch { }

try { translate() } catch { }

var modDate = new Date(document.lastModified)
modDate = modDate.toISOString()
var pubDate = '2024-01-01T08:00:00+08:00'

var allElements = document.querySelectorAll('*')
for (var i = 0; i < allElements.length; i++) {
    allElements[i].innerHTML = allElements[i].innerHTML.replaceAll('_?', wanted)
    allElements[i].innerHTML = allElements[i].innerHTML.replaceAll('_YEAR', new Date().getFullYear())
    allElements[i].innerHTML = allElements[i].innerHTML.replaceAll('_LANG', language)
    allElements[i].innerHTML = allElements[i].innerHTML.replaceAll('_URL', window.location.href)
    allElements[i].innerHTML = allElements[i].innerHTML.replaceAll('_MODD', modDate)
    allElements[i].innerHTML = allElements[i].innerHTML.replaceAll('_PUBD', pubDate)
    allElements[i].innerHTML = allElements[i].innerHTML.replaceAll('_DEFI', document.getElementById('definition').innerText.replaceAll('\n', ' '))
}