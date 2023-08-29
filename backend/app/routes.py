from app import app
from flask import render_template

@app.route('/')
def index():
    items = ['Item 1', 'Item 2', 'Item 3']
    return render_template('index.html', items=items)

