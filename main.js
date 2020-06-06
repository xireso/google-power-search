var searchStringElements = new Array(13);
//Find pages with
const exactIndex = 0;
const anyIndex = 1;
const allIndex = 2;
const aroundIndex = 3;
//Pages with appearancees of
const titleIndex = 4;
const urlIndex = 5;
const textIndex = 6;
const linksIndex = 7;
//Narrow down results
const fileTypeIndex = 8;
const byDomainIndex = 9;
//Exclude results
const excludeKeywordsIndex = 10;
const excludeDomainIndex = 11;
const excludeFileTypeIndex = 12;

//Logic operators
const anyOp = "OR";
const allOp = "AND"

//delimiter to separate keywords
const delimiter = ",";

function updateExact() {
	var exact =  '"' + document.getElementsByClassName('exact')[1].value + '"';
	if (exact != '""') {
		searchStringElements[exactIndex] = exact;
	} else {
		searchStringElements[exactIndex] = undefined;
	}
	updateSearchString(createString());
}

function updateAny() {
	searchStringElements[anyIndex] = getLogicOp('any',"OR",1);
	updateSearchString(createString());
}

function updateAll() {
	searchStringElements[anyIndex] = getLogicOp('all',"AND",1);
	updateSearchString(createString());
}

function getLogicOp(logicFunc, operator, inputIndex) {
	let input =  document.getElementsByClassName(logicFunc)[inputIndex].value;
	let delimit = input.split(delimiter);

	let out = "";
	if (delimit.length == 1) {
		return input;
	}

	out = "(";
	for (i = 0; i < delimit.length - 1; i++) {
		delimit[i+1] = delimit[i+1].trim();
		if(delimit[i+1] != "") out += " " + delimit[i] + "  " + operator;
		else out += " " + delimit[i];
	}
	out += " " + delimit[delimit.length - 1] + " )";
	return out;
}

function updateSearchString(searchString) {
	document.getElementById('searchString').innerHTML = searchString;
}

function createString() {
	var searchString = ""
	for (i = 0; i < searchStringElements.length; i++) {
		if (searchStringElements[i] != undefined) {
			searchString += " " +searchStringElements[i];
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