import sqlite3

conn = sqlite3.connect('gmail_accounts.db')
c = conn.cursor()

c.execute('''CREATE TABLE IF NOT EXISTS accounts
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
             email TEXT NOT NULL,
             password TEXT NOT NULL,
             recovery_email TEXT,
             phone TEXT)''')

conn.commit()
conn.close()
