$(document).ready(function() {
	  $(function()
	  {
	    // live video script
	    var tag = document.createElement('script');
	    tag.src = "https://www.youtube.com/iframe_api";
	    var firstScriptTag = document.getElementsByTagName('script')[0];
	    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	    var player;
	    var checkYT = setInterval(function()
	    {
	      if (YT.loaded)
	      {
	        //...setup video here using YT.Player()
	        player = new YT.Player('player',
	        {
	          height: '100%',
	          width: '100%',
	          videoId: 'Fkd9TWUtFm0',
	          playerVars:
	          {
	            autoplay:0,
	            controls: 0,
	            rel: 0,
	            disablekb: 1,
	            modestbranding: 1,
	            showinfo: 0,
	            playsinline: 1
	          },
	          events:
	          {
	            // 'onReady': onPlayerReady,
	            'onStateChange': onPlayerStateChange
	          }
	        });
	        clearInterval(checkYT);
	      }
	    }, 100);
	    var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	    function onPlayerReady(event)
	    {
	      if (!is_safari)
	      {
	        event.target.playVideo();
	      }
	    }
	    var done = false;
	    var isReallyPlayingInSafariRunning = false;

	    function onPlayerStateChange(event)
	    {
	      // debugger;
	      if (event.data == YT.PlayerState.ENDED)
	      {}
	      else if (event.data == YT.PlayerState.PLAYING && !done && !is_safari)
	      {
	        $(".video-block__prevent").css(
	        {
	          "z-index": 2
	        });
	        done = true;
	        // debugger;
	      }
	      else if (is_safari && !done && event.data == YT.PlayerState.PLAYING)
	      {
	        var prevTime = null;
	        if (!isReallyPlayingInSafariRunning)
	        {
	          isReallyPlayingInSafariRunning = true;
	          var isReallyPlayingInSafari = setInterval(function()
	          {
	            var currTime = player.getCurrentTime();
	            if (!prevTime)
	            {
	              prevTime = player.getCurrentTime();
	            }
	            else
	            {
	              if ((currTime - prevTime) >= 0.4)
	              {
	                $(".video-block__prevent").css(
	                {
	                  "z-index": 2
	                });
	                clearInterval(isReallyPlayingInSafari);
	              }
	            }
	          }, 500);
	        }
	      }
	    }

	    function stopVideo()
	    {
	      player.stopVideo();
	    }
	    //Logic for video hover
	    var clicks = 0;
	    var videoResized = false;
	    $('.video-block__prevent').click(function()
	    {
	      clicks++;
	      setTimeout(function()
	      {
	        if (clicks === 1)
	        {
	          clicks = 0;
	          //alert('Single click');
	        }
	        else if (clicks > 1)
	        {
	          //Двойной тап
	          //TODO: логика растягивания видео
	          if (!videoResized)
	          {
	            $('.video').css(
	            {
	              position: 'fixed',
	              top: 0,
	              left: 0,
	              minWidth: '100vw',
	              minHeight: '100vh'
	            });
	            $('.language-picker').css(
	            {
	              opacity: 0
	            });
	            $('.video-block__prevent').css(
	            {
	              position: 'fixed',
	              top: 0,
	              left: 0,
	              minWidth: '100vw',
	              minHeight: '100vh'
	            });
	            videoResized = true;
	          }
	          else
	          {
	            //debugger;
	            $('.video').css(
	            {
	              position: 'static',
	              minWidth: 0,
	              minHeight: 0
	            });
	            $('.language-picker').css(
	            {
	              opacity: 1
	            });
	            $('.video-block__prevent').css(
	            {
	              width: "100%",
	              height: "100%",
	              minWidth: "0",
	              minHeight: "0",
	              position: "absolute",
	              top: 0,
	              left: 0,
	              "z-index": 5,
	              "pointer-events": "all"
	            });
	            videoResized = false;
	          }
	          clicks = 0;
	          //alert('Double tap');
	        }
	        else
	        {
	          clicks = 0;
	        }
	      }, 500);
	    });
	    $('.video-block__prevent-fullscreen').click(function()
	    {
	      $('.video-block__prevent').click();
	      $('.video-block__prevent').click();
	    });
	  });
});

