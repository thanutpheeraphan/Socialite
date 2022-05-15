# Socialite

Running in the develop to test the react frontend code will have to go to `package.json` and edit the file:

### To test frontend code only:
`"start": "react-scripts start",`

### For deployment into heroku:
###### Must run `npm run build` to build the frontend code then change to 
`"start": "node server.js",`

