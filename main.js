objects=[]
video=""
flag=""
function preload() {


}
function setup() {
    canvas=createCanvas(500, 300)
    canvas.center()
    v=createCapture(VIDEO)
    v.size(500, 300)
    v.hide()
}
function start() {
    obj_det=ml5.objectDetector("cocossd", model_loaded)
    document.getElementById("status").innerHTML="status: Detecting Objects..."
}
function draw() {
    image(v, 0, 0, 500, 300)
    console.log(flag)
    if (flag!="") {
        obj_det.detect(v, got_results)
        console.log(objects.length)
        for ( i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status: Objects Detected"
            input= document.getElementById("object_inputed").value
            document.getElementById("number_of_objects").innerHTML="Number of Objects: "+ objects.length
            fill("blue")
            percent= floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"%", objects[i].x+50, objects[i].y)
            noFill()
            stroke("black")
            rect(objects[i].x+50, objects[i].y, objects[i].width, objects[i].height)
            if (input==objects[i].label) {
                v.stop()
                obj_det.detect(got_results)
                document.getElementById("number_of_objects").innerHTML="Object: "+ objects[i].label+" Detected"
                ss=window.speechSynthesis;
                u=new SpeechSynthesisUtterance(objects[i].label+" Detected")
                ss.speak(u)
            }
            else{
                document.getElementById("number_of_objects").innerHTML="Object Not Detected"
            }
        }
    }
}
function got_results(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        objects=results
    }
}
function model_loaded() {
    console.log("model is LOADED.")
    flag=true
}