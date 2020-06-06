//CONSTANTS
//Find pages with
const ALL_INDEX = 0;
const ANY_INDEX = 1;
const EXACT_INDEX = 2;
const AROUND_INDEX = 3;

//Pages with appearancees of
const TITIE_INDEX = 4;
const URL_INDEX = 5;
const TEXT_INDEX = 6;
const LINKS_INDEX = 7;

//Narrow down results
const FILE_TYPE_INDEX = 8;
const BY_DOMAIN_INDEX = 9;

//Exclude results
const EXCLUDE_KEYWORDS_INDEX = 10;
const EXCLUDE_DOMAIN_INDEX = 11;
const EXCLUDE_FILE_TYPE_INDEX = 12;

//Logic operators
const ANY_OP = '|';
const ALL_OP = '&';

//delimiter to separate keywords
const DELIMITER = ' ';

//file type length
const FILE_NAME_LENGTH = 3;

//prefixs
const FILE_PREFIX = 'filetype:';
const SITE_PREFIX = 'site:';
const APPEARANCE_PREFIX = 'all';
const EXCLUDE_PREFIX = '-';

//default text size
const DEFAULT_FONT_SIZE = 120;

//GLOBAL VARIABLES
//record for search bar. by default 13 elements (could be added with custom)
var searchStringElements = new Array(13);

// record of selected file types for narrowing or excluding
var narrowFiles = [];
var excludeFiles = [];

//record which button selected (default any button selected)
var titleIsAny = true;
var urlIsAny = true;
var textIsAny = true;
var linksIsAny = true;

//current font size
var currentFontSize = DEFAULT_FONT_SIZE;

/**
 * Updates search bar based on search string array (updated with user input)
 */
function updateSearchString() {
	let searchString = '';
	// create search string. if undefined don't include in string
	for (searchElement of searchStringElements) {
		if (searchElement != undefined) searchString += searchElement + ' ';
	}
	document.getElementById('searchString').value = searchString;

	scaleFontSize('searchString');
}

/**
 * called when all module modified
 * creates string of keywords separated by AND
 */
function updateAll() {
	searchStringElements[ALL_INDEX] = document.getElementsByClassName('all')[1].value;
	updateSearchString();
}

/**
 * called when any module modified.
 * creates string of keywords separated by OR
 */
function updateAny() {
	let input = document.getElementsByClassName('any')[1].value;
	let delimit = input.split(DELIMITER);
	searchStringElements[ANY_INDEX] = getLogicOp(ANY_OP, delimit, '');
	updateSearchString();
}

/**
 * called when exact module modified.
 * creates string with quotes on either side
 */
function updateExact() {
	let exact = '"' + document.getElementsByClassName('exact')[1].value + '"';
	if (exact != '""') {
		searchStringElements[EXACT_INDEX] = exact;
	} else {
		//else here to make sure "" not left if exact phrase is deleted
		searchStringElements[EXACT_INDEX] = undefined;
	}
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

		searchStringElements[AROUND_INDEX] = apartString;
	} else {
		//else here to make sure "" not left if exact phrase is deleted
		searchStringElements[AROUND_INDEX] = undefined;
	}

	updateSearchString();
}

/**
 * called when domain module is modified either in narrow section or exclude section
 * creates string with site: in front of website / domain entered if in narrow section
 * and adds -site in front of domain  if in exclude section
 */
function updateDomain(excludeOrNarrow) {
	// default: if add domain (in narrow section), site: and join with OR
	let prefix = SITE_PREFIX;
	let operator = ANY_OP;
	let elementIndex = 1;
	let indexType = BY_DOMAIN_INDEX;

	// if user wants to exclude domains, add - in front and join with AND
	if (excludeOrNarrow === 'exclude') {
		prefix = EXCLUDE_PREFIX + SITE_PREFIX;
		operator = ALL_OP;
		elementIndex = 3;
		indexType = EXCLUDE_DOMAIN_INDEX;
	}

	let domains = document.getElementsByClassName('domain')[elementIndex].value;

	if (domains) {
		let delimit = domains.split(DELIMITER);
		searchStringElements[indexType] = getLogicOp(operator, delimit, prefix);
	} else {
		//else here to make sure site: not left if content in field is deleted
		searchStringElements[indexType] = undefined;
	}

	updateSearchString();
}

/**
 * called when all module modified
 * creates string of keywords separated by and operator
 */
function updateExcludeKeywords() {
	let input = document.getElementsByClassName('exclude-keywords')[1].value;
	let wordList = [];

	if (input) {
		let keywords = input.split(DELIMITER);

		// add exclude prefix
		for (const keyword of keywords) {
			wordList.push(EXCLUDE_PREFIX + keyword);
		}

		searchStringElements[EXCLUDE_KEYWORDS_INDEX] = joinWithSpaces(wordList);
	} else {
		//else here to make sure - not left if content in field is deleted
		searchStringElements[EXCLUDE_KEYWORDS_INDEX] = undefined;
	}

	updateSearchString();
}

