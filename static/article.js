console.log("Hello from poco-sphinx article");
console.log("document", document);


function styleMetadata() {
    // Search the authors in the metadata
    var fieldList = document.querySelector('table.field-list');
    var fields = fieldList.querySelectorAll('table.field-list tr.field');
    var authors, date, keywords;
    for (var field of fields) {
	var fieldName = field.querySelector('th').textContent;
	var fieldValue = field.querySelector('td').textContent;

	if (fieldName == "Authors:")
	    authors = fieldValue;
	else if (fieldName == "Date:")
	    date = fieldValue;
	else if (fieldName == "Keywords:")
	    keywords = fieldValue;
    }

    // Reformat the field lists
    authors = authors.replace(/\s*;\s*/g, ' · ');
    keywords = keywords.replace(/\s*;\s*/g, ' · ');

    // Insert a new authors list
    var authorsDiv = document.createElement('div');
    authorsDiv.className = 'article-authors';
    authorsDiv.appendChild(document.createTextNode(authors));
    fieldList.parentNode.insertBefore(authorsDiv, fieldList);

    // Insert the date
    if (date) {
	var dateDiv = document.createElement('div');
	dateDiv.className = 'article-date';
	dateDiv.appendChild(document.createTextNode('Last modified on ' + date));
	fieldList.parentNode.insertBefore(dateDiv, fieldList);
    }

    // Insert the keywords in the abstract
    var abstr = document.querySelector("div.abstract");
    var kwdsDiv = document.createElement('div');
    kwdsDiv.className = 'article-keywords';
    var kwdsLabel = document.createElement('strong');
    kwdsLabel.appendChild(document.createTextNode('Keywords:'));
    kwdsDiv.appendChild(kwdsLabel);
    kwdsDiv.appendChild(document.createTextNode(' ' + keywords));
    abstr.appendChild(kwdsDiv);

    // Hide the raw field list
    fieldList.style.display = 'none';
}


function styleCaptions() {
    // Search all captions
    var captions = document.querySelectorAll('.figure .caption-text');
    for (var caption of captions) {
	var first = caption.childNodes[0];
	var res = first.data.match(/Figure (\d+):/);
	// Reformat them with class caption label
	if (res) {
	    first.data = first.data.substr(res[0].length);
	    var labelNode = document.createElement('strong');
	    labelNode.className = 'caption-label';
	    labelNode.appendChild(document.createTextNode('Figure ' + res[1]));
	    first.parentNode.insertBefore(labelNode, first);
	}
    }
}


function initArticle() {
    styleMetadata();
    styleCaptions();
}


if (document.readyState!='loading')
    initArticle();
else if (document.addEventListener)
    document.addEventListener('DOMContentLoaded', initArticle);
