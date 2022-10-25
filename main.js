
objects = [];
status  = "";
function preload() {


}

function setup(){
     canvas =  createCanvas(480, 380);
     canvas.center();
     video = createCapture(VIDEO);
     video.hide();
}

function draw() {
    image(video,0,0,480,380);

    if (status != "") {
        objectDetector.detect(video, gotResult);

        for ( i = 0; i < objects.length; i++ )       {
            document.getElementById("status").innerHTML = "status :  objects detected";
            fill("green");
            percent =  floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("cyan")
            rect(objects[i].x , objects[i].y , objects[i].width, objects[i].height);


            if (objects[i].label == object_name) {
                video.stop();
                objectDectector.detect(gotResult);
                document.getElementsById("number_of_objects").innerHTML = object_name +  "found!"
                synth = window.speechSynthesis
                utterThis = new SpeechSynthesisUtterance(object_name + "found!");
                synth.speak(utterThis);
                
                
            }

            else { 
                document.getElementsById("number_of_objects").innerHTML = object_name +  " not found :("

            }

        }
    }



}

function start() {
    objectDetector =  ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML =  "status :  detecting objects";
    object_name =  document.getElementById("fname").innerHTML

}

function modelLoaded()
{
    console.log("model loaded!");
    status = true;

}

function gotResult(error, results) {
    if (error) {
        console.log(error);

    }
     console.log(results);
     objects  =  results;

}