confirm("Test function with unlicensed Service: Pintura.", "This is not a part of <span class='nowrap'>AlphaBrate Products and Services.</span><br>This is a test function with unlicensed Service: Pintura. By entering it, <span class='nowrap'>you are no longer</span> under the protection of Alphabrate's <span class='nowrap'>Terms of Service</span> and <span class='nowrap'>Privacy Policy.</span> Do you want to continue?");

var lang = "en"

import {
    appendDefaultEditor
} from '/app/pintura.js'

if (localStorage.getItem('lang') != null) {
    lang = localStorage.getItem('lang')
}

var path = `/${lang}/?page=search&e=:e`

var pintura

var input = document.getElementById('file')
input.onchange = e => {
    document.getElementById('nav-back').addEventListener('click', () => {
        location.reload()
    })
    document.getElementById('nav-back').innerHTML = `<icon data-icon="refresh"></icon>`
    icons();
    var file = e.target.files[0]
    var reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = readerEvent => {
        var image = new Image()
        image.src = readerEvent.target.result
        image.onload = function () {
            pintura = appendDefaultEditor('.my-editor', {
                // The source image to load
                src: image.src
            })
            document.querySelector('.my-editor').style.display = 'block'
            document.querySelector('.my-editor').style.top = nav_bar.offsetHeight + 'px'
            document.querySelector('.my-editor').style.height = window.innerHeight - nav_bar.offsetHeight + 'px'
            pintura.on('process', (e) => {
                OCR(e.dest)
            })
            function OCR(f) {
                var reader = new FileReader()
                reader.readAsDataURL(f)
                reader.onloadend = function () {
                    var base64data = reader.result
                    // Get the size of image, if height or width is larger than 600, resize to smaller than 600 in scale
                    var img = new Image()
                    img.src = base64data
                    img.onload = function () {
                        var H = img.height
                        var W = img.width
                        var MAX = 300
                        if (H > MAX || W > MAX) {
                            if (H > W) {
                                var scale = MAX / H
                                H = MAX
                                W = W * scale
                            } else {
                                var scale = MAX / W
                                W = MAX
                                H = H * scale
                            }
                            var canvas = document.createElement('canvas')
                            canvas.width = W
                            canvas.height = H
                            var ctx = canvas.getContext('2d')
                            ctx.drawImage(img, 0, 0, W, H)
                            base64data = canvas.toDataURL('image/jpeg')
                        }
                    }
                    Tesseract.recognize(base64data).then(w => {
                        console.log(w)
                        w = w.data
                        document.querySelector('.my-editor').style.display = 'none'
                        document.querySelector('.result').style.display = 'block'
                        document.querySelector('.image-result').src = base64data
                        document.querySelector('.image-result').onload = function () {
                            var H = document.querySelector('.image-result').height
                            var W = document.querySelector('.image-result').width
                            console.log(H, W)
                            document.querySelector('.text-result').style.height = H + 'px'
                            document.querySelector('.text-result').style.width = W + 'px'
                            w.words.forEach(e => {
                                var font = document.createElement('font')
                                font.innerText = e.text
                                var bx = e.baseline.x0
                                var by = e.baseline.y0
                                document.querySelector('.innerResult').appendChild(font)
                                font.style.position = 'absolute'
                                console.log(e)
                                var top = (by - (font.offsetHeight / 2) - (H / 30))
                                var left = bx - (W / 100)
                                while (top > H) {
                                    top -= H
                                }
                                while (top + font.offsetHeight + 4 > H) {
                                    top -= font.offsetHeight
                                }

                                while (left > W) {
                                    left -= W
                                }
                                while (left + font.offsetWidth + 4 > W) {
                                    left -= font.offsetWidth
                                }
                                font.style.left = left + 'px'
                                font.style.top = top + 'px'
                                var MAX_FONT_SIZE = 30
                                font.style.fontSize = Math.min(e.baseline.y0 - e.bbox.y0, MAX_FONT_SIZE) + 'px'
                                font.addEventListener('click', selctText)
                            })
                            document.getElementById('searchinp').style.top = (document.querySelector('.result').offsetHeight / 2) + H + 'px'
                        }
                    })
                }
            }
        }
    }
}

var selctText = (e => {
    var t = e.target.innerText
    var si = document.getElementById('search-input')
    if (si.value.includes(t) || si.value.includes(t + ' ')) {
        si.value = si.value.replace(t + ' ', '')
        si.value = si.value.replace(t, '')
    } else {
        si.value += t + ' '
    }
})

document.getElementById('searchInput').addEventListener('click', () => {
    var v = document.getElementById('search-input').value
    var v_no_space = v.replace(/\s/g, '')
    if (v_no_space != '') {
        location.href = path.replace(':e', v)
    }
});