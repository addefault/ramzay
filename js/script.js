let tborder = $('.menu .tborder');
let bborder = $('.menu .bborder');
let arrow = $('.menu .arrow');
let currentSection = 0;
function updateMenuItems(newItem) {
	newItem.addClass('active').siblings('.active').removeClass('active');
	if($(window).width() > 990) {
		tborder.css('top', newItem.position().top);
		bborder.css('top', newItem.position().top+newItem.outerHeight()-1);
		arrow.css('top', newItem.position().top+Math.floor(newItem.outerHeight()/2)-arrow.height()/2);	
	}
}
$('.menu li').click(function() {
	if(!$(this).hasClass('active')) {
		updateMenuItems($(this));
		currentSection = $(this).index('li');
		$('html, body').animate({ scrollTop: $('.services > div').eq(currentSection).offset().top-40-$('.main-header').outerHeight() }, 400);
		if($('body').hasClass('opened') && $(window).width() <= 990) {
			$('body').removeClass('opened');
			$('.callmenu-inner').removeClass('open');
			$('nav').fadeOut();
		}
	}
});
let itemsOffsets = [];
$('.service-heading').each(function() {
	itemsOffsets.push($(this).offset().top);
});
$(window).scroll(function() {
	for(let i = 0; i < itemsOffsets.length; i++) {
		if($(window).scrollTop() > itemsOffsets[i]-$(window).height()/1.5 && currentSection !== i)
			currentSection = i;
	}
	if(currentSection !== $('.menu li.active').index('li'))
		updateMenuItems($('.menu li').eq(currentSection));
});
$('.call-order').click(function(event) {
	event.preventDefault();
	$('.orderform').css("display", "flex").hide().fadeIn();
	$('.orderform').click(function(e){
		if($(e.target).closest('.orderform-inner').length) 
			return;
		$('.orderform').fadeOut();
		e.stopPropagation();
	});
});
$('.callmenu').click(function() {
	$(this).children().toggleClass('open');
	if($('body').hasClass('opened'))
		$('nav').fadeOut();
	else
		$('nav').css('display', 'flex').hide().fadeIn();
	$('body').toggleClass('opened');
});