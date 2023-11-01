<h1 align="center">✈️ Airline_Reservation_System ✈️</h1>
<p align="center">
<img src="https://github.com/SharadaShehan/Airline_Reservation_System/assets/107914899/2806d3eb-40a2-499e-b208-3400c8efe236">
</p>
<br>

# Developer Guide

* First, clone the repository. 
    
    ```bash
    git clone https://github.com/SharadaShehan/Airline_Reservation_System.git
    ```

## Backend
Recommended Python version : `Python 3.10.12`
  
Please develop the backend in a virtual environment.

1) Navigate to the backend repository.

    ```bash
    cd Airline_Reservation_System/backend
    ```

2) Then run this command to activate a python environment. After that activate the environment.

    In Unix,
    ```bash
    virtualenv --python=python3 ~/venv/venv
    source ~/venv/venv/bin/activate
    ```

    In Windows,
    ```bash
    python -m venv "venv"
    venv\bin\activate
    ```

    If your Python virtual environment works fine, then in the command line should be something similar to this.
    
    ```bash
    (venv) C:\...\Airline_Reservation_System\backend>
    ```

3) Now you have to install the required python libraries. Then run this command.

    ```bash
    pip install -r requirements.txt
    ```
    
4) create `.env` file in `/backend/app/` location with following variables in it.

    ```bash
    SECRET_KEY=my-secret-key

    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_USER=root
    MYSQL_PASSWORD=12345678
    MYSQL_ADMIN_ACCOUNT=adminAccount
    MYSQL_ADMIN_PASSWORD=P7tZ99pJ2s9
    MYSQL_STAFF_ACCOUNT=staffAccount
    MYSQL_STAFF_PASSWORD=MK6dLpY9sPz
    MYSQL_REGISTERED_USER_ACCOUNT=registeredUserAccount
    MYSQL_REGISTERED_USER_PASSWORD=0qR3vKnX8w5
    MYSQL_GUEST_USER_ACCOUNT=guestAccount
    MYSQL_GUEST_USER_PASSWORD=L2mSgV7hg5e
    MYSQL_DB=project_database

    INIT_ENABLED=1
    ```
    Replace above environment variables values with relevant credentials for your local MYSQL database. Set `INIT_ENABLED=1` in development enviroment.

5) Run this command to run the Local Server.

    ```bash
    python run.py
    ```

6) If Local Server is running, it must show something similar to below.

    ```bash
    * Serving Flask app 'run'
    * Debug mode: on
    WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
    * Running on http://127.0.0.1:5000
    Press CTRL+C to quit
    * Restarting with stat
    * Debugger is active!
    * Debugger PIN: 348-962-037
    ```
* Now you can populate your local database with tables and default set of data defined in scripts, by making an API call to below endpoint.

    ```bash
    GET  http://127.0.0.1:5000/init
    ```

## Frontend
Recommended Node version : `Node 18.17.1`

1) Navigate to the frontend repository

    ```bash
    cd Airline_Reservation_System/frontend
    ```

2) Now install the project's dependencies specified in package.json

    ```bash
    npm install
    ```

3) Now replace content of `.env` file in the frontend directory with following codeline

    ```bash
    REACT_APP_BACKEND_API_URL=http://127.0.0.1/api
    ```

4) Run the Development Server

    ```bash
    npm start
    ```

5) If Development Server is running, it must show something similar to below

    ```bash
    Starting the development server...

    Compiled successfully!

    You can now view frontend in the browser.

    Local:            http://localhost:3000
    On Your Network:  http://192.168.141.122:3000

    Note that the development build is not optimized.
    To create a production build, use npm run build.

    webpack compiled successfully
    ```

`Visual Studio Code` is the recommended code editor for development of this project.

