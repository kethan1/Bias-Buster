import moment from "moment";
import { initFlowbite } from "flowbite";

const SERVER_URL = "http://localhost:5000";
let url =
  "https://stackoverflow.com/questions/44192731/fetch-post-is-returning-http-415-while-curl-goes-on-fine-and-returns-result";


const GET_SEARCH_PARAMS =
  "?" +
  new URLSearchParams({
    url: url,
  });

// chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//   url = tabs[0].url;
Promise.all([
  fetch(`${SERVER_URL}/api/v1/get-comments` + GET_SEARCH_PARAMS),
  fetch(`${SERVER_URL}/api/v1/get-ratings` + GET_SEARCH_PARAMS),
]).then((responses) => {
  const [commentsResponse, ratingsResponse] = responses;
  Promise.all([commentsResponse.json(), ratingsResponse.json()]).then(
    ([comments, ratings]) => {
      let ratingNumbers = ratings.map((element) => element.rating);

      if (ratingNumbers.length === 0) {
        document.getElementById("statisticsLoading").classList.add("hidden");
        document.getElementById("statisticsNone").classList.remove("hidden");
        return;
      }

      document.getElementById("biasmean").innerText = mean(ratingNumbers).toFixed(2);
      document.getElementById("biasmedian").innerText = median(ratingNumbers).toFixed(2);
      document.getElementById("biasmode").innerText = mode(ratingNumbers).toFixed(2);

      document.getElementById("statisticsLoading").classList.add("hidden");
      document.getElementById("statistics").classList.remove("hidden");

      for (let comment of comments) {
        createComment(comment.comment, comment.username, comment.timestamp);
      }

      document.getElementById("commentsLoading").classList.add("hidden");
      document.getElementById("comments").classList.remove("hidden");
    }
  );
});
// });

function createComment(comment, username, time) {
  let commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  let usernameP = document.createElement("p");
  let timeP = document.createElement("p");
  let commentP = document.createElement("p");
  usernameP.classList.add("text-neutral-700", "text-left", "text-[0.8rem]");
  timeP.classList.add("text-neutral-600", "text-left", "text-[0.65rem]");
  commentP.classList.add("text-black", "text-left", "text-base", "w-full");
  usernameP.innerText = username;
  timeP.innerText = `Posted on ${moment(time["$date"]).format("LLL")}`;
  commentP.innerText = comment;
  commentDiv.appendChild(usernameP);
  commentDiv.appendChild(timeP);
  commentDiv.appendChild(commentP);
  document.getElementById("comments").appendChild(commentDiv);
}

function refreshComments() {
  document.getElementById("commentsLoading").classList.remove("hidden");
  document.getElementById("comments").classList.add("hidden");

  fetch(`${SERVER_URL}/api/v1/get-comments` + GET_SEARCH_PARAMS).then(commentsResponse => {
    commentsResponse.json().then(comments => {
      for (let comment of comments) {
        createComment(comment.comment, comment.username, comment.timestamp);
      }

      document.getElementById("commentsLoading").classList.add("hidden");
      document.getElementById("comments").classList.remove("hidden");
    });
  })
}

function postComment(username, comment) {
  fetch(`${SERVER_URL}/api/v1/post-comment`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      url: url,
      username: username,
      comment: comment,
    }),
  }).then((response) => {
    if (response.ok) {
      alert("Comment submitted");
    } else {
      alert("Comment failed");
    }
    refreshComments();
  });
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
    .getElementById("submitRatingButton")
    .addEventListener("click", submitRating);
  document.getElementById("postCommentForm").addEventListener("submit", () => {
    let username = document.getElementById("username").value;
    let comment = document.getElementById("comment").value;
    if (username === "" || comment === "") {
      alert("Please enter a username and comment");
    } else {
      postComment(username, comment);
      document.getElementById("username").value = "";
      document.getElementById("comment").value = "";
    }
  });
});
