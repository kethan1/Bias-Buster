import os
import json
from datetime import datetime, timezone

from bson import json_util
from flask import Flask, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
mongo = PyMongo(app)
db = mongo.cx["dev"]
CORS(app)


@app.route("/api/v1/get-comments")
def get_comments():
    url = request.args["url"]
    print(url)
    print(list(db.comments.find({
        "url": url
    })))
    return list(db.comments.find({
        "url": url
    }))


@app.route("/api/v1/post-comment", methods=["POST"])
def post_comment():
    url = request.json["url"]
    comment = request.json["comment"]
    username = request.json["username"]
    db.comments.insert_one({
        "url": url,
        "comment": comment,
        "username": username,
        "timestamp": datetime.now(timezone.utc)
    })


@app.route("/api/v1/get-ratings")
def get_ratings():
    url = request.args["url"]

    return json.loads(json_util.dumps(db.ratings.find({
        "url": url
    })))


@app.route("/api/v1/add-rating", methods=["POST"])
def add_rating():
    url = request.json["url"]
    rating = int(request.json["rating"])

    db.ratings.insert_one({
        "url": url,
        "rating": rating
    })

    return {"success": True}


if __name__ == "__main__":
    app.run(port=5000, debug=True)
