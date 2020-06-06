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
const anyOp = 'OR';
const allOp = 'AND';

//delimiter to separate keywords
const delimiter = ',';


/**
 * called when exact module modified.
 * creates string with quotes on either side
 */
function updateExact() {
	var exact = '"' + document.getElementsByClassName('exact')[1].value + '"';
	if (exact != '""') {
		searchStringElements[exactIndex] = exact;
	} else { //else here to make sure "" not left if exact phrase is deleted
		searchStringElements[exactIndex] = undefined;
	}
	updateSearchString(createString());
}

/**
 * called when any module modified.
 * creates string of keywords separated by OR
 */
function updateAny() {
	searchStringElements[anyIndex] = getLogicOp('any', anyOp, 1);
	updateSearchString(createString());
}

/**
 * called when all module modified
 * creates string of keywords separated by AND
 */
function updateAll() {
	searchStringElements[allIndex] = getLogicOp('all', allOp, 1);
	updateSearchString(createString());
}

/**
 * Creates a string of either AND or OR based on user input
 * @param {String} logicFunc specific module in HTML
 * @param {String} operator AND or OR
 * @param {int} inputIndex where input is located within module
 */
function getLogicOp(logicFunc, operator, inputIndex) {
	let input = document.getElementsByClassName(logicFunc)[inputIndex].value;
	let delimit = input.split(delimiter);

	let out = '';
	//if there is only one word, done
	if (delimit.length == 1) {
		return input;
	}

	//creates logic line
	out = '(';
	for (i = 0; i < delimit.length - 1; i++) {
		delimit[i + 1] = delimit[i + 1].trim();
		//if-else to make sure that there is no operator w/out another keyword on right
		if (delimit[i + 1] != '') out += ' ' + delimit[i] + ' ' + operator;
		else out += ' ' + delimit[i];
	}

	//fixes bug that adds space when comma with no letters after it typed
	if ('' == delimit[delimit.length - 1].trim()) return out + ' )';
	//closes parentheses
	out += ' ' + delimit[delimit.length - 1] + ' )';
	return out;
}

/**
 * Updates search bar based on user's input
 */
function updateSearchString() {
	document.getElementById('searchString').value = createString();
}

/**
 * Constructs the string seen by the user, based on values in the array
 */
function createString() {
	var searchString = '';
	for (i = 0; i < searchStringElements.length; i++) {
		if (searchStringElements[i] != undefined) {
			searchString += ' ' + searchStringElements[i];
		}
	}
	return searchString;
}

/**
 * Searches finished string on google
 */
function searchGoogle() {
	URL = 'https://google.com/search?q=' + createString();
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
	var filetype = document.getElementById(idName);
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
	}
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
