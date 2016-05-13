/**
 * Created by Mantock on 5/12/16.
 */
/*
**dropdown () - Function to create a dropdown list for main page
 */

//Global Variables used to update content to respond to user choices.
//The choices that change these variables are:
//----Choosing a new venue
//----Choosing a new artist

var drop = true;
var yt_search_str = '';
var twitter_search_str = '';
var google_lat = 0;
var google_lon = 0;
var artist_pic_src = '';
var artist_bio = '';
var artist_disc = '';

//Global variables to store information about artists

var global_tour_dates = [];

$(document).ready(function() {
    $('#myModal').load('map2, pano2');
    $("#myModal").on("shown.bs.modal", function () {initialize();});
    // populate_tour('Beyonce');

});

//function dropdown:
//input: none
//output: creates a dropdown search bar underneath the main landing div
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
                visibility: 'hidden',
                cursor: 'default'
            }).addClass('artist_list').on('click', video_load);
            $(drop_div).append(drop_text);
            $('.landing_container').append(drop_div);
        
            $('.drop_animate').animate({top: welcome_position + welcome_height * 2 + 'px'}, 500, function () {
                $('.artist_list').attr('onclick','page_scroll()').css('visibility', 'visible');
            });
        drop = false;
    }
}

function page_scroll () {
    var xposition = $('#home_page').position().top;
    var xHeight = $('#home_page').height();

    $('.drop_animate').toggle('slow');
    $('#main_page').animate({top:(-1*xHeight) + xposition + 'px'},900, function () {
        apis.twitter.getData('beyonce I am... tour',
            function (success, response) {
                var my_tweets = response.tweets.statuses;
                for (var i = 0; i < response.tweets.statuses.length; i++) {
                }
                var temp_array = process_twitter_api(response);
            });
        speaker ();
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

//function twitterList
//input: array of tweet objects containing information to build a tweet div
//output: The twitter feed on the right of the page is populated with tweets
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
    temp_user_name.html('@' + current_tweet.user_name);
    temp_tweet_date.html(current_tweet.date_created);
    temp_div.append(temp_pic, temp_user_name, temp_text);
    $('.twitter_feed').append(temp_div);
    var counter = 1;
    for(i=1; i<tweet_object_array.length; i++) { //array should start at 1
        temp_div = $('<div>').addClass('twitter_card');
        temp_text = $('<div>').addClass('tweet_text');
        temp_pic = $('<img>').addClass('tweet_user_pic');
        temp_user_name = $('<div>').addClass('tweet_user_name');
        temp_tweet_date = $('<div>').addClass('tweet_date');
        current_tweet = tweet_object_array[i];
        temp_text.html(current_tweet.text);
        temp_pic.attr('src', current_tweet.user_pic);
        temp_user_name.html('@' + current_tweet.user_name);
        temp_tweet_date.html(current_tweet.date_created);
        temp_div.append(temp_pic, temp_user_name, temp_text);
        var lastPosition = $('.twitter_feed .twitter_card:first-child').position().top;
        var lastHeight = $('.twitter_feed .twitter_card:first-child').height();
        $('.twitter_feed').append(temp_div.attr('data-count',counter));
        $('.twitter_feed div:last-child').animate({top:(lastHeight * counter) + (15 * counter++) + 'px'}, 1000);
    }
}

//tour_date_object constructor
//input: date object
//output: new tour_date object and corresponding DOM elements in carousel

function Tour_date(date_object, first, id){
    console.log('constructing new object');
    b = date_object;
    this.event_date = b.event_date
    this.venue_city = b.venue_city;
    this.venue_name = b.venue_name;
    this.lat = b.venue_lat_lon.lat;
    this.lon = b.venue_lat_lon.lon;
    this.make_dom_object(first, id);
}
//update_globals function
//input: none
//output: Updates global google long/lat values based off of the properties of the Tour_date object
Tour_date.prototype.update_globals = function(){
    google_lat = this.lat;
    google_lon = this.lon;
};

//input: none
//output: A DOM element with class item and class tour_date for the carousel
Tour_date.prototype.make_dom_object = function(first, id){
    var tour_date_dom = $('<div>').addClass('item');
    tour_date_dom.addClass('tour_date');
    if (first){
        tour_date_dom.addClass('active');
    }
    tour_date_dom.attr('data-id', ''+id);
    var date = $('<div>');
    date.html(this.event_date);
    tour_date_dom.html(this.venue_city);
    $('#myCarousel .carousel-inner').append(tour_date_dom);
    console.log('appending dom to carousel');
};

//input: none
//output: an empty carousel in the main page
function clear_carousel(){
    $('#myCarousel.carousel.slide .carousel-indicators').children().remove();
    $('#myCarousel .carousel-inner').children().remove();
    console.log('clear carousel?');
}

//input: List of date objects
//output: Carousel is populated with an arbitrary number of tour_date divs dynamically generated from bandsintown API

function populate_carousel(event_list){
    clear_carousel();
    console.log(event_list)
    var a = event_list;
    var first = true;
    for (var i = 0; i < a.length; i++){
        var b = $('<li>').attr('data-target', '#myCarousel');
        var c = new Tour_date(a[i], first);
        if (first == true){
            first = false;
        }
        b.attr('data-slide-to', ''+i);
        $('#myCarousel .carousel-indicators').append(b);
    }
    console.log('carousel populated?')
}

//input: none
//output: google modal populated with content based off of the current venue

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

//input: artist_name, string containing the name of the artist that we are going to load content for
//output: the global array global_tour_dates is full of events based off of the artist that was searched for

function populate_tour(artist_name){
    global_tour_dates = [];
    $.getJSON("http://api.bandsintown.com/artists/" + artist_name + "/events.json?callback=?&app_id=LF_HACKATHON&date=2010-01-01,2016-01-01", function(result) {
        console.log("if successful: " , result);
        $.each(result, function(key, value){
            if(result[key].venue.region == 'CA'){//only target events taking place in california
                var a = result[key];
                var temp_obj = {};
                temp_obj.event_date = a.datetime;
                temp_obj.venue_name = a.venue.name;
                temp_obj.venue_city = a.venue.city;
                temp_obj.venue_lat_lon = {lat: a.venue.latitude, lon:a.venue.longitute};
                console.log ('key: ' + key + ', info:', temp_obj);
                global_tour_dates.push(temp_obj);
            }
        });
        populate_carousel(global_tour_dates);
    });
    console.log("Tour populated");
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
//function speaker
//input: none
//output: created the speaker grills beside the youtube video
function speaker () {
    var speaker_position = $('.speaker_hole').position().top;
    var speaker_div = $('<div>').addClass('speaker_hole speaker_animate');
    $('.speaker').append(speaker_div.css('top',speaker_position));
    var second_speaker_position;
    var large_speaker;
    $('.speaker_animate').animate({top: speaker_position + 150 + 'px'},1000);
    setTimeout(function () {
        second_speaker_position = $('.speaker_animate').position().top;
        large_speaker = $('<div>').addClass('speaker_hole speaker_grow');
        $('.speaker').append(large_speaker.css('top', second_speaker_position));
        $('.speaker_grow').animate({top: '-=25', height: '+=50', width: '+=50'},500);
    },1000);
}
var ra = 0;
var rd = 0;
var et = 0;
function ramrod () {
    var ram = 'am';
    var rod = 'od';
    var entertainment = 'ntertainment';
    if (rd < rod.length) {
        var stringLetterTwo = rod.charAt(rd++);
        $(".text_two").text($(".text_two").text() + stringLetterTwo);
    }
    if (ra < ram.length) {
        var stringLetter = ram.charAt(ra++);
        $(".text_one").text($(".text_one").text() + stringLetter);
    }
    if (et < entertainment.length) {
        var stringLetterThree = entertainment.charAt(et++);
        $(".text_three").text($(".text_three").text() + stringLetterThree);

    }
    else {
        return false;
    }
    setTimeout(ramrod, 75);
}

//function ramrod_leave
//input: none
//output: shrinks the ramrod entertainment logo back to its minified form
function ramrod_leave () {
    $('.text_one,.text_two,.text_three').html('');
    ra = 0;
    rd = 0;
    et = 0;
}

