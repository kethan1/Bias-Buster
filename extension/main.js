const SERVER_URL = "http://localhost:5000";
let url = "https://stackoverflow.com/questions/44192731/fetch-post-is-returning-http-415-while-curl-goes-on-fine-and-returns-result";

// chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//   url = tabs[0].url;

  const GET_SEARCH_PARAMS =
    "?" +
    new URLSearchParams({
      url: url,
    });

  Promise.all([
    fetch(`${SERVER_URL}/api/v1/get-comments` + GET_SEARCH_PARAMS),
    fetch(`${SERVER_URL}/api/v1/get-ratings` + GET_SEARCH_PARAMS),
  ]).then((responses) => {
    const [commentsResponse, ratingsResponse] = responses;
    Promise.all([commentsResponse.json(), ratingsResponse.json()]).then(
      ([comments, ratings]) => {
        let ratingNumbers = ratings.map(element => element.rating);

        if (ratingNumbers.length === 0) {
          document.getElementById("statisticsLoading").classList.add("hidden");
          document.getElementById("statisticsNone").classList.remove("hidden");
          return;
        }

        document.getElementById("biasmean").innerHTML = mean(ratingNumbers);
        document.getElementById("biasmedian").innerHTML = median(ratingNumbers);
        document.getElementById("biasmode").innerHTML = mode(ratingNumbers);

        document.getElementById("statisticsLoading").classList.add("hidden");
        document.getElementById("statistics").classList.remove("hidden");
      }
    );
  });
// });

function createComment(commentText, user, time) {
  document.getElementById("comments").appendChild();
}

function median(values) {
  if (values.length === 0) return -1;

  // Sorting values, preventing original array
  // from being mutated.
  values = [...values].sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  return values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2;
}

function mean(values) {
    if (values.length === 0) return -1;

    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }

    return sum / values.length;
}

function mode(values) {
    if (values.length === 0) return -1;

    let count = {};
    let max = 0;
    let mode = -1;
    for (let i = 0; i < values.length; i++) {
        if (count[values[i]] === undefined) {
            count[values[i]] = 1;
        } else {
            count[values[i]]++;
        }

        if (count[values[i]] > max) {
            max = count[values[i]];
            mode = values[i];
        }
    }

    return mode;
}

function rating(starClicked) {
  if (starClicked === 1) {
    setStarColors(["red", "gray", "gray", "gray", "gray"]);
  } else if (starClicked === 2) {
    setStarColors(["orange", "orange", "gray", "gray", "gray"]);
  } else if (starClicked === 3) {
    setStarColors(["yellow", "yellow", "yellow", "gray", "gray"]);
  } else if (starClicked === 4) {
    setStarColors([
      "yellowgreen",
      "yellowgreen",
      "yellowgreen",
      "yellowgreen",
      "gray",
    ]);
  } else {
    setStarColors(["green", "green", "green", "green", "green"]);
  }
}

function setStarColors(starColors) {
  for (let i = 1; i <= 5; i++) {
    document.getElementById(i).style.color = starColors[i - 1];
  }
}

function submitRating() {
  let rating = getStarRating();
  if (rating === -1) {
    alert("Please select a rating");
  } else {
    fetch(`${SERVER_URL}/api/v1/add-rating`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        url: url,
        rating: rating,
      }),
    }).then((response) => {
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
  for (let i = 1; i <= 5; i++) {
    if (document.getElementById(i).style.color !== "gray") {
      rating++;
    }
  }
  return rating > 0 ? rating : -1;
}

addEventListener("load", () => {
  for (let i = 1; i <= 5; i++) {
    document.getElementById(i).addEventListener("click", () => rating(i));
  }
  document
    .getElementById("submitRating")
    .addEventListener("click", submitRating);
});
