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
        console.log(success);
        if (success) {
            for (var x = 0; x < response.video.length; x++) {
                artist1.push(response.video[x]);
                console.log('response', response);

            }
            console.log(artist1)
        }
    });
        apis.twitter.getData('beyonce I am... tour',
            function (success, response) {
                var my_tweets = response.tweets.statuses;
                for (var i = 0; i < response.tweets.statuses.length; i++) {
                    console.log(my_tweets[i].created_at);
                    console.log(my_tweets[i].text);
                }
                console.log(response);
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

    
// function page_scroll () {
// }
    

