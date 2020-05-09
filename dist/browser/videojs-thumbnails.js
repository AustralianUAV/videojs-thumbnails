(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsThumbnails = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var videojs = _interopDefault((typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null));
var global = require(1);

var ThumbnailHelpers = function () {
  function ThumbnailHelpers() {
    _classCallCheck(this, ThumbnailHelpers);
  }

  _createClass(ThumbnailHelpers, null, [{
    key: 'hidePlayerOnHoverTime',
    value: function hidePlayerOnHoverTime(progressControl) {
      var mouseTime = progressControl.el_.getElementsByClassName('vjs-mouse-display')[0];

      mouseTime.style.display = 'none';
    }
  }, {
    key: 'createThumbnails',
    value: function createThumbnails() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var thumbnailClip = args.shift() || {};

      Object.keys(args).map(function (i) {
        var singleThumbnail = args[i];

        Object.keys(singleThumbnail).map(function (property) {
          if (singleThumbnail.hasOwnProperty(property)) {
            if (_typeof(singleThumbnail[property]) === 'object') {
              thumbnailClip[property] = ThumbnailHelpers.createThumbnails(thumbnailClip[property], singleThumbnail[property]);
            } else {
              thumbnailClip[property] = singleThumbnail[property];
            }
          }
          return thumbnailClip;
        });
        return thumbnailClip;
      });
      return thumbnailClip;
    }
  }, {
    key: 'getComputedStyle',
    value: function getComputedStyle(thumbnailContent, pseudo) {
      return function (prop) {
        if (global.window.getComputedStyle) {
          return global.window.getComputedStyle(thumbnailContent, pseudo)[prop];
        }
        return thumbnailContent.currentStyle[prop];
      };
    }
  }, {
    key: 'getVisibleWidth',
    value: function getVisibleWidth(thumbnailContent, width) {
      if (width) {
        return parseFloat(width);
      }

      var clip = ThumbnailHelpers.getComputedStyle(thumbnailContent)('clip');

      if (clip !== 'auto' && clip !== 'inherit') {
        clip = clip.split(/(?:\(|\))/)[1].split(/(?:,| )/);
        if (clip.length === 4) {
          return parseFloat(clip[1]) - parseFloat(clip[3]);
        }
      }
      return 0;
    }
  }, {
    key: 'getScrollOffset',
    value: function getScrollOffset() {
      if (global.window.pageXOffset) {
        return {
          x: global.window.pageXOffset,
          y: global.window.pageYOffset
        };
      }
      return {
        x: global.document.documentElement.scrollLeft,
        y: global.document.documentElement.scrollTop
      };
    }
  }, {
    key: 'suportAndroidEvents',
    value: function suportAndroidEvents(player) {
      // Android doesn't support :active and :hover on non-anchor and non-button elements
      // so, we need to fake the :active selector for thumbnails to show up.
      var progressControl = player.controlBar.progressControl;

      var addFakeActive = function addFakeActive() {
        progressControl.addClass('fake-active');
      };

      var removeFakeActive = function removeFakeActive() {
        progressControl.removeClass('fake-active');
      };

      progressControl.on('touchstart', addFakeActive);
      progressControl.on('touchend', removeFakeActive);
      progressControl.on('touchcancel', removeFakeActive);
    }
  }, {
    key: 'createThumbnaislHolder',
    value: function createThumbnaislHolder() {
      var wrap = global.document.createElement('div');

      wrap.className = 'vjs-thumbnail-holder';
      return wrap;
    }
  }, {
    key: 'createThumbnailImg',
    value: function createThumbnailImg(thumbnailClips) {
      var thumbnailImg = global.document.createElement('img');

      thumbnailImg.src = thumbnailClips['0'].src;
      thumbnailImg.className = 'vjs-thumbnail-img';
      return thumbnailImg;
    }
  }, {
    key: 'createThumbnailTime',
    value: function createThumbnailTime() {
      var time = global.document.createElement('div');

      time.className = 'vjs-thumbnail-time';
      time.id = 'vjs-time';
      return time;
    }
  }, {
    key: 'createThumbnailArrowDown',
    value: function createThumbnailArrowDown() {
      var arrow = global.document.createElement('div');

      arrow.className = 'vjs-thumbnail-arrow';
      arrow.id = 'vjs-arrow';
      return arrow;
    }
  }, {
    key: 'mergeThumbnailElements',
    value: function mergeThumbnailElements(thumbnailsHolder, thumbnailImg, timelineTime, thumbnailArrowDown) {

      thumbnailsHolder.appendChild(thumbnailImg);
      thumbnailsHolder.appendChild(timelineTime);
      thumbnailsHolder.appendChild(thumbnailArrowDown);
      return thumbnailsHolder;
    }
  }, {
    key: 'centerThumbnailOverCursor',
    value: function centerThumbnailOverCursor(thumbnailImg) {
      // center the thumbnail over the cursor if an offset wasn't provided
      if (!thumbnailImg.style.left && !thumbnailImg.style.right) {
        thumbnailImg.onload = function () {
          var thumbnailWidth = { width: -(thumbnailImg.naturalWidth / 2) };

          thumbnailImg.style.left = thumbnailWidth + 'px';
        };
      }
    }
  }, {
    key: 'getVideoDuration',
    value: function getVideoDuration(player) {
      var duration = player.duration();

      player.on('durationchange', function () {
        duration = player.duration();
      });
      return duration;
    }
  }, {
    key: 'addThumbnailToPlayer',
    value: function addThumbnailToPlayer(progressControl, thumbnailsHolder) {
      progressControl.el().appendChild(thumbnailsHolder);
    }
  }, {
    key: 'findMouseLeftOffset',
    value: function findMouseLeftOffset(pageMousePositionX, progressControl, pageXOffset, event) {
      // find the page offset of the mouse
      var leftOffset = pageMousePositionX || event.clientX + global.document.body.scrollLeft + global.document.documentElement.scrollLeft;

      // subtract the page offset of the positioned offset parent
      leftOffset -= progressControl.el().getBoundingClientRect().left + pageXOffset;
      return leftOffset;
    }
  }, {
    key: 'getMouseVideoTime',
    value: function getMouseVideoTime(mouseLeftOffset, progressControl, duration) {
      return Math.floor(mouseLeftOffset /*- progressControl.el().offsetLeft*/ / progressControl.width() * duration);
    }
  }, {
    key: 'updateThumbnailTime',
    value: function updateThumbnailTime(timelineTime, progressControl) {
      timelineTime.innerHTML = progressControl.seekBar.mouseTimeDisplay.timeTooltip.el_.textContent;
    }
  }, {
    key: 'getPageMousePositionX',
    value: function getPageMousePositionX(event) {
      var pageMouseOffsetX = event.pageX;

      if (event.changedTouches) {
        pageMouseOffsetX = event.changedTouches[0].pageX;
      }
      return pageMouseOffsetX;
    }
  }, {
    key: 'keepThumbnailInsidePlayer',
    value: function keepThumbnailInsidePlayer(thumbnailImg, activeThumbnail, thumbnailClips, mouseLeftOffset, progresBarRightOffset) {

      var width = ThumbnailHelpers.getVisibleWidth(thumbnailImg, activeThumbnail.width || thumbnailClips[0].width);

      var halfWidth = width / 2;

      // make sure that the thumbnail doesn't fall off the right side of
      // the left side of the player
      if (mouseLeftOffset + halfWidth > progresBarRightOffset) {
        mouseLeftOffset -= mouseLeftOffset + halfWidth - progresBarRightOffset;
      } else if (mouseLeftOffset < halfWidth) {
        mouseLeftOffset = halfWidth;
      }
      return mouseLeftOffset;
    }
  }, {
    key: 'updateThumbnailLeftStyle',
    value: function updateThumbnailLeftStyle(mouseLeftOffset, thumbnailsHolder) {
      var leftValue = { mouseLeftOffset: mouseLeftOffset };

      thumbnailsHolder.style.left = leftValue.mouseLeftOffset + 'px';
    }
  }, {
    key: 'getActiveThumbnail',
    value: function getActiveThumbnail(thumbnailClips, mouseTime) {
      var activeClip = 0;

      for (var clipNumber in thumbnailClips) {
        if (mouseTime > clipNumber) {
          activeClip = Math.max(activeClip, clipNumber);
        }
      }
      return thumbnailClips[activeClip];
    }
  }, {
    key: 'updateThumbnailSrc',
    value: function updateThumbnailSrc(activeThumbnail, thumbnailImg) {
      if (activeThumbnail.src && thumbnailImg.src !== activeThumbnail.src) {
        thumbnailImg.src = activeThumbnail.src;
      }
    }
  }, {
    key: 'updateThumbnailStyle',
    value: function updateThumbnailStyle(activeThumbnail, thumbnailImg) {
      if (activeThumbnail.style && thumbnailImg.style !== activeThumbnail.style) {
        ThumbnailHelpers.createThumbnails(thumbnailImg.style, activeThumbnail.style);
      }
    }
  }, {
    key: 'moveListener',
    value: function moveListener(event, progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg, player) {

      var duration = ThumbnailHelpers.getVideoDuration(player);
      var pageXOffset = ThumbnailHelpers.getScrollOffset().x;
      var progresBarPosition = progressControl.children()[0].el().getBoundingClientRect();

      var progresBarRightOffset = (progresBarPosition.width || progresBarPosition.right) + pageXOffset;

      var pageMousePositionX = ThumbnailHelpers.getPageMousePositionX(event);

      var mouseLeftOffset = ThumbnailHelpers.findMouseLeftOffset(pageMousePositionX, progressControl.children()[0], pageXOffset, event);

      var mouseTime = ThumbnailHelpers.getMouseVideoTime(mouseLeftOffset, progressControl.children()[0], duration);

      var activeThumbnail = ThumbnailHelpers.getActiveThumbnail(thumbnailClips, mouseTime);

      ThumbnailHelpers.updateThumbnailTime(timelineTime, progressControl);

      ThumbnailHelpers.updateThumbnailSrc(activeThumbnail, thumbnailImg);

      ThumbnailHelpers.updateThumbnailStyle(activeThumbnail, thumbnailImg);

      mouseLeftOffset = ThumbnailHelpers.keepThumbnailInsidePlayer(thumbnailImg, activeThumbnail, thumbnailClips, mouseLeftOffset, progresBarRightOffset);

      ThumbnailHelpers.updateThumbnailLeftStyle(mouseLeftOffset, thumbnailsHolder);

      //console.log("moveListener timelineTime: " + timelineTime + ", activeThumbnail: " + activeThumbnail);
      //console.log("pageMousePositionX: " + pageMousePositionX + ", mouseLeftOffset: " + mouseLeftOffset);
      //console.dir(activeThumbnail);
    }
  }, {
    key: 'upadateOnHover',
    value: function upadateOnHover(progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg, player) {

      // update the thumbnail while hovering
      progressControl.on('mousemove', function (event) {
        ThumbnailHelpers.moveListener(event, progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg, player);
      });
      progressControl.on('touchmove', function (event) {
        ThumbnailHelpers.moveListener(event, progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg);
      });
    }
  }, {
    key: 'hideThumbnail',
    value: function hideThumbnail(thumbnailsHolder) {
      thumbnailsHolder.style.left = '-1000px';
    }
  }, {
    key: 'upadateOnHoverOut',
    value: function upadateOnHoverOut(progressControl, thumbnailsHolder, player) {

      // move the placeholder out of the way when not hovering
      progressControl.on('mouseout', function (event) {
        ThumbnailHelpers.hideThumbnail(thumbnailsHolder);
      });
      progressControl.on('touchcancel', function (event) {
        ThumbnailHelpers.hideThumbnail(thumbnailsHolder);
      });
      progressControl.on('touchend', function (event) {
        ThumbnailHelpers.hideThumbnail(thumbnailsHolder);
      });
      player.on('userinactive', function (event) {
        ThumbnailHelpers.hideThumbnail(thumbnailsHolder);
      });
    }
  }]);

  return ThumbnailHelpers;
}();

