/**
 * Created by KUCKLU on 15/02/07.
 */
jQuery(function($) {
	/*
	 * Initialise example carousel
	 */
	$("#feature > div").scrollable({interval: 2000}).autoscroll();

	/*
	 * Initialise print preview plugin
	 */
	// Add link for print preview and intialise
	$('.print-preview').printPreview();

	$('.va-print-preview a.print').on('click', function(ev){
		ev.preventDefault();

		window.print();

		return false;
	});

	// Add keybinding (not recommended for production use)
	$(document).bind('keydown', function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if (code == 80 && !$('#print-modal').length) {
			$.printPreview.loadPrintPreview();
			return false;
		}
	});
});