/**
 * called when an any or all button is selected in appearance section
 * modifies appearances of buttons, updates records for button selections for each type
 * uses updateAppearanceSection() to change text of input selection
 * @param {String} idName id of which all/any button is selected 
 * @param {Boolean} isAny true if any selected, false if all selected
 */
function anyAllToggle(idName, isAny) {
	let anyElement = document.getElementById(idName + '-any');
	let allElement = document.getElementById(idName + '-all');
	//record if any or all was selected (true means any selected)
	let buttonSelection;

	// if clicked on any, toggle to any
	if (isAny) {
		anyElement.classList.remove('button');
		anyElement.classList.add('button-highlight');

		allElement.classList.remove('button-highlight');
		allElement.classList.add('button');
		buttonSelection = true;
	} else {
		allElement.classList.remove('button');
		allElement.classList.add('button-highlight');

		anyElement.classList.remove('button-highlight');
		anyElement.classList.add('button');
		buttonSelection = false;
	}
	
	// record which specfic button was changed
	switch (idName) {
		case "intitle":
			titleIsAny = buttonSelection;
			break;
		case "inurl":
			urlIsAny = buttonSelection;
			break;
		case "intext":
			textIsAny = buttonSelection;
			break;
		case "inlinks":
			linksIsAny = buttonSelection;
			break;
	}

	updateAppearancesSection(idName)
}

/**
 * called whenever any/all button clicked or text in any/all section modified
 * creates string based on any/all selection and text of idName's type
 * @param {String} idName id of which all/any button is selected 
 */
function updateAppearancesSection(idName) {
	//take input from appropraite section
	let input = document.getElementById(idName + "Input").value;
	let delimit = input.split(DELIMITER);
	
	let prefix = APPEARANCE_PREFIX + idName + ':'; 
	//is any button selected for specific type (link, url, text, or title)
	let isAnySelected;
	//which element is being modified
	let changedIndex;
	
	// adjust variables to perform change of appropriate variable
	switch (idName) {
		case "intitle":
			changedIndex = TITIE_INDEX;
			isAnySelected = titleIsAny;
			break;
		case "inurl":
			changedIndex = URL_INDEX;
			isAnySelected = urlIsAny;
			break;
		case "intext":
			changedIndex = TEXT_INDEX;
			isAnySelected = textIsAny;
			break;
		case "inlinks":
			changedIndex = LINKS_INDEX;
			isAnySelected = linksIsAny;
			break;
	}

	//use any operator if any button selected. all operator if all button selected
	if (isAnySelected) {
		if (input) searchStringElements[changedIndex] = getLogicOp(ANY_OP, delimit, prefix);
		else searchStringElements[changedIndex] = undefined;
	} else {
		if (input) searchStringElements[changedIndex] = getLogicOp(ALL_OP, delimit, prefix);
		else searchStringElements[changedIndex] = undefined;
	}
	updateSearchString();
}

/**
 * called when a file button clicked (in either narrow or exclude section)
 * records which buttons are selected for each section
 * call's updateNarrowFiles() or updateExclueFiles() depending on which section button was pushed
 * @param {String} idName id of which all/any button is selected 
 */
function fileTypeToggle(idName) {
	//bloolean true it narrow selected
	let selectedNarrow = idName.substr(9) == 'narrow' ? true : false;

	let filetype = document.getElementById(idName);
	//decelect button
	if (filetype.classList.contains('button-highlight')) {
		filetype.classList.remove('button-highlight');
		filetype.classList.add('button');
		//remove element from appropriate list and update
		if (selectedNarrow) {
			narrowFiles.splice(narrowFiles.indexOf(idName.substring(0, FILE_NAME_LENGTH)), 1);
			updateNarrowFiles();
		} else {
			excludeFiles.splice(excludeFiles.indexOf(idName.substring(0, FILE_NAME_LENGTH)), 1);
			updateExcludedFiles();
		}
	//selcect button
	} else {
		filetype.classList.remove('button');
		filetype.classList.add('button-highlight');
		//add element to appropriate list and update
		if (selectedNarrow) {
			narrowFiles.push(idName.substring(0, FILE_NAME_LENGTH));
			updateNarrowFiles();
		} else {
			excludeFiles.push(idName.substring(0, FILE_NAME_LENGTH));
			updateExcludedFiles();
		}
	}
}

/**
 * updates text for narrow files
 * called by fileTypeToggle when file button selected
 * CAN be simplified to one method with more parameters, but it seems
 * easier to be read as two different fuctions
 */
function updateNarrowFiles() {
	searchStringElements[FILE_TYPE_INDEX] = getLogicOp(ANY_OP, narrowFiles, FILE_PREFIX);
	updateSearchString();
}

/**
 * updates text for excluded files
 * called by fileTypeToggle when file button selected
 * CAN be simplified to one method with more parameters, but it seems
 * easier to be read as two different fuctions
 */
function updateExcludedFiles() {
	searchStringElements[EXCLUDE_FILE_TYPE_INDEX] = getLogicOp(ALL_OP, excludeFiles, EXCLUDE_PREFIX + FILE_PREFIX);
	updateSearchString();
}

