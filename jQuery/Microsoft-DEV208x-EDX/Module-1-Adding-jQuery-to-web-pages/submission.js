jQuery(function(){
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
      ratingCircleChosenHandle.addClass('rating-chosen');
      ratingCircleChosenHandle.prevAll().addClass('rating-chosen');
    });
  });
  
  ratingContainerChildrenHandle.on('click', function(){
    ratingCircleChosenHandle = jQuery(this);
    jQuery(this).addClass('rating-chosen');
    jQuery(this).prevAll().addClass('rating-chosen');
  });
});
