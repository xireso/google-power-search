//record for search bar
var searchStringElements = new Array(13);
// record of selected files for narrowing search
var selectedFiles = [];
//CONSTANTS
//Find pages with
const exactIndex = 2;
const anyIndex = 1;
const allIndex = 0;
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
const anyOp = 'OR';
const allOp = 'AND';

//delimiter to separate keywords
const delimiter = ' ';
//file type length
const fileNameLength = 3;

/**
 * called when exact module modified.
 * creates string with quotes on either side
 */
function updateExact() {
	let exact = '"' + document.getElementsByClassName('exact')[1].value + '"';
	if (exact != '""') {
		searchStringElements[exactIndex] = exact;
	} else {
		//else here to make sure "" not left if exact phrase is deleted
		searchStringElements[exactIndex] = undefined;
	}
	updateSearchString();
}

/**
 * called when any module modified.
 * creates string of keywords separated by OR
 */
function updateAny() {
	let input = document.getElementsByClassName('any')[1].value;
	let delimit = input.split(delimiter);
	searchStringElements[anyIndex] = getLogicOp(anyOp, delimit);
	updateSearchString();
}

/**
 * called when all module modified
 * creates string of keywords separated by AND
 */
function updateAll() {
	let input = document.getElementsByClassName('all')[1].value;
	let delimit = input.split(delimiter);
	let str = getLogicOp('', delimit);
	if (str[0] == '(') str = str.substring(2, str.length - 2);
	searchStringElements[allIndex] = str;
	updateSearchString();
}

/**
 * called when apart module modified
 * creates two keywords with AROUND(X) in between where
 * X represents min space apart for two words
 */
function updateApart() {
	let keyword1 = document.getElementById('keyword1').value;
	let keyword2 = document.getElementById('keyword2').value;
	let apartNum = document.getElementById('numWordsApart').value;

	if (apartNum || keyword1 || keyword2) {
		let aroundString = ' AROUND(' + apartNum + ') ';
		let apartString = keyword1 + aroundString + keyword2;
		console.log(apartString);

		searchStringElements[aroundIndex] = apartString;
	} else {
		//else here to make sure "" not left if exact phrase is deleted
		searchStringElements[aroundIndex] = undefined;
	}

	updateSearchString();
}

/**
 * Creates a string with AND or OR between keywords
 * @param {String} operator AND or OR
 * @param {Array} keywordArray words to put operator between
 */
function getLogicOp(operator, keywordArray) {
	let out = '';
	if (keywordArray.length == 0) {
		return out;
	}
	//if there is only one word, done
	if (keywordArray.length == 1) {
		return keywordArray[0];
	}

	//creates logic line
	out = '(';
	for (i = 0; i < keywordArray.length - 1; i++) {
		keywordArray[i + 1] = keywordArray[i + 1].trim();
		//if-else to make sure that there is no operator w/out another keyword on right
		if (keywordArray[i + 1] != '') out += ' ' + keywordArray[i] + ' ' + operator;
		else out += ' ' + keywordArray[i];
	}

	//fixes bug that adds space when comma with no letters after it typed
	if ('' == keywordArray[keywordArray.length - 1].trim()) return out + ' )';
	//closes parentheses
	out += ' ' + keywordArray[keywordArray.length - 1] + ' )';
	return out;
}

/**
 * Updates search bar based on user's input
 */
function updateSearchString() {
	let searchString = '';
	for (searchElement of searchStringElements) {
		if (searchElement != undefined) searchString += ' ' + searchElement;
	}
	document.getElementById('searchString').value = searchString;
}

/**
 * Searches finished string on google
 */
function searchGoogle() {
	URL = 'https://google.com/search?q=' + document.getElementById('searchString').value;
	window.open(URL);
}

function anyAllToggle(idName, isAny) {
	let anyString = idName + '-any';
	let allString = idName + '-all';
	let anyElement = document.getElementById(anyString);
	let allElement = document.getElementById(allString);

	// if clicked on any, toggle to any
	if (isAny) {
		anyElement.classList.remove('button');
		anyElement.classList.add('button-highlight');

		allElement.classList.remove('button-highlight');
		allElement.classList.add('button');
	} else {
		allElement.classList.remove('button');
		allElement.classList.add('button-highlight');

		anyElement.classList.remove('button-highlight');
		anyElement.classList.add('button');
	}
}

