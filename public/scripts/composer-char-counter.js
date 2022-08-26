$(() => {
  const _maxTweetLengthDoNotChange = 140;
  const counter = $('output.counter');
  const tweetText = $('#tweet-text');

  const updateCounter = () => {
    const pos = _maxTweetLengthDoNotChange - tweetText.val().length;
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

  tweetText.on('input', () => {
    updateCounter();
  });
  tweetText.on('focus', () => {
    updateCounter();
  });
});