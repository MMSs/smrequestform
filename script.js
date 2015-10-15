(function ($) {
	$('textarea.adjheight').keyup(function() {
		defautlHeight = 90;
		this.style.height = defautlHeight + 'px';
		this.style.height = (this.scrollHeight) + 'px';
	})

	// ++++++++++++++++++++++
	// + Templates generators
	function repropagateCheckboxes(type) {
		templatesVars[type].forEach(function(val) {
			templatesVars[type] = $.grep(templatesVars[type], function(v) {
				return v != val;
			});
			$('input#'+val).prop('checked', true).trigger('change');
		});
	}
	var templatesVars = {
		channel: '',
		langs: [],
		socialmedia: [],
		imagetypes: []
	};
	function genChannels(channels) {
		var temp = _.template($('#channels_temp').html().replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
		$('#channels').html(temp({channels: channels}));
		$('#channels').show();
		$('#channels select').change(function() {
			templatesVars.channel = $('#channels option:selected').val();
			if (templatesVars.channel.length) {
				genLangs(channelsMap.channels[templatesVars.channel].langs);
				genSocialmedia(channelsMap.channels[templatesVars.channel].socialmedia);
			} else {
				genLangs([]);
				genSocialmedia([]);
			}
		});
	}
	function genLangs(langs) {
		if (langs.length == 0) {
			$('#langs input').prop('checked', false).trigger('change');
			$('#langs').hide().html('');
			return false;
		}
		_languages = []
		langs.forEach(function (lang) {
			_languages.push([lang, channelsMap.langs[lang]]);
		});
		var temp = _.template($('#langs_temp').html().replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
		$('#langs').html(temp({langs: _languages}));
		$('#langs').show();
		$('#langs input').change(function() {
			if (this.checked) {
				templatesVars.langs.push(this.id);
			} else {
				lang = this.id;
				templatesVars.langs = $.grep(templatesVars.langs, function(val) {return val != lang;});
			}
		});
		repropagateCheckboxes('langs');
	}
	function genSocialmedia(socialmedia) {
		if (socialmedia.length == 0) {
			$('#socialmedia input').prop('checked', false).trigger('change');
			$('#socialmedia').hide().html('');
			return false;
		}
		_socialmedia = [];
		socialmedia.forEach(function(sm) {
			_socialmedia.push([sm, channelsMap.socialmedia[sm].name]);
		});
		var temp = _.template($('#socialmedia_temp').html().replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
		$('#socialmedia').html(temp({socialmedia: _socialmedia}));
		$('#socialmedia').show();
		$('#socialmedia input').change(function() {
			if (this.checked) {
				templatesVars.socialmedia.push(this.id);
			} else {
				socialmedia = this.id;
				templatesVars.socialmedia = $.grep(templatesVars.socialmedia, function (val) {return val != socialmedia});
			}
			imagetypes = [];
			templatesVars.socialmedia.forEach(function (sm) {
				imagetypes.push.apply(imagetypes, Object.keys(channelsMap.socialmedia[sm].imagetypes))
			});
			genImagetypes($.unique(imagetypes));
		});
		repropagateCheckboxes('socialmedia');
	}
	function genImagetypes(imagetypes) {
		if (imagetypes.length == 0) {
			$('#imagetype input').prop('checked', false).trigger('change');
			$('#imagetype').hide().html('');
			return false;
		}
		_imagetypes = [];
		imagetypes.forEach(function(it) {
			_imagetypes.push([it, channelsMap.imagetypes[it].value, channelsMap.imagetypes[it].title]);
		});
		var temp = _.template($('#imagetypes_temp').html().replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
		$('#imagetype').html(temp({imagetypes: _imagetypes}));
		$('#imagetype').show();
		$('#imagetype input').change(function() {
			if (this.checked) {
				templatesVars.imagetypes.push(this.id);
			} else {
				imagetype = this.id;
				templatesVars.imagetypes = $.grep(templatesVars.imagetypes, function(val) {return val != imagetype});
			}
		});
		repropagateCheckboxes('imagetypes');
	}
	$('.requirements').delegate('input, select', 'change', function() {
		$('button#gencards').prop('disabled', !(Object.keys(templatesVars).every(function(key) {return templatesVars[key].length})));
	});
	// - Template generators
	// ---------------------

	var channelsMap = {};
	$(document).ready(function () {
		$.ajax("map.json", {
			"dataType": "json",
			"success": function (map) {
				// Building requirements form
				channelsMap = map;
				genChannels(Object.keys(map.channels));
			}
		})
	});

	var cardsGenerated = false;
	$('form').submit(function(e) {
		e.preventDefault();
		if (cardsGenerated) {
			if (!window.confirm('The currently generated cards will be lost.  Are you sure you want to continue generating new cards?')) {
				return false;
			}
		}

		// getting form data
		var form = $(this).serializeArray();
		var data = {};
		form.forEach(function (item) {
			if (!data.hasOwnProperty(item.name)) {
				data[item.name] = [item.value]
			} else {
				data[item.name].push(item.value);
			}
		});
		console.log(data);

		// verifying form data
		// var verified = true;
		// var requiredData = [{'key':'channel','value':'a channel'},
		// 					{'key':'socialmedia','value':'a social media'},
		// 					{'key':'imagetype','value':'an image type'},
		// 					{'key':'language','value':'a language'}]
		// requiredData.forEach(function(item) {
		// 	if (verified && !data.hasOwnProperty(item.key)) {
		// 		alert('Please choose ' + item.value + ' from the options');
		// 		verified = false;
		// 	}
		// });
		// if (!verified) return false;

		// generating cards variables
		cardsVars = [];
		requiredData.forEach(function(item) {

		});

		// cardsGenerated = true;
	});
}) (jQuery);
