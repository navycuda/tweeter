/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const newtonTweet = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};
const descartesTweet = {
  "user": {
    "name": "Descartes",
    "avatars": "https://i.imgur.com/nlhLi3I.png",
    "handle": "@rd" },
  "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1461113959088
};
const data = {
  newtonTweet,
  descartesTweet
};


const renderTweets = (tweets, element) => {
  
  for (const tweet of Object.values(tweets)) {
    element.append(createTweetElement(tweet));
  }
};

const createTweetElement = (tweet) => {
  const $article = $('<article>');
  // Header
  const $header = $('<header>');
  const $headerDiv = $('<div>');
  const $avatar = $(`<img src="${tweet.user.avatars}">`);
  const $name = $('<span>').text(tweet.user.name);
  const $handle = $('<span>').text(tweet.user.handle);
  // Section
  const $section = $('<section>');
  const $sectionText = $(`<p>${tweet.content.text}</p>`);
  // footer
  const $footer = $('<footer>');
  const $dateStamp = $('<span>').text(tweet.created_at);
  const $buttons = $('<div>');
  const $flag = $('<svg class="flag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"/></svg>');
  const $repeat = $('<svg class="repeat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M614.2 334.8C610.5 325.8 601.7 319.1 592 319.1H544V176C544 131.9 508.1 96 464 96h-128c-17.67 0-32 14.31-32 32s14.33 32 32 32h128C472.8 160 480 167.2 480 176v143.1h-48c-9.703 0-18.45 5.844-22.17 14.82s-1.656 19.29 5.203 26.16l80 80.02C499.7 445.7 505.9 448 512 448s12.28-2.344 16.97-7.031l80-80.02C615.8 354.1 617.9 343.8 614.2 334.8zM304 352h-128C167.2 352 160 344.8 160 336V192h48c9.703 0 18.45-5.844 22.17-14.82s1.656-19.29-5.203-26.16l-80-80.02C140.3 66.34 134.1 64 128 64S115.7 66.34 111 71.03l-80 80.02C24.17 157.9 22.11 168.2 25.83 177.2S38.3 192 48 192H96V336C96 380.1 131.9 416 176 416h128c17.67 0 32-14.31 32-32S321.7 352 304 352z"/></svg>');
  const $heart = $('<svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"/></svg>');

  // Assemble the article
  $article
    .append($header, $section, $footer);
  // Assemble the header
  $header
    .append($headerDiv, $handle);
  // Assemble the header div
  $headerDiv
    .append($avatar, $name);
  // Assemble the section
  $section
    .append($sectionText);
  // Assemble the footer
  $footer
    .append($dateStamp, $buttons);
  // Assemble the buttons
  $buttons
    .append($flag, $repeat, $heart);

  return $article;
};



// Execution
$(() => {
  console.log('Good job bro!');
  const $tweetBox = $('main');
  const $tweetText = $('#tweet-text');
  // const $outputTweet = createTweetElement(newtonTweet);

  // console.log($tweetBox);
  // console.log($outputTweet);

  // $outputTweet.appendTo($tweetBox);


  renderTweets(data, $tweetBox);

  $('#post-new-tweet').on('click', function(event) {
    event.preventDefault();
    console.log($tweetText.val());
    const $form = $tweetBox.find('form');

    console.log($form.serialize());

    $tweetText.val('');
    $tweetText.focus();

  });





});