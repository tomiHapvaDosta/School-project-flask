from flask import Flask, render_template, redirect, url_for, request, flash, session, send_file, make_response
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin, current_user
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'devsecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user)
            flash('Logged in successfully!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid email or password.', 'danger')
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        if User.query.filter_by(email=email).first():
            flash('Email already registered.', 'warning')
        else:
            user = User(name=name, email=email)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            flash('Account created!', 'success')
            login_user(user)
            return redirect(url_for('home'))
    return render_template('signup.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('home'))

@app.route('/download')
@login_required
def download_page():
    return render_template('download.html')

@app.route('/download-file')
@login_required
def download_file():
    try:
        file_path = os.path.join(os.getcwd(), 'test.txt')
        if not os.path.exists(file_path):
            # Return error as JSON for fetch requests
            if request.headers.get('Accept') == 'application/json':
                return {'error': f'File not found at {file_path}.'}, 404
            flash(f'File not found at {file_path}.', 'danger')
            return redirect(url_for('download_page'))
        
        # Read the file and stream it
        with open(file_path, 'rb') as f:
            file_content = f.read()
        
        response = make_response(file_content)
        response.headers['Content-Type'] = 'text/plain; charset=utf-8'
        response.headers['Content-Disposition'] = 'attachment; filename=test.txt'
        response.headers['Content-Length'] = len(file_content)
        
        # Disable caching to prevent 304 responses
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        response.headers['ETag'] = ''
        
        return response
    except Exception as e:
        if request.headers.get('Accept') == 'application/json':
            return {'error': f'Error downloading file: {str(e)}'}, 500
        flash(f'Error downloading file: {str(e)}', 'danger')
        return redirect(url_for('download_page'))

@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    if not os.path.exists('site.db'):
        with app.app_context():
            db.create_all()
    app.run(debug=True)
