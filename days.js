/**
 * Sample JavaScript code for youtube.search.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

function loadClient() {
    gapi.client.setApiKey("AIzaSyAOa69ie5ZphwYrWr2Htkyj9TnCooRtdwk");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() {
                console.log("GAPI client loaded for API");
            },
            function(err) {
                console.error("Error loading GAPI client for API", err);
            });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    return gapi.client.youtube.search.list({
            "part": "snippet",
            "channelId": "UC4rZq6S7sV6gljt_4vjdXIw",
            "maxResults": 1,
            "order": "date"
        })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                var uploadDate = JSON.parse(response.body).items[0].snippet.publishedAt
                var lastVideo = JSON.parse(response.body).items[0].id.videoId
                var parsed = Date.parse(uploadDate)
                var now = Date.now()
                var difference = now - parsed
                var days = String(Math.round(difference / 1000 / 60 / 60 / 24) + " Days")
                document.getElementById("date").innerHTML = days
                document.getElementById("video").innerHTML = `<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/${lastVideo}\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>`
            },
            function(err) {
                console.error("Execute error", err);
            });
}
gapi.load("client:auth2", function() {
    gapi.auth2.init({
        client_id: "11332400274-31qcspj9gcsd35s2g5p4a8qb7c7l5apm.apps.googleusercontent.com"
    });
});