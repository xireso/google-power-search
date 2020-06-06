var searchStringElements = new Array(14);

function updateExact() {
	var exact =  '"' + document.getElementsByClassName('exact')[1].value + '"';
	searchStringElements[0] = exact;
	updateSearchString(createString());
}

function updateSearchString(searchString) {
	document.getElementById('searchString').innerHTML = searchString;
}

function createString() {
	var searchString = ""
	for (i = 0; i < searchStringElements.length; i++) {
		if (searchStringElements[i] != undefined) {
			searchString = searchString + searchStringElements[i];
		}
	}
	return searchString;
}


function searchGoogle() {
	URL = 'https://google.com/search?q=' + createString();
	window.open(URL);
}

console.log(document.getElementsByClassName('exact'));

// Select Any / All for text in Title
function intitleAnySelector() {}

function intitleAllSelector() {}

/**var input = '';
	input = input + document.getElementsByClassName('exact')[1].value;
	exact = '"' + input + '"';
	document.getElementById('searchString').innerHTML = exact;
**/

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