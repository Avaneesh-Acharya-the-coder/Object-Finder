video=""
flag=""
function preload() {
    video=createVideo("video.mp4")
    video.hide()
}
function setup() {
    canvas=createCanvas(400, 300)
    canvas.center()
}
function draw() {
    image(video, 0, 0, 400, 300)
}
function start() {
    obj_det=ml5.objectDetector("cocossd", model_loaded)
    document.getElementById("status").innerHTML="status: Detecting Objects..."
}
function model_loaded() {
    console.log("model is LOADED.")
    flag=true
    video.loop()
    video.speed(1.25)
    video.volume(0.0)
}