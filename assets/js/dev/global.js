require.config({
	"baseUrl": "/content/themes/Sparky/assets/js/dev",
	"paths": {
		"jQuery": "../../../lib/bower_components/jquery/dist/jquery",
		"bootstrap": "../../../lib/Bootstrap/assets/javascripts/bootstrap",
		"isotope": "../../../lib/Isotope/dist/isotope.pkgd"
	}
});

require(['jQuery', 'bootstrap', 'isotope'], function($) {
	if ( !!jQuery.fn.isotope ) {
		console.log('Working!');
	}
});
