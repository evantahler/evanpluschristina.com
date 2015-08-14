  
  'use strict';
  
    
  $(document).ready(function(){       
    // PACE
    //==================================================================================    
    setTimeout( function(){
      $("#preloader-overlay").css("visibility","visible");
    },500); 
    
    Pace.on('done', function () {
      $('#logo_loader').hide();
      $('#white-screen').hide();
    });
    Pace.on('hide', function () {   
    
      // GALLERY - MASONRY
      //==================================================================================
      var $gallery = $('#gallery-masonry');
      
      if (device.tablet() || device.mobile()) {
        $gallery.masonry({
          columnWidth: ".grid_sizer",
          itemSelector: ".masonry_col",
          transitionDuration: 0,
        });
      }
      else
      {
        $gallery.masonry({
          columnWidth: ".grid_sizer",
          itemSelector: ".masonry_col",
          transitionDuration: "1s",
        });
      }
    
      // WAYPOINT
      //====================================================
      if( !device.tablet() && !device.mobile() ) {
        $('.animation').css({
          visibility: 'hidden'
        }); 
  
        $('.animation').waypoint(function() {
          $(this).css({ visibility: 'visible' });
          $(this).addClass('animated');
          }, {
          offset: '95%'
        });
      }
      
      // Refresh Waypoint After Masonry Layout Complete
      if( !device.tablet() && !device.mobile() ) {
        $gallery.masonry( 'on', 'layoutComplete', function( msnryInstance, laidOutItems ) {$.waypoints('refresh');} )
      }
      
      $(window).resize(function() { 
        $gallery.masonry(); 
        if( !device.tablet() && !device.mobile() && $(window).width() < 1200) {
          setTimeout( function(){
            $.waypoints('refresh'); 
          },1000);
        }
      }); 
      
      
      // PARALLAX MAIN PHOTO
      //======================================================================================
      var parallax_photo = function(){
        if($(window).width()>1199 && !device.tablet() && !device.mobile() ) {
          $('#gallery-main-photo').parallax("50%", 0.1);
          $('#bridesmaid-main-photo').parallax("50%", 0.1);
          $('#groomsmen-main-photo').parallax("50%", 0.1);
          $('#blog-main-photo').parallax("50%", 0.1);
          $('#events-main-photo').parallax("50%", 0.1);
          $('#rsvp-main-photo').parallax("50%", 0.1);
          $('#accommodations-main-photo').parallax("50%", 0.1);
        }
        else if($(window).width()>1199 && device.tablet())
        {
          $('#gallery-main-photo, #accommodations-main-photo, #bridesmaid-main-photo, #groomsmen-main-photo, #blog-main-photo, #events-main-photo, #rsvp-main-photo').css("background-attachment","scroll");
        }
      }
    
      //Execute on load
      if (!$("body").hasClass("safari-mac")){
        parallax_photo();
      }
      
      //Execute on window resize
      $(window).resize(function() { 
        if (!$("body").hasClass("safari-mac")){
          parallax_photo();
        }
      });
      
      
      // FADEOUT PRELOADER OVERLAY
      //======================================================================================
      $('#preloader-overlay').fadeOut("2000");
    });         
        
    // DISABLE TRANSITION ON TABLET / MOBILE
    //==================================================================================
    if( device.tablet() || device.mobile() ) {
      // Layout To Right
      $("#main-menu, .sidebar-menuicon, #content-wrapper").css("transition","none");
      // Main Menu
      $("#main-menu ul li a").css("transition","none");
      $("#main-menu ul li a:hover:after").css("transition","none");
      // de-icon
      $(".de-icon, .de-icon i").css("transition","none");
      // Photo-item
      $(".photo-item-preview > .autocrop-image, .photo-item-preview > img").css("transition","none");
      $(".photo-item-overlay").css("transition","none");      
    }
  
  
  
    // SIDEBAR NAVBAR & MENU (FOR SIDEBAR VERSION)
    //==================================================================================
    
    // Desktop Menu
    $("#desktop-menu").on("click",function(e){
      e.preventDefault();
      $(this).toggleClass("open");
      $("header, #content-wrapper").toggleClass("moveto-right");
      $("#blocker").toggleClass("visible"); 
    });
    
    // Mobile Menu
    $("#mobile-menu").on("click",function(e){
      e.preventDefault();
      $(this).toggleClass("open");
      $("#main-menu").stop().slideToggle(350);
    })    
    
    // Menu on Window Resize
    $(window).resize(function() { 
      if($(window).width()<=1199){
        if($("#desktop-menu").hasClass("open")){
          $("#desktop-menu").removeClass("open");
          $("header, #content-wrapper").removeClass("moveto-right");
        }
        if(!$("#mobile-menu").hasClass("open")){
          $("#main-menu").css("display","none")
        }
        $("#blocker").removeClass("visible");
      }else{
        if($("#mobile-menu").hasClass("open")){
          $("#mobile-menu").removeClass("open")
        }
        $("#main-menu").css("display","block");
      }
    });   
    
    // Hide Dropdown Menu
    $("#main-menu li").each(function(){
      if($(this).find("> ul").length>0){
        $(this).children(".child").hide();
      }
    });
    
    // Toggle Dropdown Menu
    $('#main-menu li:has(">ul")').on("click","a[href^='#']",function(){
      $(this).parent().find(".child").stop(true,true).slideToggle(500,"easeOutExpo");
      return false;
    });
    
    // On Menu Click Hide Main Menu
    var hide_mainmenu = function(){
      if($(window).width()<=1199){
        $("#main-menu").hide();
        $("#mobile-menu").removeClass("open")
      }
      else
      {
        setTimeout(function() {
            $("#blocker").removeClass("visible");
          $("#desktop-menu").removeClass("open");
          $("header, #content-wrapper, #main-menu").removeClass("moveto-right");
        }, 1200);
      }
    }
    
    $("#main-menu li").click(hide_mainmenu);
    
    // On Menu Icon Click Hide Main Menu if Opened
    $("#navbar-menuicon .smoothscroll, #navbar-menuicon .popup-link").click(function(){
      if($("#desktop-menu").hasClass("open") || $("#mobile-menu").hasClass("open") ) {
        hide_mainmenu();
      }
    });   
    
    // On Menu Click (Bootstrap Menu)
    var navMain = $(".navbar-collapse");
        navMain.on("click", "a", null, function () {
            if ($(this).attr("href") !== "#") {
                navMain.collapse('hide');
            }
        });
    
    // Add Block to Content when Desktop Nav Open
    $("#content").append('<div id="blocker"></div>');
  
    $("#blocker").on("click",function(){
      $(this).removeClass("visible");
      $("#desktop-menu").removeClass("open");
      $("header, #content-wrapper, #main-menu").removeClass("moveto-right");
    });
    

    // smooth scrolling on navigation
    $(".nav li a[href^='#'], .slowScroll").on('click', function(e) {
       e.preventDefault();
       var hash = this.hash;
       $('html, body').animate({
           scrollTop: $(hash).offset().top
         }, 1000, function(){
           window.location.hash = hash;
       });
    });
      
    
    // SLIDER
    //==================================================================================        
    jQuery(function($){

      var slides = [];
      if(window.location.pathname === '/elope/'){
        slides = [ 
          { image : '/images/elope/CE0185.jpg' },
          { image : '/images/elope/CE0223.jpg' },
        ];
      }else{
        slides = [ 
          { image : '/images/splash/robots-splash.jpg' },
          { image : '/images/splash/humans-splash.jpg' },
        ];
      }

      $.supersized({
        slides : slides,
        slide_interval: 4000,
        stop_loop: true,
        horizontal_center : 0,
        vertical_center : 0,
      });
    });
    
    
    
    // COUNTDOWN
    //===================================================================================
    var theday = new Date();
    theday = new Date(2015, 9, 25);
    $('#countdown').countdown({until: theday, format: 'WDHMS'});

    
    
    // GALLERY - MAGNIFIC POPUP
    //==================================================================================
    $('#gallery-masonry').magnificPopup({
      delegate: '.magnific-zoom-gallery', // child items selector, by clicking on it popup will open
        type: 'image',
      gallery: {
            enabled:true
          },
      image: {
          // options for image content type
          titleSrc: 'title'
      },
      fixedContentPos:true,
      callbacks: {
          open: function() {
              // Will fire when this exact popup is opened
          },
          afterClose: function() {
              // Will fire when popup is closed
          if ( !device.tablet() && !device.mobile() && !$("body").hasClass("safari-mac") ) {
              $("html").css('overflow','hidden'); 
          }
          }
        },
    });   
    
    
    
    // PHOTO ITEM ICON AND CAPTION ANIMATION
    //==================================================================================      
    $('.photo-item').hover(
      function() {
        if($(window).width()>1199 && !device.tablet() && !device.mobile() ) {
          $(this).find( ".de-icon" ).addClass('animated');
          $(this).find( ".photo-caption" ).addClass('animated');
          $(this).find( ".other-caption" ).addClass('animated');
        }
      },
      function() {
        if($(window).width()>1199 && !device.tablet() && !device.mobile() ) {
          $(this).find( ".de-icon" ).removeClass('animated');
          $(this).find( ".photo-caption" ).removeClass('animated');
          $(this).find( ".other-caption" ).removeClass('animated');
        }
      }
    );  
        
});
  