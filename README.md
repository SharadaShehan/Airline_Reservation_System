# Airline_Reservation_System

* First, clone the repository. 
    
    ```bash
    git clone https://github.com/SharadaShehan/Airline_Reservation_System.git
    ```

## Backend
Recommended Python version : `Python 3.10.12`
  
Please develop the backend in a virtual environment.

1) Navigate to the backend repository

    ```bash
    cd Airline_Reservation_System/backend
    ```

2) Then run this command to activate a python environment. After that activate the environment

    In Unix,
    ```bash
    virtualenv --python=python3 ~/venv/venv
    source ~/venv/venv/bin/activate
    ```

    In Windows,
    ```bash
    python -m venv "venv"
    venv\Scripts\activate
    ```

    If your Python virtual environment works fine, then in the command line should be something similar to this.
    
    ```bash
    (venv) C:\...\Airline_Reservation_System\backend>
    ```

3) Now you have to install the required python libraries. Then run this command

    ```bash
    pip install -r requirements.txt
    ```

4) Run this command to run the Local Server

    ```bash
    python run.py
    ```

5) If Local Server is running, it must show something similar to below

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

3) Run the Development Server

    ```bash
    npm start
    ```

4) If Development Server is running, it must show something similar to below

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

