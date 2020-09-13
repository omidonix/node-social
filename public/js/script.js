
jQuery(document).ready(function($) {
	
	"use strict";
	
//------- Notifications Dropdowns
  $('.top-area > .setting-area > li').on("click",function(){
	$(this).siblings().children('div').removeClass('active');
	$(this).children('div').addClass('active');
	return false;
  });
//------- remove class active on body
  $("body *").not('.top-area > .setting-area > li').on("click", function() {
	$(".top-area > .setting-area > li > div").removeClass('active');		
 });
	

//--- user setting dropdown on topbar	
$('.user-img').on('click', function() {
	$('.user-setting').toggleClass("active");
	
});	
	
//--- side message box	
$('.friendz-list > li, .chat-users > li').on('click', function() {
	$('.chat-box').addClass("show");
	return false;
});	
	$('.close-mesage').on('click', function() {
		$('.chat-box').removeClass("show");
		return false;
	});	
	
//------ scrollbar plugin
	if ($.isFunction($.fn.perfectScrollbar)) {
		$('.dropdowns, .twiter-feed, .invition, .followers, .chatting-area, .peoples, #people-list, .chat-list > ul, .message-list, .chat-users, .left-menu').perfectScrollbar();
	}

/*--- socials menu scritp ---*/	
	$('.trigger').on("click", function() {
	    $(this).parent(".menu").toggleClass("active");
	  });
	
/*--- emojies show on text area ---*/	
	$('.add-smiles > span').on("click", function() {
	    $(this).parent().siblings(".smiles-bunch").toggleClass("active");
	  });

// delete notifications
$('.notification-box > ul li > i.del').on("click", function(){
    $(this).parent().slideUp();
	return false;
  }); 	

/*--- socials menu scritp ---*/	
	$('.f-page > figure i').on("click", function() {
	    $(".drop").toggleClass("active");
	  });

//===== Search Filter =====//
	(function ($) {
	// custom css expression for a case-insensitive contains()
	jQuery.expr[':'].Contains = function(a,i,m){
	  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	};

	function listFilter(searchDir, list) { 
	  var form = $("<form>").attr({"class":"filterform","action":"#"}),
	  input = $("<input>").attr({"class":"filterinput","type":"text","placeholder":"Search Contacts..."});
	  $(form).append(input).appendTo(searchDir);

	  $(input)
	  .change( function () {
		var filter = $(this).val();
		if(filter) {
		  $(list).find("li:not(:Contains(" + filter + "))").slideUp();
		  $(list).find("li:Contains(" + filter + ")").slideDown();
		} else {
		  $(list).find("li").slideDown();
		}
		return false;
	  })
	  .keyup( function () {
		$(this).change();
	  });
	}

//search friends widget
	$(function () {
	  listFilter($("#searchDir"), $("#people-list"));
	});
	}(jQuery));	

//progress line for page loader
	$('body').show();
	NProgress.start();
	setTimeout(function() { NProgress.done(); $('.fade').removeClass('out'); }, 2000);
	
//--- bootstrap tooltip	
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip();
	});
	
// Sticky Sidebar & header
	if($(window).width() < 769) {
		jQuery(".sidebar").children().removeClass("stick-widget");
	}

	if ($.isFunction($.fn.stick_in_parent)) {
		$('.stick-widget').stick_in_parent({
			parent: '#page-contents',
			offset_top: 60,
		});

		
		$('.stick').stick_in_parent({
		    parent: 'body',
            offset_top: 0,
		});
		
	}
	
/*--- topbar setting dropdown ---*/	
	$(".we-page-setting").on("click", function() {
	    $(".wesetting-dropdown").toggleClass("active");
	  });	
	  
/*--- topbar toogle setting dropdown ---*/	
$('#nightmode').on('change', function() {
    if ($(this).is(':checked')) {
        // Show popup window
        $(".theme-layout").addClass('black');	
    }
	else {
        $(".theme-layout").removeClass("black");
    }
});

//chosen select plugin
if ($.isFunction($.fn.chosen)) {
	$("select").chosen();
}

//----- add item plus minus button
if ($.isFunction($.fn.userincr)) {
	$(".manual-adjust").userincr({
		buttonlabels:{'dec':'-','inc':'+'},
	}).data({'min':0,'max':20,'step':1});
}	
	
