console.log("Hello from poco-sphinx article");
console.log("document", document);


function styleMetadata() {

    // Search the authors in the metadata
    var fieldList = document.querySelector('table.field-list');
    var fields = fieldList.querySelectorAll('table.field-list tr.field');
    var authors, keywords;
    for (var field of fields) {
	var fieldName = field.querySelector('th').textContent;
	var fieldValue = field.querySelector('td').textContent;

	if (fieldName == "Authors:")
	    authors = fieldValue;
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


if (document.readyState!='loading')
    styleMetadata();
else if (document.addEventListener)
    document.addEventListener('DOMContentLoaded', styleMetadata);
