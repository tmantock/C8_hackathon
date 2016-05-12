/**
 * Created by Mantock on 5/12/16.
 */
var artist1 = [];
var nickleback = [];

$(document).ready(function() {
    apis.youtube.getData('beyonce', 5, function(success, response){
        console.log(success);
        if(success){
            for(var x = 0; x < response.video.length ; x++){
                artist1.push(response.video[x]);
                console.log('response', response);
                
            }
            console.log(artist1)
        }
    });
    
});