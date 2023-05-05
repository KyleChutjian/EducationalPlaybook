# Educational Playbook
The Educational Playbook is an application that manages client intake forms and allows project-leads to build curriculums and perform needs assessment based on the provided data and needs of the client.


## How to Run

1. After cloning this Git repository, open a terminal and run "npm install" to install node dependencies.
2. Create a ".env" file inside the backend directory with the values LOGIN, PASSWORD, and SECRET for building the MongooseConnectionString inside of index.js.
3. Navigate to frontend/services and adjust the "apiEndPoint" variables depending on the domain and port you are using for your backend.
4. Run terminal 1 in the frontend folder with the command "npm start"
5. Run terminal 2 in the backend folder with the command "node index.js"

