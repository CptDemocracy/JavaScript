/* Below is the OOP approach to the problem. Was it worth it? You be the 
judge! The main idea behind this approach was flexibility. Sort of like 
"Write once, debug everywhere". With given implementation you are free to 
deploy the rating system inside any element you wish (within bounds, of 
course) - doesn't need to have the max-value attribute by the way.

For Lab 3 solution please head down to the section marked with a 
"---LAB 3 SOLUTION---" comment. Thank you.

P.S. Any sort of negative feedback will be appreciated. But, please, 
have some sympathy, will ya? [yep, that's a reference to the song] */

/* RatingClass class accepts either a container id/class or container 
as a jQuery object or a JS object as an argument to its constructor */

var RatingClass = function(containerArg){ 
  if ( $.type(containerArg) == "string" ||
    containerArg instanceof Element ||
    containerArg instanceof $
    ) {
    
    // make a handle with the help of the arg string
    this.ratingContainer = $(containerArg);
  
  } else throw new TypeError("containerArg not of type $ object, JS object or string object representing an ID/class");

  this.ratingItem = '<div class="rating-circle"></div>';
  this.maxValue = this.ratingContainer.attr('max-value') || this.DEFAULT_MAX_VALUE;
  this.ratingContainerIDSel = '#rating-container';
  this.ratingItemClassSel = '.rating-circle';
  this.ratingItemHoverClass = 'rating-hover';
  this.ratingItemChosenClass = 'rating-chosen';
  this.ratingItemChosenClassSel = '.rating-chosen';
  this.updateMaxValBtnIDSel = '#update-max-value';
  this.maxValueInputIDSel = '#max-value';
  this.saveRatingBtnIDSel = '#save-rating';
  this.outputIDSel = '#output';
  this.ratingItemChosenHNDL = null;
}

RatingClass.prototype.DEFAULT_MAX_VALUE = 5;

/* ---LAB 1 SOLUTION--- */
RatingClass.prototype.initRating = function(){ 
  for (var i = 0; i < this.maxValue; ++i)
    this.ratingContainer.append(this.ratingItem);
}

RatingClass.prototype.enableRatingEvents = function(){
  /* we need currObjHandle to access our object's fields and methods inside the event handler functions */
  var currObjHandle = this;
  
  $(document).delegate(this.ratingItemClassSel, 'mouseover', function(){ 
    $(currObjHandle.ratingContainerIDSel + ' ' 
      + currObjHandle.ratingItemClassSel).removeClass(currObjHandle.ratingItemHoverClass);
    $(currObjHandle.ratingContainerIDSel + ' ' 
      + currObjHandle.ratingItemClassSel).removeClass(currObjHandle.ratingItemChosenClass);
    
    $(this).addClass(currObjHandle.ratingItemHoverClass);
    $(this).prevAll().addClass(currObjHandle.ratingItemHoverClass);
  });
  $(document).delegate(this.ratingItemClassSel, 'mouseleave', function(){
  
    $(this).removeClass(currObjHandle.ratingItemHoverClass);
    $(this).prevAll().removeClass(currObjHandle.ratingItemHoverClass);
    
    if (currObjHandle.ratingItemChosenHNDL != null) {
      currObjHandle.ratingItemChosenHNDL.addClass(currObjHandle.ratingItemChosenClass);
      currObjHandle.ratingItemChosenHNDL.prevAll().addClass(currObjHandle.ratingItemChosenClass);
    }
  
  });
  $(document).delegate(this.ratingItemClassSel, 'click', function(){
    currObjHandle.ratingItemChosenHNDL = $(this); 
    $(this).addClass(currObjHandle.ratingItemChosenClass);
    $(this).prevAll().addClass(currObjHandle.ratingItemChosenClass);
  });
}

RatingClass.prototype.enableRating = function(){
  this.initRating();
  this.enableRatingEvents();
}
/* ---END of LAB 1 SOLUTION--- */

/* ---LAB 2 SOLUTION--- */
RatingClass.prototype.enableRatingCustomization = function(){
  /* we need currObjHandle to access our object's fields and methods inside the event handler functions */
  var currObjHandle = this;
  
  $(this.updateMaxValBtnIDSel).on('click', function(){
    currObjHandle.maxValue = $(currObjHandle.maxValueInputIDSel).val();
    $(currObjHandle.ratingContainerIDSel).attr('max-value', currObjHandle.maxValue);
    
    $(currObjHandle.ratingContainerIDSel).empty();
    for (var i = 0; i < currObjHandle.maxValue; ++i)
      $(currObjHandle.ratingContainerIDSel).append(currObjHandle.ratingItem); 
  });
}
/* ---END of LAB 2 SOLUTION--- */

/* ---LAB 3 SOLUTION--- */
RatingClass.prototype.enableRatingSerialization = function(url){ 
  /* we need currObjHandle to access our object's fields and methods inside the event handler functions */
  var currObjHandle = this;
  
  $(this.saveRatingBtnIDSel).on('click', function(){
    var value = $(currObjHandle.ratingContainerIDSel + ' ' 
      + currObjHandle.ratingItemChosenClassSel).length;
    currObjHandle.maxValue = $(currObjHandle.ratingContainerIDSel).attr('max-value');
    var obj = { value: value, maxValue: currObjHandle.maxValue };
  
    $.post(url, obj, function(response){
      $(currObjHandle.outputIDSel).text(response.message);
    });
  });
}
/* ---END of LAB 3 SOLUTION--- */

$(function(){
  var ratingSerializationURL = 'http://jquery-edx.azurewebsites.net/api/Rating';
  var containerID = '#rating-container';
  
  var ratingObj = new RatingClass(containerID);
  ratingObj.enableRating();
  ratingObj.enableRatingCustomization();
  ratingObj.enableRatingSerialization(ratingSerializationURL);
});
