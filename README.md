# Airline_Reservation_System

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
    venv\Scripts\activate
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

`Visual Studio Code` is the recommended code editor for development of this project.


## Essential Git Commands for Project Development

1) Updating and Syncing with the Remote Repository:<br>
   Before initiating your work, ensure you are within the project directory on your local machine and synchronize your repository with the latest updates from the remote GitHub repository by executing the following command:

    ```bash
    git pull
    ```


2) ( Optional ) Branch Navigation:<br>
   If required, navigate to another branch by using the 'checkout' command:

    ```bash
    git checkout <branch_name>
    ```

3) Implementing Developments and Staging Changes:<br>
   Progress with your code developments within the local repository. After making necessary developments, stage the changes for commiting by executing:
   
   ```bash
    git add .
    ```

4) Committing Changes:<br>
   Commit the staged changes along with an informative commit message explaining the recent changes:
   
   ```bash
   git commit -m '<commit_message>'
   ```

   Replace '<commit_message>' with a short description about modifications.

5) Incorporating Remote Changes and Handling Merge Conflicts:<br>
   Use the 'pull' command to fetch potential changes from the GitHub repository, aligning your committed changes with any recent contributions from other project contributors:
   
   ```bash
   git pull
   ```

   If any conflicts arise during this process, solve them through a code editor and then re-run the 'pull' command.

6) Uploading Merged Changes to GitHub:<br>
   Publish the modifications to the GitHub repository:
   
   ```bash
   git push
   ```

<br>
Repeat Above sequence of commands to introduce further enhancements to the project.

