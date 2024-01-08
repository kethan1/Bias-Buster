import moment from "moment";
import { Dismiss } from "flowbite";

const SERVER_URL = "http://localhost:5000";

const GET_SEARCH_PARAMS =
  "?" +
  new URLSearchParams({
    url: url,
  });

const TOAST_SUCCESS = (id, message) =>`
  <div id="${id}" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">${message}</div>
    <button id="${id}-trigger" type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
  </div>
`;

const TOAST_WARNING = (id, message) =>`
  <div id="${id}" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        <span class="sr-only">Warning icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">${message}</div>
    <button id="${id}-trigger" type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
  </div>
`;

const TOAST_ERROR = (id, message) =>`
  <div id="${id}" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">${message}</div>
    <button id="${id}-trigger" type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
  </div>
`;


chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  url = tabs[0].url;
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
        } else {
          document.getElementById("biasmean").innerText = mean(ratingNumbers).toFixed(2);
          document.getElementById("biasmedian").innerText = median(ratingNumbers).toFixed(2);
          document.getElementById("biasmode").innerText = mode(ratingNumbers).toFixed(2);

          document.getElementById("statisticsLoading").classList.add("hidden");
          document.getElementById("statistics").classList.remove("hidden");
        }

        comments.reverse();

        if (comments.length === 0) {
          document.getElementById("commentsNone").classList.remove("hidden");
          document.getElementById("commentsLoading").classList.add("hidden");
        } else {
          for (let comment of comments) {
            createComment(comment.comment, comment.username, comment.timestamp);
          }

          document.getElementById("commentsLoading").classList.add("hidden");
          document.getElementById("comments").classList.remove("hidden");
        }
      }
    );
  });
});

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
  document.getElementById("commentsNone").classList.add("hidden");

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
      toast("success", "Comment submitted.");
    } else {
      toast("error", "Comment failed. Please try again later.");
    }
    refreshComments();
  });
}

function generateUUIDv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function toast(type, message) {
  if (type !== "success" && type !== "warning" && type !== "error") return;

  const id = generateUUIDv4();
  let toast;
  if (type === "success") {
    toast = TOAST_SUCCESS(id, message);
  } else if (type === "warning") {
    toast = TOAST_WARNING(id, message);
  } else if (type === "error") {
    toast = TOAST_ERROR(id, message);
  }

  document.getElementById("toast-container").innerHTML += toast;

  const toastElement = document.getElementById(id);
  const toastTrigger = document.getElementById(`${id}-trigger`);
  const options = {
    transition: "transition-opacity",
    duration: 1000,
    timing: "ease-out",
    // callback functions
    onHide: (context, targetEl) => {
      // remove targetEl
      targetEl.remove();
    }
  };

  const dismiss = new Dismiss(toastElement, toastTrigger, options);
  setTimeout(() => {
    dismiss.hide();
    dismiss.destroyAndRemoveInstance();
  }, 3000);
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
    toast("warning", "Please select a rating.");
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
        toast("success", "Rating submitted.");
      } else {
        toast("error", "Rating failed. Please try again later.");
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
      toast("warning", "Please enter a username and comment.");
    } else {
      postComment(username, comment);
      document.getElementById("username").value = "";
      document.getElementById("comment").value = "";
    }
  });
});
