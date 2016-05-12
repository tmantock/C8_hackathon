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
    


// ------ Twitter API call
$(document).ready(function(){
    apis.twitter.getData('beyonce On the run tour',
        function(success, response){
            var my_tweets = response.tweets.statuses;
            for(var i = 0 ; i < response.tweets.statuses.length; i++){
                console.log(my_tweets[i].created_at);
                console.log(my_tweets[i].text);
            }
            console.log(response);
        }
    );

})