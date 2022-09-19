The project is a RestFULL API of a Cloth store. The API contains the CRUD operations. The API is designed using Node.js(Express Module), for database MongoDB is used.
The API contains the authentication and authorization by using headers, and logging details is written into the logfile.log file. The API can be hit by using the Postman software.

The endpoints of the API are:
/cloth => GET method,To get details of all the cloth object in the database.
/cloth/:id => GET method,To get details of a particular cloth from database.
/cloth =>POST method, To add a new cloth object into the database, this endpoint is used by sending email as headers for authorization.
/cloth => PUT method, To update the existing cloth object in the database, this endpoint is used by sending email as headers for authorization.
/:id => DELETE method, To delete the existing cloth object in the database, this endpoint is used by sending email as headers for authorization.
/user => GET method, To get details of all the users in the database, this endpoint is used by sending email as headers for authorization.
/user/add => POST method, To add a new user into the database.
/user/:id => DELETE method, To delete the user for the database, this endpoint is used by sending email as headers for authorization