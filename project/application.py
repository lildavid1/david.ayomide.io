import os, random, string, secrets, psycopg2
from flask import *
from datetime import timedelta
from cs50 import *
from flask_session import Session
from werkzeug.security import *
from flask_mail import *
from redis import Redis

app = Flask(__name__)

app.secret_key = secrets.token_hex(16)

# configure flask mails
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_DEFAULT_SENDER")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_PORT"] = 587
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
mail = Mail(app)

# setup databases
# db = SQL(os.getenv("URI")
# dbS = SQL(os.getenv("SUPA"))
dbm = SQL(os.getenv("MYSQL"))
# dbp = SQL(os.getenv("PSCALE"))
dbl = SQL("sqlite:///project.db")

# setting up session
# app.config['SESSION_TYPE'] = 'redis'
# app.config['SESSION_REDIS'] = Redis.from_url(os.getenv("REDIS"))
app.config["SESSION_TYPE"] = "filesystem"
app.permanent_session_lifetime = timedelta(days=5)
Session(app)

# ensure templates auto reload
app.config["TEMPLATES_AUTO_RELOAD"] = True


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        
        print(dbm.execute("select * from reegistrants")
        
        return render_template("register.html")

    if request.method == "POST":
        # select data from onsubmit
        email = request.form.get("email")
        username = request.form.get("username").lower().strip()
        password = request.form.get("password")
        full_name = request.form.get("full_name")
        token = "".join(random.choices(string.ascii_letters + string.digits, k=32))

        # generate password hash
        hash = generate_password_hash(password)

        try:
            # insert into database
            dbm.execute(os.getenv("REGISTER"), email, full_name, username, hash, token)

            email = request.form.get("email")
            username = request.form.get("username").lower().strip()

            message = Message("Email Confirmation", recipients=[email])
            message.body = render_template("email.html")
            row = dbp.execute("SELECT * FROM registrants WHERE email = (?)", email)
            message.html = render_template("email.html", username=username, row=row)
            mail.send(message)

            flash("Account created successfully", category="error")
            return redirect("/login")

        except Exception as error:
            flash("Credential has already been taken", category="error")
            print(error)
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
        dbm.execute("START TRANSACTION")
        rows = dbm.execute("SELECT * FROM registrants WHERE username = (?)", username)
        dbm.execute("ROLLBACK")
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

        check_email = dbm.execute("SELECT * FROM registrants WHERE email = (?)", email)
        print(check_email)

    return render_template("mailing.html")


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

    [*ids] = set(session["cart"])
    items = dbl.execute("SELECT * FROM products WHERE id IN (?)", ids)
    return render_template("cart.html", items=items, name=("000ayo"))


@app.route("/remove", methods=["GET", "POST"])
def remove():
    if "register_id" not in session:
        return redirect("/login")

    if request.method == "POST":
        id = request.form.get("id")

        if id:
            session["cart"].remove(id)

            return redirect("/product")
    [*ids] = set(session("cart"))
    items = dbl.execute("SELECT * FROM search WHERE id IN (?)", ids)
    return render_template("cart.html", items=items)


@app.route("/search")
def search():
    q = request.args.get("q")
    search_list = dbl.execute(os.getenv("SEARCH"), "%" + q + "%") if q else []
    return jsonify(search_list)


@app.route("/categories")
def product_view():
    a = request.args.get("q")
    print(a)
    products = dbl.execute("SELECT * FROM products WHERE title = (?)", a)
    return render_template("product_view.html", products=products)


@app.route("/auth/userid")
def auth():
    userid = request.args.get("userid")
    usertoken = request.args.get("usertoken")
    row = dbp.execute("SELECT * FROM registrants WHERE id = (?)", userid)
    for i in row:
        redirect_url = redirect("/login") if usertoken == i["token"] else redirect("/register")
        return redirect_url


@app.route("/")
def index():
    if "register_id" not in session:
        return redirect("/login")

    search_list = dbl.execute("SELECT * FROM search LIMIT 20")
    products = dbl.execute("SELECT * FROM products")
    return render_template("homepage.html", products=products, search_list=search_list)


@app.route("/api/user")
def api():
    userid = request.args.get("userid")
    usertoken = request.args.get("usertoken")
    row = dbp.execute("SELECT * FROM registrants WHERE username LIKE (?)", '%' + userid + '%')
    # row = (dbp.execute("SELECT * FROM registrants") if userid == "users" else dbp.execute("SELECT * FROM registrants WHERE username = ?", userid))
    return jsonify(row)

