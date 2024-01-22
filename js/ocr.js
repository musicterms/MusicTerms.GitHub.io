var video = document.querySelector("#camera");
var des = [];
var currentDeviceId = '';
var currentFacingMode = '';

function getAllCameras() {

    return navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
            devices.forEach(function (device) {
                if (device.kind === 'videoinput') {
                    des.push([device.deviceId, device.label]);
                }
            });
        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        });
}

function switchCamera(deviceId) {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { deviceId: deviceId } })
            .then(function (stream) {
                video.srcObject = stream;
                currentDeviceId = deviceId;
            })
            .catch(function (err0r) {
                console.log(err0r);
            });
    }
    video.play();
}

function toggleFacingMode() {
    var newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: newFacingMode } } })
            .then(function (stream) {
                video.srcObject = stream;
                currentFacingMode = newFacingMode;
            })
            .catch(function (err) {
                if (err == "OverconstrainedError") {
                    document.getElementById("switchFacing").style.display = "none";
                }
            });
    }
    video.play();
}

confirm("Allow camera access", "Text recognition needs access to your camera to work.", function () {
    getAllCameras().then(function () {
        switchCamera(des[0][0]);
        toggleFacingMode();
        if (des[0][0] != '') {
            for (let i = 0; i < des.length; i++) {
                // if current camera
                if (des[i][0] == des[0][0]) {
                    document.getElementById("cameras").innerHTML += `<div class="folder option hidden_zone hidden_selector_a" onclick="select('${des[i][0]}')">
                    <icon data-icon="check" class="circle"></icon>
                    <font>${des[i][1]}</font>
                    <icon data-icon="tick" class="icon option"></icon>
                    </div>`;
                }
                else {
                    document.getElementById("cameras").innerHTML += `<div class="folder option hidden_zone hidden_selector_a" onclick="select('${des[i][0]}')">
                    <icon data-icon="check" class="circle gray"></icon>
                    <font>${des[i][1]}</font>
                    <icon data-icon="tick" class="icon option hidden"></icon>
                    </div>`;
                }
            }
        } else {
            document.getElementById("cameras").style.display = "none";
        }
    });
});

function toggle() {
    const hidden = document.querySelectorAll(".option.hidden_selector_a");
    document.querySelector('.icon.more.larger').classList.toggle("gray");
    document.querySelector('.icon.more.larger').classList.toggle("rotate180");
    for (let i = 0; i < hidden.length; i++) {
        hidden[i].classList.toggle("hidden_zone");
    }
}

function select(id) {
    switchCamera(id);
    toggle();
    // tick the selected camera, untick the others, toggle gray
    const hidden = document.querySelectorAll(".option.hidden_selector_a");
    console.log(hidden);
    for (let i = 0; i < hidden.length; i++) {
        if (hidden[i].onclick.toString().includes(id)) {
            hidden[i].querySelector(".icon.option").classList.toggle("hidden");
            hidden[i].querySelector(".circle").classList.toggle("gray");
        } else {
            hidden[i].querySelector(".icon.option").classList.add("hidden");
            hidden[i].querySelector(".circle").classList.add("gray");
        }
    }
}


var texts = [];
function getText() {
    document.getElementById("camera").style.display = "none";
    var c = document.getElementById("c");
    c.style.filter = "blur(15px)";
    c.style.webkitFilter = "blur(15px)";
    var ctx = c.getContext("2d");
    var video = document.getElementById("camera");
    c.width = video.videoWidth;
    c.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, c.width, c.height);
    var img = c.toDataURL("image/png");
    Tesseract.recognize(img).then(function (result) {
        result = result.data;
        document.getElementById("camera").style.display = "none";
        c.style.filter = "blur(0px)";
        c.style.webkitFilter = "blur(0px)";
        var words = result.words;
        // add to ovl and position them
        var ovl = document.getElementById("ovl");
        ovl.innerHTML = "";
        document.getElementById("cameras").style.display = "none";
        document.getElementById("toolbar").innerHTML = `<label for="search-input" class="inp text">
                <icon data-icon="letter_a" class="search-input-svg"></icon><input type="text" id="search-input"
                    placeholder="Click on the words">
                    <button class="fit" id="search" onclick="search()">
                        <icon data-icon="search"></icon>
                    </button>
            </label>`;
        document.getElementById("nav-back").innerHTML = `<icon data-icon="refresh"></icon>`;
        document.getElementById("nav-back").onclick = function () {
            location.reload();
        }
        icons();
        for (let i = 0; i < words.length; i++) {
            var word = words[i];
            var div = document.createElement("div");
            div.innerHTML = word.text;
            div.style.position = "absolute";
            div.style.left = word.bbox.x0 + (c.width * 0.1) + "px";
            div.style.top = word.bbox.y0 + (c.height * 0.1) + "px";
            div.style.width = word.bbox.x1 - word.bbox.x0 + "px";
            div.style.height = word.bbox.y1 - word.bbox.y0 + "px";
            div.style.lineHeight = div.style.height;
            div.classList.add("word-overlay");
            div.onclick = function (e) {
                var el = e.target;
                var text = el.innerHTML;
                if (texts.includes(text)) {
                    texts.splice(texts.indexOf(text), 1);
                    el.classList.remove("selected");
                } else {
                    texts.push(text);
                    el.classList.add("selected");
                }
                document.getElementById("search-input").value = texts.join(" ");
            }
            ovl.appendChild(div);
        }
    });
}

var localstorage = window.localStorage;
var lang = localstorage.getItem('language');
if (lang == null) {
    lang = 'en';
}

var path = `/${lang}/?page=search&e=:e`;

function search() {
    var text = document.getElementById("search-input").value;
    if (text != "") {
        location.href = path.replace(":e", encodeURIComponent(text));
    }
}