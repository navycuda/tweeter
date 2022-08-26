const updateCounter = (pos, counter) => {
  
  counter.val(pos);
  if (pos < 0) {
    if (!counter.hasClass('red')) {
      counter.addClass('red');
    }
  } else {
    if (counter.hasClass('red')) {
      counter.removeClass('red');
    }
  }
};

$(() => {
  const _maxTweetLengthDoNotChange = 140;
  const counter = $('output.counter');
  // counter.val(120);

  const tweetText = $('#tweet-text');

  tweetText.on('input', () => {
    const pos = _maxTweetLengthDoNotChange - tweetText.val().length;
    updateCounter(pos, counter);
  });
  tweetText.on('focus', () => {
    const pos = _maxTweetLengthDoNotChange - tweetText.val().length;
    updateCounter(pos, counter);
  });
});