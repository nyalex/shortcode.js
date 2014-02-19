// Generated by CoffeeScript 1.3.3
/*
  shortcode.js 0.9.1
  Replace Wordpress-style shortcodes with HTML on the fly
  by Nic Aitch @nicinabox
  MIT License
*/

/*
  February 19, 2014
  Update to shortcode.js 0.9.1
  by Alex Markov @ alex@refersion.com
  Description: This version allows for duplicate shortcodes on page with different settings to be updated.
*/

(function () {

$.fn.shortcode = function (services) {
	var run;
	services = $.extend({}, $.fn.shortcode.services, services);
	run = function (code, options, content, el) {
		return services[code](el, options, content);
	};

	var html, replacement,
	_this = this;
	html = $(this).html();
	replacement = '';

	this.each(function () {
		
		$.each(services, function (shortcode) {
			var content, crude_options, match, options, regex, regexs;
			regexs = ["\\[" + shortcode + "(.*?)?\\](.*?)?\\[\\/" + shortcode + "\\]", "\\[" + shortcode + "(.*?)?\\]"];
			options = {};
			crude_options = '';
			content = '';
			match = [];
			regex = '';

			$.each(regexs, function (i) {

				regex = new RegExp(regexs[i], "");

				while ((match = regex.exec(html)) !== null) {

					var found = 'TRUE'; // Do not look at the second regex in regexs var, already found the first (has closing tag)

					if (match[1]) {
						crude_options = $.trim(match[1]).split('\" '); // Prevent breaking when there is a space within the attribute
					}

					if (match[2]) {
						content = $.trim(match[2]);
						console.log(content);
					}

					$.each(crude_options, function (i) {
						var opts;
						opts = crude_options[i].split("=");
						options[opts[0]] = opts[1].replace(/"/g, '');
					});

					replacement = run(shortcode, options, content, _this);

					if (replacement) {
						if (replacement.jquery) replacement = replacement[0].outerHTML;

						html = html.replace(regex, replacement);
					}

				}

				if (found) return false;

			});

		});

		$(_this).html(html);
	});
};

}).call(this);
