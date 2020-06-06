function updateSearchString() {
	var input = '';
	input = input + document.getElementsByClassName('exact')[1].value;
	string = '"' + input + '"';
	document.getElementById('searchString').innerHTML = string;
}

URL = 'https://google.com/search?q=where+have+all+the+flowers+gone';

function searchGoogle() {
	window.open(URL);
}
