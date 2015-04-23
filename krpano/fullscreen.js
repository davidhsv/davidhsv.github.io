/*
Native FullScreen JavaScript API
-------------
Assumes Mozilla naming conventions instead of W3C for now
*/

(function() {
  var
    fullScreenApi = {
      supportsFullScreen: false,
      isFullScreen: function() { return false; },
      requestFullScreen: function() {},
      cancelFullScreen: function() {},
      fullScreenEventName: '',
      prefix: ''
    },
    browserPrefixes = 'webkit moz o ms khtml'.split(' ');

  // check for native support
  if (typeof document.cancelFullScreen != 'undefined') {
    fullScreenApi.supportsFullScreen = true;
  } else {
    // check for fullscreen support by vendor prefix
    for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
      fullScreenApi.prefix = browserPrefixes[i];

      if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
        fullScreenApi.supportsFullScreen = true;
        break;
      } else if (fullScreenApi.prefix == 'ms') {
        if (typeof document[fullScreenApi.prefix + 'ExitFullscreen' ] != 'undefined' ) {
          fullScreenApi.supportsFullScreen = true;
          break;
        }
      }
    }
  }

  // update methods to do something useful
  if (fullScreenApi.supportsFullScreen) {
    fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

    fullScreenApi.isFullScreen = function() {
      switch (this.prefix) {
        case '':
          return document.fullScreen;
        case 'webkit':
          return document.webkitIsFullScreen;
        case 'ms':
          return document.msFullscreenElement != null;
        default:
          return document[this.prefix + 'FullScreen'];
      }
    }
    fullScreenApi.requestFullScreen = function(el) {
      return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
    }
    fullScreenApi.cancelFullScreen = function(el) {
      return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
    }
  }

  // export api
  window.fullScreenApi = fullScreenApi;
})();

// html5 fullscreen api
function requestfullscreen(div)
{
  var fs = ["requestFullscreen","mozRequestFullScreen","webkitRequestFullScreen","webkitRequestFullscreen","msRequestFullscreen"];

  for (var i=0; i<fs.length; i++)
  {
    if( div[fs[i]] )
    {
      div[fs[i]]();
      break;
    }
  }
}

function exitHandler()
{

  var fs = window.fullScreenApi.isFullScreen();
    if (fs)
    {
        /* Run code on exit */
        document.getElementById('pano').style.display = 'block';
        document.getElementById('bannerpano').style.display = 'none';
    } else {
      document.getElementById('pano').style.display = 'none';
      document.getElementById('bannerpano').style.display = 'block';
    }
}

if (document.addEventListener)
{
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}
