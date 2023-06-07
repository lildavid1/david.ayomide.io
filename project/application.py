from flask import Flask, request, render_template, flash, redirect, url_for, jsonify, session
from datetime import timedelta
from cs50 import SQL
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash
from flask_mail import Mail, Message
from redis import Redis
import os
import json
import psycopg2

app = Flask(__name__)

# configure flask mail
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_DEFAULT_SENDER")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_PORT"] = 587
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
mail = Mail(app)

app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

db = SQL(os.getenv("URI"))

dbm = SQL(os.getenv("MYSQL"))

# setting up session
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = Redis.from_url(os.getenv("REDIS"))
app.permanent_session_lifetime = timedelta(days=5)
Session(app)

# ensure templates auto reload
app.config["TEMPLATES_AUTO_RELOAD"] = True


@app.route("/")
def index():
    if "register_id" not in session:
        return redirect("/login")

    shows = db.execute("SELECT * FROM search LIMIT 20")
    products = db.execute("SELECT * FROM products")
    return render_template("homepage.html", products=products, shows=shows)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("register.html")

    if request.method == "POST":

        # select data from onsubmit
        email = request.form.get("email")
        username = request.form.get("username").lower().strip()
        password = request.form.get("password")
        full_name = request.form.get("full_name")

        # generate password hash
        hash = generate_password_hash(password)

        try:
#             insert into database
            db.execute("INSERT INTO registrants (email, full_name, username, hash) VALUES(?,?,?,?)", email, full_name, username, hash)

            email = request.form.get("email")
            username = request.form.get("username").lower().strip()
            password = request.form.get("password")

            message = Message("Email Confirmation", recipients=[email])
            message.body = render_template("email.html")
            row = db.execute("SELECT * FROM registrants WHERE email = (?)", email)
            message.html = render_template("email.html", username=username, row=row)
            mail.send(message)

            flash("Account created successfully", category="error")
            return redirect("/login")

        except:
            flash("Credential has already been taken", category="error")
            return redirect("/register")

    flash("Account created fine", category="error")
    return redirect("/login")


@app.route("/login", methods=["GET", "POST"])
def login():
    session.clear()

    if request.method == "GET":
        return render_template("login.html")

    if request.method == "POST":
        # collect login information
        username = request.form.get("username").lower().strip()
        password = request.form.get("password")

        rows = db.execute("SELECT * FROM registrants WHERE username = (?)", username)

        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], password):
            flash("Invalid credentials", category="error")
            return redirect("/login")

        session.permanent = True
        session["register_id"] = rows[0]["id"]

        return redirect("/")

    return redirect("/login")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/forget", methods=["GET", "POST"])
def update():
    if request.method == "GET":
        return render_template("forget.html")

    if request.method == "POST":
        email = request.form.get("email")

        check_email = db.execute("SELECT email FROM registrants ")
        print(check_email)
        try:
            pass
        except:
            pass
        finally:
            pass

        # message = Message("David From Shoppingcomplex.com", recipients=[email])
        # message.body = render_template("email.html")
        # message.html = render_template("email.html")
        # mail.send(message)

    return render_template("forget.html")


@app.route("/product", methods=["GET", "POST"])
def product():
    if "register_id" not in session:
        return redirect("/login")

    if "cart" not in session:
        session["cart"] = []

    if request.method == "POST":
        id = request.form.get("id")

        if id:
            session["cart"].append(id)
        return redirect("/product")

    items = db.execute("SELECT * FROM products WHERE id IN (?)", session["cart"])
    return render_template("cart.html", items=items)


@app.route("/remove", methods=["GET", "POST"])
def remove():
    if "register_id" not in session:
        return redirect("/login")

    if request.method == "POST":
        id = request.form.get("id")

        if id:
            session["cart"].remove(id)

            return redirect("/product")

    items = db.execute("SELECT * FROM search WHERE id IN (?)", session["cart"])
    return render_template("cart.html", items=items)


@app.route("/search")
def search():
    q = request.args.get("q")
    if q:
        shows = db.execute("SELECT * FROM products WHERE title LIKE (?)", '%' + q + '%')
    else:
        shows = []
    return jsonify(shows)


@app.route("/view/<a>")
def product_view(a):
    products = db.execute("SELECT * FROM products WHERE title = (?)", a)
    return render_template("product_view.html", products=products)