// Default options for the plugin.


var defaults = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player.
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */

var prepareThumbnailsClips = function prepareThumbnailsClips(videoTime, options) {

  var currentTime = 0;
  var currentIteration = 0;
  var thumbnailOffset = 0;
  var stepTime = options.stepTime;
  var thumbnailWidth = options.width;
  var spriteURL = options.spriteUrl;
  var thumbnailClips = {
    0: {
      src: spriteURL,
      style: {
        left: thumbnailWidth / 2 * -1 + 'px',
        width: (Math.floor(videoTime / stepTime) + 1) * thumbnailWidth + 'px',
        clip: 'rect(0,' + options.width + 'px,' + options.width + 'px, 0)'
      }
    }
  };

  while (currentTime <= videoTime) {
    currentTime += stepTime;
    thumbnailOffset = ++currentIteration * thumbnailWidth;
    thumbnailClips[currentTime] = {
      style: {
        left: (thumbnailWidth / 2 + thumbnailOffset) * -1 + 'px',
        clip: 'rect(0, ' + (thumbnailWidth + thumbnailOffset) + 'px,' + options.width + 'px, ' + thumbnailOffset + 'px)'
      }
    };
  }
  return thumbnailClips;
};

var initializeThumbnails = function initializeThumbnails(thumbnailsClips, player) {

  var thumbnailClips = ThumbnailHelpers.createThumbnails({}, defaults, thumbnailsClips);
  var progressControl = player.controlBar.progressControl;
  var thumbnailImg = ThumbnailHelpers.createThumbnailImg(thumbnailClips);
  var timelineTime = ThumbnailHelpers.createThumbnailTime();
  var thumbnailArrowDown = ThumbnailHelpers.createThumbnailArrowDown();
  var thumbnaislHolder = ThumbnailHelpers.createThumbnaislHolder();

  thumbnaislHolder = ThumbnailHelpers.mergeThumbnailElements(thumbnaislHolder, thumbnailImg, timelineTime, thumbnailArrowDown);
  ThumbnailHelpers.hidePlayerOnHoverTime(progressControl);

  if (global.window.navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
    ThumbnailHelpers.suportAndroidEvents();
  }

  ThumbnailHelpers.createThumbnails(thumbnailImg.style, thumbnailClips['0'].style);

  ThumbnailHelpers.centerThumbnailOverCursor(thumbnailImg);

  ThumbnailHelpers.addThumbnailToPlayer(progressControl, thumbnaislHolder);

  ThumbnailHelpers.upadateOnHover(progressControl, thumbnaislHolder, thumbnailClips, timelineTime, thumbnailImg, player);

  ThumbnailHelpers.upadateOnHoverOut(progressControl, thumbnaislHolder, player);
};

