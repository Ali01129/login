After creating backend folder you have to download package.json to run the server

install mongoose  (npm install mongoose)

db_connect.js file connect the server with mongo db server

in backend folder there are folders
1-Routes
2-models
3-middleware(it checks the user is logedin or not)

models contain the database model for the database

routes contain the authentication route userauth.js
in this we have used

1-express-validator (for validation of inputs)
2-bcrypt (to make salt and hash)
3-jsonwebtoken (token to verify users)


in the end i have installed cors and used it because frontend is on port 3000 and backend is on prot 5000