// if ($.isFunction($.fn.loadMoreResults)) {	
// 	$('.loadMore').loadMoreResults({
// 		displayedItems: 3,
// 		showItems: 1,
// 		button: {
// 		  'class': 'btn-load-more',
// 		  'text': 'Load More'
// 		}
// 	});	
// }
	//===== owl carousel  =====//
	if ($.isFunction($.fn.owlCarousel)) {
		$('.sponsor-logo').owlCarousel({
			items: 6,
			loop: true,
			margin: 30,
			autoplay: true,
			autoplayTimeout: 1500,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			nav: false,
			dots: false,
			responsiveClass:true,
				responsive:{
					0:{
						items:3,
					},
					600:{
						items:3,

					},
					1000:{
						items:6,
					}
				}

		});
	}
	
// slick carousel for detail page
	if ($.isFunction($.fn.slick)) {
	$('.slider-for-gold').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		slide: 'li',
		fade: false,
		asNavFor: '.slider-nav-gold'
	});
	
	$('.slider-nav-gold').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.slider-for-gold',
		dots: false,
		arrows: true,
		slide: 'li',
		vertical: true,
		centerMode: true,
		centerPadding: '0',
		focusOnSelect: true,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				vertical: false,
				centerMode: true,
				dots: false,
				arrows: false
			}
		},
		{
			breakpoint: 641,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				vertical: true,
				centerMode: true,
				dots: false,
				arrows: false
			}
		},
		{
			breakpoint: 420,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				vertical: false,
				centerMode: true,
				dots: false,
				arrows: false
			}
		}	
		]
	});
}
	
//---- responsive header
	
$(function() {

	//	create the menus
	$('#menu').mmenu();
	$('#shoppingbag').mmenu({
		navbar: {
			title: 'General Setting'
		},
		offCanvas: {
			position: 'right'
		}
	});

	//	fire the plugin
	$('.mh-head.first').mhead({
		scroll: {
			hide: 200
		}
		
	});
	$('.mh-head.second').mhead({
		scroll: false
	});

	
});		

//**** Slide Panel Toggle ***//
	  $("span.main-menu").on("click", function(){
	     $(".side-panel").addClass('active');
		  $(".theme-layout").addClass('active');
		  return false;
	  });

	  $('.theme-layout').on("click",function(){
		  $(this).removeClass('active');
	     $(".side-panel").removeClass('active');
		  
	     
	  });

	  
// login & register form
	$('button.signup').on("click", function(){
		$('.login-reg-bg').addClass('show');
		return false;
	  });
	  
	  $('.already-have').on("click", function(){
		$('.login-reg-bg').removeClass('show');
		return false;
	  });
	
//----- count down timer		
	if ($.isFunction($.fn.downCount)) {
		$('.countdown').downCount({
			date: '11/12/2018 12:00:00',
			offset: +10
		});
	}
	
/** Post a Comment **/ //ezafe kardan be comment bedune load az samte server ba enter- be sharti in ravesh khobe ke hamon avaz biayam etelaati mesle esme karbaro axesho inaro save konim va hamishe mesle intor vaghta azash estefade konim
// jQuery(".post-comt-box textarea").on("keydown", function(event) {

// 	if (event.keyCode == 13) {
// 		var comment = jQuery(this).val();
// 		var parent = jQuery(".showmore").parent("li");
// 		var comment_HTML = '	<li><div class="comet-avatar"><img src="images/resources/comet-1.jpg" alt=""></div><div class="we-comment"><div class="coment-head"><h5><a href="time-line.html" title="">Jason borne</a></h5><span>1 year ago</span><a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a></div><p>'+comment+'</p></div></li>';
// 		$(comment_HTML).insertBefore(parent);
// 		jQuery(this).val('');
// 	}
// }); 
	
//inbox page 	
//***** Message Star *****//  
    $('.message-list > li > span.star-this').on("click", function(){
    	$(this).toggleClass('starred');
    });


//***** Message Important *****//
    $('.message-list > li > span.make-important').on("click", function(){
    	$(this).toggleClass('important-done');
    });

    

// Listen for click on toggle checkbox
	$('#select_all').on("click", function(event) {
	  if(this.checked) {
	      // Iterate each checkbox
	      $('input:checkbox.select-message').each(function() {
	          this.checked = true;
	      });
	  }
	  else {
	    $('input:checkbox.select-message').each(function() {
	          this.checked = false;
	      });
	  }
	});


	$(".delete-email").on("click",function(){
		$(".message-list .select-message").each(function(){
			  if(this.checked) {
			  	$(this).parent().slideUp();
			  }
		});
	});

// change background color on hover
	$('.category-box').hover(function () {
		$(this).addClass('selected');
		$(this).parent().siblings().children('.category-box').removeClass('selected');
	});
	
	
