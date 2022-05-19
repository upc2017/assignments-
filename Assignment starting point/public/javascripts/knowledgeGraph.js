const service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
const apiKey = 'AIzaSyAG7w627q-djB4gTTahssufwNOImRqdYKM';

function kgInit() {
    let type = document.getElementById("myType").value;
    if (type) {
        let config = {
            'limit': 10,
            'languages': ['en'],
            'types': [type],
            'maxDescChars': 100,
            'selectHandler': selectItem,
        }
        KGSearchWidget(apiKey, document.getElementById("myInput"), config);
        document.getElementById('typeSet').innerHTML = 'of type: ' + type;
        document.getElementById('widget').style.display = 'block';
        document.getElementById('typeForm').style.display = 'none';
    } else {
        alert('Set the type please');
        document.getElementById('widget').style.display = 'none';
        document.getElementById('resultPanel').style.display = 'none';
        document.getElementById('typeSet').innerHTML = '';
        document.getElementById('typeForm').style.display = 'block';
    }
}

/**
 * callback called when an element in the widget is selected
 * @param event the Google Graph widget event {@link https://developers.google.com/knowledge-graph/how-tos/search-widget}
 */
function selectItem(event) {
    let row = event.row;
    // document.getElementById('resultImage').src= row.json.image.url;
    document.getElementById('resultId').innerText = 'id: ' + row.id;
    document.getElementById('resultName').innerText = row.name;
    document.getElementById('resultDescription').innerText = row.rc;
    document.getElementById("resultUrl").href = row.qc;
    document.getElementById('resultPanel').style.display = 'block';
}