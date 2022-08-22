$(() => {
  // Maintains count of tweets so client does not duplicate tweets
  let tweetsOnHand = 0;
  const _maxTweetLengthDoNotChange = 140;
  const $validation = $('#validation');
  const $tweetBox = $('#tweet-box');
  const $readTweets = $('.read-tweets');
  const $tweetText = $('#tweet-text');
  // Make sure the waring validation is out of the way at page load
  $validation.slideUp(0);

  /**
   * Renders the supplied tweets to the dom
   * @param {Array} tweets Can accept object or array
   * @param {Object} element Dom element to attach tweet to
   */
  const renderTweets = (tweets, element) => {
    const $title = element.find('h3');
    if (tweets instanceof Array) {
      for (const tweet of tweets) {
        element.prepend(createTweetElement(tweet));
      }
    } else {
      for (const tweet of Object.values(tweets)) {
        element.prepend(createTweetElement(tweet));
      }
    }
  };
  /**
   * Eliminates harmful strings, shamelessly stolen from lesson example
   * @param {String} str the string to escape
   * @returns {String} the escaped string
   */
  const escapeText = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  /**
   * Makes the server call to load the tweets
   * @param {Object} element Dom object to attach tweets to
   */
  const loadTweets = (element) => {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
    }).then((data) => {
      data = data.sort((a , b) => a.created_at > b.created_at);
      const output = data.slice(tweetsOnHand);
      renderTweets(output, element);
      tweetsOnHand = data.length;
    });
  };
  /**
   * Somewhat messy way to make the tweet element
   * @param {Object} tweet the raw tweet data object
   * @returns {Object} Dom element
   */
  const createTweetElement = (tweet) => {
    // Create the article
    const $article = $('<article>');
    
    // Create the header
    const $header = $('<header>');
    const $headerDiv = $('<div>');
    const $avatar = $(`<img src="${tweet.user.avatars}" />`);
    const $username = $('<h4>').text(tweet.user.name);
    const $handle = $(`<span>`).text(tweet.user.handle);
    // add header to article
    $article.append($header);
    $header.append($headerDiv, $handle);
    $headerDiv.append($avatar, $username);

    // Create the content
    const $content = $('<p>').text(escapeText(tweet.content.text));
    // add content to article
    $article.append($content);

    // Create the footer
    const $footer = $('<footer>');
    const $dateStamp = $('<span>').text(timeago.format(tweet.created_at));
    const $footerDiv = $('<div>');
    const $flag = $('<i class="fa-solid fa-flag"></i>');
    const $retweet = $('<i class="fa-solid fa-retweet"></i>');
    const $heart = $('<i class="fa-solid fa-heart"></i>');
    // add footer to the article
    $article.append($footer);
    $footer.append($dateStamp, $footerDiv);
    $footerDiv.append($flag, $retweet, $heart);

    return $article;
  };
  // On pageload, grab all the tweets from the server
  loadTweets($readTweets);
  // If error message displayed, focusing on the text box will eliminate it
  $tweetText.focus(() => {
    $validation.slideUp(250);
  });
  // Post new tweet
  $('#post-new-tweet').on('click', function(event) {
    event.preventDefault();
    if (!$tweetText.val()) {
      $validation.text('No content').slideDown(250);
      return;
    } else if ($tweetText.val().length > _maxTweetLengthDoNotChange) {
      $validation.text('Too long').slideDown(250);
      return;
    }
    const $form = $('form');
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: $form.serialize()
    })
      .then(function() {
        console.log('load tweets');
        loadTweets($readTweets);
      });
    $tweetText.val('');
    $tweetText.focus();
  });
});