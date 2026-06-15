let file = document.getElementById("file")
let original = document.getElementById("original")
let compressed = document.getElementById("compressed")

let originalSize = document.getElementById("originalSize")
let compressedSize = document.getElementById("compressedSize")

let bar = document.getElementById("bar")
let download = document.getElementById("downloadBtn")

let dropArea = document.getElementById("dropArea")

file.addEventListener("change", compress)

dropArea.addEventListener("dragover", function (e) {
    e.preventDefault()
})

dropArea.addEventListener("drop", function (e) {
    e.preventDefault()
    file.files = e.dataTransfer.files
    compress()
})

function compress() {

    let f = file.files[0]
    if (!f) return

    let url = URL.createObjectURL(f)
    original.src = url

    originalSize.innerText = "Size: " + (f.size / 1024).toFixed(1) + " KB"

    let img = new Image()
    img.src = url

    bar.style.width = "30%"

    img.onload = function () {

        let canvas = document.createElement("canvas")
        let ctx = canvas.getContext("2d")

        canvas.width = img.width
        canvas.height = img.height

        ctx.drawImage(img, 0, 0)

        canvas.toBlob(function (blob) {

            let compressedURL = URL.createObjectURL(blob)
            compressed.src = compressedURL

            compressedSize.innerText = "Size: " + (blob.size / 1024).toFixed(1) + " KB"

            download.onclick = function () {
                let a = document.createElement("a")
                a.href = compressedURL
                a.download = "compressed.jpg"
                a.click()
            }

            bar.style.width = "100%"

        }, "image/jpeg", 0.7)
    }
}