from cs50 import SQL

db = SQL("postgresql://postgres:FIHPmO6pz6DR3bgc@db.xailgomkjzhzqynfzxuu.supabase.co:5432/postgres")

# id = input("id: ")
# title = input("title: ")

# db.execute("INSERT INTO registrants (id, title) VALUES(?,?)", id, title)

row = db.execute("SELECT * FROM registrants")
print(row)