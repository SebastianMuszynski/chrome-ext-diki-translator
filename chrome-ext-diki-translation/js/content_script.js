function getDikiTranslationURL(phraseToTranslate) {
  return 'https://www.diki.pl/slownik-angielskiego?q=' + phraseToTranslate;
}

function translateSelection() {
  var iframeClassName = 'dikiTranslationIframe';
  var visibleClassName = 'visible';
  var timeToShow = 1000;
  var timeToHideAfterMouseLeave = 1000;

  try {
    var selection = window.getSelection().toString();
    var iframe = document.querySelector('.' + iframeClassName);

    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.className = iframeClassName;
      document.body.appendChild(iframe);
    }

    iframe.src = getDikiTranslationURL(selection);

    setTimeout(function() {
      iframe.classList.add(visibleClassName);
    }, timeToShow);

    iframe.addEventListener('mouseleave', function() {
      setTimeout(function() {
        iframe.classList.remove(visibleClassName);
      }, timeToHideAfterMouseLeave);
    })
  } catch (err) {}
}

function initContentScript() {
  var delta = 500;
  var lastKeyPressTime = 0;

  document.addEventListener('keydown', function (event) {
    var code = event.which || event.keyCode;
    // Listen on pressing 'd' twice
    if (code == 68) {
      var currentKeyPressTime = new Date();
      if (currentKeyPressTime - lastKeyPressTime <= delta) {
        translateSelection();
        currentKeyPressTime = 0;
      }
      lastKeyPressTime = currentKeyPressTime;
    }
  });
}

initContentScript();
