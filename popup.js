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
    var domain = "http://www.news-pac.com/api/article";
    var params = "?url=" + currentUrl;
    url = domain + params; 
    //console.log(url);
    req.open("GET", url, true);

    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function() { 
        if (req.readyState == 4) {
            if (req.status == 200) {  //if in newspac 
                console.log(req.responseType);
                var resp = JSON.parse(req.responseText);
                console.log(resp);
            
            } else if (req.status == 404) {  //else not in newspac
                  console.log("not in newspac");  
                  //call kuansim API
            }
        }
    };
    req.send();
    return false;
}

// function addToKuansim(){
// {
//     var req = new XMLHttpRequest();
//     req.open("POST", "localhost", true);

//     var params = "title=" + document.getElementById("title").value + 
//                  "&url=" + document.getElementById("url").value + 
//                  "&summary=" + document.getElementById("summary").value +
//                  "&tags=" + document.getElementById("tags").value;

//     req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     req.setRequestHeader("Content-length", params.length);
//     req.setRequestHeader("Connection", "close");

//     req.send(params);

//     req.onreadystatechange = function() 
//     { 
//         // If the request completed, close the extension popup
//         if (req.readyState == 4)
//             if (req.status == 200) window.close();
//     };

//     return false;
// }
