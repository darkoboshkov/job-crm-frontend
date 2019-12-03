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
		el.innerHTML = '<span style="font-family: \'hiway-icon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-magnifier': '&#xe902;',
		'icon-arrow-down': '&#xe903;',
		'icon-arrow-right': '&#xe904;',
		'icon-bag': '&#xe905;',
		'icon-calendar': '&#xe906;',
		'icon-check': '&#xe907;',
		'icon-close': '&#xe908;',
		'icon-delete': '&#xe909;',
		'icon-group': '&#xe90a;',
		'icon-hand': '&#xe90b;',
		'icon-home': '&#xe90c;',
		'icon-link': '&#xe90d;',
		'icon-mail': '&#xe90e;',
		'icon-more': '&#xe90f;',
		'icon-plus': '&#xe910;',
		'icon-setting': '&#xe911;',
		'icon-share': '&#xe912;',
		'icon-lock': '&#xe900;',
		'icon-monkey': '&#xe901;',
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
