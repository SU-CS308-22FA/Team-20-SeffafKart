
# Welcome to ŞeffafKart!
https://rainbow-lebkuchen-731e03.netlify.app

## Aim of this project
This project is designed to create a web platform which would provide transparency for the administrative and in-game decisions of Turkish Football Federation publicly & easily accessible and crystal clear. On top of that it allows users to make comments on the beforementioned acts and vote the referees and acts resulting in a feedback mechanism for the acts of the federation and a social platform for the fans to participate in criticism of the acts and regulations. This web application is developed using ReactJS, NodeJS,  Express and MySQL.

## User Documentation
## How to install and run ŞeffafKart:
Since this is a web application, you do not need to install our software. You can just click this [link](https://rainbow-lebkuchen-731e03.netlify.app) and start using our software.
## How to report a bug:
If you encounter any type of bug or unusual event during your ŞeffafKart experience, you can open an issue over our github repository with the explanation of the occurred situation and screenshots if possible. In this way, we can help you. 

## Known bugs:
When you refresh the page, all the state information disappears.

## Developer Documentation

## How to obtain source code:
You can get the source code by cloning our github repository.

    git clone https://github.com/SU-CS308-22FA/Team-20-SeffafKart.git 

## How to run it:
After you successfully get the source codes, by opening a terminal in the VScode editor, write the following commands in order to enter *backend* (database) directory and setting it up.

    cd client
    npm start devStart

If you have seen the message "bruh" at the response of the server from the terminal, that means the backend is up and running successfully.

Then, open another terminal and write the following commands to switch to the *frontend* (web application) directory to start it.

    cd client
Then you should install dependencies.

    npm install
    npm start
If you encounter an error message such as:

    'react-scripts' is not recognized as an internal or external command, operable program or batch file.
You should install the react-scripts package via npm package manager to the react project. Simply enter the following command to the terminal.

    npm install react-scripts

 If you encounter this response
 

    added 1482 packages, and audited 1483 packages in 37s 
    224 packages are looking for funding  
	    run `npm fund` for details
This means you have successfully installed react-scripts package now try again the first step your project will be successfully launched.

## Directory structure:
Front-end features and functionalities are located in the *client* directory whereas back-end features and API's are located in *server* directory.

Client Layout (inside src directory):
 - AdminPages: page components that can only accessible by admin users
 - Pages: all page components
 - admin_form_components: form components that used by admin to create administrative acts or football matches
 - archive_components: components that shapes the look of matches and administrative acts
 - components: fundamental components like navbar
 - form_components: form components that used by any user to login or sign-up
 - redux: contains redux elements

## How to deploy the software:

### How to deploy the backend:
***
First of all you need to deploy your **backend** (*server*) part of the project to the [Heroku Cloud Application Platform](https://id.heroku.com/login). First of all create a new account or if you already have one, create a *new> create new app* button from the "new" button from the top right part of the main page. Enter the name of the app and choose the closest region to your location for efficiency. Then press *"Create App"* button.  Later on open the source code from the VScode editor. Open a new terminal and write the following commands:

    cd client
    heroku login
   First you will enter the client directory and try to log in to heroku from that directory. If you encounter *"press any key to login"* response, as stated press any key and it will redirect you to the browser to login to your Heroku account. You can check whether you logged in successfully or not from the previous terminal you have opened. It should prompt your mail address. Later on you can use the instructions given in the *"Deploy using Heroku Git"* part of the page to finish deploying the server. 
Secondly you need to add a package to your heroku app page from the "*Resources*" page. You will add by searching *"ClearDB MySQL"*  add-on and choose the free version from there. It will automatically implement the essential add-on to your heroku server. It will provide the ability to connect to the database. Later on by switching to "*Settings*" tab from the menu in heroku app page, you will see a part called "*Config Vars*". If you click on the small pencil figure from the right side you will see the entire variables in the following format: 

    mysql://b2405e2498e680:44959ae7@eu-cdbr-west-03.cleardb.net/heroku_6fdeb6b2c5ed9ea?reconnect=true

The first info that you see from last '/' char to ':' char constitutes your username, moving on until the '@' char will be your password, from the last point to the next '/' char will be your host and lastly from the last point to the '?' char will be the name of your database. Then you need to configure your index.js file by the above mentioned database credentials. At the top of the index.js file there is a code that configures the server connection such as:
 
    const  db = mysql.createPool({
	    host:  "localhost",
	    user:  "root",
	    password:  "****",
	    database:  "database_name",
    });

You also need to connect to your database via **MySQL Workbench**. Add a new connection from the '+' button on the top bar. A form will appear change the credentials from the configuration details that you have just modified and leave the rest as it is i.e. port, connection method, default schema etc. First click "*Test Connection*" button to make sure you can successfully connect to your remote database. Later, click "*OK*". From now on you will be able to see your remote database from the MySQL Workbench. Next you have to the is that you need to migrate your tables and schemas to the new database you have set up. 
**
After that your backend is ready.

### How to deploy the frontend:
Firstly you need to configure your client files that includes your request to your express API. The API request such as the following:

    .post("http://localhost:3001/api/login",

will needed to be modified in the following format:

    .post("https://your_app_name.herokuapp.com/api/login"

You can copy the link to modify your API URLs from the "*Open App*" button in heroku page. Keep in mind, you HAVE TO configure each and every API URL request according to your own app's URL. 

Later on open a new repository from the GitHub and push your client folder from the terminal by switching to client directory and using git commands. (*only the client directory*). You can use the instructions that Git is providing you with in the main page when you opened a new repository. 

In the next step, set up a new account in [Netlify](https://www.netlify.com) or use your existing one. Click on "New site from Git" , after that connect to your GitHub account for continuous deployment. Authorize Netlify to access your GitHub repositories and choose the repository that includes your client directory. Next change the build command from the next form with the following one:

    CI= npm run build
Then click "Deploy Site" button and the Netlify will start deploying the website. Although there is one last step we need to do before using successfully deploying our application. Switch to VScode terminal which is in the client directory of your local source code and enter the following code:

    npm run build
  And the Netlify will finalize the deployment process. You have successfully deployed your web application.

