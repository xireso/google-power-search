var searchStringElements = new Array(14);

function updateExact() {
	var exact =  '"' + document.getElementsByClassName('exact')[1].value + '"';
	if (exact != '""') {
		searchStringElements[0] = exact;
	} else {
		searchStringElements[0] = undefined;
	}
	updateSearchString(createString());
}

function updateAny() {
	var input =  document.getElementsByClassName('any')[1].value;
	searchStringElements[1] = input;
	updateSearchString(createString());
}

function updateSearchString(searchString) {
	document.getElementById('searchString').innerHTML = searchString;
}

function createString() {
	var searchString = ""
	for (i = 0; i < searchStringElements.length; i++) {
		if (searchStringElements[i] != undefined) {
			searchString = searchString + " " +searchStringElements[i];
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
function intitleAnySelector() {
	var any = document.getElementById("intitle-any");
	any.classList.remove("button");
	any.classList.add("button-highlight");

	var all = document.getElementById("intitle-all");
	all.classList.remove("button-highlight");
	all.classList.add("button");

}

function intitleAllSelector() {
	var all = document.getElementById("intitle-all");
	all.classList.remove("button");
	all.classList.add("button-highlight");
	
	var any = document.getElementById("intitle-any");
	any.classList.remove("button-highlight");
	any.classList.add("button");
}

/**var input = '';
	input = input + document.getElementsByClassName('exact')[1].value;
	exact = '"' + input + '"';
	document.getElementById('searchString').innerHTML = exact;
**/

// Select Any / All for text in URL
function inurlAnySelector() {
	var any = document.getElementById("inurl-any");
	any.classList.remove("button");
	any.classList.add("button-highlight");

	var all = document.getElementById("inurl-all");
	all.classList.remove("button-highlight");
	all.classList.add("button");
	
}

function inurlAllSelector() {
	var all = document.getElementById("inurl-all");
	all.classList.remove("button");
	all.classList.add("button-highlight");

	var any = document.getElementById("inurl-any");
	any.classList.remove("button-highlight");
	any.classList.add("button");

}

// Select Any / All for text in Text
function intextAnySelector() {
	var any = document.getElementById("intext-any");
	any.classList.remove("button");
	any.classList.add("button-highlight");

	var all = document.getElementById("intext-all");
	all.classList.remove("button-highlight");
	all.classList.add("button");
}

function intextAllSelector() {
	var all = document.getElementById("intext-all");
	all.classList.remove("button");
	all.classList.add("button-highlight");

	var any = document.getElementById("intext-any");
	any.classList.remove("button-highlight");
	any.classList.add("button");
}

// Select Any / All for text in Links

function inlinksAnySelector() {
	var any = document.getElementById("inlinks-any");
	any.classList.remove("button");
	any.classList.add("button-highlight");

	var all = document.getElementById("inlinks-all");
	all.classList.remove("button-highlight");
	all.classList.add("button");
}

function inlinksAllSelector() {
	var all = document.getElementById("inlinks-all");
	all.classList.remove("button");
	all.classList.add("button-highlight");

	var any = document.getElementById("inlinks-any");
	any.classList.remove("button-highlight");
	any.classList.add("button");
}


// file type selector
function pdfSpecificSelector() {
	var filetype = document.getElementById("pdf-file");
	if (filetype.classList.contains("button-highlight")) {
		filetype.classList.remove("button-highlight");
		filetype.classList.add("button");
	}
	else {
		filetype.classList.remove("button");
		filetype.classList.add("button-highlight");
	}
}

function txtSpecificSelector() {
	var filetype = document.getElementById("txt-file");
	if (filetype.classList.contains("button-highlight")) {
		filetype.classList.remove("button-highlight");
		filetype.classList.add("button");
	}
	else {
		filetype.classList.remove("button");
		filetype.classList.add("button-highlight");
	}
}
function rtfSpecificSelector() {
	var filetype = document.getElementById("rtf-file");
	if (filetype.classList.contains("button-highlight")) {
		filetype.classList.remove("button-highlight");
		filetype.classList.add("button");
	}
	else {
		filetype.classList.remove("button");
		filetype.classList.add("button-highlight");
	}
}

function svgSpecificSelector() {
	var filetype = document.getElementById("svg-file");
	if (filetype.classList.contains("button-highlight")) {
		filetype.classList.remove("button-highlight");
		filetype.classList.add("button");
	}
	else {
		filetype.classList.remove("button");
		filetype.classList.add("button-highlight");
	}
}

function texSpecificSelector() {
	var filetype = document.getElementById("tex-file");
	if (filetype.classList.contains("button-highlight")) {
		filetype.classList.remove("button-highlight");
		filetype.classList.add("button");
	}
	else {
		filetype.classList.remove("button");
		filetype.classList.add("button-highlight");
	}
}

function docSpecificSelector() {
	var filetype = document.getElementById("doc-file");
	if (filetype.classList.contains("button-highlight")) {
		filetype.classList.remove("button-highlight");
		filetype.classList.add("button");
	}
	else {
		filetype.classList.remove("button");
		filetype.classList.add("button-highlight");
	}
}

function pptSpecificSelector() {
	var filetype = document.getElementById("ppt-file");
	if (filetype.classList.contains("button-highlight")) {
		filetype.classList.remove("button-highlight");
		filetype.classList.add("button");
	}
	else {
		filetype.classList.remove("button");
		filetype.classList.add("button-highlight");
	}
}

function xlsSpecificSelector() {
	var filetype = document.getElementById("xls-file");
	if (filetype.classList.contains("button-highlight")) {
		filetype.classList.remove("button-highlight");
		filetype.classList.add("button");
	}
	else {
		filetype.classList.remove("button");
		filetype.classList.add("button-highlight");
	}
}


// file type exclusions
function pdfExcludeSelector() {}
function txtExcludeSelector() {}
function rtfExcludeSelector() {}
function svgExcludeSelector() {}
function texExcludeSelector() {}
function docExcludeSelector() {}
function pptExcludeSelector() {}
function xlsExcludeSelector() {}