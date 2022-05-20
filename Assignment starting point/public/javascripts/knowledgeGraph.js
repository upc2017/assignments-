const service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
const apiKey = 'AIzaSyAG7w627q-djB4gTTahssufwNOImRqdYKM';

function initKG(selectHandler) {
    // Init params
    kgConfig = {
        'limit': 10,
        'languages': ['en'],
        'maxDescChars': 100,
        'selectHandler': selectHandler,
    }
    KGSearchWidget(apiKey, document.getElementById("kg-input"), kgConfig);

    // KG type updates
    $("#kg-type").change(function () {
        let type = $("#kg-type").val();
        if (type) {
            kgConfig = {
                'limit': 10,
                'languages': ['en'],
                'types': [type],
                'maxDescChars': 100,
                'selectHandler': selectHandler,
            }
        } else {
            kgConfig = {
                'limit': 10,
                'languages': ['en'],
                'maxDescChars': 100,
                'selectHandler': selectHandler,
            }
        }
        KGSearchWidget(apiKey, document.getElementById("kg-input"), kgConfig);
    });
}

/**
 * show a kg tag in the list
 * @param data kg data
 */
function showKGTag(data) {
    $('#kg-tags').append(
        $(`<div class='card mb-1 border-3' style="border-color: ${data.color}">
            <div class="card-body">
                <h3>${data.kg.name}</h3>
                <h6>${data.kg.description}</h6>
                <div>${data.kg.rc}</div>
                <div>
                    <a href="${data.kg.qc}" target="_blank">Link to Webpage</a>
                </div>
            </div>
           </div>
    `)
    )
}

/**
 * it inits the knowledgeGraph search. It sets up the events to respond to search
 * it is also the place where the data should be sent  via socket.io
 * @param sckt the open socket to register events on
 */
function initKGSocket(sckt) {
    kgSocket = sckt;

    kgSocket.on('showKG', function (data) {
        showKGTag(data);
    });

    kgSocket.on('clear', function (room, userId) {
        clearKGTags();
    });
}

/**
 * clear kg tags in the list
 */
function clearKGTags() {
    $('#kg-tags').empty()
}