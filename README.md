To start the song shop:

1.Start Angular project: ng serve 

2.Backend Login/Register APIs start in folder /user-login-api/npm start  ---> port 5000

Example:

user-login-api>npm start

> user-login-api@1.0.0 start
> node server.js

✔ Loaded API route from login.js
✔ Loaded API route from register.js
✔ Loaded API route from updateuser.js
✔ Loaded API route from users.js

3.Backend song APIs start in folder /deezer-api-server/npm start ---> port 4000

Example:

deezer-api-server>npm start

> deezer-api-server@1.0.0 start
> node server.js

✔ Loaded route: deezer.js
✔ Loaded route: deezerartists.js
✔ Loaded route: jamendo.js
✔ Loaded route: jamendoartists.js


Project create actions:

Part 1

External free API was collected locally and put in MongoDB from https://api.deezer.com/artist/85/top?limit=50. 
To start local transferred API: 
cd deezer-api-server
node server.js

Part 2

UI colors were modified.

Part 3

Songs button was connected with Angular to API.

Part 4 

A new feature button was created "New Artist" where by specifying the ID new list with songs will pop up.

Part 5

Login and register was fixed.
user-login-api folder contains registerin and loginin APIs with mongodb.

