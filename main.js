//record for search bar
var searchStringElements = new Array(13);
// record of selected files for narrowing search
var narrowFiles = [];
var excludeFiles = [];
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
	searchStringElements[allIndex] = document.getElementsByClassName('all')[1].value;
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
		if (searchElement != undefined) searchString += searchElement + ' ';
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
	let selectedNarrow = idName.substr(9) == 'narrow' ? true : false;
	console.log(idName.substr(9));

	let filetype = document.getElementById(idName);
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
		if (selectedNarrow)
			narrowFiles.splice(narrowFiles.indexOf('filetype:' + idName.substring(0, fileNameLength)), 1);
		else excludeFiles.splice(excludeFiles.indexOf('-filetype:' + idName.substring(0, fileNameLength)), 1);
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');

		if (selectedNarrow) narrowFiles.push('filetype:' + idName.substring(0, fileNameLength));
		else excludeFiles.push('-filetype:' + idName.substring(0, fileNameLength));
	}
	updateNarrowFiles();
	updateExcludedFiles();
}

function updateNarrowFiles() {
	searchStringElements[fileTypeIndex] = getLogicOp(anyOp, narrowFiles);
	updateSearchString();
}

function updateExcludedFiles() {
	searchStringElements[excludeFileTypeIndex] = getLogicOp(allOp, excludeFiles);
	updateSearchString();
}