/**
 * Searches finished string on google
 */
function searchGoogle() {
	URL = 'https://google.com/search?q=' + document.getElementById('searchString').value;
	window.open(URL);
}

function scaleFontSize(element) {
	var container = document.getElementById(element);

	// Reset font-size to default to begin
	container.style.fontSize = toFontSizeFormat(DEFAULT_FONT_SIZE);
	console.log(container.style.fontSize);

	console.log(container.scrollWidth);
	console.log(container.clientWidth);

	// Check if the text is wider than its container,
	// if so then reduce font-size
	if (container.scrollHeight > container.clientHeight || container.scrollWidth > container.clientWidth) {
		let decreaseRatio = .5;
		currentFontSize = currentFontSize * .65;
		container.style.fontSize = toFontSizeFormat(currentFontSize);
		console.log("MODIFY");
	}
	console.log("before:" + container.style.fontSize);
	//console.log("after:" + toFontSizeFormat(currentFontSize));
	console.log(container.scrollWidth);
	console.log(container.clientWidth);
}
/*
function scaleFontSize(element) {
	var container = document.getElementById(element);
	// Reset font-size to 100% to begin
	container.style.fontSize = '120%';
	console.log(container.scrollWidth);
	console.log(container.clientWidth);
	// Check if the text is wider than its container,
	// if so then reduce font-size
	if (container.scrollHeight > container.clientHeight || container.scrollWidth > container.clientWidth) {
		container.style.fontSize = '80%';
	}
}*/

function toFontSizeFormat(num) {
	return "'" + num.toString() + "%'";
}

function clearAll() {
	currentFontSize = DEFAULT_FONT_SIZE;
	clearAllInputs();
	clearAllSelections();
}

function clearAllInputs() {
	// get every input element and clear the values
	var inputElements = document.getElementsByTagName('input');

	for (var i = 0; i < inputElements.length; i++) {
		if (inputElements[i].type == 'text') {
			inputElements[i].value = '';
		}
	}

	// reset search string elements to all be empty again
	searchStringElements = new Array(13);
}

function clearAllSelections() {
	// reset file types selected
	narrowFiles = [];
	excludeFiles = [];

	// reset appearance section
	titleIsAny = true;
	urlIsAny = true;
	textIsAny = true;
	linksIsAny = true;

	// turn all highlighted file buttons back into unhighlighted
	let fileButtons = document.getElementsByClassName('filetype');
	for (button of fileButtons) {
		if (button.classList.contains('button-highlight')) {
			console.log(button);
			button.classList.add('button');
			button.classList.remove('button-highlight');
		}
	}

	// turn all appearance buttons to any
	let appearanceTypes = ["intitle","inurl", "inlinks", "intext"];
	for (idName of appearanceTypes) {
		let anyElement = document.getElementById(idName + '-any');
		let allElement = document.getElementById(idName + '-all');

		anyElement.classList.remove('button');
		anyElement.classList.add('button-highlight');

		allElement.classList.remove('button-highlight');
		allElement.classList.add('button');
	}
}


/**
 * Creates a string with AND or OR between keywords
 * @param {String} operator AND or OR
 * @param {Array} keywordArray words to put operator between
 * @param {String} prefix prefix added, if applicable ('' if no prefix needed)
 */
function getLogicOp(operator, keywordArray, prefix) {
	let out = '';
	//empty if nothing entered
	if (keywordArray.length == 0) {
		return undefined;
	}
	//if there is only one word, done
	if (keywordArray.length == 1) {
		return prefix + keywordArray[0];
	}

	//creates logic line
	out = '(';
	for (i = 0; i < keywordArray.length - 1; i++) {
		//triming important when DELIMITER is no ' ' (ex. ',') therefore recomend leave in, even if not always applicaable
		keywordArray[i + 1] = keywordArray[i + 1].trim();
		//if-else to make sure that there is no operator w/out another keyword on right
		if (keywordArray[i + 1] != '') out += ' ' + prefix + keywordArray[i] + ' ' + operator;
		else out += ' ' + prefix + keywordArray[i];
	}

	//fixes bug that adds space when comma with no letters after it typed
	if ('' == keywordArray[keywordArray.length - 1].trim()) return out + ' )';
	//closes parentheses
	return out + ' ' + prefix + keywordArray[keywordArray.length - 1] + ' )';;
}

/**
 * takes an array of strings
 * and joins them together with spaces in between
 */
function joinWithSpaces(array) {
	let out = '';
	for (const word of array) {
		out += word + ' ';
	}
	return out;
}
function popUp(modalName,idName) {
	var modal = document.getElementById(modalName);
	var btn = document.getElementById(idName);

	// get <span> doc for closing the modal (box)
	var span = document.getElementsByClassName("close")[0];

	btn.onclick = function() {
		modal.style.display = "block";
	}

	// close modal on clicking (x)
	span.onclick = function() { 
		modal.style.display = "none";
	}

	// close modal when user clicks on window (outside modal)
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}
