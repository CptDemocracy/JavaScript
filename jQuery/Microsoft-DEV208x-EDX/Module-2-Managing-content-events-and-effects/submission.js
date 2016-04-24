/*
In general, the following script has been tested to work and comply 
with Lab2's basic requirements, however bugs can be expected, so use caution.

Make sure you test the max value input field with a bogus value, e.g. 
a word, as opposed to a number that one would normally expect.

A little bit of self-criticism. I admit this code looks rather messy.
I'll be very grateful if you leave your feedback on how to make it look 
nicer and more programmer-friendly. Thank you!
*/

//--------helper functions--------

//--------this is our Lab1 function--------
function enableRating(){
  var ratingCircleChosenHandle; 
  var ratingContainerHandle = jQuery('#rating-container');
  var ratingContainerChildrenHandle = jQuery('#rating-container').children('.rating-circle');

  ratingContainerHandle.on('mouseover', function(){
    ratingContainerChildrenHandle.on('mouseover', function(){
      ratingContainerChildrenHandle.removeClass('rating-hover rating-chosen');
      jQuery(this).addClass('rating-hover');
      jQuery(this).prevAll().addClass('rating-hover');
    }); 
    ratingContainerHandle.on('mouseleave', function(){
      ratingContainerChildrenHandle.removeClass('rating-hover');
      if (ratingCircleChosenHandle != undefined) {
        ratingCircleChosenHandle.addClass('rating-chosen');
        ratingCircleChosenHandle.prevAll().addClass('rating-chosen');
      }
    });
  });
  
  ratingContainerChildrenHandle.on('click', function(){
    ratingCircleChosenHandle = jQuery(this);
    jQuery(this).addClass('rating-chosen');
    jQuery(this).prevAll().addClass('rating-chosen');
  });
}
//--------end of Lab1 function--------

function multiAppend(appendTo, content, times) {
  for (var i = 0; i < times; ++i) {
    jQuery(appendTo).append( jQuery(content));
  }
}

function handleInvalidMaxValue() {
// please consult
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
// for more information about JS generators

  var intervalTimeMs = 100;
  var generator = function* () {
    yield 'i'; yield 'n'; yield 'p'; yield 'u';
    yield 't'; yield ' '; yield 'i'; yield 'n';
    yield 'v'; yield 'a'; yield 'l'; yield 'i';
    yield 'd';
  }

  var genInstance = generator();
  var handle = jQuery('#max-value');
  handle.attr('disabled', 'disabled');
  handle.val('');
  
  var interval = setInterval(function(){
    var current;
    if ( (current = genInstance.next()).done){
      handle.removeAttr('disabled');
      clearInterval(interval);
      return false;
    }
    handle.val(handle.val() + current.value);
  }, intervalTimeMs);
}
//--------END of helper functions--------

//--------our MAIN function starts here--------
jQuery(function(){
  
  jQuery('#max-value').on('focus', function(){
    jQuery(this).val('');
  });
  
  jQuery('#update-max-value').on('click', function(){
    var maxVal = parseInt( jQuery('#max-value').val());
    if ( Number.isNaN(maxVal)) {
      handleInvalidMaxValue();
      // here and further down we are returning the 
      // jQuery(this) object as opposed to returning 
      // false in order to enable chaining 
      return jQuery(this);
  }
  
  if (maxVal == jQuery('#rating-container').attr('max-value'))
    return jQuery(this);
  
  jQuery('#rating-container').empty();
  multiAppend( jQuery('#rating-container'), '<div class="rating-circle"></div>', maxVal);
  jQuery('#rating-container').attr('max-value', maxVal);
  
  // functions responsible for the creation of the graphics
  // of the rating system (from Lab1) have been placed
  // in a separate function to improve code readability
  enableRating();
  
  return jQuery(this);
  });
});
//--------END of MAIN function--------
