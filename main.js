/**
 * Created by Mantock on 5/12/16.
 */
/*
**dropdown () - Function to create a dropdown list for main page
 */

var artist1 = [];
var nickleback = [];

$(document).ready(function() {
    apis.youtube.getData('beyonce', 5, function (success, response) {
        // console.log(success);
        if (success) {
            for (var x = 0; x < response.video.length; x++) {
                artist1.push(response.video[x]);
                // console.log('response', response);

            }
            // console.log(artist1)
        }
    });
        apis.twitter.getData('beyonce I am... tour',
            function (success, response) {
                var my_tweets = response.tweets.statuses;
                for (var i = 0; i < response.tweets.statuses.length; i++) {
                    // console.log(my_tweets[i].created_at);
                    // console.log(my_tweets[i].text);
                }
                console.log(response);
                process_twitter_api(response);
    });
});

    function dropdown() {
        var welcome_position = $('.landing_welcome').position().top;
        var welcome_height = $('.landing_welcome').height();

        var drop_div = $('<div>').css({
            height: '10vh',
            width: '45vw',
            border: '3px solid black',
            position: 'absolute',
            top: '45%',
            left: '45%',
            transform: 'translate(-45%,-45%)'
        }).addClass('drop_animate');
        var drop_text = $('<h1>').text('Beyonce').css({
            textAlign: 'center',
            position: 'relative',
            top: '25%',
            transform: 'translateY(-45%)',
            visibility: 'hidden'
        }).addClass('artist_list');
        $(drop_div).append(drop_text);
        $('.landing_container').append(drop_div);

        $('.drop_animate').animate({top: welcome_position + welcome_height * 2 + 'px'}, 500, function () {
            $('.artist_list').css('visibility', 'visible');
        });
    }

    
function page_scroll () {
}


//Create a Process for Twitter's API
//Input Raw Json from Twitter API
//Output Array of objects holding the info we need
//Info needed in each object user_pic  user_name  tweet_text  tweet_date
function process_twitter_api(response) {
    var tweet_array = [];
    var t_location = response.tweets.statuses;
    for (var i = 0; i < t_location.length ; i++){
        var new_tweet_obj = {};
        new_tweet_obj.text = t_location[i].text;
        new_tweet_obj.user_pic = t_location[i].user.profile_image_url;
        new_tweet_obj.user_name = t_location[i].name;
        new_tweet_obj.date_created = t_location[i].created_at;
        tweet_array.push(new_tweet_obj);
    }
    console.log(tweet_array);
    return tweet_array;
}
    

