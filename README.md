# Airline_Reservation_System


## Backend
Recommended Python version : `Python 3.10.12`
  
Please develop the backend in a virtual environment.

   
1) First, clone the repository. 
    
    ```bash
    git clone https://github.com/SharadaShehan/Airline_Reservation_System.git
    ```

2) Go into backend repository

    ```bash
    cd Airline_Reservation_System/backend
    ```

3) Then run this command to activate a python environment. After that activate the environment. 

    In Unix
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

4) Now you have to install the required python libraries. Then run this command.

    ```bash
    pip install -r requirements.txt
    ```

5) Run this command to run the local server

    ```bash
    python run.py
    ```

6) If local server is running, it must show something similar to below.

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


