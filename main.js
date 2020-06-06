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

console.log(document.getElementsByClassName('exact'));

// Select Any / All for text in Title
function intitleAnySelector() {}

function intitleAllSelector() {}

// Select Any / All for text in URL
function inurlAnySelector() {}

function inurlAllSelector() {}

// Select Any / All for text in Text
function intextAnySelector() {}

function intextAllSelector() {}

// Select Any / All for text in Links
function inlinksAnySelector() {}

function inlinksAllSelector() {}


// file type selector
function pdfSpecificSelector() {}
function txtSpecificSelector() {}
function rtfSpecificSelector() {}
function svgSpecificSelector() {}
function texSpecificSelector() {}
function docSpecificSelector() {}
function pptSpecificSelector() {}
function xlsSpecificSelector() {}


// file type exclusions
function pdfExcludeSelector() {}
function txtExcludeSelector() {}
function rtfExcludeSelector() {}
function svgExcludeSelector() {}
function texExcludeSelector() {}
function docExcludeSelector() {}
function pptExcludeSelector() {}
function xlsExcludeSelector() {}