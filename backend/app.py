import os

from flask import Flask, render_template, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
mongo = PyMongo(app)
db = mongo.dev
CORS(app)


@app.route("/api/v1/get-comments")
def get_comments():
    url = request.args.get("url")
    return db.comments.find({
        "url": url
    })


@app.route("/api/v1/get-rating")
def get_rating():
    url = request.args.get("url")
    return db.comments.aggregate([
        {
            "$match": {
                "url": url
            }
        },
        {
            "$group": {
                "_id": "$url",
                "avgRating": {
                    "$avg": "$rating"
                }
            }
        }
    ])


@app.route("/api/v1/get-comments", methods=["POST"])
def post_comment():
    url = request.json["url"]
    comment = request.json["comment"]
    rating = request.json["rating"]
    db.comments.insert_one({
        "url": url,
        "comment": comment,
        "rating": rating
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True)
