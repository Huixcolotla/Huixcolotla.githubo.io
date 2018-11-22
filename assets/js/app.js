$(document).ready(function() {

  'use strict';

  // ========================
  // Homepage Layout
  // ========================

  // Add large-6 to second and third posts in homepage, so each one will be 50% width
  $('.home-template .post-card-wrap:nth-of-type(1), .home-template .post-card-wrap:nth-of-type(2)')
  .addClass('medium-6 large-6');

  // ========================
  // Responsive videos
  // ========================

  $('.wrapper').fitVids({
    'customSelector': [ 'iframe[src*="ted.com"]'          ,
                        'iframe[src*="player.twitch.tv"]' ,
                        'iframe[src*="dailymotion.com"]'  ,
                        'iframe[src*="facebook.com"]'
                      ]
  });

  // ========================
  // Off Canvas menu
  // ========================

  $('.off-canvas-toggle').click(function(e) {
    e.preventDefault();
    $('.off-canvas-container').toggleClass('is-active');
  });

  // ========================
  // Search
  // ========================

  var search_field = $('.search-form__field'),
      search_results = $('.search-results'),
      toggle_search = $('.toggle-search-button'),
      search_result_template = "\
        <div class='search-results__item'>\
          <a class='search-results__item__title' href='{{link}}'>{{title}}</a>\
          <span class='search-results__item__date'>{{pubDate}}</span>\
        </div>";

  toggle_search.click(function(e) {
    e.preventDefault();
    $('.search-form-container').addClass('is-active');

    // If off-canvas is active, just disable it
    $('.off-canvas-container').removeClass('is-active');

    setTimeout(function() {
      search_field.focus();
    }, 500);
  });

  $('.search-form-container, .close-search-button').on('click keyup', function(event) {
    if (event.target == this || event.target.className == 'close-search-button' || event.keyCode == 27) {
      $('.search-form-container').removeClass('is-active');
    }
  });

  search_field.ghostHunter({
    results: search_results,
    onKeyUp         : true,
    info_template   : "<h4 class='heading'>Number of results found: {{amount}}</h4>",
    result_template : search_result_template,
    zeroResultsInfo : false,
    includepages 	: true,
    before: function() {
      search_results.fadeIn();
    }
  });

});