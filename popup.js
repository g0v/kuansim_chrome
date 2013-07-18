chrome.tabs.query({
    active: true,               // Select active tabs
    currentWindow: true     // In the current window
}, function(array_of_Tabs) {

    var tab = array_of_Tabs[0];
    var url = tab.url;   
    console.log(url);
    sendToNewspac(url);
});

function sendToNewspac(currentUrl)
{
    var req = new XMLHttpRequest();
    //http://www.news-pac.com/api/article?url={canonical_url}
    req.open("GET", "http://www.news-pac.com/api/", true);

    var params = "article?" + 
                 "url={" + currentUrl + "}";
    req.send(params);

    req.onreadystatechange = function() 
    { 
        // If the request completed, close the extension popup
        if (req.readyState == 4) {
            console.log(req.responseText);
        }
    };

}
