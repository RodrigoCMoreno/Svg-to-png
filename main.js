(function (global) {

    let document = global.document;
    let body = document.body;
    let svg = document.querySelectorAll('svg')

    let download_button = document.querySelector('#download');

    download_button.addEventListener('click', function () {

        for (let i = 0; i < svg.length; i++) {

            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d");
            let image = new Image;
            let width = 500;
            let height = 500;
            let imageUrl = URL.createObjectURL(new Blob([(new XMLSerializer).serializeToString(svg[i])], { type: "image/svg+xml" }));

            image.onload = function () {

                setTimeout(function () {

                    context.drawImage(image, 0, 0, width, height);
                    canvas.toBlob(function (blob) {
                        let link = document.createElement("a");
                        let linkUrl = URL.createObjectURL(blob);
                        link.download = "myImage.png";
                        link.href = linkUrl;
                        body.appendChild(link);

                        setTimeout(function () {
                            link.click();
                            linkUrl = URL.revokeObjectURL(linkUrl);
                            imageUrl = URL.revokeObjectURL(imageUrl);
                            body.removeChild(link);
                        }, 10);
                    });
                }, 10);
            };

            canvas.width = width;
            canvas.height = height;
            image.src = imageUrl;
        }

    })

})(this);