chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;

    document.getElementById("url").innerHTML = url;

    Promise.all([
        fetch("http://localhost:5000/api/v1/get-comments?"  + new URLSearchParams({
            "url": url
        })),
        fetch('/api/...')
    ]).then(responses => {
        const [comments, rating] = responses;
    })

    fetch("http://localhost:5000/api/v1/get-comments?"  + new URLSearchParams({
        "url": url
    })).then(comments => {
        fetch("http://localhost:5000/api/v1/get-rating?"  + new URLSearchParams({
            "url": url
        })).then(rating => {
            comments.json().then(comments => {
                rating.json().then(rating => {
                    // document.getElementById("rating").innerHTML = rating.rating;
                    // document.getElementById("comments").innerHTML = comments.comments;
                    // alert(rating);
                    // alert(comments);
                });
            });
        });
    });;
    // use `url` here inside the callback because it's asynchronous!
});

function rating(starnum) {
    if (starnum == 1) {
        document
    } else if (starnum == 2) {
        
    } else if (starnum == 3) {
        
    } else if (starnum == 4) {
        
    } else if (starnum == 5) {
        
    }
}