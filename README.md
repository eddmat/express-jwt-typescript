# express-jwt-typescript

Basic implementation of JWT authentication on top of Express, MongoDB and coded with TypeScript. No database is required to be running in localhost, in fact, it would be my recommendation to rely on a cloud based solution, such as MongoDB Atlas.

## Stack required
* Express
* Express Kun (express-kun)
* JsonWebToken
* TypeScript
* Mongoose
* HTTPie. _Optional: you can use Postman or whatever HTTP client_

The express-kun package will do job of mounting the authentication middleware for us.

## Install and compile
The following is meant to work with Yarn.

First, install all required packages. The `build` task will run `tsc` in the background to output .js files in a `dist/` folder in the root directory
```
$ yarn install
$ yarn build
```

Next, set the environment variables in `./env`. You can find the reference in `sample.env`.

## Running the server
```
$ yarn start
```

## Running the authentication sample
If you are using HTTPie, then you can do as follow:
```
# Create the user credentials
$ http -f POST localhost:<port>/auth/create email=<your_email> password=<your_password>

# Log in with the just created credentials
$ http -f POST localhost:<port>/auth/login email=<your_email> password=<your_password>

# If the authentication token expires, then generate a new one from the refresh token
# provided in the output of the previous step
$ http -f POST localhost:<port>/auth/refresh token=<refresh_token>
```

