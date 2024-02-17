// confirm("Experimental Function", "This feature may not work properly.");

var lang = "en";

if (localStorage.getItem('lang') != null) {
    lang = localStorage.getItem('lang');
}

var path = `/${lang}/?page=search&e=:e`;


var input = document.getElementById('file');
input.onchange = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(file);
    document.getElementById('image-selection-rec').innerText = "Selected Image: " + file.name;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    reader.onload = readerEvent => {
        var image = new Image();
        image.src = readerEvent.target.result;
        image.onload = function () {
            var width = image.width;
            var height = image.height;

            // neither of them should exceed viewport
            if (width > window.innerWidth) {
                height *= window.innerWidth / width;
                width = window.innerWidth;
            }
            if (height > window.innerHeight) {
                width *= window.innerHeight / height;
                height = window.innerHeight;
            }
            if (width < window.innerWidth * 0.6) {
                height *= window.innerWidth * 0.6 / width;
                width = window.innerWidth * 0.6;
            }

            if (height < window.innerHeight * 0.6) {
                width *= window.innerHeight * 0.6 / height;
                height = window.innerHeight * 0.6;
            }

            canvas.width = width - 100;
            canvas.height = height - 100;
            canvas.style.display = "block";
            
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            // Make the image be black and white
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
            }
            ctx.putImageData(imageData, 0, 0);

            document.getElementById('whiteBalance').onchange = function () {
                var value = this.value;
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var data = imageData.data;
                for (var i = 0; i < data.length; i += 4) {
                    data[i] += value;
                    data[i + 1] += value;
                    data[i + 2] += value;
                }
                ctx.putImageData(imageData, 0, 0);
            }
        }
    }
}