$(function(){
	var resultsCounter = 0;
	var resultsPool = [];
	$('#start-button').on('click', function () {
		var letters = $('#text-content').val().toUpperCase().split('');
		for (var i = 0; i < letters.length; i++) {
			$('<div></div>')
			.addClass('letter')
			.text(letters[i]).appendTo('#letters-container');
		} 	
		$('#form-container').hide();
		$('#game-container').show();
	});
	$('#letters-container').on('click','.letter', function () {
		if ($(this).hasClass('letter-used')) {
			return;
		}
		var letter = $(this).text();
		$('#word-content').append(letter);
		$(this).addClass('letter-used');
	});
	$('#clear-button').on('click', function () {
		$('#word-content').text('');
		$('.letter-used').removeClass('letter-used');
	});
	$('#check-button').on('click', function () {
		var word = $('#word-content').text();
		if (resultsPool.indexOf(word) != -1) {
			return;
		}
		$.ajax ({
			url: "https://dictionary.yandex.net/api/v1/dicservice.json/lookup",
			dataType:"jsonp",
			data: {
				key:"dict.1.1.20160323T054829Z.7b0911812b321fc8.778ab3624988f7e7b69e55dfe04038d1adefce30",
				text: word,
				lang: "ru-ru"
			}
		}).then(function(data) {
			if (data.def&&data.def.length > 0) {
				$('#word-content').text('');
				$('.letter-used').removeClass('letter-used');
				resultsCounter++;
				$('<div></div>')
				.addClass('result-item')
				.html(resultsCounter+". "+word+" &mdash; "+data.def[0].tr[0].text)
				.appendTo('#result-container');
				resultsPool.push(word);
			};
			
		});
	});
});