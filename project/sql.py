from cs50 import *

db = SQL("sqlite:///project.db")
title = input("title: ")
img = input("img: ")
desc = input("desc: ")
price = input("price: ")
db.execute("INSERT INTO products(title, img, desc, price) VALUES(?,?,?,?)", title, img, desc, price)

print(db.execute("select * from registrants"))