//------- offcanvas menu 

	const menu = document.querySelector('#toggle');  
	const menuItems = document.querySelector('#overlay');  
	const menuContainer = document.querySelector('.menu-container');  
	const menuIcon = document.querySelector('.canvas-menu i');  

	function toggleMenu(e) {
		menuItems.classList.toggle('open');
		menuContainer.classList.toggle('full-menu');
		menuIcon.classList.toggle('fa-bars');
		menuIcon.classList.add('fa-times');
		e.preventDefault();
	}

	if( menu ) {
		menu.addEventListener('click', toggleMenu, false);	
	}
	
// Responsive nav dropdowns
	$('.offcanvas-menu li.menu-item-has-children > a').on('click', function () {
		$(this).parent().siblings().children('ul').slideUp();
		$(this).parent().siblings().removeClass('active');
		$(this).parent().children('ul').slideToggle();
		$(this).parent().toggleClass('active');
		return false;
	});	



//upload file in new post
	$('#upload_btn').on('click',function(){

		let file = $('#attach_file').get(0).files[0];
		var formData = new FormData();
		formData.append('post_file', file);
		formData.append('omid', 'omid');


		$.ajax({
			url: "/posts/upload_attach_post",
			type: "post",
			processData: false, // Dont process the files
			contentType: false, // Its a query string request
			data: formData,
			xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
						var percentComplete = Math.round((evt.loaded / evt.total) * 100);
						console.log(percentComplete);
                        $("#upload_btn").text(percentComplete+'%');
                    }
                }, false);
                return xhr;
            },
			success: function (data) {
				if(data.hasError){
					$("#upload_btn").text('Try again');
					$("#upload_btn").css({'background': '#cd0811'});
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: data.data.join('\n'),
					  })
				}else{
					$('#attach_file').val('');
					$('#attach_file').prop('disabled', true);
					$("#upload_btn").css({'background': '#66cd08'});
					$("#attach_file_id").val(data.data);
					$("#upload_btn").prop('disabled', true);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'success upload',
						showConfirmButton: false,
						timer: 1000
					  })
				}
				
			},
			error: function (err) {
				console.log(err);
				$("#upload_btn").text('Error to send');
				$("#upload_btn").css({'background': '#cd0811'});
			},
		});

	})


	//submit comment
	$(".post-comt-box textarea").on("keydown", function(event) {
		if (event.keyCode == 13) {
			// get the form data
			// there are many ways to get this data using jQuery (you can use the class or id also)
			var textarea = $(this)
			var form = textarea.closest('.comment-form')
			var formData = {
				'post_id': form.children('input[name=post_id]').val(),
				'message': form.children('textarea[name=message]').val(),
			};

			// process the form
			$.ajax({
				type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
				url         : '/posts/create_comment', // the url where we want to POST
				data        : formData, // our data object
				success: function(response) {
					form.closest('.we-comet').find('.comment-items-section').prepend(response);
					form.children('textarea[name=message]').val('');
				},
				error: function (response) {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: response.responseJSON.data.join('\n'),
					})
				},
			})
				// stop the form from submitting the normal way and refreshing the page
		}
	});




	//get list comment
	$('.show-more-list-comment').click(function(e){
		e.preventDefault();
		let a = this
		$.ajax({
			type: 'GET',
			url: a.href,
			success: function(response){
				var items = response.data.join(' ');
				$(a).closest('.we-comet').find('.comment-items-section').html(items);
			}
		})
	})


	$('.like-link, .dislike-link').click(function(e){
		e.preventDefault();
		let a = this
		$.ajax({
			type: 'GET',
			url: a.href,
			success: function(response){
				if(!response.hasError){
					if(response.data.type == 'like'){
						$(a).find('.likeCount').text(response.data.likeCount)
						$(a).closest('ul').find('.dislikeCount').text(response.data.dislikeCount)
					}else if(response.data.type = 'dislike'){
						$(a).find('.dislikeCount').text(response.data.dislikeCount)
						$(a).closest('ul').find('.likeCount').text(response.data.likeCount)
					}	
				}
			}
		})
	})

	//get list comment
	$('.btn-load-more').click(function(e){
		e.preventDefault();
		var offset = $('.count_loadded_post').val()
		let a = this
		$.ajax({
			type: 'GET',
			url: '/posts/load/'+ offset,
			success: function(response){
				if(response.data.length == 0){
					$('.btn-load-more').remove()
				}
				var items = response.data.join(' ');
				$('.count_loadded_post').val(parseInt(offset) + response.data.length)
				$('.loadMore').append(items);
			}
		})
	})
});//document ready end




