$(function(){
  var el = $('.background-photo');
  var vp = $(window);

  el.height(vp.height());
  vp.resize(function() {
    el.height(vp.height());
  });

  $('.js-scroll').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var offset  = $(target).offset().top;
    $('html, body').animate({ scrollTop: offset }, '5000', 'linear');
  });

  $('.nav-toggle').on('click', function(e) {
    e.preventDefault();
    $('.nav').toggle();
  });

  $('form').validate({
    errorElement: 'span',
    errorPlacement: function(error, element) {
      $(element).closest('.field').append(error);
    }
  });

  $('.hotel-change').on('change', function(){
    if($(this).val() == "yes"){
      $('.hotel-details').show();
    } else {
      $('.hotel-details').hide();
    }
  });

  $(document).on('click', 'a.add-guest', function (e) {
    e.preventDefault();
    var count = $('.guest').length;
    
    if(count < 5) {
      var content = $('#guest-template').html();
      
      var names = [['Jerry', 'Seinfeld'], ['George', 'Constanza'], ['Elaine', 'Benes']];
      var name = names[Math.floor(Math.random() * names.length)];

      var regexp  = new RegExp('new_guest', 'g');
      var new_id  = new Date().getTime();
      var el = $($.trim(content.replace(regexp, new_id)));
      
      el.find('.first-name').attr('placeholder', name[0]);
      el.find('.last-name').attr('placeholder', name[1]);

      $('.additional-guests').append(el);
      $('form').validate();
      
      count = count++;
      
      if(count === 4) {
        $('.add-guest').hide();
      }
    }
  });

  $(document).on('click', '.remove-guest', function(e) {
    e.preventDefault();
    $(this).closest('.guest').remove();
    $('.add-guest').show();
  });

  $('.decline-invite').on('click', function(e){
    $('.food-option').removeClass('required');
  });

  $('.accept-invite').on('click', function(e){
    $('.food-option').addClass('required');
    $('form').validate();
  });
  
  $('.continue-rsvp').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.buttons').hide();
    $('.extra-fields').removeClass('is-hidden');
  });

  $('.track-accept').on('click', function(){
    ga('send', 'event', 'rsvp', 'accept');
  });
  
  $('.track-continue').on('click', function(){
    ga('send', 'event', 'rsvp', 'continue');
  });

  $('.track-decline').on('click', function(){
    ga('send', 'event', 'rsvp', 'decline');
  });

});
