	$(document).ready(function(){
		//menu(); // inicia o menu
		$('.modal-trigger').leanModal();
		$('select').material_select();
		$(".button-collapse").sideNav();
		$('.collapsible').collapsible({
			accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		});
		$('.tooltipped').tooltip({delay: 50});
	});

	

