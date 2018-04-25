// "Instantiate" libcluon.
var __libcluon = libcluon();

// Function to load data from a remote destination.
function getResourceFrom(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false /*asynchronous request*/);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

// Check for availability of WebSockets.
if ("WebSocket" in window) {

    // Read data in binary from the WebSocket, channel "od4".
    var ws = new WebSocket("ws://" + window.location.host + "/", "od4");
    ws.binaryType = 'arraybuffer';

    ws.onopen = function() {
        console.log("Connected.");
        // Load the ODVD message specification file to have information about the messages to decode and encode.
        var odvdMessageSpecificationFile = getResourceFrom("opendlv-standard-message-set-v0.9.4.odvd");
        console.log("Loaded " + __libcluon.setMessageSpecification(odvdMessageSpecificationFile) + " messages from specification.");
    };

    ws.onmessage = function(evt) {

        // Got new data from the WebSocket; now, try to decode it into JSON using the supplied message specification file.
        var data = JSON.parse(__libcluon.decodeEnvelopeToJSON(evt.data));
        console.log(data);

        // Check for message ID 1041...
        if (data.dataType === 1041) {

            var sample = (data.opendlv_proxy_PedalPositionReading.position) * 10;
            console.log(sample);
            animateDashboard();

            // found message. Now, extract values from the fields and do something with the data...
            // var number = data.example_Ping.number * 1.1;
            // var textInBase64 = data.example_Ping.text;
            // var textDecodedFromBase64 = window.atob(textInBase64);


        }
    };
    ws.onclose = function() {
        console.log("Connection is closed.");
    };
}
else {
    console.log("WebSocket is not supported by your Browserb!");
}

/*
* Kendo Car Dashboard logic
 */

function createDashboard() {
    $("#rpm").kendoRadialGauge({
        theme: "black",

        pointer: {
            value: 0,
            color: "#ea7001"
        },

        scale: {
            startAngle: -45,
            endAngle: 120,

            min: 0,
            max: 10,

            majorUnit: 1,
            majorTicks: {
                width: 1,
                size: 7
            },

            minorUnit: 0.2,
            minorTicks: {
                size: 5
            },

            ranges: [{
                from: 4,
                to: 7,
                color: "#ff7a00"
            }, {
                from: 7,
                to: 10,
                color: "#c20000"
            }],

            labels: {
                font: "11px Arial,Helvetica,sans-serif"
            }
        }
    });

    $("#kmh").kendoRadialGauge({
        theme: "black",

        pointer: {
            value: 100,
            color: "#ea7001"
        },

        scale: {
            startAngle: -90,
            endAngle: 270,

            min: 0,
            max: 200,

            majorTicks: {
                width: 1,
                size: 14
            },
            majorUnit: 50,

            minorTicks: {
                size: 10
            },

            minorUnit: 2,

            // visible: false
        }
    });

    $("#fuel").kendoRadialGauge({
        theme: "black",

        pointer: {
            value: 0,
            color: "#ea7001"
        },

        scale: {
            startAngle: 90,
            endAngle: 180,

            min: 0,
            max: 50,

            majorUnit: 25,
            majorTicks: {
                width: 2,
                size: 6
            },

            minorUnit: 5,
            minorTicks: {
                size: 3
            },

            ranges: [{
                from: 0,
                to: 10,
                color: "#c20000"
            }],

            labels: {
                font: "9px Arial,Helvetica,sans-serif"
            }
        }
    });

    $("#water-temprature").kendoRadialGauge({
        theme: "black",

        pointer: {
            value: 90,
            color: "#ea7001"
        },

        scale: {
            startAngle: 180,
            endAngle: 270,

            min: 60,
            max: 120,

            majorUnit: 30,
            majorTicks: {
                width: 2,
                size: 6
            },

            minorUnit: 10,
            minorTicks: {
                size: 3
            },

            ranges: [{
                from: 110,
                to: 120,
                color: "#c20000"
            }],

            labels: {
                font: "9px Arial,Helvetica,sans-serif"
            }
        }
    });
}

var gear;
function animateDashboard() {

    gear = (data.opendlv_proxy_PedalPositionReading.position) * 10;
        $("#rpm").data("kendoRadialGauge").value(gear);
        // $("#kmh").data("kendoRadialGauge").value(speed);

}

$(document).ready(function() {

    createDashboard();
    animateDashboard();

    $(document).bind("kendo:skinChange", function(e) {
        createDashboard();
    });

});