function fileTypeToggle(idName) {
	let filetype = document.getElementById(idName);
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
		selectedFiles.splice(selectedFiles.indexOf('filetype:' + idName.substring(0, fileNameLength)), 1);
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
		selectedFiles.push('filetype:' + idName.substring(0, fileNameLength));
	}
	updateNarrowFiles();
}

function updateNarrowFiles() {
	searchStringElements[fileTypeIndex] = getLogicOp(anyOp, selectedFiles);
	updateSearchString();
}

function createString(array) {
	let out = '';
	for (str of array) {
		out += ' ' + str;
	}
	return out;
}

// Select Any / All for text in Title
// function intitleAnySelector() {
// 	var any = document.getElementById('intitle-any');
// 	any.classList.remove('button');
// 	any.classList.add('button-highlight');

// 	var all = document.getElementById('intitle-all');
// 	all.classList.remove('button-highlight');
// 	all.classList.add('button');
// }

// function intitleAllSelector() {
// 	var all = document.getElementById('intitle-all');
// 	all.classList.remove('button');
// 	all.classList.add('button-highlight');

// 	var any = document.getElementById('intitle-any');
// 	any.classList.remove('button-highlight');
// 	any.classList.add('button');
// }

// // Select Any / All for text in URL
// function inurlAnySelector() {
// 	var any = document.getElementById('inurl-any');
// 	any.classList.remove('button');
// 	any.classList.add('button-highlight');

// 	var all = document.getElementById('inurl-all');
// 	all.classList.remove('button-highlight');
// 	all.classList.add('button');
// }

// function inurlAllSelector() {
// 	var all = document.getElementById('inurl-all');
// 	all.classList.remove('button');
// 	all.classList.add('button-highlight');

// 	var any = document.getElementById('inurl-any');
// 	any.classList.remove('button-highlight');
// 	any.classList.add('button');
// }

// // Select Any / All for text in Text
// function intextAnySelector() {
// 	var any = document.getElementById('intext-any');
// 	any.classList.remove('button');
// 	any.classList.add('button-highlight');

// 	var all = document.getElementById('intext-all');
// 	all.classList.remove('button-highlight');
// 	all.classList.add('button');
// }

// function intextAllSelector() {
// 	var all = document.getElementById('intext-all');
// 	all.classList.remove('button');
// 	all.classList.add('button-highlight');

// 	var any = document.getElementById('intext-any');
// 	any.classList.remove('button-highlight');
// 	any.classList.add('button');
// }

// // Select Any / All for text in Links

// function inlinksAnySelector() {
// 	var any = document.getElementById('inlinks-any');
// 	any.classList.remove('button');
// 	any.classList.add('button-highlight');

// 	var all = document.getElementById('inlinks-all');
// 	all.classList.remove('button-highlight');
// 	all.classList.add('button');
// }

// function inlinksAllSelector() {
// 	var all = document.getElementById('inlinks-all');
// 	all.classList.remove('button');
// 	all.classList.add('button-highlight');

// 	var any = document.getElementById('inlinks-any');
// 	any.classList.remove('button-highlight');
// 	any.classList.add('button');
// }

/**
// file type selector
function pdfSpecificSelector() {
	var filetype = document.getElementById('pdf-file-narrow');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function txtSpecificSelector() {
	var filetype = document.getElementById('txt-file-narrow');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}
function rtfSpecificSelector() {
	var filetype = document.getElementById('rtf-file-narrow');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function svgSpecificSelector() {
	var filetype = document.getElementById('svg-file-narrow');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function texSpecificSelector() {
	var filetype = document.getElementById('tex-file-narrow');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function docSpecificSelector() {
	var filetype = document.getElementById('doc-file-narrow');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function pptSpecificSelector() {
	var filetype = document.getElementById('ppt-file-narrow');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function xlsSpecificSelector() {
	var filetype = document.getElementById('xls-file-narrow');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

// exclude section
function pdfExcludeSelector() {
	var filetype = document.getElementById('pdf-file-exclude');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function txtExcludeSelector() {
	var filetype = document.getElementById('txt-file-exclude');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}
function rtfExcludeSelector() {
	var filetype = document.getElementById('rtf-file-exclude');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function svgExcludeSelector() {
	var filetype = document.getElementById('svg-file-exclude');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function texExcludeSelector() {
	var filetype = document.getElementById('tex-file-exclude');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function docExcludeSelector() {
	var filetype = document.getElementById('doc-file-exclude');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function pptExcludeSelector() {
	var filetype = document.getElementById('ppt-file-exclude');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}

function xlsExcludeSelector() {
	var filetype = document.getElementById('xls-file-exclude');
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
}
**/
