var apiUrl = 'https://en.wikipedia.org/w/api.php?';
var parameters = {
	action: 'opensearch',
	limit: '11',
	namespace: '0',
	format: 'json'
};

function test() {
	var search = $('#searchBox').val();
	parameters.search = search;
	buildApiUrl();
	grabDatas();
}

function buildApiUrl() {
	apiUrl += $.param(parameters);
}

var datas,
	titres,
	articles,
	liens;

function grabDatas() {
	console.log(apiUrl);
	$.ajax({
		type: 'GET',
		url: apiUrl,
		dataType: 'jsonp',
		success: function(data) {
			titres = data[1];
			articles = data[2];
			liens = data[3];
			for (var i = 0; i < titres.length; i++) {
				$('#answers').append('<div id="answer' + (i + 1) + '"><a class="btn btn-default" href="' + liens[i] + '" id ="link' + i + '"><h2 id="title' + (i + 1) + '">' + titres[i] + '</h2><p id="text' + (i + 1) + '">' + articles[i] + '</p></a></div>');
				$('#answer1').attr('class', 'col-md-8');
				$('#answer2').attr('class', 'col-md-8');
				$('#answer3').attr('class', 'col-md-8');
			}
		},
		error: function() {
			console.log('Request Failed');
		}
	});
}

$(function() {
	$('#searchArticleBtn').on('click', function() {
		$('#searchDiv').append('<input type="text" id="searchBox" /><div id="searchBtns"><button class="btn" id="searchValid">OK</button><button class="btn" id="searchReset">Annuler</button></div>');
		$('#searchValid').on('click', function() {
			test();
		});
	});
	
});