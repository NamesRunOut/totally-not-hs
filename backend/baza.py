import sqlite3
conn = sqlite3.connect('db.sqlite3')
c = conn.cursor()

c.execute('''CREATE TABLE Player (id INTEGER, points INTEGER, name TEXT)''')

conn.commit()
conn.close