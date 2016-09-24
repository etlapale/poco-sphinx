console.log("Hello from poco-sphinx article");
console.log("document", document);


function styleMetadata() {

    // Search the authors in the metadata
    var fieldList = document.querySelector('table.field-list');
    var fields = fieldList.querySelectorAll('table.field-list tr.field');
    var authors;
    for (var field of fields) {
	var fieldName = field.querySelector('th').textContent;
	var fieldValue = field.querySelector('td').textContent;

	if (fieldName == "Authors:")
	    authors = fieldValue;
    }

    // Reformat the authors list
    authors = authors.replace(/\s*;\s*/g, ' · ');

    // Insert a new authors list
    var authorsDiv = document.createElement('div');
    authorsDiv.className = 'article-authors';
    authorsDiv.className.style = 'margin-top: -1ex;';
    authorsDiv.appendChild(document.createTextNode(authors));
    fieldList.parentNode.insertBefore(authorsDiv, fieldList);

    fieldList.style.display = 'none';
}


if (document.readyState!='loading')
    styleMetadata();
else if (document.addEventListener)
    document.addEventListener('DOMContentLoaded', styleMetadata);
