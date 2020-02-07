/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'hiway-crm-icon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-angle-left': '&#xe903;',
		'icon-add': '&#xe900;',
		'icon-angle-down': '&#xe901;',
		'icon-angle-right': '&#xe902;',
		'icon-bin': '&#xe904;',
		'icon-calendar': '&#xe905;',
		'icon-hand': '&#xe906;',
		'icon-home': '&#xe907;',
		'icon-hours': '&#xe908;',
		'icon-jobs': '&#xe909;',
		'icon-mail': '&#xe90a;',
		'icon-more-vertical': '&#xe90b;',
		'icon-partner': '&#xe90c;',
		'icon-people': '&#xe90d;',
		'icon-search': '&#xe90e;',
		'icon-settings': '&#xe90f;',
		'icon-upload': '&#xe910;',
		'icon-equalizer': '&#xe911;',
		'icon-pencil': '&#xe912;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
