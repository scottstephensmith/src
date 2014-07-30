/*
Template: Twist - Responsive coming soon page
Author: The Theme Lab
Email: saif.shajib@gmail.com
AuthorUrl: http://themeforest.net/user/thethemelab 
*/

  "use strict";
             
  /*Onload function*/
  $(window).load(function () {
      $("#preload").css({
          display: 'none'
      });
      $("body").removeClass("preload");
      setUpSections();
    
      /* Title Rotator */
      var options = {
          "speed": 4000, // Rotate every 4 seconds
          "transition_speed": 500, // Fade in/out has a .5 second duration
          "sub_selector": ".rotate"
      };
      $("#rotate").rotator(options);
      
      /* Navigation */
      $('.navigation .move a').click(function () {

          if (!isDesktop()) return;

          var target = $(this).attr('href');
          openContent(target, $(target).attr('data-direction'));
          return false;
      });
      /* Close Button */
      $('.close').click(function () {
          closeContent($('section.active').attr('data-direction'));
          return false;
      });
  });

  // Add background 
  $.backstretch(["images/bg1.jpg"]); 

  $(document).keyup(function (e) {
      if (!isDesktop()) return;
      // Up
      if (e.keyCode == 38) {
          if ($('#subscribe').hasClass('active')) closeContent($('section.active').attr('data-direction'));
      }
      // Down
      if (e.keyCode == 40) {
          if (!$('section.active').length) openContent('#subscribe');
          else if ($('#brands').hasClass('active') && !$('#subscribe').hasClass('active')) closeContent($('section.active').attr('data-direction'))
      }

      // Left
      if (e.keyCode == 37) {
          if (!$('section.active').length) openContent('#about');
          else if ($('#contact').hasClass('active') && !$('#about').hasClass('active')) closeContent($('section.active').attr('data-direction'));
      }

      // Right
      if (e.keyCode == 39) {
          if (!$('section.active').length) openContent('#contact');
          else if ($('#about').hasClass('active') && !$('#contact').hasClass('active')) closeContent($('section.active').attr('data-direction'));
      }

      // (E)sc
      if (e.keyCode == 27 || e.keyCode == 88) {
          closeContent($('section.active').attr('data-direction'))
      }

  });

  function setUpSections() {
      var sections = document.getElementsByTagName('body')[0].getElementsByTagName('section');

      for (var i = 0; i < sections.length; i++) {

          switch (sections[i].getAttribute('data-direction')) {

          case "from-bottom": // Marques
              var _position = {
                  "top": "100%"
              };
              var _destination = {
                  top: "0"
              };
              var _headerDestination = {
                  top: "-100%"
              };
              var _headerOrigin = {
                  "top": "0"
              };
              break;

          case "from-left": // about
              var _position = {
                  "left": "-100%",
                  "right": "100%"
              };
              var _destination = {
                  "left": "0",
                  "right": "0"
              };
              var _headerDestination = {
                  "left": "100%"
              };
              var _headerOrigin = {
                  "left": "0"
              };
              break;

          case "from-right": // IG
              var _position = {
                  "left": "100%"
              };
              var _destination = {
                  "left": "0"
              };
              var _headerDestination = {
                  "left": "-100%"
              };
              var _headerOrigin = {
                  "left": "0"
              };
              break;

          }

          sections[i].positions = _position;
          sections[i].destinations = _destination;
          sections[i].headerDestinations = _headerDestination;
          sections[i].headerOrigins = _headerOrigin;

      }
  }

  function openContent(_target, _direction) {

      if (!isDesktop()) return;

      var _element = document.querySelector(_target);

      $(_target).css(_element.positions).css({
          "z-index": 2
      }).animate(_element.destinations, "easeOutQuint", function () {
          $(_target).addClass('active')
      });
      $('header').animate(_element.headerDestinations, "easeOutQuint");

  }

  function closeContent(_direction) {

      var _target = 'section.active';
      var _element = document.querySelector(_target);

      $(_target).removeClass('active').delay(300).animate(_element.positions, "easeOutQuint", function () {
          $(this).css({
              "z-index": -99999
          })
      });
      $('header').delay(300).animate(_element.headerOrigins, "easeOutQuint");

  }

  function isDesktop() {
      if ($(window).width() >= 768) return true;
      else return false;
  }

  /**
   * Subscribe Form
   */
  $('#subscribe-form').submit(function () {
      'use strict';   
      // update user interface
      $('#response').html('<div class="loading"><span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span><span class="bounce4"></span></div>');

      // Prepare query string and send AJAX request
      $.ajax({
          url: 'js/inc/store-address.php',
          data: 'ajax=true&email=' + escape($('#subscribe_email').val()),
          success: function (msg) {
              $('#response').html(msg);
          }
      });

      return false;
  });
  /*Contact Form*/

  $(document).ready(function () {
     'use strict';
      $('#contactForm .error').remove();
      var form = $('#contactForm'); // contact form
      var submit = $('#contactForm_submit'); // submit button
      var alertx = $('.successMsg'); // alertx div for show alert message
      // form submit event
      form.on('submit', function (e) {
      var hasError = false;
        $('.required').each(function () {
            if (jQuery.trim($(this).val()) === '') {
                $(this).parent().append('<span class="error"><i class="fa fa-exclamation-triangle"></i></span>');
                hasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w]+\.)+[\w]{2,4})?$/;
                if (!emailReg.test(jQuery.trim($(this).val()))) {
                    $(this).parent().append('<span class="error"><i class="fa fa-exclamation-triangle"></i></span>');
                    hasError = true;
                }
            }
        });
        if (!hasError) {
            e.preventDefault(); // prevent default form submit
          // sending ajax request through jQuery
          $.ajax({
              url: 'js/inc/sendemail.php', // form action url
              type: 'POST', // form submit method get/post
              dataType: 'html', // request type html/json/xml
              data: form.serialize(), // serialize form data 
              beforeSend: function () {
                  alertx.fadeOut();
                  submit.html('Sending....'); // change submit button text
              },
              success: function (data) {
                  form.fadeOut(300);
                  alertx.html(data).fadeIn(1000); // fade in response data     
                  setTimeout(function() {
                    alertx.html(data).fadeOut(300);
                    $('#formName, #formEmail,#phone, #message').val('')
                    form.fadeIn(1800);
                }, 4000);
              },
              error: function (e) {
                  console.log(e)
              }
          });
          $('.required').val('');
        }
        return false;    
      });
      
    $('#contactForm input').focus(function () {
        $('#contactForm .error').remove();
    });
    $('#contactForm textarea').focus(function () {
        $('#contactForm .error').remove();
    });
  });
  
  
