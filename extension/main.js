let url;

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    url = tabs[0].url;

    Promise.all([
        fetch("http://localhost:5000/api/v1/get-comments?"  + new URLSearchParams({
            "url": url
        })),
        fetch("http://localhost:5000/api/v1/get-rating?"  + new URLSearchParams({
            "url": url
        }))
    ]).then(responses => {
        const [comments, rating] = responses;
        Promise.all([comments.json(), rating.json()]).then(([comments, rating]) => {
            // use both comments and rating here
        });
    });
});

addEventListener("load", () => {
    for (let i=1; i<=5; i++) {
        document.getElementById(i).addEventListener("click", () => rating(i));
    }
});

function rating(starClicked) {
    if (starClicked === 1) {
        setStarColors(["red", "grey", "grey", "grey", "grey"]);
    } else if (starClicked === 2) {
        setStarColors(["orange", "orange", "grey", "grey", "grey"]);
    } else if (starClicked === 3) {
        setStarColors(["yellow", "yellow", "yellow", "grey", "grey"]);
    } else if (starClicked === 4) {
        setStarColors(["yellowgreen", "yellowgreen", "yellowgreen", "yellowgreen", "grey"]);
    } else {
        setStarColors(["green", "green", "green", "green", "green"]);
    }
}

function setStarColors(starColors) {
    for (let i=1; i<=5; i++) {
        document.getElementById(i).style.color = starColors[i-1];
    }
}

function submitRating() {
    let rating = getStarRating();
    if (rating === -1) {
        alert("Please select a rating");
    } else {
        fetch("http://localhost:5000/api/v1/create-post?"  + new URLSearchParams({
            "url": url,
            "rating": rating
        })).then(response => {
            if (response.ok) {
                alert("Rating submitted");
            } else {
                alert("Rating failed");
            }
        });
    }
}

function getStarRating() {
    let rating = 0;
    for (let i=1; i<=5; i++) {
        if (document.getElementById(i).style.color !== "grey") {
            rating++;
        }
    }
    return rating > 0 ? rating : -1;
}
