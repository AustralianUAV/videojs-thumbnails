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
      return Math.floor((mouseLeftOffset - progressControl.el().offsetLeft) / progressControl.width() * duration);
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
      var progresBarPosition = progressControl.el().getBoundingClientRect();

      var progresBarRightOffset = (progresBarPosition.width || progresBarPosition.right) + pageXOffset;

      var pageMousePositionX = ThumbnailHelpers.getPageMousePositionX(event);

      var mouseLeftOffset = ThumbnailHelpers.findMouseLeftOffset(pageMousePositionX, progressControl, pageXOffset, event);

      var mouseTime = ThumbnailHelpers.getMouseVideoTime(mouseLeftOffset, progressControl, duration);

      var activeThumbnail = ThumbnailHelpers.getActiveThumbnail(thumbnailClips, mouseTime);

      ThumbnailHelpers.updateThumbnailTime(timelineTime, progressControl);

      ThumbnailHelpers.updateThumbnailSrc(activeThumbnail, thumbnailImg);

      ThumbnailHelpers.updateThumbnailStyle(activeThumbnail, thumbnailImg);

      mouseLeftOffset = ThumbnailHelpers.keepThumbnailInsidePlayer(thumbnailImg, activeThumbnail, thumbnailClips, mouseLeftOffset, progresBarRightOffset);

      ThumbnailHelpers.updateThumbnailLeftStyle(mouseLeftOffset, thumbnailsHolder);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNUQTs7Ozs7Ozs7QUFFQSxTQUFTLGVBQVQsQ0FBMEIsRUFBMUIsRUFBOEI7QUFBRSxTQUFRLE1BQU8sUUFBTyxFQUFQLHlDQUFPLEVBQVAsT0FBYyxRQUFyQixJQUFrQyxhQUFhLEVBQWhELEdBQXNELEdBQUcsU0FBSCxDQUF0RCxHQUFzRSxFQUE3RTtBQUFrRjs7QUFFbEgsSUFBSSxVQUFVLGdCQUFnQixRQUFRLFVBQVIsQ0FBaEIsQ0FBZDtBQUNBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjs7SUFFTSxnQjs7Ozs7OzswQ0FFeUIsZSxFQUFpQjtBQUM1QyxVQUFNLFlBQVksZ0JBQWdCLEdBQWhCLENBQW9CLHNCQUFwQixDQUEyQyxtQkFBM0MsRUFBZ0UsQ0FBaEUsQ0FBbEI7O0FBRUEsZ0JBQVUsS0FBVixDQUFnQixPQUFoQixHQUEwQixNQUExQjtBQUNEOzs7dUNBRWdDO0FBQUEsd0NBQU4sSUFBTTtBQUFOLFlBQU07QUFBQTs7QUFDL0IsVUFBTSxnQkFBZ0IsS0FBSyxLQUFMLE1BQWdCLEVBQXRDOztBQUVBLGFBQU8sSUFBUCxDQUFZLElBQVosRUFBa0IsR0FBbEIsQ0FBc0IsVUFBQyxDQUFELEVBQU87QUFDM0IsWUFBTSxrQkFBa0IsS0FBSyxDQUFMLENBQXhCOztBQUVBLGVBQU8sSUFBUCxDQUFZLGVBQVosRUFBNkIsR0FBN0IsQ0FBaUMsVUFBQyxRQUFELEVBQWM7QUFDN0MsY0FBSSxnQkFBZ0IsY0FBaEIsQ0FBK0IsUUFBL0IsQ0FBSixFQUE4QztBQUM1QyxnQkFBSSxRQUFPLGdCQUFnQixRQUFoQixDQUFQLE1BQXFDLFFBQXpDLEVB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bGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIG1vZHVsZS5leHBvcnRzID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7fTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciB2aWRlb2pzID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3ZpZGVvLmpzJykpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJ2dsb2JhbCcpO1xuXG5jbGFzcyBUaHVtYm5haWxIZWxwZXJzIHtcclxuXHJcbiAgc3RhdGljIGhpZGVQbGF5ZXJPbkhvdmVyVGltZShwcm9ncmVzc0NvbnRyb2wpIHtcclxuICAgIGNvbnN0IG1vdXNlVGltZSA9IHByb2dyZXNzQ29udHJvbC5lbF8uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmpzLW1vdXNlLWRpc3BsYXknKVswXTtcclxuXHJcbiAgICBtb3VzZVRpbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVUaHVtYm5haWxzKC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IHRodW1ibmFpbENsaXAgPSBhcmdzLnNoaWZ0KCkgfHwge307XHJcblxyXG4gICAgT2JqZWN0LmtleXMoYXJncykubWFwKChpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNpbmdsZVRodW1ibmFpbCA9IGFyZ3NbaV07XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhzaW5nbGVUaHVtYm5haWwpLm1hcCgocHJvcGVydHkpID0+IHtcclxuICAgICAgICBpZiAoc2luZ2xlVGh1bWJuYWlsLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aHVtYm5haWxDbGlwW3Byb3BlcnR5XSA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh0aHVtYm5haWxDbGlwW3Byb3BlcnR5XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlVGh1bWJuYWlsW3Byb3BlcnR5XSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYm5haWxDbGlwW3Byb3BlcnR5XSA9IHNpbmdsZVRodW1ibmFpbFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aHVtYm5haWxDbGlwO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aHVtYm5haWxDbGlwO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvbXB1dGVkU3R5bGUodGh1bWJuYWlsQ29udGVudCwgcHNldWRvKSB7XHJcbiAgICByZXR1cm4gKHByb3ApID0+IHtcclxuICAgICAgaWYgKGdsb2JhbC53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWwud2luZG93LmdldENvbXB1dGVkU3R5bGUodGh1bWJuYWlsQ29udGVudCwgcHNldWRvKVtwcm9wXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGh1bWJuYWlsQ29udGVudC5jdXJyZW50U3R5bGVbcHJvcF07XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFZpc2libGVXaWR0aCh0aHVtYm5haWxDb250ZW50LCB3aWR0aCkge1xyXG4gICAgaWYgKHdpZHRoKSB7XHJcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2xpcCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0Q29tcHV0ZWRTdHlsZSh0aHVtYm5haWxDb250ZW50KSgnY2xpcCcpO1xyXG5cclxuICAgIGlmIChjbGlwICE9PSAnYXV0bycgJiYgY2xpcCAhPT0gJ2luaGVyaXQnKSB7XHJcbiAgICAgIGNsaXAgPSBjbGlwLnNwbGl0KC8oPzpcXCh8XFwpKS8pWzFdLnNwbGl0KC8oPzosfCApLyk7XHJcbiAgICAgIGlmIChjbGlwLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgIHJldHVybiAocGFyc2VGbG9hdChjbGlwWzFdKSAtIHBhcnNlRmxvYXQoY2xpcFszXSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRTY3JvbGxPZmZzZXQoKSB7XHJcbiAgICBpZiAoZ2xvYmFsLndpbmRvdy5wYWdlWE9mZnNldCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IGdsb2JhbC53aW5kb3cucGFnZVhPZmZzZXQsXHJcbiAgICAgICAgeTogZ2xvYmFsLndpbmRvdy5wYWdlWU9mZnNldFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxyXG4gICAgICB5OiBnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdXBvcnRBbmRyb2lkRXZlbnRzKHBsYXllcikge1xyXG4gICAgLy8gQW5kcm9pZCBkb2Vzbid0IHN1cHBvcnQgOmFjdGl2ZSBhbmQgOmhvdmVyIG9uIG5vbi1hbmNob3IgYW5kIG5vbi1idXR0b24gZWxlbWVudHNcclxuICAgIC8vIHNvLCB3ZSBuZWVkIHRvIGZha2UgdGhlIDphY3RpdmUgc2VsZWN0b3IgZm9yIHRodW1ibmFpbHMgdG8gc2hvdyB1cC5cclxuICAgIGNvbnN0IHByb2dyZXNzQ29udHJvbCA9IHBsYXllci5jb250cm9sQmFyLnByb2dyZXNzQ29udHJvbDtcclxuXHJcbiAgICBjb25zdCBhZGRGYWtlQWN0aXZlID0gKCkgPT4ge1xyXG4gICAgICBwcm9ncmVzc0NvbnRyb2wuYWRkQ2xhc3MoJ2Zha2UtYWN0aXZlJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZUZha2VBY3RpdmUgPSAoKSA9PiB7XHJcbiAgICAgIHByb2dyZXNzQ29udHJvbC5yZW1vdmVDbGFzcygnZmFrZS1hY3RpdmUnKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaHN0YXJ0JywgYWRkRmFrZUFjdGl2ZSk7XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoZW5kJywgcmVtb3ZlRmFrZUFjdGl2ZSk7XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoY2FuY2VsJywgcmVtb3ZlRmFrZUFjdGl2ZSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlzbEhvbGRlcigpIHtcclxuICAgIGNvbnN0IHdyYXAgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgd3JhcC5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC1ob2xkZXInO1xyXG4gICAgcmV0dXJuIHdyYXA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsSW1nKHRodW1ibmFpbENsaXBzKSB7XHJcbiAgICBjb25zdCB0aHVtYm5haWxJbWcgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblxyXG4gICAgdGh1bWJuYWlsSW1nLnNyYyA9IHRodW1ibmFpbENsaXBzWycwJ10uc3JjO1xyXG4gICAgdGh1bWJuYWlsSW1nLmNsYXNzTmFtZSA9ICd2anMtdGh1bWJuYWlsLWltZyc7XHJcbiAgICByZXR1cm4gdGh1bWJuYWlsSW1nO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbFRpbWUoKSB7XHJcbiAgICBjb25zdCB0aW1lID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIHRpbWUuY2xhc3NOYW1lID0gJ3Zqcy10aHVtYm5haWwtdGltZSc7XHJcbiAgICB0aW1lLmlkID0gJ3Zqcy10aW1lJztcclxuICAgIHJldHVybiB0aW1lO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbEFycm93RG93bigpIHtcclxuICAgIGNvbnN0IGFycm93ID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIGFycm93LmNsYXNzTmFtZSA9ICd2anMtdGh1bWJuYWlsLWFycm93JztcclxuICAgIGFycm93LmlkID0gJ3Zqcy1hcnJvdyc7XHJcbiAgICByZXR1cm4gYXJyb3c7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbWVyZ2VUaHVtYm5haWxFbGVtZW50cyh0aHVtYm5haWxzSG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQXJyb3dEb3duKSB7XHJcblxyXG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aHVtYm5haWxJbWcpO1xyXG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aW1lbGluZVRpbWUpO1xyXG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aHVtYm5haWxBcnJvd0Rvd24pO1xyXG4gICAgcmV0dXJuIHRodW1ibmFpbHNIb2xkZXI7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvcih0aHVtYm5haWxJbWcpIHtcclxuICAgIC8vIGNlbnRlciB0aGUgdGh1bWJuYWlsIG92ZXIgdGhlIGN1cnNvciBpZiBhbiBvZmZzZXQgd2Fzbid0IHByb3ZpZGVkXHJcbiAgICBpZiAoIXRodW1ibmFpbEltZy5zdHlsZS5sZWZ0ICYmICF0aHVtYm5haWxJbWcuc3R5bGUucmlnaHQpIHtcclxuICAgICAgdGh1bWJuYWlsSW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB0aHVtYm5haWxXaWR0aCA9IHsgd2lkdGg6IC0odGh1bWJuYWlsSW1nLm5hdHVyYWxXaWR0aCAvIDIpIH07XHJcblxyXG4gICAgICAgIHRodW1ibmFpbEltZy5zdHlsZS5sZWZ0ID0gYCR7dGh1bWJuYWlsV2lkdGh9cHhgO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFZpZGVvRHVyYXRpb24ocGxheWVyKSB7XHJcbiAgICBsZXQgZHVyYXRpb24gPSBwbGF5ZXIuZHVyYXRpb24oKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ2R1cmF0aW9uY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICBkdXJhdGlvbiA9IHBsYXllci5kdXJhdGlvbigpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZHVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkVGh1bWJuYWlsVG9QbGF5ZXIocHJvZ3Jlc3NDb250cm9sLCB0aHVtYm5haWxzSG9sZGVyKSB7XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wuZWwoKS5hcHBlbmRDaGlsZCh0aHVtYm5haWxzSG9sZGVyKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kTW91c2VMZWZ0T2Zmc2V0KHBhZ2VNb3VzZVBvc2l0aW9uWCwgcHJvZ3Jlc3NDb250cm9sLCBwYWdlWE9mZnNldCwgZXZlbnQpIHtcclxuICAgIC8vIGZpbmQgdGhlIHBhZ2Ugb2Zmc2V0IG9mIHRoZSBtb3VzZVxyXG4gICAgbGV0IGxlZnRPZmZzZXQgPSBwYWdlTW91c2VQb3NpdGlvblggfHwgKGV2ZW50LmNsaWVudFggK1xyXG4gICAgICAgICAgICAgICAgICAgICBnbG9iYWwuZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ICsgZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0KTtcclxuXHJcbiAgICAvLyBzdWJ0cmFjdCB0aGUgcGFnZSBvZmZzZXQgb2YgdGhlIHBvc2l0aW9uZWQgb2Zmc2V0IHBhcmVudFxyXG4gICAgbGVmdE9mZnNldCAtPSBwcm9ncmVzc0NvbnRyb2wuZWwoKS5cclxuICAgICAgICAgICAgICAgICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHBhZ2VYT2Zmc2V0O1xyXG4gICAgcmV0dXJuIGxlZnRPZmZzZXQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0TW91c2VWaWRlb1RpbWUobW91c2VMZWZ0T2Zmc2V0LCBwcm9ncmVzc0NvbnRyb2wsIGR1cmF0aW9uKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcigobW91c2VMZWZ0T2Zmc2V0IC0gcHJvZ3Jlc3NDb250cm9sLmVsKCkub2Zmc2V0TGVmdCkgL1xyXG4gICAgICAgICAgIHByb2dyZXNzQ29udHJvbC53aWR0aCgpICogZHVyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbFRpbWUodGltZWxpbmVUaW1lLCBwcm9ncmVzc0NvbnRyb2wpIHtcclxuICAgIHRpbWVsaW5lVGltZS5pbm5lckhUTUwgPSAocHJvZ3Jlc3NDb250cm9sLnNlZWtCYXIubW91c2VUaW1lRGlzcGxheS50aW1lVG9vbHRpcC5lbF8udGV4dENvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFBhZ2VNb3VzZVBvc2l0aW9uWChldmVudCkge1xyXG4gICAgbGV0IHBhZ2VNb3VzZU9mZnNldFggPSBldmVudC5wYWdlWDtcclxuXHJcbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcclxuICAgICAgcGFnZU1vdXNlT2Zmc2V0WCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhZ2VNb3VzZU9mZnNldFg7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMga2VlcFRodW1ibmFpbEluc2lkZVBsYXllcih0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGh1bWJuYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlTGVmdE9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzQmFyUmlnaHRPZmZzZXQpIHtcclxuXHJcbiAgICBjb25zdCB3aWR0aCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0VmlzaWJsZVdpZHRoKHRodW1ibmFpbEltZywgYWN0aXZlVGh1bWJuYWlsLndpZHRoIHx8XHJcbiAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzWzBdLndpZHRoKTtcclxuXHJcbiAgICBjb25zdCBoYWxmV2lkdGggPSB3aWR0aCAvIDI7XHJcblxyXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIHRodW1ibmFpbCBkb2Vzbid0IGZhbGwgb2ZmIHRoZSByaWdodCBzaWRlIG9mXHJcbiAgICAvLyB0aGUgbGVmdCBzaWRlIG9mIHRoZSBwbGF5ZXJcclxuICAgIGlmICgobW91c2VMZWZ0T2Zmc2V0ICsgaGFsZldpZHRoKSA+IHByb2dyZXNCYXJSaWdodE9mZnNldCkge1xyXG4gICAgICBtb3VzZUxlZnRPZmZzZXQgLT0gKG1vdXNlTGVmdE9mZnNldCArIGhhbGZXaWR0aCkgLSBwcm9ncmVzQmFyUmlnaHRPZmZzZXQ7XHJcbiAgICB9IGVsc2UgaWYgKG1vdXNlTGVmdE9mZnNldCA8IGhhbGZXaWR0aCkge1xyXG4gICAgICBtb3VzZUxlZnRPZmZzZXQgPSBoYWxmV2lkdGg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbW91c2VMZWZ0T2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZShtb3VzZUxlZnRPZmZzZXQsIHRodW1ibmFpbHNIb2xkZXIpIHtcclxuICAgIGNvbnN0IGxlZnRWYWx1ZSA9IHsgbW91c2VMZWZ0T2Zmc2V0IH07XHJcblxyXG4gICAgdGh1bWJuYWlsc0hvbGRlci5zdHlsZS5sZWZ0ID0gYCR7bGVmdFZhbHVlLm1vdXNlTGVmdE9mZnNldH1weGA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0QWN0aXZlVGh1bWJuYWlsKHRodW1ibmFpbENsaXBzLCBtb3VzZVRpbWUpIHtcclxuICAgIGxldCBhY3RpdmVDbGlwID0gMDtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGNsaXBOdW1iZXIgaW4gdGh1bWJuYWlsQ2xpcHMpIHtcclxuICAgICAgaWYgKG1vdXNlVGltZSA+IGNsaXBOdW1iZXIpIHtcclxuICAgICAgICBhY3RpdmVDbGlwID0gTWF0aC5tYXgoYWN0aXZlQ2xpcCwgY2xpcE51bWJlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aHVtYm5haWxDbGlwc1thY3RpdmVDbGlwXTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxTcmMoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpIHtcclxuICAgIGlmIChhY3RpdmVUaHVtYm5haWwuc3JjICYmIHRodW1ibmFpbEltZy5zcmMgIT09IGFjdGl2ZVRodW1ibmFpbC5zcmMpIHtcclxuICAgICAgdGh1bWJuYWlsSW1nLnNyYyA9IGFjdGl2ZVRodW1ibmFpbC5zcmM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdXBkYXRlVGh1bWJuYWlsU3R5bGUoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpIHtcclxuICAgIGlmIChhY3RpdmVUaHVtYm5haWwuc3R5bGUgJiYgdGh1bWJuYWlsSW1nLnN0eWxlICE9PSBhY3RpdmVUaHVtYm5haWwuc3R5bGUpIHtcclxuICAgICAgVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHRodW1ibmFpbEltZy5zdHlsZSwgYWN0aXZlVGh1bWJuYWlsLnN0eWxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBtb3ZlTGlzdGVuZXIoZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIpIHtcclxuXHJcbiAgICBjb25zdCBkdXJhdGlvbiA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0VmlkZW9EdXJhdGlvbihwbGF5ZXIpO1xyXG4gICAgY29uc3QgcGFnZVhPZmZzZXQgPSBUaHVtYm5haWxIZWxwZXJzLmdldFNjcm9sbE9mZnNldCgpLng7XHJcbiAgICBjb25zdCBwcm9ncmVzQmFyUG9zaXRpb24gPSBwcm9ncmVzc0NvbnRyb2wuZWwoKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIGNvbnN0IHByb2dyZXNCYXJSaWdodE9mZnNldCA9IChwcm9ncmVzQmFyUG9zaXRpb24ud2lkdGggfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzQmFyUG9zaXRpb24ucmlnaHQpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWE9mZnNldDtcclxuXHJcbiAgICBjb25zdCBwYWdlTW91c2VQb3NpdGlvblggPSBUaHVtYm5haWxIZWxwZXJzLmdldFBhZ2VNb3VzZVBvc2l0aW9uWChldmVudCk7XHJcblxyXG4gICAgbGV0IG1vdXNlTGVmdE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMuZmluZE1vdXNlTGVmdE9mZnNldChwYWdlTW91c2VQb3NpdGlvblgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVhPZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50KTtcclxuXHJcbiAgICBjb25zdCBtb3VzZVRpbWUgPSBUaHVtYm5haWxIZWxwZXJzLmdldE1vdXNlVmlkZW9UaW1lKG1vdXNlTGVmdE9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbik7XHJcblxyXG4gICAgY29uc3QgYWN0aXZlVGh1bWJuYWlsID0gVGh1bWJuYWlsSGVscGVycy5nZXRBY3RpdmVUaHVtYm5haWwodGh1bWJuYWlsQ2xpcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZVRpbWUpO1xyXG5cclxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsVGltZSh0aW1lbGluZVRpbWUsIHByb2dyZXNzQ29udHJvbCk7XHJcblxyXG4gICAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVUaHVtYm5haWxTcmMoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpO1xyXG5cclxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsU3R5bGUoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpO1xyXG5cclxuICAgIG1vdXNlTGVmdE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMua2VlcFRodW1ibmFpbEluc2lkZVBsYXllcih0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRodW1ibmFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlTGVmdE9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0KTtcclxuXHJcbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZShtb3VzZUxlZnRPZmZzZXQsIHRodW1ibmFpbHNIb2xkZXIpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHVwYWRhdGVPbkhvdmVyKHByb2dyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyKSB7XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSB0aHVtYm5haWwgd2hpbGUgaG92ZXJpbmdcclxuICAgIHByb2dyZXNzQ29udHJvbC5vbignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMubW92ZUxpc3RlbmVyKGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyKTtcclxuICAgIH0pO1xyXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaG1vdmUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgVGh1bWJuYWlsSGVscGVycy5tb3ZlTGlzdGVuZXIoZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcikge1xyXG4gICAgdGh1bWJuYWlsc0hvbGRlci5zdHlsZS5sZWZ0ID0gJy0xMDAwcHgnO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHVwYWRhdGVPbkhvdmVyT3V0KHByb2dyZXNzQ29udHJvbCwgdGh1bWJuYWlsc0hvbGRlciwgcGxheWVyKSB7XHJcblxyXG4gICAgLy8gbW92ZSB0aGUgcGxhY2Vob2xkZXIgb3V0IG9mIHRoZSB3YXkgd2hlbiBub3QgaG92ZXJpbmdcclxuICAgIHByb2dyZXNzQ29udHJvbC5vbignbW91c2VvdXQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgVGh1bWJuYWlsSGVscGVycy5oaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpO1xyXG4gICAgfSk7XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoY2FuY2VsJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcclxuICAgIH0pO1xyXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaGVuZCcsIChldmVudCkgPT4ge1xyXG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XHJcbiAgICB9KTtcclxuICAgIHBsYXllci5vbigndXNlcmluYWN0aXZlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxuXG4vLyBEZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBwbHVnaW4uXHJcbmNvbnN0IGRlZmF1bHRzID0ge307XHJcblxyXG4vLyBDcm9zcy1jb21wYXRpYmlsaXR5IGZvciBWaWRlby5qcyA1IGFuZCA2LlxyXG5jb25zdCByZWdpc3RlclBsdWdpbiA9IHZpZGVvanMucmVnaXN0ZXJQbHVnaW4gfHwgdmlkZW9qcy5wbHVnaW47XHJcbi8vIGNvbnN0IGRvbSA9IHZpZGVvanMuZG9tIHx8IHZpZGVvanM7XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIHBsYXllciBpcyByZWFkeS5cclxuICpcclxuICogVGhpcyBpcyBhIGdyZWF0IHBsYWNlIGZvciB5b3VyIHBsdWdpbiB0byBpbml0aWFsaXplIGl0c2VsZi4gV2hlbiB0aGlzXHJcbiAqIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHBsYXllciB3aWxsIGhhdmUgaXRzIERPTSBhbmQgY2hpbGQgY29tcG9uZW50c1xyXG4gKiBpbiBwbGFjZS5cclxuICpcclxuICogQGZ1bmN0aW9uIG9uUGxheWVyUmVhZHlcclxuICogQHBhcmFtICAgIHtQbGF5ZXJ9IHBsYXllclxyXG4gKiAgICAgICAgICAgQSBWaWRlby5qcyBwbGF5ZXIuXHJcbiAqIEBwYXJhbSAgICB7T2JqZWN0fSBbb3B0aW9ucz17fV1cclxuICogICAgICAgICAgIEFuIG9iamVjdCBvZiBvcHRpb25zIGxlZnQgdG8gdGhlIHBsdWdpbiBhdXRob3IgdG8gZGVmaW5lLlxyXG4gKi9cclxuXHJcbmNvbnN0IHByZXBhcmVUaHVtYm5haWxzQ2xpcHMgPSAodmlkZW9UaW1lLCBvcHRpb25zKSA9PiB7XHJcblxyXG4gIGxldCBjdXJyZW50VGltZSA9IDA7XHJcbiAgbGV0IGN1cnJlbnRJdGVyYXRpb24gPSAwO1xyXG4gIGxldCB0aHVtYm5haWxPZmZzZXQgPSAwO1xyXG4gIGNvbnN0IHN0ZXBUaW1lID0gb3B0aW9ucy5zdGVwVGltZTtcclxuICBjb25zdCB0aHVtYm5haWxXaWR0aCA9IG9wdGlvbnMud2lkdGg7XHJcbiAgY29uc3Qgc3ByaXRlVVJMID0gb3B0aW9ucy5zcHJpdGVVcmw7XHJcbiAgY29uc3QgdGh1bWJuYWlsQ2xpcHMgPSB7XHJcbiAgICAwOiB7XHJcbiAgICAgIHNyYzogc3ByaXRlVVJMLFxyXG4gICAgICBzdHlsZToge1xyXG4gICAgICAgIGxlZnQ6ICh0aHVtYm5haWxXaWR0aCAvIDIgKiAtMSkgKyAncHgnLFxyXG4gICAgICAgIHdpZHRoOiAoKE1hdGguZmxvb3IodmlkZW9UaW1lIC8gc3RlcFRpbWUpICsgMSkgKiB0aHVtYm5haWxXaWR0aCkgKyAncHgnLFxyXG4gICAgICAgIGNsaXA6ICdyZWN0KDAsJyArIG9wdGlvbnMud2lkdGggKyAncHgsJyArIG9wdGlvbnMud2lkdGggKyAncHgsIDApJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgd2hpbGUgKGN1cnJlbnRUaW1lIDw9IHZpZGVvVGltZSkge1xyXG4gICAgY3VycmVudFRpbWUgKz0gc3RlcFRpbWU7XHJcbiAgICB0aHVtYm5haWxPZmZzZXQgPSArK2N1cnJlbnRJdGVyYXRpb24gKiB0aHVtYm5haWxXaWR0aDtcclxuICAgIHRodW1ibmFpbENsaXBzW2N1cnJlbnRUaW1lXSA9IHtcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBsZWZ0OiAoKHRodW1ibmFpbFdpZHRoIC8gMiArIHRodW1ibmFpbE9mZnNldCkgKiAtMSkgKyAncHgnLFxyXG4gICAgICAgIGNsaXA6ICdyZWN0KDAsICcgKyAodGh1bWJuYWlsV2lkdGggKyB0aHVtYm5haWxPZmZzZXQpICsgJ3B4LCcgK1xyXG4gICAgICAgICAgICAgIG9wdGlvbnMud2lkdGggKyAncHgsICcgKyB0aHVtYm5haWxPZmZzZXQgKyAncHgpJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuICByZXR1cm4gdGh1bWJuYWlsQ2xpcHM7XHJcbn07XHJcblxyXG5jb25zdCBpbml0aWFsaXplVGh1bWJuYWlscyA9ICh0aHVtYm5haWxzQ2xpcHMsIHBsYXllcikgPT4ge1xyXG5cclxuICBjb25zdCB0aHVtYm5haWxDbGlwcyA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh7fSwgZGVmYXVsdHMsIHRodW1ibmFpbHNDbGlwcyk7XHJcbiAgY29uc3QgcHJvZ3Jlc3NDb250cm9sID0gcGxheWVyLmNvbnRyb2xCYXIucHJvZ3Jlc3NDb250cm9sO1xyXG4gIGNvbnN0IHRodW1ibmFpbEltZyA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlsSW1nKHRodW1ibmFpbENsaXBzKTtcclxuICBjb25zdCB0aW1lbGluZVRpbWUgPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbFRpbWUoKTtcclxuICBjb25zdCB0aHVtYm5haWxBcnJvd0Rvd24gPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbEFycm93RG93bigpO1xyXG4gIGxldCB0aHVtYm5haXNsSG9sZGVyID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haXNsSG9sZGVyKCk7XHJcblxyXG4gIHRodW1ibmFpc2xIb2xkZXIgPSBUaHVtYm5haWxIZWxwZXJzLm1lcmdlVGh1bWJuYWlsRWxlbWVudHModGh1bWJuYWlzbEhvbGRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEFycm93RG93bik7XHJcbiAgVGh1bWJuYWlsSGVscGVycy5oaWRlUGxheWVyT25Ib3ZlclRpbWUocHJvZ3Jlc3NDb250cm9sKTtcclxuXHJcbiAgaWYgKGdsb2JhbC53aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2FuZHJvaWQnKSAhPT0gLTEpIHtcclxuICAgIFRodW1ibmFpbEhlbHBlcnMuc3Vwb3J0QW5kcm9pZEV2ZW50cygpO1xyXG4gIH1cclxuXHJcbiAgVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHRodW1ibmFpbEltZy5zdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHNbJzAnXS5zdHlsZSk7XHJcblxyXG4gIFRodW1ibmFpbEhlbHBlcnMuY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvcih0aHVtYm5haWxJbWcpO1xyXG5cclxuICBUaHVtYm5haWxIZWxwZXJzLmFkZFRodW1ibmFpbFRvUGxheWVyKHByb2dyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpc2xIb2xkZXIpO1xyXG5cclxuICBUaHVtYm5haWxIZWxwZXJzLnVwYWRhdGVPbkhvdmVyKHByb2dyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpc2xIb2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XHJcblxyXG4gIFRodW1ibmFpbEhlbHBlcnMudXBhZGF0ZU9uSG92ZXJPdXQocHJvZ3Jlc3NDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlzbEhvbGRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XHJcbn07XHJcblxyXG5jb25zdCBvblBsYXllclJlYWR5ID0gKHBsYXllciwgb3B0aW9ucykgPT4ge1xyXG4gIHBsYXllci5vbignbG9hZGVkbWV0YWRhdGEnLCAoKCkgPT4ge1xyXG4gICAgY29uc3QgdGh1bWJuYWlsc0NsaXBzID0gcHJlcGFyZVRodW1ibmFpbHNDbGlwcyhwbGF5ZXIuZHVyYXRpb24oKSwgb3B0aW9ucyk7XHJcblxyXG4gICAgaW5pdGlhbGl6ZVRodW1ibmFpbHModGh1bWJuYWlsc0NsaXBzLCBwbGF5ZXIpO1xyXG4gIH0pKTtcclxufTtcclxuLyoqXHJcbiAqIEEgdmlkZW8uanMgcGx1Z2luLlxyXG4gKlxyXG4gKiBJbiB0aGUgcGx1Z2luIGZ1bmN0aW9uLCB0aGUgdmFsdWUgb2YgYHRoaXNgIGlzIGEgdmlkZW8uanMgYFBsYXllcmBcclxuICogaW5zdGFuY2UuIFlvdSBjYW5ub3QgcmVseSBvbiB0aGUgcGxheWVyIGJlaW5nIGluIGEgXCJyZWFkeVwiIHN0YXRlIGhlcmUsXHJcbiAqIGRlcGVuZGluZyBvbiBob3cgdGhlIHBsdWdpbiBpcyBpbnZva2VkLiBUaGlzIG1heSBvciBtYXkgbm90IGJlIGltcG9ydGFudFxyXG4gKiB0byB5b3U7IGlmIG5vdCwgcmVtb3ZlIHRoZSB3YWl0IGZvciBcInJlYWR5XCIhXHJcbiAqXHJcbiAqIEBmdW5jdGlvbiB0aHVtYm5haWxzXHJcbiAqIEBwYXJhbSAgICB7T2JqZWN0fSBbb3B0aW9ucz17fV1cclxuICogICAgICAgICAgIEFuIG9iamVjdCBvZiBvcHRpb25zIGxlZnQgdG8gdGhlIHBsdWdpbiBhdXRob3IgdG8gZGVmaW5lLlxyXG4gKi9cclxuY29uc3QgdGh1bWJuYWlscyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICB0aGlzLnJlYWR5KCgpID0+IHtcclxuICAgIG9uUGxheWVyUmVhZHkodGhpcywgdmlkZW9qcy5tZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpKTtcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJlZ2lzdGVyIHRoZSBwbHVnaW4gd2l0aCB2aWRlby5qcy5cclxucmVnaXN0ZXJQbHVnaW4oJ3RodW1ibmFpbHMnLCB0aHVtYm5haWxzKTtcclxuXHJcbi8vIEluY2x1ZGUgdGhlIHZlcnNpb24gbnVtYmVyLlxyXG50aHVtYm5haWxzLlZFUlNJT04gPSAnX19WRVJTSU9OX18nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRodW1ibmFpbHM7XG4iXX0=
