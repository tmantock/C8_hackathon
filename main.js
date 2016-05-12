/**
 * Created by Mantock on 5/12/16.
 */
/*
**dropdown () - Function to create a dropdown list for main page
 */

//These globals will be used inside update_content to insert content into the page.
//They are updated every time a tour_date object is clicked

var yt_search_str = '';
var twitter_search_str = '';
var venue_name = '';
var google_lat = 0;
var google_lon = 0;
var artist_pic_src = '';
var artist_bio = '';
var artist_disc = '';

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
    
//function make_tweet_divs
//input: array of objects containing information about tweets
//output: none
//result: appends one div per tweet to the twitter container;
function make_tweet_divs(tweet_object_array){
    var temp_div = $('<div>').addClass('tweet_div');
    var temp_text = $('<div>').addClass('tweet_text');
    var temp_pic = $('<img>').addClass('tweet_user_pic');
    var temp_user_name = $('<div>').addClass('tweet_user_name');
    var temp_tweet_date = $('<div>').addClass('tweet_date');
    for (var i = 0; i < tweet_object_array.length; i++){
        var current_tweet = tweet_object_array[i];
        temp_text.html(current_tweet.text);
        temp_pic.attr('src', current_tweet.user_pic);
        temp_user_name.html(current_tweet.user_name);
        temp_tweet_date.html(current_tweet.date_created);
        temp_div.append(temp_pic, temp_user_name, temp_text);
        $('.twitter_container').append(temp_div);
    }
}

//tour_date_object constructor
//input: string  yt_search, string twitter_search, string venue_name, num lat, num lon
//output: new tour_date object

function Tour_date(yt_search, twitter_search, venue_name, lat, lon{
    this.yt_search = yt_search;
    this.twitter_search = twitter_search;
    this.venue_name = venue_name;
    this.lat = lat;
    this.lon = lon;
}

Tour_date.prototype.update_globals = function(){
    yt_search_str = this.yt_search;
    twitter_search_str = this.twitter_search;
    venue_name = this.venue_name;
    google_lat = this.lat;
    google_lon = this.lon;
};

Tour_date.prototype.make_dom_object = function(){
    var new_tour_date_dom = $('<div>');
    new_tour_date_dom.addClass('')
};