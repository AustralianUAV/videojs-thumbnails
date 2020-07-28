(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsThumbnails = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2JBOzs7Ozs7OztBQUVBLFNBQVMsZUFBVCxDQUEwQixFQUExQixFQUE4QjtBQUFFLFNBQVEsTUFBTyxRQUFPLEVBQVAseUNBQU8sRUFBUCxPQUFjLFFBQXJCLElBQWtDLGFBQWEsRUFBaEQsR0FBc0QsR0FBRyxTQUFILENBQXRELEdBQXNFLEVBQTdFO0FBQWtGOztBQUVsSCxJQUFJLFVBQVUsZ0JBQWdCLFFBQVEsVUFBUixDQUFoQixDQUFkO0FBQ0EsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiOztJQUVNLGdCOzs7Ozs7OzBDQUV5QixlLEVBQWlCO0FBQzVDLFVBQU0sWUFBWSxnQkFBZ0IsR0FBaEIsQ0FBb0Isc0JBQXBCLENBQTJDLG1CQUEzQyxFQUFnRSxDQUFoRSxDQUFsQjs7QUFFQSxnQkFBVSxLQUFWLENBQWdCLE9BQWhCLEdBQTBCLE1BQTFCO0FBQ0Q7Ozt1Q0FFZ0M7QUFBQSx3Q0FBTixJQUFNO0FBQU4sWUFBTTtBQUFBOztBQUMvQixVQUFNLGdCQUFnQixLQUFLLEtBQUwsTUFBZ0IsRUFBdEM7O0FBRUEsYUFBTyxJQUFQLENBQVksSUFBWixFQUFrQixHQUFsQixDQUFzQixVQUFDLENBQUQsRUFBTztBQUMzQixZQUFNLGtCQUFrQixLQUFLLENBQUwsQ0FBeEI7O0FBRUEsZUFBTyxJQUFQLENBQVksZUFBWixFQUE2QixHQUE3QixDQUFpQyxVQUFDLFFBQUQsRUFBYztBQUM3QyxjQUFJLGdCQUFnQixjQUFoQixDQUErQixRQUEvQixDQUFKLEVBQThDO0FBQzVDLGdCQUFJLFFBQU8sZ0JBQWdCLFFBQWhC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QUNBLGVBQWUsWUFBZixFQUE2QixVQUE3Qjs7QUFFQTtBQUNBLFdBQVcsT0FBWCxHQUFxQixhQUFyQjs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgd2luO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHdpbiA9IHNlbGY7XG59IGVsc2Uge1xuICAgIHdpbiA9IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciB2aWRlb2pzID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3ZpZGVvLmpzJykpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJ2dsb2JhbCcpO1xuXG5jbGFzcyBUaHVtYm5haWxIZWxwZXJzIHtcclxuXHJcbiAgc3RhdGljIGhpZGVQbGF5ZXJPbkhvdmVyVGltZShwcm9ncmVzc0NvbnRyb2wpIHtcclxuICAgIGNvbnN0IG1vdXNlVGltZSA9IHByb2dyZXNzQ29udHJvbC5lbF8uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmpzLW1vdXNlLWRpc3BsYXknKVswXTtcclxuXHJcbiAgICBtb3VzZVRpbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVUaHVtYm5haWxzKC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IHRodW1ibmFpbENsaXAgPSBhcmdzLnNoaWZ0KCkgfHwge307XHJcblxyXG4gICAgT2JqZWN0LmtleXMoYXJncykubWFwKChpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNpbmdsZVRodW1ibmFpbCA9IGFyZ3NbaV07XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhzaW5nbGVUaHVtYm5haWwpLm1hcCgocHJvcGVydHkpID0+IHtcclxuICAgICAgICBpZiAoc2luZ2xlVGh1bWJuYWlsLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aHVtYm5haWxDbGlwW3Byb3BlcnR5XSA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh0aHVtYm5haWxDbGlwW3Byb3BlcnR5XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlVGh1bWJuYWlsW3Byb3BlcnR5XSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYm5haWxDbGlwW3Byb3BlcnR5XSA9IHNpbmdsZVRodW1ibmFpbFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aHVtYm5haWxDbGlwO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aHVtYm5haWxDbGlwO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvbXB1dGVkU3R5bGUodGh1bWJuYWlsQ29udGVudCwgcHNldWRvKSB7XHJcbiAgICByZXR1cm4gKHByb3ApID0+IHtcclxuICAgICAgaWYgKGdsb2JhbC53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWwud2luZG93LmdldENvbXB1dGVkU3R5bGUodGh1bWJuYWlsQ29udGVudCwgcHNldWRvKVtwcm9wXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGh1bWJuYWlsQ29udGVudC5jdXJyZW50U3R5bGVbcHJvcF07XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFZpc2libGVXaWR0aCh0aHVtYm5haWxDb250ZW50LCB3aWR0aCkge1xyXG4gICAgaWYgKHdpZHRoKSB7XHJcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2xpcCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0Q29tcHV0ZWRTdHlsZSh0aHVtYm5haWxDb250ZW50KSgnY2xpcCcpO1xyXG5cclxuICAgIGlmIChjbGlwICE9PSAnYXV0bycgJiYgY2xpcCAhPT0gJ2luaGVyaXQnKSB7XHJcbiAgICAgIGNsaXAgPSBjbGlwLnNwbGl0KC8oPzpcXCh8XFwpKS8pWzFdLnNwbGl0KC8oPzosfCApLyk7XHJcbiAgICAgIGlmIChjbGlwLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgIHJldHVybiAocGFyc2VGbG9hdChjbGlwWzFdKSAtIHBhcnNlRmxvYXQoY2xpcFszXSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRTY3JvbGxPZmZzZXQoKSB7XHJcbiAgICBpZiAoZ2xvYmFsLndpbmRvdy5wYWdlWE9mZnNldCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IGdsb2JhbC53aW5kb3cucGFnZVhPZmZzZXQsXHJcbiAgICAgICAgeTogZ2xvYmFsLndpbmRvdy5wYWdlWU9mZnNldFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxyXG4gICAgICB5OiBnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdXBvcnRBbmRyb2lkRXZlbnRzKHBsYXllcikge1xyXG4gICAgLy8gQW5kcm9pZCBkb2Vzbid0IHN1cHBvcnQgOmFjdGl2ZSBhbmQgOmhvdmVyIG9uIG5vbi1hbmNob3IgYW5kIG5vbi1idXR0b24gZWxlbWVudHNcclxuICAgIC8vIHNvLCB3ZSBuZWVkIHRvIGZha2UgdGhlIDphY3RpdmUgc2VsZWN0b3IgZm9yIHRodW1ibmFpbHMgdG8gc2hvdyB1cC5cclxuICAgIGNvbnN0IHByb2dyZXNzQ29udHJvbCA9IHBsYXllci5jb250cm9sQmFyLnByb2dyZXNzQ29udHJvbDtcclxuXHJcbiAgICBjb25zdCBhZGRGYWtlQWN0aXZlID0gKCkgPT4ge1xyXG4gICAgICBwcm9ncmVzc0NvbnRyb2wuYWRkQ2xhc3MoJ2Zha2UtYWN0aXZlJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZUZha2VBY3RpdmUgPSAoKSA9PiB7XHJcbiAgICAgIHByb2dyZXNzQ29udHJvbC5yZW1vdmVDbGFzcygnZmFrZS1hY3RpdmUnKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaHN0YXJ0JywgYWRkRmFrZUFjdGl2ZSk7XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoZW5kJywgcmVtb3ZlRmFrZUFjdGl2ZSk7XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoY2FuY2VsJywgcmVtb3ZlRmFrZUFjdGl2ZSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlzbEhvbGRlcigpIHtcclxuICAgIGNvbnN0IHdyYXAgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgd3JhcC5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC1ob2xkZXInO1xyXG4gICAgcmV0dXJuIHdyYXA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsSW1nKHRodW1ibmFpbENsaXBzKSB7XHJcbiAgICBjb25zdCB0aHVtYm5haWxJbWcgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblxyXG4gICAgdGh1bWJuYWlsSW1nLnNyYyA9IHRodW1ibmFpbENsaXBzWycwJ10uc3JjO1xyXG4gICAgdGh1bWJuYWlsSW1nLmNsYXNzTmFtZSA9ICd2anMtdGh1bWJuYWlsLWltZyc7XHJcbiAgICByZXR1cm4gdGh1bWJuYWlsSW1nO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbFRpbWUoKSB7XHJcbiAgICBjb25zdCB0aW1lID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIHRpbWUuY2xhc3NOYW1lID0gJ3Zqcy10aHVtYm5haWwtdGltZSc7XHJcbiAgICB0aW1lLmlkID0gJ3Zqcy10aW1lJztcclxuICAgIHJldHVybiB0aW1lO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbEFycm93RG93bigpIHtcclxuICAgIGNvbnN0IGFycm93ID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIGFycm93LmNsYXNzTmFtZSA9ICd2anMtdGh1bWJuYWlsLWFycm93JztcclxuICAgIGFycm93LmlkID0gJ3Zqcy1hcnJvdyc7XHJcbiAgICByZXR1cm4gYXJyb3c7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbWVyZ2VUaHVtYm5haWxFbGVtZW50cyh0aHVtYm5haWxzSG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQXJyb3dEb3duKSB7XHJcblxyXG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aHVtYm5haWxJbWcpO1xyXG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aW1lbGluZVRpbWUpO1xyXG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aHVtYm5haWxBcnJvd0Rvd24pO1xyXG4gICAgcmV0dXJuIHRodW1ibmFpbHNIb2xkZXI7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvcih0aHVtYm5haWxJbWcpIHtcclxuICAgIC8vIGNlbnRlciB0aGUgdGh1bWJuYWlsIG92ZXIgdGhlIGN1cnNvciBpZiBhbiBvZmZzZXQgd2Fzbid0IHByb3ZpZGVkXHJcbiAgICBpZiAoIXRodW1ibmFpbEltZy5zdHlsZS5sZWZ0ICYmICF0aHVtYm5haWxJbWcuc3R5bGUucmlnaHQpIHtcclxuICAgICAgdGh1bWJuYWlsSW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB0aHVtYm5haWxXaWR0aCA9IHsgd2lkdGg6IC0odGh1bWJuYWlsSW1nLm5hdHVyYWxXaWR0aCAvIDIpIH07XHJcblxyXG4gICAgICAgIHRodW1ibmFpbEltZy5zdHlsZS5sZWZ0ID0gYCR7dGh1bWJuYWlsV2lkdGh9cHhgO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFZpZGVvRHVyYXRpb24ocGxheWVyKSB7XHJcbiAgICBsZXQgZHVyYXRpb24gPSBwbGF5ZXIuZHVyYXRpb24oKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ2R1cmF0aW9uY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICBkdXJhdGlvbiA9IHBsYXllci5kdXJhdGlvbigpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZHVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkVGh1bWJuYWlsVG9QbGF5ZXIocHJvZ3Jlc3NDb250cm9sLCB0aHVtYm5haWxzSG9sZGVyKSB7XHJcbiAgICBwcm9ncmVzc0NvbnRyb2wuZWwoKS5hcHBlbmRDaGlsZCh0aHVtYm5haWxzSG9sZGVyKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kTW91c2VMZWZ0T2Zmc2V0KHBhZ2VNb3VzZVBvc2l0aW9uWCwgcHJvZ3Jlc3NDb250cm9sLCBwYWdlWE9mZnNldCwgZXZlbnQpIHtcclxuICAgIC8vIGZpbmQgdGhlIHBhZ2Ugb2Zmc2V0IG9mIHRoZSBtb3VzZVxyXG4gICAgbGV0IGxlZnRPZmZzZXQgPSBwYWdlTW91c2VQb3NpdGlvblggfHwgKGV2ZW50LmNsaWVudFggK1xyXG4gICAgICAgICAgICAgICAgICAgICBnbG9iYWwuZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ICsgZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0KTtcclxuXHJcbiAgICAvLyBzdWJ0cmFjdCB0aGUgcGFnZSBvZmZzZXQgb2YgdGhlIHBvc2l0aW9uZWQgb2Zmc2V0IHBhcmVudFxyXG4gICAgbGVmdE9mZnNldCAtPSBwcm9ncmVzc0NvbnRyb2wuZWwoKS5cclxuICAgICAgICAgICAgICAgICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHBhZ2VYT2Zmc2V0O1xyXG4gICAgcmV0dXJuIGxlZnRPZmZzZXQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0TW91c2VWaWRlb1RpbWUobW91c2VMZWZ0T2Zmc2V0LCBwcm9ncmVzc0NvbnRyb2wsIGR1cmF0aW9uKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcigobW91c2VMZWZ0T2Zmc2V0IC8qLSBwcm9ncmVzc0NvbnRyb2wuZWwoKS5vZmZzZXRMZWZ0Ki8pIC9cclxuICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wud2lkdGgoKSAqIGR1cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxUaW1lKHRpbWVsaW5lVGltZSwgcHJvZ3Jlc3NDb250cm9sKSB7XHJcbiAgICB0aW1lbGluZVRpbWUuaW5uZXJIVE1MID0gKHByb2dyZXNzQ29udHJvbC5zZWVrQmFyLm1vdXNlVGltZURpc3BsYXkudGltZVRvb2x0aXAuZWxfLnRleHRDb250ZW50KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRQYWdlTW91c2VQb3NpdGlvblgoZXZlbnQpIHtcclxuICAgIGxldCBwYWdlTW91c2VPZmZzZXRYID0gZXZlbnQucGFnZVg7XHJcblxyXG4gICAgaWYgKGV2ZW50LmNoYW5nZWRUb3VjaGVzKSB7XHJcbiAgICAgIHBhZ2VNb3VzZU9mZnNldFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcclxuICAgIH1cclxuICAgIHJldHVybiBwYWdlTW91c2VPZmZzZXRYO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGtlZXBUaHVtYm5haWxJbnNpZGVQbGF5ZXIodGh1bWJuYWlsSW1nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRodW1ibmFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUxlZnRPZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0KSB7XHJcblxyXG4gICAgY29uc3Qgd2lkdGggPSBUaHVtYm5haWxIZWxwZXJzLmdldFZpc2libGVXaWR0aCh0aHVtYm5haWxJbWcsIGFjdGl2ZVRodW1ibmFpbC53aWR0aCB8fFxyXG4gICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwc1swXS53aWR0aCk7XHJcblxyXG4gICAgY29uc3QgaGFsZldpZHRoID0gd2lkdGggLyAyO1xyXG5cclxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSB0aHVtYm5haWwgZG9lc24ndCBmYWxsIG9mZiB0aGUgcmlnaHQgc2lkZSBvZlxyXG4gICAgLy8gdGhlIGxlZnQgc2lkZSBvZiB0aGUgcGxheWVyXHJcbiAgICBpZiAoKG1vdXNlTGVmdE9mZnNldCArIGhhbGZXaWR0aCkgPiBwcm9ncmVzQmFyUmlnaHRPZmZzZXQpIHtcclxuICAgICAgbW91c2VMZWZ0T2Zmc2V0IC09IChtb3VzZUxlZnRPZmZzZXQgKyBoYWxmV2lkdGgpIC0gcHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0O1xyXG4gICAgfSBlbHNlIGlmIChtb3VzZUxlZnRPZmZzZXQgPCBoYWxmV2lkdGgpIHtcclxuICAgICAgbW91c2VMZWZ0T2Zmc2V0ID0gaGFsZldpZHRoO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vdXNlTGVmdE9mZnNldDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxMZWZ0U3R5bGUobW91c2VMZWZ0T2Zmc2V0LCB0aHVtYm5haWxzSG9sZGVyKSB7XHJcbiAgICBjb25zdCBsZWZ0VmFsdWUgPSB7IG1vdXNlTGVmdE9mZnNldCB9O1xyXG5cclxuICAgIHRodW1ibmFpbHNIb2xkZXIuc3R5bGUubGVmdCA9IGAke2xlZnRWYWx1ZS5tb3VzZUxlZnRPZmZzZXR9cHhgO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEFjdGl2ZVRodW1ibmFpbCh0aHVtYm5haWxDbGlwcywgbW91c2VUaW1lKSB7XHJcbiAgICBsZXQgYWN0aXZlQ2xpcCA9IDA7XHJcblxyXG4gICAgZm9yIChjb25zdCBjbGlwTnVtYmVyIGluIHRodW1ibmFpbENsaXBzKSB7XHJcbiAgICAgIGlmIChtb3VzZVRpbWUgPiBjbGlwTnVtYmVyKSB7XHJcbiAgICAgICAgYWN0aXZlQ2xpcCA9IE1hdGgubWF4KGFjdGl2ZUNsaXAsIGNsaXBOdW1iZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGh1bWJuYWlsQ2xpcHNbYWN0aXZlQ2xpcF07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdXBkYXRlVGh1bWJuYWlsU3JjKGFjdGl2ZVRodW1ibmFpbCwgdGh1bWJuYWlsSW1nKSB7XHJcbiAgICBpZiAoYWN0aXZlVGh1bWJuYWlsLnNyYyAmJiB0aHVtYm5haWxJbWcuc3JjICE9PSBhY3RpdmVUaHVtYm5haWwuc3JjKSB7XHJcbiAgICAgIHRodW1ibmFpbEltZy5zcmMgPSBhY3RpdmVUaHVtYm5haWwuc3JjO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbFN0eWxlKGFjdGl2ZVRodW1ibmFpbCwgdGh1bWJuYWlsSW1nKSB7XHJcbiAgICBpZiAoYWN0aXZlVGh1bWJuYWlsLnN0eWxlICYmIHRodW1ibmFpbEltZy5zdHlsZSAhPT0gYWN0aXZlVGh1bWJuYWlsLnN0eWxlKSB7XHJcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh0aHVtYm5haWxJbWcuc3R5bGUsIGFjdGl2ZVRodW1ibmFpbC5zdHlsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbW92ZUxpc3RlbmVyKGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcclxuICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGxheWVyKSB7XHJcblxyXG4gICAgY29uc3QgZHVyYXRpb24gPSBUaHVtYm5haWxIZWxwZXJzLmdldFZpZGVvRHVyYXRpb24ocGxheWVyKTtcclxuICAgIGNvbnN0IHBhZ2VYT2Zmc2V0ID0gVGh1bWJuYWlsSGVscGVycy5nZXRTY3JvbGxPZmZzZXQoKS54O1xyXG4gICAgY29uc3QgcHJvZ3Jlc0JhclBvc2l0aW9uID0gcHJvZ3Jlc3NDb250cm9sLmNoaWxkcmVuKClbMF0uZWwoKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIGNvbnN0IHByb2dyZXNCYXJSaWdodE9mZnNldCA9IChwcm9ncmVzQmFyUG9zaXRpb24ud2lkdGggfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzQmFyUG9zaXRpb24ucmlnaHQpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWE9mZnNldDtcclxuXHJcbiAgICBjb25zdCBwYWdlTW91c2VQb3NpdGlvblggPSBUaHVtYm5haWxIZWxwZXJzLmdldFBhZ2VNb3VzZVBvc2l0aW9uWChldmVudCk7XHJcblxyXG4gICAgbGV0IG1vdXNlTGVmdE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMuZmluZE1vdXNlTGVmdE9mZnNldChwYWdlTW91c2VQb3NpdGlvblgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbC5jaGlsZHJlbigpWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWE9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQpO1xyXG5cclxuICAgIGNvbnN0IG1vdXNlVGltZSA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0TW91c2VWaWRlb1RpbWUobW91c2VMZWZ0T2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wuY2hpbGRyZW4oKVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24pO1xyXG5cclxuICAgIGNvbnN0IGFjdGl2ZVRodW1ibmFpbCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0QWN0aXZlVGh1bWJuYWlsKHRodW1ibmFpbENsaXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VUaW1lKTtcclxuXHJcbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbFRpbWUodGltZWxpbmVUaW1lLCBwcm9ncmVzc0NvbnRyb2wpO1xyXG5cclxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsU3JjKGFjdGl2ZVRodW1ibmFpbCwgdGh1bWJuYWlsSW1nKTtcclxuXHJcbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbFN0eWxlKGFjdGl2ZVRodW1ibmFpbCwgdGh1bWJuYWlsSW1nKTtcclxuXHJcbiAgICBtb3VzZUxlZnRPZmZzZXQgPSBUaHVtYm5haWxIZWxwZXJzLmtlZXBUaHVtYm5haWxJbnNpZGVQbGF5ZXIodGh1bWJuYWlsSW1nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUaHVtYm5haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUxlZnRPZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNCYXJSaWdodE9mZnNldCk7XHJcblxyXG4gICAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVUaHVtYm5haWxMZWZ0U3R5bGUobW91c2VMZWZ0T2Zmc2V0LCB0aHVtYm5haWxzSG9sZGVyKTtcclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKFwibW92ZUxpc3RlbmVyIHRpbWVsaW5lVGltZTogXCIgKyB0aW1lbGluZVRpbWUgKyBcIiwgYWN0aXZlVGh1bWJuYWlsOiBcIiArIGFjdGl2ZVRodW1ibmFpbCk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwicGFnZU1vdXNlUG9zaXRpb25YOiBcIiArIHBhZ2VNb3VzZVBvc2l0aW9uWCArIFwiLCBtb3VzZUxlZnRPZmZzZXQ6IFwiICsgbW91c2VMZWZ0T2Zmc2V0KTtcclxuICAgIC8vY29uc29sZS5kaXIoYWN0aXZlVGh1bWJuYWlsKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB1cGFkYXRlT25Ib3Zlcihwcm9ncmVzc0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcikge1xyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgdGh1bWJuYWlsIHdoaWxlIGhvdmVyaW5nXHJcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xyXG4gICAgICBUaHVtYm5haWxIZWxwZXJzLm1vdmVMaXN0ZW5lcihldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XHJcbiAgICB9KTtcclxuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2htb3ZlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMubW92ZUxpc3RlbmVyKGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBoaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpIHtcclxuICAgIHRodW1ibmFpbHNIb2xkZXIuc3R5bGUubGVmdCA9ICctMTAwMHB4JztcclxuICB9XHJcblxyXG4gIHN0YXRpYyB1cGFkYXRlT25Ib3Zlck91dChwcm9ncmVzc0NvbnRyb2wsIHRodW1ibmFpbHNIb2xkZXIsIHBsYXllcikge1xyXG5cclxuICAgIC8vIG1vdmUgdGhlIHBsYWNlaG9sZGVyIG91dCBvZiB0aGUgd2F5IHdoZW4gbm90IGhvdmVyaW5nXHJcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ21vdXNlb3V0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcclxuICAgIH0pO1xyXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaGNhbmNlbCcsIChldmVudCkgPT4ge1xyXG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XHJcbiAgICB9KTtcclxuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hlbmQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgVGh1bWJuYWlsSGVscGVycy5oaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpO1xyXG4gICAgfSk7XHJcbiAgICBwbGF5ZXIub24oJ3VzZXJpbmFjdGl2ZScsIChldmVudCkgPT4ge1xyXG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cblxuLy8gRGVmYXVsdCBvcHRpb25zIGZvciB0aGUgcGx1Z2luLlxyXG5jb25zdCBkZWZhdWx0cyA9IHt9O1xyXG5cclxuLy8gQ3Jvc3MtY29tcGF0aWJpbGl0eSBmb3IgVmlkZW8uanMgNSBhbmQgNi5cclxuY29uc3QgcmVnaXN0ZXJQbHVnaW4gPSB2aWRlb2pzLnJlZ2lzdGVyUGx1Z2luIHx8IHZpZGVvanMucGx1Z2luO1xyXG4vLyBjb25zdCBkb20gPSB2aWRlb2pzLmRvbSB8fCB2aWRlb2pzO1xyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBwbGF5ZXIgaXMgcmVhZHkuXHJcbiAqXHJcbiAqIFRoaXMgaXMgYSBncmVhdCBwbGFjZSBmb3IgeW91ciBwbHVnaW4gdG8gaW5pdGlhbGl6ZSBpdHNlbGYuIFdoZW4gdGhpc1xyXG4gKiBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSBwbGF5ZXIgd2lsbCBoYXZlIGl0cyBET00gYW5kIGNoaWxkIGNvbXBvbmVudHNcclxuICogaW4gcGxhY2UuXHJcbiAqXHJcbiAqIEBmdW5jdGlvbiBvblBsYXllclJlYWR5XHJcbiAqIEBwYXJhbSAgICB7UGxheWVyfSBwbGF5ZXJcclxuICogICAgICAgICAgIEEgVmlkZW8uanMgcGxheWVyLlxyXG4gKiBAcGFyYW0gICAge09iamVjdH0gW29wdGlvbnM9e31dXHJcbiAqICAgICAgICAgICBBbiBvYmplY3Qgb2Ygb3B0aW9ucyBsZWZ0IHRvIHRoZSBwbHVnaW4gYXV0aG9yIHRvIGRlZmluZS5cclxuICovXHJcblxyXG5jb25zdCBwcmVwYXJlVGh1bWJuYWlsc0NsaXBzID0gKHZpZGVvVGltZSwgb3B0aW9ucykgPT4ge1xyXG5cclxuICBsZXQgY3VycmVudFRpbWUgPSAwO1xyXG4gIGxldCBjdXJyZW50SXRlcmF0aW9uID0gMDtcclxuICBsZXQgdGh1bWJuYWlsT2Zmc2V0ID0gMDtcclxuICBjb25zdCBzdGVwVGltZSA9IG9wdGlvbnMuc3RlcFRpbWU7XHJcbiAgY29uc3QgdGh1bWJuYWlsV2lkdGggPSBvcHRpb25zLndpZHRoO1xyXG4gIGNvbnN0IHNwcml0ZVVSTCA9IG9wdGlvbnMuc3ByaXRlVXJsO1xyXG4gIGNvbnN0IHRodW1ibmFpbENsaXBzID0ge1xyXG4gICAgMDoge1xyXG4gICAgICBzcmM6IHNwcml0ZVVSTCxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBsZWZ0OiAodGh1bWJuYWlsV2lkdGggLyAyICogLTEpICsgJ3B4JyxcclxuICAgICAgICB3aWR0aDogKChNYXRoLmZsb29yKHZpZGVvVGltZSAvIHN0ZXBUaW1lKSArIDEpICogdGh1bWJuYWlsV2lkdGgpICsgJ3B4JyxcclxuICAgICAgICBjbGlwOiAncmVjdCgwLCcgKyBvcHRpb25zLndpZHRoICsgJ3B4LCcgKyBvcHRpb25zLndpZHRoICsgJ3B4LCAwKSdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHdoaWxlIChjdXJyZW50VGltZSA8PSB2aWRlb1RpbWUpIHtcclxuICAgIGN1cnJlbnRUaW1lICs9IHN0ZXBUaW1lO1xyXG4gICAgdGh1bWJuYWlsT2Zmc2V0ID0gKytjdXJyZW50SXRlcmF0aW9uICogdGh1bWJuYWlsV2lkdGg7XHJcbiAgICB0aHVtYm5haWxDbGlwc1tjdXJyZW50VGltZV0gPSB7XHJcbiAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgbGVmdDogKCh0aHVtYm5haWxXaWR0aCAvIDIgKyB0aHVtYm5haWxPZmZzZXQpICogLTEpICsgJ3B4JyxcclxuICAgICAgICBjbGlwOiAncmVjdCgwLCAnICsgKHRodW1ibmFpbFdpZHRoICsgdGh1bWJuYWlsT2Zmc2V0KSArICdweCwnICtcclxuICAgICAgICAgICAgICBvcHRpb25zLndpZHRoICsgJ3B4LCAnICsgdGh1bWJuYWlsT2Zmc2V0ICsgJ3B4KSdcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbiAgcmV0dXJuIHRodW1ibmFpbENsaXBzO1xyXG59O1xyXG5cclxuY29uc3QgaW5pdGlhbGl6ZVRodW1ibmFpbHMgPSAodGh1bWJuYWlsc0NsaXBzLCBwbGF5ZXIpID0+IHtcclxuXHJcbiAgY29uc3QgdGh1bWJuYWlsQ2xpcHMgPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbHMoe30sIGRlZmF1bHRzLCB0aHVtYm5haWxzQ2xpcHMpO1xyXG4gIGNvbnN0IHByb2dyZXNzQ29udHJvbCA9IHBsYXllci5jb250cm9sQmFyLnByb2dyZXNzQ29udHJvbDtcclxuICBjb25zdCB0aHVtYm5haWxJbWcgPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbEltZyh0aHVtYm5haWxDbGlwcyk7XHJcbiAgY29uc3QgdGltZWxpbmVUaW1lID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxUaW1lKCk7XHJcbiAgY29uc3QgdGh1bWJuYWlsQXJyb3dEb3duID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxBcnJvd0Rvd24oKTtcclxuICBsZXQgdGh1bWJuYWlzbEhvbGRlciA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlzbEhvbGRlcigpO1xyXG5cclxuICB0aHVtYm5haXNsSG9sZGVyID0gVGh1bWJuYWlsSGVscGVycy5tZXJnZVRodW1ibmFpbEVsZW1lbnRzKHRodW1ibmFpc2xIb2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxBcnJvd0Rvd24pO1xyXG4gIFRodW1ibmFpbEhlbHBlcnMuaGlkZVBsYXllck9uSG92ZXJUaW1lKHByb2dyZXNzQ29udHJvbCk7XHJcblxyXG4gIGlmIChnbG9iYWwud2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdhbmRyb2lkJykgIT09IC0xKSB7XHJcbiAgICBUaHVtYm5haWxIZWxwZXJzLnN1cG9ydEFuZHJvaWRFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh0aHVtYm5haWxJbWcuc3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzWycwJ10uc3R5bGUpO1xyXG5cclxuICBUaHVtYm5haWxIZWxwZXJzLmNlbnRlclRodW1ibmFpbE92ZXJDdXJzb3IodGh1bWJuYWlsSW1nKTtcclxuXHJcbiAgVGh1bWJuYWlsSGVscGVycy5hZGRUaHVtYm5haWxUb1BsYXllcihwcm9ncmVzc0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haXNsSG9sZGVyKTtcclxuXHJcbiAgVGh1bWJuYWlsSGVscGVycy51cGFkYXRlT25Ib3Zlcihwcm9ncmVzc0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haXNsSG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIpO1xyXG5cclxuICBUaHVtYm5haWxIZWxwZXJzLnVwYWRhdGVPbkhvdmVyT3V0KHByb2dyZXNzQ29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpc2xIb2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIpO1xyXG59O1xyXG5cclxuY29uc3Qgb25QbGF5ZXJSZWFkeSA9IChwbGF5ZXIsIG9wdGlvbnMpID0+IHtcclxuICBwbGF5ZXIub24oJ2xvYWRlZG1ldGFkYXRhJywgKCgpID0+IHtcclxuICAgIGNvbnN0IHRodW1ibmFpbHNDbGlwcyA9IHByZXBhcmVUaHVtYm5haWxzQ2xpcHMocGxheWVyLmR1cmF0aW9uKCksIG9wdGlvbnMpO1xyXG5cclxuICAgIGluaXRpYWxpemVUaHVtYm5haWxzKHRodW1ibmFpbHNDbGlwcywgcGxheWVyKTtcclxuICB9KSk7XHJcbn07XHJcbi8qKlxyXG4gKiBBIHZpZGVvLmpzIHBsdWdpbi5cclxuICpcclxuICogSW4gdGhlIHBsdWdpbiBmdW5jdGlvbiwgdGhlIHZhbHVlIG9mIGB0aGlzYCBpcyBhIHZpZGVvLmpzIGBQbGF5ZXJgXHJcbiAqIGluc3RhbmNlLiBZb3UgY2Fubm90IHJlbHkgb24gdGhlIHBsYXllciBiZWluZyBpbiBhIFwicmVhZHlcIiBzdGF0ZSBoZXJlLFxyXG4gKiBkZXBlbmRpbmcgb24gaG93IHRoZSBwbHVnaW4gaXMgaW52b2tlZC4gVGhpcyBtYXkgb3IgbWF5IG5vdCBiZSBpbXBvcnRhbnRcclxuICogdG8geW91OyBpZiBub3QsIHJlbW92ZSB0aGUgd2FpdCBmb3IgXCJyZWFkeVwiIVxyXG4gKlxyXG4gKiBAZnVuY3Rpb24gdGh1bWJuYWlsc1xyXG4gKiBAcGFyYW0gICAge09iamVjdH0gW29wdGlvbnM9e31dXHJcbiAqICAgICAgICAgICBBbiBvYmplY3Qgb2Ygb3B0aW9ucyBsZWZ0IHRvIHRoZSBwbHVnaW4gYXV0aG9yIHRvIGRlZmluZS5cclxuICovXHJcbmNvbnN0IHRodW1ibmFpbHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgdGhpcy5yZWFkeSgoKSA9PiB7XHJcbiAgICBvblBsYXllclJlYWR5KHRoaXMsIHZpZGVvanMubWVyZ2VPcHRpb25zKGRlZmF1bHRzLCBvcHRpb25zKSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBSZWdpc3RlciB0aGUgcGx1Z2luIHdpdGggdmlkZW8uanMuXHJcbnJlZ2lzdGVyUGx1Z2luKCd0aHVtYm5haWxzJywgdGh1bWJuYWlscyk7XHJcblxyXG4vLyBJbmNsdWRlIHRoZSB2ZXJzaW9uIG51bWJlci5cclxudGh1bWJuYWlscy5WRVJTSU9OID0gJ19fVkVSU0lPTl9fJztcblxubW9kdWxlLmV4cG9ydHMgPSB0aHVtYm5haWxzO1xuIl19
