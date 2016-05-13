/**
 * Created by Mantock on 5/12/16.
 */
/*
**dropdown () - Function to create a dropdown list for main page
 */

//These globals will be used inside update_content to insert content into the page.
//They are updated every time a tour_date object is clicked
var drop = true;
var yt_search_str = '';
var twitter_search_str = '';
var venue_name = '';
var google_lat = 0;
var google_lon = 0;
var artist_pic_src = '';
var artist_bio = '';
var artist_disc = '';

// var artist1 = [];
var nickleback = [];

$(document).ready(function() {
    $('#myModal').load('map2, pano2');
    $("#myModal").on("shown.bs.modal", function () {initialize();});

});

function dropdown() {
    if (drop == true) {
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
            }).addClass('artist_list').on('click', video_load);
            $(drop_div).append(drop_text);
            $('.landing_container').append(drop_div);

            $('#main_page').css('background',"linear-gradient(rgba(255,255,255,.15),rgba(255,255,255,.25)),url('http://wallpapersdsc.net/wp-content/uploads/2016/01/Beyonce-Wallpapers-HD.jpg')");
            $('.drop_animate').animate({top: welcome_position + welcome_height * 2 + 'px'}, 500, function () {
                $('.artist_list').attr('onclick','page_scroll()').css('visibility', 'visible');
            });
        drop = false;
    }
}

function page_scroll () {
    var x = $('.navbar').position().top;
    var xHeight = $('#main_page').height();
    var nHeight = $('.navbar').height();

    $('.drop_animate').toggle('slow');
    $('#main_page').animate({top:(-1*xHeight) + (-1*nHeight)+'px'},900, function () {
        apis.twitter.getData('beyonce I am... tour',
            function (success, response) {
                var my_tweets = response.tweets.statuses;
                for (var i = 0; i < response.tweets.statuses.length; i++) {
                }
                var temp_array = process_twitter_api(response);
            });
    });
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
        new_tweet_obj.user_name = t_location[i].user.screen_name;
        new_tweet_obj.date_created = t_location[i].created_at;
        tweet_array.push(new_tweet_obj);
    }
    console.log(tweet_array);
    twitterList(tweet_array);
    return tweet_array;
}

function twitterList (tweet_object_array) {
    //var firstDiv = $('<div>').addClass('twitter_card').attr('data',1);
    var temp_div = $('<div>').addClass('twitter_card');
    var temp_text = $('<div>').addClass('tweet_text');
    var temp_pic = $('<img>').addClass('tweet_user_pic');
    var temp_user_name = $('<div>').addClass('tweet_user_name');
    var temp_tweet_date = $('<div>').addClass('tweet_date');
    var current_tweet = tweet_object_array[0];
    temp_text.html(current_tweet.text);
    temp_pic.attr('src', current_tweet.user_pic);
    console.log(tweet_object_array[0]);
    temp_user_name.html(current_tweet.user_name);
    temp_tweet_date.html(current_tweet.date_created);
    temp_div.append(temp_pic, temp_user_name, temp_text);
    $('.twitter_feed').append(temp_div);
    var counter = 1;
    for(i=1; i<tweet_object_array.length; i++) { //array should start at 1
        var temp_div = $('<div>').addClass('twitter_card');
        var temp_text = $('<div>').addClass('tweet_text');
        var temp_pic = $('<img>').addClass('tweet_user_pic');
        var temp_user_name = $('<div>').addClass('tweet_user_name');
        var temp_tweet_date = $('<div>').addClass('tweet_date');
        var current_tweet = tweet_object_array[i];
        temp_text.html(current_tweet.text);
        temp_pic.attr('src', current_tweet.user_pic);
        temp_user_name.html(current_tweet.user_name);
        temp_tweet_date.html(current_tweet.date_created);
        temp_div.append(temp_pic, temp_user_name, temp_text);
        var lastPosition = $('.twitter_feed .twitter_card:first-child').position().top;
        var lastHeight = $('.twitter_feed .twitter_card:first-child').height();
        $('.twitter_feed').append(temp_div.attr('data-count',counter));
        $('.twitter_feed div:last-child').animate({top:(lastHeight * counter++) + lastPosition + 'px'}, 1000);
    }
}

//tour_date_object constructor
//input: string  yt_search, string twitter_search, string venue_name, num lat, num lon
//output: new tour_date object


function Tour_date(yt_search, twitter_search, venue_name, lat, lon){

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

function initialize() {
    var att = {lat: 32.747778, lng: -97.092778 };
    var map = new google.maps.Map(document.getElementById('map2'), {
        center: att,
        zoom: 15
    });
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano2'), {
            position: att,
            pov: {
                heading: 34,
                pitch: 10
            }
        });
    map.setStreetView(panorama);
}
function video_load () {
    apis.youtube.getData('single ladies', 5, function (success, response) {
        if (success) {
            vid_id = response.video[0].id;
            console.log('Response Video: ', response.video[1].id);
            onYouTubePlayerAPIReady();
        }
    });
}

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '390',
        width: '640',
        videoId: vid_id
    });
}