var onPlayerReady = function onPlayerReady(player, options) {
  player.on('loadedmetadata', function () {
    var thumbnailsClips = prepareThumbnailsClips(player.duration(), options);

    initializeThumbnails(thumbnailsClips, player);
  });
};
/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function thumbnails
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var thumbnails = function thumbnails(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('thumbnails', thumbnails);

// Include the version number.
thumbnails.VERSION = '1.0.2';

module.exports = thumbnails;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1}]},{},[2])(2)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNUQTs7Ozs7Ozs7QUFFQSxTQUFTLGVBQVQsQ0FBMEIsRUFBMUIsRUFBOEI7QUFBRSxTQUFRLE1BQU8sUUFBTyxFQUFQLHlDQUFPLEVBQVAsT0FBYyxRQUFyQixJQUFrQyxhQUFhLEVBQWhELEdBQXNELEdBQUcsU0FBSCxDQUF0RCxHQUFzRSxFQUE3RTtBQUFrRjs7QUFFbEgsSUFBSSxVQUFVLGdCQUFnQixRQUFRLFVBQVIsQ0FBaEIsQ0FBZDtBQUNBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjs7SUFFTSxnQjs7Ozs7OzswQ0FFeUIsZSxFQUFpQjtBQUM1QyxVQUFNLFlBQVksZ0JBQWdCLEdBQWhCLENBQW9CLHNCQUFwQixDQUEyQyxtQkFBM0MsRUFBZ0UsQ0FBaEUsQ0FBbEI7O0FBRUEsZ0JBQVUsS0FBVixDQUFnQixPQUFoQixHQUEwQixNQUExQjtBQUNEOzs7dUNBRWdDO0FBQUEsd0NBQU4sSUFBTTtBQUFOLFlBQU07QUFBQTs7QUFDL0IsVUFBTSxnQkFBZ0IsS0FBSyxLQUFMLE1BQWdCLEVBQXRDOztBQUVBLGFBQU8sSUFBUCxDQUFZLElBQVosRUFBa0IsR0FBbEIsQ0FBc0IsVUFBQyxDQUFELEVBQU87QUFDM0IsWUFBTSxrQkFBa0IsS0FBSyxDQUFMLENBQXhCOztBQUVBLGVBQU8sSUFBUCxDQUFZLGVBQVosRUFBNkIsR0FBN0IsQ0FBaUMsVUFBQyxRQUFELEVBQWM7QUFDN0MsY0FBSSxnQkFBZ0IsY0FBaEIsQ0FBK0IsUUFBL0IsQ0FBSixFQUE4QztBQUM1QyxnQkFBSSxRQUFPLGdCQUFnQixRQUFoQixDQUFQLE1BQXFDLFFBQXpDLEVB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VUFBN0I7O0FBRUE7QUFDQSxXQUFXLE9BQVgsR0FBcUIsYUFBckI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLFVBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzZWxmO1xufSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHt9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfaW50ZXJvcERlZmF1bHQgKGV4KSB7IHJldHVybiAoZXggJiYgKHR5cGVvZiBleCA9PT0gJ29iamVjdCcpICYmICdkZWZhdWx0JyBpbiBleCkgPyBleFsnZGVmYXVsdCddIDogZXg7IH1cblxudmFyIHZpZGVvanMgPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgndmlkZW8uanMnKSk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnZ2xvYmFsJyk7XG5cbmNsYXNzIFRodW1ibmFpbEhlbHBlcnMge1xyXG5cclxuICBzdGF0aWMgaGlkZVBsYXllck9uSG92ZXJUaW1lKHByb2dyZXNzQ29udHJvbCkge1xyXG4gICAgY29uc3QgbW91c2VUaW1lID0gcHJvZ3Jlc3NDb250cm9sLmVsXy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2anMtbW91c2UtZGlzcGxheScpWzBdO1xyXG5cclxuICAgIG1vdXNlVGltZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbHMoLi4uYXJncykge1xyXG4gICAgY29uc3QgdGh1bWJuYWlsQ2xpcCA9IGFyZ3Muc2hpZnQoKSB8fCB7fTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhhcmdzKS5tYXAoKGkpID0+IHtcclxuICAgICAgY29uc3Qgc2luZ2xlVGh1bWJuYWlsID0gYXJnc1tpXTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKHNpbmdsZVRodW1ibmFpbCkubWFwKChwcm9wZXJ0eSkgPT4ge1xyXG4gICAgICAgIGlmIChzaW5nbGVUaHVtYm5haWwuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHNpbmdsZVRodW1ibmFpbFtwcm9wZXJ0eV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRodW1ibmFpbENsaXBbcHJvcGVydHldID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHRodW1ibmFpbENsaXBbcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRodW1ibmFpbENsaXBbcHJvcGVydHldID0gc2luZ2xlVGh1bWJuYWlsW3Byb3BlcnR5XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGh1bWJuYWlsQ2xpcDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q29tcHV0ZWRTdHlsZSh0aHVtYm5haWxDb250ZW50LCBwc2V1ZG8pIHtcclxuICAgIHJldHVybiAocHJvcCkgPT4ge1xyXG4gICAgICBpZiAoZ2xvYmFsLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbC53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aHVtYm5haWxDb250ZW50LCBwc2V1ZG8pW3Byb3BdO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aHVtYm5haWxDb250ZW50LmN1cnJlbnRTdHlsZVtwcm9wXTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0VmlzaWJsZVdpZHRoKHRodW1ibmFpbENvbnRlbnQsIHdpZHRoKSB7XHJcbiAgICBpZiAod2lkdGgpIHtcclxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQod2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjbGlwID0gVGh1bWJuYWlsSGVscGVycy5nZXRDb21wdXRlZFN0eWxlKHRodW1ibmFpbENvbnRlbnQpKCdjbGlwJyk7XHJcblxyXG4gICAgaWYgKGNsaXAgIT09ICdhdXRvJyAmJiBjbGlwICE9PSAnaW5oZXJpdCcpIHtcclxuICAgICAgY2xpcCA9IGNsaXAuc3BsaXQoLyg/OlxcKHxcXCkpLylbMV0uc3BsaXQoLyg/Oix8ICkvKTtcclxuICAgICAgaWYgKGNsaXAubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgcmV0dXJuIChwYXJzZUZsb2F0KGNsaXBbMV0pIC0gcGFyc2VGbG9hdChjbGlwWzNdKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFNjcm9sbE9mZnNldCgpIHtcclxuICAgIGlmIChnbG9iYWwud2luZG93LnBhZ2VYT2Zmc2V0KSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogZ2xvYmFsLndpbmRvdy5wYWdlWE9mZnNldCxcclxuICAgICAgICB5OiBnbG9iYWwud2luZG93LnBhZ2VZT2Zmc2V0XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiBnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXHJcbiAgICAgIHk6IGdsb2JhbC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHN1cG9ydEFuZHJvaWRFdmVudHMocGxheWVyKSB7XHJcbiAgICAvLyBBbmRyb2lkIGRvZXNuJ3Qgc3VwcG9ydCA6YWN0aXZlIGFuZCA6aG92ZXIgb24gbm9uLWFuY2hvciBhbmQgbm9uLWJ1dHRvbiBlbGVtZW50c1xyXG4gICAgLy8gc28sIHdlIG5lZWQgdG8gZmFrZSB0aGUgOmFjdGl2ZSBzZWxlY3RvciBmb3IgdGh1bWJuYWlscyB0byBzaG93IHVwLlxyXG4gICAgY29uc3QgcHJvZ3Jlc3NDb250cm9sID0gcGxheWVyLmNvbnRyb2xCYXIucHJvZ3Jlc3NDb250cm9sO1xyXG5cclxuICAgIGNvbnN0IGFkZEZha2VBY3RpdmUgPSAoKSA9PiB7XHJcbiAgICAgIHByb2dyZXNzQ29udHJvbC5hZGRDbGFzcygnZmFrZS1hY3RpdmUnKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlRmFrZUFjdGl2ZSA9ICgpID0+IHtcclxuICAgICAgcHJvZ3Jlc3NDb250cm9sLnJlbW92ZUNsYXNzKCdmYWtlLWFjdGl2ZScpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoc3RhcnQnLCBhZGRGYWtlQWN0aXZlKTtcclxuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hlbmQnLCByZW1vdmVGYWtlQWN0aXZlKTtcclxuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hjYW5jZWwnLCByZW1vdmVGYWtlQWN0aXZlKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVUaHVtYm5haXNsSG9sZGVyKCkge1xyXG4gICAgY29uc3Qgd3JhcCA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICB3cmFwLmNsYXNzTmFtZSA9ICd2anMtdGh1bWJuYWlsLWhvbGRlcic7XHJcbiAgICByZXR1cm4gd3JhcDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVUaHVtYm5haWxJbWcodGh1bWJuYWlsQ2xpcHMpIHtcclxuICAgIGNvbnN0IHRodW1ibmFpbEltZyA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHJcbiAgICB0aHVtYm5haWxJbWcuc3JjID0gdGh1bWJuYWlsQ2xpcHNbJzAnXS5zcmM7XHJcbiAgICB0aHVtYm5haWxJbWcuY2xhc3NOYW1lID0gJ3Zqcy10aHVtYm5haWwtaW1nJztcclxuICAgIHJldHVybiB0aHVtYm5haWxJbWc7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsVGltZSgpIHtcclxuICAgIGNvbnN0IHRpbWUgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgdGltZS5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC10aW1lJztcclxuICAgIHRpbWUuaWQgPSAndmpzLXRpbWUnO1xyXG4gICAgcmV0dXJuIHRpbWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsQXJyb3dEb3duKCkge1xyXG4gICAgY29uc3QgYXJyb3cgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgYXJyb3cuY2xhc3NOYW1lID0gJ3Zqcy10aHVtYm5haWwtYXJyb3cnO1xyXG4gICAgYXJyb3cuaWQgPSAndmpzLWFycm93JztcclxuICAgIHJldHVybiBhcnJvdztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBtZXJnZVRodW1ibmFpbEVsZW1lbnRzKHRodW1ibmFpbHNIb2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxBcnJvd0Rvd24pIHtcclxuXHJcbiAgICB0aHVtYm5haWxzSG9sZGVyLmFwcGVuZENoaWxkKHRodW1ibmFpbEltZyk7XHJcbiAgICB0aHVtYm5haWxzSG9sZGVyLmFwcGVuZENoaWxkKHRpbWVsaW5lVGltZSk7XHJcbiAgICB0aHVtYm5haWxzSG9sZGVyLmFwcGVuZENoaWxkKHRodW1ibmFpbEFycm93RG93bik7XHJcbiAgICByZXR1cm4gdGh1bWJuYWlsc0hvbGRlcjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjZW50ZXJUaHVtYm5haWxPdmVyQ3Vyc29yKHRodW1ibmFpbEltZykge1xyXG4gICAgLy8gY2VudGVyIHRoZSB0aHVtYm5haWwgb3ZlciB0aGUgY3Vyc29yIGlmIGFuIG9mZnNldCB3YXNuJ3QgcHJvdmlkZWRcclxuICAgIGlmICghdGh1bWJuYWlsSW1nLnN0eWxlLmxlZnQgJiYgIXRodW1ibmFpbEltZy5zdHlsZS5yaWdodCkge1xyXG4gICAgICB0aHVtYm5haWxJbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRodW1ibmFpbFdpZHRoID0geyB3aWR0aDogLSh0aHVtYm5haWxJbWcubmF0dXJhbFdpZHRoIC8gMikgfTtcclxuXHJcbiAgICAgICAgdGh1bWJuYWlsSW1nLnN0eWxlLmxlZnQgPSBgJHt0aHVtYm5haWxXaWR0aH1weGA7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0VmlkZW9EdXJhdGlvbihwbGF5ZXIpIHtcclxuICAgIGxldCBkdXJhdGlvbiA9IHBsYXllci5kdXJhdGlvbigpO1xyXG5cclxuICAgIHBsYXllci5vbignZHVyYXRpb25jaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIGR1cmF0aW9uID0gcGxheWVyLmR1cmF0aW9uKCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkdXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhZGRUaHVtYm5haWxUb1BsYXllcihwcm9ncmVzc0NvbnRyb2wsIHRodW1ibmFpbHNIb2xkZXIpIHtcclxuICAgIHByb2dyZXNzQ29udHJvbC5lbCgpLmFwcGVuZENoaWxkKHRodW1ibmFpbHNIb2xkZXIpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZpbmRNb3VzZUxlZnRPZmZzZXQocGFnZU1vdXNlUG9zaXRpb25YLCBwcm9ncmVzc0NvbnRyb2wsIHBhZ2VYT2Zmc2V0LCBldmVudCkge1xyXG4gICAgLy8gZmluZCB0aGUgcGFnZSBvZmZzZXQgb2YgdGhlIG1vdXNlXHJcbiAgICBsZXQgbGVmdE9mZnNldCA9IHBhZ2VNb3VzZVBvc2l0aW9uWCB8fCAoZXZlbnQuY2xpZW50WCArXHJcbiAgICAgICAgICAgICAgICAgICAgIGdsb2JhbC5kb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgKyBnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQpO1xyXG5cclxuICAgIC8vIHN1YnRyYWN0IHRoZSBwYWdlIG9mZnNldCBvZiB0aGUgcG9zaXRpb25lZCBvZmZzZXQgcGFyZW50XHJcbiAgICBsZWZ0T2Zmc2V0IC09IHByb2dyZXNzQ29udHJvbC5lbCgpLlxyXG4gICAgICAgICAgICAgICAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgcGFnZVhPZmZzZXQ7XHJcbiAgICByZXR1cm4gbGVmdE9mZnNldDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRNb3VzZVZpZGVvVGltZShtb3VzZUxlZnRPZmZzZXQsIHByb2dyZXNzQ29udHJvbCwgZHVyYXRpb24pIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKChtb3VzZUxlZnRPZmZzZXQgLyotIHByb2dyZXNzQ29udHJvbC5lbCgpLm9mZnNldExlZnQqLykgL1xyXG4gICAgICAgICAgIHByb2dyZXNzQ29udHJvbC53aWR0aCgpICogZHVyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbFRpbWUodGltZWxpbmVUaW1lLCBwcm9ncmVzc0NvbnRyb2wpIHtcclxuICAgIHRpbWVsaW5lVGltZS5pbm5lckhUTUwgPSAocHJvZ3Jlc3NDb250cm9sLnNlZWtCYXIubW91c2VUaW1lRGlzcGxheS50aW1lVG9vbHRpcC5lbF8udGV4dENvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFBhZ2VNb3VzZVBvc2l0aW9uWChldmVudCkge1xyXG4gICAgbGV0IHBhZ2VNb3VzZU9mZnNldFggPSBldmVudC5wYWdlWDtcclxuXHJcbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcclxuICAgICAgcGFnZU1vdXNlT2Zmc2V0WCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhZ2VNb3VzZU9mZnNldFg7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMga2VlcFRodW1ibmFpbEluc2lkZVBsYXllcih0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGh1bWJuYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlTGVmdE9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzQmFyUmlnaHRPZmZzZXQpIHtcclxuXHJcbiAgICBjb25zdCB3aWR0aCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0VmlzaWJsZVdpZHRoKHRodW1ibmFpbEltZywgYWN0aXZlVGh1bWJuYWlsLndpZHRoIHx8XHJcbiAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzWzBdLndpZHRoKTtcclxuXHJcbiAgICBjb25zdCBoYWxmV2lkdGggPSB3aWR0aCAvIDI7XHJcblxyXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIHRodW1ibmFpbCBkb2Vzbid0IGZhbGwgb2ZmIHRoZSByaWdodCBzaWRlIG9mXHJcbiAgICAvLyB0aGUgbGVmdCBzaWRlIG9mIHRoZSBwbGF5ZXJcclxuICAgIGlmICgobW91c2VMZWZ0T2Zmc2V0ICsgaGFsZldpZHRoKSA+IHByb2dyZXNCYXJSaWdodE9mZnNldCkge1xyXG4gICAgICBtb3VzZUxlZnRPZmZzZXQgLT0gKG1vdXNlTGVmdE9mZnNldCArIGhhbGZXaWR0aCkgLSBwcm9ncmVzQmFyUmlnaHRPZmZzZXQ7XHJcbiAgICB9IGVsc2UgaWYgKG1vdXNlTGVmdE9mZnNldCA8IGhhbGZXaWR0aCkge1xyXG4gICAgICBtb3VzZUxlZnRPZmZzZXQgPSBoYWxmV2lkdGg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbW91c2VMZWZ0T2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZShtb3VzZUxlZnRPZmZzZXQsIHRodW1ibmFpbHNIb2xkZXIpIHtcclxuICAgIGNvbnN0IGxlZnRWYWx1ZSA9IHsgbW91c2VMZWZ0T2Zmc2V0IH07XHJcblxyXG4gICAgdGh1bWJuYWlsc0hvbGRlci5zdHlsZS5sZWZ0ID0gYCR7bGVmdFZhbHVlLm1vdXNlTGVmdE9mZnNldH1weGA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0QWN0aXZlVGh1bWJuYWlsKHRodW1ibmFpbENsaXBzLCBtb3VzZVRpbWUpIHtcclxuICAgIGxldCBhY3RpdmVDbGlwID0gMDtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGNsaXBOdW1iZXIgaW4gdGh1bWJuYWlsQ2xpcHMpIHtcclxuICAgICAgaWYgKG1vdXNlVGltZSA+IGNsaXBOdW1iZXIpIHtcclxuICAgICAgICBhY3RpdmVDbGlwID0gTWF0aC5tYXgoYWN0aXZlQ2xpcCwgY2xpcE51bWJlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aHVtYm5haWxDbGlwc1thY3RpdmVDbGlwXTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxTcmMoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpIHtcclxuICAgIGlmIChhY3RpdmVUaHVtYm5haWwuc3JjICYmIHRodW1ibmFpbEltZy5zcmMgIT09IGFjdGl2ZVRodW1ibmFpbC5zcmMpIHtcclxuICAgICAgdGh1bWJuYWlsSW1nLnNyYyA9IGFjdGl2ZVRodW1ibmFpbC5zcmM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdXBkYXRlVGh1bWJuYWlsU3R5bGUoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpIHtcclxuICAgIGlmIChhY3RpdmVUaHVtYm5haWwuc3R5bGUgJiYgdGh1bWJuYWlsSW1nLnN0eWxlICE9PSBhY3RpdmVUaHVtYm5haWwuc3R5bGUpIHtcclxuICAgICAgVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHRodW1ibmFpbEltZy5zdHlsZSwgYWN0aXZlVGh1bWJuYWlsLnN0eWxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBtb3ZlTGlzdGVuZXIoZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIpIHtcclxuXHJcbiAgICBjb25zdCBkdXJhdGlvbiA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0VmlkZW9EdXJhdGlvbihwbGF5ZXIpO1xyXG4gICAgY29uc3QgcGFnZVhPZmZzZXQgPSBUaHVtYm5haWxIZWxwZXJzLmdldFNjcm9sbE9mZnNldCgpLng7XHJcbiAgICBjb25zdCBwcm9ncmVzQmFyUG9zaXRpb24gPSBwcm9ncmVzc0NvbnRyb2wuY2hpbGRyZW4oKVswXS5lbCgpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgY29uc3QgcHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0ID0gKHByb2dyZXNCYXJQb3NpdGlvbi53aWR0aCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNCYXJQb3NpdGlvbi5yaWdodCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYT2Zmc2V0O1xyXG5cclxuICAgIGNvbnN0IHBhZ2VNb3VzZVBvc2l0aW9uWCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0UGFnZU1vdXNlUG9zaXRpb25YKGV2ZW50KTtcclxuXHJcbiAgICBsZXQgbW91c2VMZWZ0T2Zmc2V0ID0gVGh1bWJuYWlsSGVscGVycy5maW5kTW91c2VMZWZ0T2Zmc2V0KHBhZ2VNb3VzZVBvc2l0aW9uWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLmNoaWxkcmVuKClbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYT2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCk7XHJcblxyXG4gICAgY29uc3QgbW91c2VUaW1lID0gVGh1bWJuYWlsSGVscGVycy5nZXRNb3VzZVZpZGVvVGltZShtb3VzZUxlZnRPZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbC5jaGlsZHJlbigpWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbik7XHJcblxyXG4gICAgY29uc3QgYWN0aXZlVGh1bWJuYWlsID0gVGh1bWJuYWlsSGVscGVycy5nZXRBY3RpdmVUaHVtYm5haWwodGh1bWJuYWlsQ2xpcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZVRpbWUpO1xyXG5cclxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsVGltZSh0aW1lbGluZVRpbWUsIHByb2dyZXNzQ29udHJvbCk7XHJcblxyXG4gICAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVUaHVtYm5haWxTcmMoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpO1xyXG5cclxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsU3R5bGUoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpO1xyXG5cclxuICAgIG1vdXNlTGVmdE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMua2VlcFRodW1ibmFpbEluc2lkZVBsYXllcih0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRodW1ibmFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlTGVmdE9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0KTtcclxuXHJcbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZShtb3VzZUxlZnRPZmZzZXQsIHRodW1ibmFpbHNIb2xkZXIpO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2coXCJtb3ZlTGlzdGVuZXIgdGltZWxpbmVUaW1lOiBcIiArIHRpbWVsaW5lVGltZSArIFwiLCBhY3RpdmVUaHVtYm5haWw6IFwiICsgYWN0aXZlVGh1bWJuYWlsKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJwYWdlTW91c2VQb3NpdGlvblg6IFwiICsgcGFnZU1vdXNlUG9zaXRpb25YICsgXCIsIG1vdXNlTGVmdE9mZnNldDogXCIgKyBtb3VzZUxlZnRPZmZzZXQpO1xyXG4gICAgLy9jb25zb2xlLmRpcihhY3RpdmVUaHVtYm5haWwpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHVwYWRhdGVPbkhvdmVyKHByb2dyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyKSB7XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSB0aHVtYm5haWwgd2hpbGUgaG92ZXJpbmdcclxuICAgIHByb2dyZXNzQ29udHJvbC5vbignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMubW92ZUxpc3RlbmVyKGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyKTtcclxuICAgIH0pO1xyXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaG1vdmUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgVGh1bWJuYWlsSGVscGVycy5tb3ZlTGlzdGVuZXIoZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcikge1xyXG4gICAgdGh1bWJuYWlsc0hvbGRlci5zdHlsZS5sZWZ0ID0gJy0xMDAwcHgnO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHVwYWRhdGVPbkhvdmVyT3V0KHByb2dyZXNzQ29udHJvbCwgdGh1bWJuYWlsc0hvbGRlciwgcGxheWVyKSB7XHJcblxyXG4gICAgLy8gbW92ZSB0aGUgcGxhY2Vob2xkZXIgb3V0IG9mIHRoZSB3YXkgd2hlbiBub3QgaG92ZXJpbmdcclxuICAgIHByb2dyZXNzQ29udHJvbC5vbignbW91c2VvdXQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgVGh1bWJuYWlsSGVscGVycy5oaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpO1xyXG4gICAgfSk7XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoY2FuY2VsJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcclxuICAgIH0pO1xyXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaGVuZCcsIChldmVudCkgPT4ge1xyXG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XHJcbiAgICB9KTtcclxuICAgIHBsYXllci5vbigndXNlcmluYWN0aXZlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxuXG4vLyBEZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBwbHVnaW4uXHJcbmNvbnN0IGRlZmF1bHRzID0ge307XHJcblxyXG4vLyBDcm9zcy1jb21wYXRpYmlsaXR5IGZvciBWaWRlby5qcyA1IGFuZCA2LlxyXG5jb25zdCByZWdpc3RlclBsdWdpbiA9IHZpZGVvanMucmVnaXN0ZXJQbHVnaW4gfHwgdmlkZW9qcy5wbHVnaW47XHJcbi8vIGNvbnN0IGRvbSA9IHZpZGVvanMuZG9tIHx8IHZpZGVvanM7XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIHBsYXllciBpcyByZWFkeS5cclxuICpcclxuICogVGhpcyBpcyBhIGdyZWF0IHBsYWNlIGZvciB5b3VyIHBsdWdpbiB0byBpbml0aWFsaXplIGl0c2VsZi4gV2hlbiB0aGlzXHJcbiAqIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHBsYXllciB3aWxsIGhhdmUgaXRzIERPTSBhbmQgY2hpbGQgY29tcG9uZW50c1xyXG4gKiBpbiBwbGFjZS5cclxuICpcclxuICogQGZ1bmN0aW9uIG9uUGxheWVyUmVhZHlcclxuICogQHBhcmFtICAgIHtQbGF5ZXJ9IHBsYXllclxyXG4gKiAgICAgICAgICAgQSBWaWRlby5qcyBwbGF5ZXIuXHJcbiAqIEBwYXJhbSAgICB7T2JqZWN0fSBbb3B0aW9ucz17fV1cclxuICogICAgICAgICAgIEFuIG9iamVjdCBvZiBvcHRpb25zIGxlZnQgdG8gdGhlIHBsdWdpbiBhdXRob3IgdG8gZGVmaW5lLlxyXG4gKi9cclxuXHJcbmNvbnN0IHByZXBhcmVUaHVtYm5haWxzQ2xpcHMgPSAodmlkZW9UaW1lLCBvcHRpb25zKSA9PiB7XHJcblxyXG4gIGxldCBjdXJyZW50VGltZSA9IDA7XHJcbiAgbGV0IGN1cnJlbnRJdGVyYXRpb24gPSAwO1xyXG4gIGxldCB0aHVtYm5haWxPZmZzZXQgPSAwO1xyXG4gIGNvbnN0IHN0ZXBUaW1lID0gb3B0aW9ucy5zdGVwVGltZTtcclxuICBjb25zdCB0aHVtYm5haWxXaWR0aCA9IG9wdGlvbnMud2lkdGg7XHJcbiAgY29uc3Qgc3ByaXRlVVJMID0gb3B0aW9ucy5zcHJpdGVVcmw7XHJcbiAgY29uc3QgdGh1bWJuYWlsQ2xpcHMgPSB7XHJcbiAgICAwOiB7XHJcbiAgICAgIHNyYzogc3ByaXRlVVJMLFxyXG4gICAgICBzdHlsZToge1xyXG4gICAgICAgIGxlZnQ6ICh0aHVtYm5haWxXaWR0aCAvIDIgKiAtMSkgKyAncHgnLFxyXG4gICAgICAgIHdpZHRoOiAoKE1hdGguZmxvb3IodmlkZW9UaW1lIC8gc3RlcFRpbWUpICsgMSkgKiB0aHVtYm5haWxXaWR0aCkgKyAncHgnLFxyXG4gICAgICAgIGNsaXA6ICdyZWN0KDAsJyArIG9wdGlvbnMud2lkdGggKyAncHgsJyArIG9wdGlvbnMud2lkdGggKyAncHgsIDApJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgd2hpbGUgKGN1cnJlbnRUaW1lIDw9IHZpZGVvVGltZSkge1xyXG4gICAgY3VycmVudFRpbWUgKz0gc3RlcFRpbWU7XHJcbiAgICB0aHVtYm5haWxPZmZzZXQgPSArK2N1cnJlbnRJdGVyYXRpb24gKiB0aHVtYm5haWxXaWR0aDtcclxuICAgIHRodW1ibmFpbENsaXBzW2N1cnJlbnRUaW1lXSA9IHtcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBsZWZ0OiAoKHRodW1ibmFpbFdpZHRoIC8gMiArIHRodW1ibmFpbE9mZnNldCkgKiAtMSkgKyAncHgnLFxyXG4gICAgICAgIGNsaXA6ICdyZWN0KDAsICcgKyAodGh1bWJuYWlsV2lkdGggKyB0aHVtYm5haWxPZmZzZXQpICsgJ3B4LCcgK1xyXG4gICAgICAgICAgICAgIG9wdGlvbnMud2lkdGggKyAncHgsICcgKyB0aHVtYm5haWxPZmZzZXQgKyAncHgpJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuICByZXR1cm4gdGh1bWJuYWlsQ2xpcHM7XHJcbn07XHJcblxyXG5jb25zdCBpbml0aWFsaXplVGh1bWJuYWlscyA9ICh0aHVtYm5haWxzQ2xpcHMsIHBsYXllcikgPT4ge1xyXG5cclxuICBjb25zdCB0aHVtYm5haWxDbGlwcyA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh7fSwgZGVmYXVsdHMsIHRodW1ibmFpbHNDbGlwcyk7XHJcbiAgY29uc3QgcHJvZ3Jlc3NDb250cm9sID0gcGxheWVyLmNvbnRyb2xCYXIucHJvZ3Jlc3NDb250cm9sO1xyXG4gIGNvbnN0IHRodW1ibmFpbEltZyA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlsSW1nKHRodW1ibmFpbENsaXBzKTtcclxuICBjb25zdCB0aW1lbGluZVRpbWUgPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbFRpbWUoKTtcclxuICBjb25zdCB0aHVtYm5haWxBcnJvd0Rvd24gPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbEFycm93RG93bigpO1xyXG4gIGxldCB0aHVtYm5haXNsSG9sZGVyID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haXNsSG9sZGVyKCk7XHJcblxyXG4gIHRodW1ibmFpc2xIb2xkZXIgPSBUaHVtYm5haWxIZWxwZXJzLm1lcmdlVGh1bWJuYWlsRWxlbWVudHModGh1bWJuYWlzbEhvbGRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEFycm93RG93bik7XHJcbiAgVGh1bWJuYWlsSGVscGVycy5oaWRlUGxheWVyT25Ib3ZlclRpbWUocHJvZ3Jlc3NDb250cm9sKTtcclxuXHJcbiAgaWYgKGdsb2JhbC53aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2FuZHJvaWQnKSAhPT0gLTEpIHtcclxuICAgIFRodW1ibmFpbEhlbHBlcnMuc3Vwb3J0QW5kcm9pZEV2ZW50cygpO1xyXG4gIH1cclxuXHJcbiAgVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHRodW1ibmFpbEltZy5zdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHNbJzAnXS5zdHlsZSk7XHJcblxyXG4gIFRodW1ibmFpbEhlbHBlcnMuY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvcih0aHVtYm5haWxJbWcpO1xyXG5cclxuICBUaHVtYm5haWxIZWxwZXJzLmFkZFRodW1ibmFpbFRvUGxheWVyKHByb2dyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpc2xIb2xkZXIpO1xyXG5cclxuICBUaHVtYm5haWxIZWxwZXJzLnVwYWRhdGVPbkhvdmVyKHByb2dyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpc2xIb2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XHJcblxyXG4gIFRodW1ibmFpbEhlbHBlcnMudXBhZGF0ZU9uSG92ZXJPdXQocHJvZ3Jlc3NDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlzbEhvbGRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XHJcbn07XHJcblxyXG5jb25zdCBvblBsYXllclJlYWR5ID0gKHBsYXllciwgb3B0aW9ucykgPT4ge1xyXG4gIHBsYXllci5vbignbG9hZGVkbWV0YWRhdGEnLCAoKCkgPT4ge1xyXG4gICAgY29uc3QgdGh1bWJuYWlsc0NsaXBzID0gcHJlcGFyZVRodW1ibmFpbHNDbGlwcyhwbGF5ZXIuZHVyYXRpb24oKSwgb3B0aW9ucyk7XHJcblxyXG4gICAgaW5pdGlhbGl6ZVRodW1ibmFpbHModGh1bWJuYWlsc0NsaXBzLCBwbGF5ZXIpO1xyXG4gIH0pKTtcclxufTtcclxuLyoqXHJcbiAqIEEgdmlkZW8uanMgcGx1Z2luLlxyXG4gKlxyXG4gKiBJbiB0aGUgcGx1Z2luIGZ1bmN0aW9uLCB0aGUgdmFsdWUgb2YgYHRoaXNgIGlzIGEgdmlkZW8uanMgYFBsYXllcmBcclxuICogaW5zdGFuY2UuIFlvdSBjYW5ub3QgcmVseSBvbiB0aGUgcGxheWVyIGJlaW5nIGluIGEgXCJyZWFkeVwiIHN0YXRlIGhlcmUsXHJcbiAqIGRlcGVuZGluZyBvbiBob3cgdGhlIHBsdWdpbiBpcyBpbnZva2VkLiBUaGlzIG1heSBvciBtYXkgbm90IGJlIGltcG9ydGFudFxyXG4gKiB0byB5b3U7IGlmIG5vdCwgcmVtb3ZlIHRoZSB3YWl0IGZvciBcInJlYWR5XCIhXHJcbiAqXHJcbiAqIEBmdW5jdGlvbiB0aHVtYm5haWxzXHJcbiAqIEBwYXJhbSAgICB7T2JqZWN0fSBbb3B0aW9ucz17fV1cclxuICogICAgICAgICAgIEFuIG9iamVjdCBvZiBvcHRpb25zIGxlZnQgdG8gdGhlIHBsdWdpbiBhdXRob3IgdG8gZGVmaW5lLlxyXG4gKi9cclxuY29uc3QgdGh1bWJuYWlscyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICB0aGlzLnJlYWR5KCgpID0+IHtcclxuICAgIG9uUGxheWVyUmVhZHkodGhpcywgdmlkZW9qcy5tZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpKTtcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJlZ2lzdGVyIHRoZSBwbHVnaW4gd2l0aCB2aWRlby5qcy5cclxucmVnaXN0ZXJQbHVnaW4oJ3RodW1ibmFpbHMnLCB0aHVtYm5haWxzKTtcclxuXHJcbi8vIEluY2x1ZGUgdGhlIHZlcnNpb24gbnVtYmVyLlxyXG50aHVtYm5haWxzLlZFUlNJT04gPSAnX19WRVJTSU9OX18nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRodW1ibmFpbHM7XG4iXX0=
