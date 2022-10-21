from flask import Flask, render_template
import os

template_dir = os.path.abspath('../ui')
app = Flask(__name__, template_folder=template_dir)


@app.route("/")
def hello_world():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
