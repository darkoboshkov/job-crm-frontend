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
		'icon-mail': '&#xe90a;',
		'icon-hand': '&#xe90b;',
		'icon-plus': '&#xe900;',
		'icon-arrow-down': '&#xe901;',
		'icon-calendar': '&#xe902;',
		'icon-home': '&#xe903;',
		'icon-clock': '&#xe904;',
		'icon-bag': '&#xe905;',
		'icon-partnership': '&#xe906;',
		'icon-people': '&#xe907;',
		'icon-search': '&#xe908;',
		'icon-gear': '&#xe909;',
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
