
##How to use:

1) Install dependencies

`$ npm install`
`$ bower install`

gulp-cli must be install as global

2) Run server + browserSync  (dev mode)

`$ gulp serve`


##Config
properties.json file can be edited to allow the user set a different HTML <title> and also update the URL API used by the services. By default API is set to localhost:3000 when the project is run in development mode a proxy will translate the url for you (to avoid CORS)

##Troubleshooting
###Windows
***npm-shrinkwrap.json*** is present to downgrade glob-stream/glob-parent dependecies in order to workaround a known issue in windows. If you are using Linux/Mac you can ignore or remove this files
###Blank page or failed due duplicate files
Changes in the structure may not be clean and refresh automatically when you run ***gulp serve***. To do it manually please run

`$ gulp clean`

Before running gulp serve command
