var rating, rat_count = 1;
const server = "https://alphabrate-server.onrender.com"
// const server = "http://localhost:3000"

fetch(`${server}/rating/${app}`, {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json"
    },
}).then(data => {
    document.title = "_NAME_ | App Gallery | The AlphaBrate Team"
    data.json().then(d => {
        addValues(d)
    })
}).catch(e => {
    addValues({
        "rating": app_info.rating,
        "count": app_info.rat_count
    })
})

function addValues(d) {
    document.getElementById("load").style.display = "none"

    rating = d.rating
    rat_count = d.count

    app_info.rating = rating
    app_info.rat_count = rat_count

    function replaceAppInfo() {
        const all_el = document.querySelectorAll("*")
        all_el.forEach(e => {
            var keys = Object.keys(app_info)
            keys.forEach(k => {
                if (e.innerHTML.includes("_" + k.toUpperCase() + "_")) {
                    e.innerHTML = e.innerHTML.replaceAll("_" + k.toUpperCase() + "_", app_info[k])
                }
            })
        })
    }

    replaceAppInfo()

    document.addEventListener("DOMContentLoaded", () => {
        replaceAppInfo()
    })

    // Add social media metas and meta tags
    var metas = `
                <link rel="icon" href="/favicon.ico" type="image/x-icon">
                <meta name="apple-mobile-web-app-capable" content="yes">
                <meta name="mobile-web-app-capable" content="yes">
                <meta property="og:title" content="${app_info.name} on AlphaBrate App Gallery">
                <meta property="og:description" content="${app_info.desc}">
                <meta property="og:image" content="${app_info.icon}">
                <meta property="og:url" content="https://alphabrate.github.io/apps/app/${app_info.app_id}.html">
                <meta name="twitter:card" content="summary_large_image">
                <meta name="twitter:title" content="${app_info.name} on AlphaBrate App Gallery">
                <meta name="twitter:description" content="${app_info.desc}">
                <meta name="twitter:image" content="${app_info.icon}">
                <meta name="twitter:site" content="@AlphaBrate_Team">
                <meta name="twitter:creator" content="@AlphaBrate_Team">
                <meta name="twitter:domain" content="alphabrate.github.io">
                <meta name="twitter:creator:id" content="AlphaBrate_Team">
                <meta name="twitter:site:id" content="AlphaBrate_Team">
                <meta name="twitter:label1" content="Rating">
                <meta name="twitter:data1" content="${app_info.rating} stars">
                <meta name="twitter:label2" content="Price">
                <meta name="twitter:data2" content="Free">
                <meta name="twitter:label3" content="Category">
                <meta name="twitter:data3" content="${app_info.category}">
                <meta name="description" content="${app_info.desc}">
                `
    document.head.innerHTML += metas
}