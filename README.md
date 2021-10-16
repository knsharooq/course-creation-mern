# course_creation_app

Steps to run the application:
1. Click on the `Code` dropdown button on top of the github page.
2. Download ZIP.
3. Expand the ZIP file and open the expanded folder in vs code.
4. Open terminal and split it into two.
5. On first terminal, run `cd server`, then `npm install` and finally `npm start`.
6. After server is started, the terminal console displays `Server running on port: 5000`
7. On second terminal, run `cd client`, then `npm install` and finally `npm start`.
8. After client is started, The application will open in `http://localhost:3000` in the browser


Steps to test the application:
1. `http://localhost:3000/` displays the `Course Profiles` on left side and `Add Profile` on right side.
2. Fill all the fields in Add Profile and then `Save`. 
3. The added profile will be displayed as a card inside `Course Profiles`.
4. The card contains buttons for `Details`, `Comments`, `Edit` and `Delete`.
5. `Details` button opens a modal to add or edit additional information and then save them.
6. `Comments` button opens another modal displaying all the comments for the profile.
7. New comments can be entered and saved.
8. Pencil icon is for Edit. It opens the profile info inside `Edit Profile` on right side.
9. The profile info can be edited and saved.
10. There is also a `Clear` button to clear all fields.
11. Finally, there is a `Delete` icon to delete the profile from the database. A confirmation modal appears to confirm delete.


Frontend Code Details:
- Client folder represents all the frontend code including React.js, redux and axios.
- React components are included in the `App.js` file and `components` folder inside the `src` folder.
- Redux store is created and provided in the index.js file.
- Associated files for redux are added in the `actions` and `reducers` folders inside `src`.
- Axios apis are provided inside the `api` folder in `src`.
- All the dependecies are available in the package.json incuding fontawesome, bootstrap, reactstrap, react-redux etc.

Backend Code Details:
- Server folder represents all the backend code including Node.js, Express.js and MongoDB.
- Express instance and mongoDB connection are incuded in the `index.js` file.
- Database model is created using `mongoose.Schema` in the `models` folder.
- Apis are created using express routes in the `routes` folder.
- Database operations for apis are defined in the `controllers` folder.
- All the dependecies are available in the package.json incuding nodemon, mongoose, cors etc.

Working:
- On loading the page, the course profiles stored in the mongoDB cluster are accessed using redux.
- The data in redux is displayed in the UI under `Course Profiles`.
- New course profiles created are stored temporarily in redux and permanently in mongoDB cluster.
- Edited profile data, additional information and comments are also stored similarly in redux and cluster.
- Profiles with Confirmed deletes are permanently removed from database.

