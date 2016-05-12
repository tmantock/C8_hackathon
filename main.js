/**
 * Created by Mantock on 5/12/16.
 */

// ------ Twitter API call
$(document).ready(function(){
    apis.twitter.getData('Beyonce concert',
        function(success, response){
            var my_tweets = response.tweets.statuses;
            for(var i = 0 ; i < response.tweets.statuses.length; i++){
                console.log(my_tweets[i].created_at);
                console.log(my_tweets[i].text);
            }
            console.log(response);
        }
    );
});