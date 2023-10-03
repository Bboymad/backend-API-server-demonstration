# Northcoders News API

For instructions, please head over to [bakend-API-server-demonstration](https://github.com/Bboymad/backend-API-server-demonstration.git).

If you wish to clone my project and run it locally, please follow the following instructions on how to create the environment variables:
1. You will need to create two .env files:
.env.test and .env.development
2. Into each, add PGDATABASE= with the correct database name for that environment
(see /db/setup.sql for the database names). Double check that these .env files are .gitignored.
3.You'll need to run npm install at this point.
4. Ensure your project seed files are present and the tables you're intending to make have been written when you create your database.
5. (Optional) Inside each of your data folders you're intending to export, create an index.js file and ensure that the index.js file exports an object with values of the data from that folder with their respective keys.
