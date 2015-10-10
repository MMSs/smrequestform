function adjustTextarea(textarea) {
	defautlHeight = 90;
	textarea.style.height = defautlHeight + 'px';
	textarea.style.height = (textarea.scrollHeight) + 'px';
}

var resMap = {
	"Facebook" : {
			"an image": "",
			"a banner": "",
			"a profile picture": ""
		},
	"Twitter" : {
			"an image": "",
			"a banner": "",
			"a profile picture": ""
		},
	"Google +" : {
			"an image": "",
			"a banner": "",
			"a profile picture": ""
		},
	"Youtube" : {
			"an image": "",
			"a banner": "",
			"a profile picture": ""
		},
	"Instagram" : {
			"an image": "",
			"a banner": "",
			"a profile picture": ""
		}
};

(function ($) {
	var cardsGenerated = false;

	$('form').submit(function(e) {
		e.preventDefault();
		if (cardsGenerated) {
			if (!window.confirm('The currently generated cards will be lost.  Are you sure you want to continue?')) {
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
		var requiredData = [{'key':'channel','value':'a channel'},
							{'key':'socialmedia','value':'a social media'},
							{'key':'imagetype','value':'an image type'},
							{'key':'language','value':'a language'}]
		requiredData.forEach(function(item) {
			if (!data.hasOwnProperty(item.key)) {
				alert('Please choose ' + item.value + ' from the options');
				return false;
			}
		});

		// generating cards variables
		cardsVars = [];
		requiredData.forEach(function(item) {
			data[item.key].forEach(function(dataObj) {
				console.log(dataObj);
			});
		});

		// cardsGenerated = true;
	});
}) (jQuery);
