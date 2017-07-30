# ViktoriaFlowers

### To deploy new version of ViktoriaFlowers app to AWS. 
* 1. Log in https://aws.amazon.com/ choose instances and select Node instance. Then choose connect and copy ssh.
* 2. In GitBash paste ssh in directory where is your "ViktoriaFlowers.pem" file. 
* 3. Now you are in ubuntu environment. Path to app repository is => `var/app//ViktoriaFlowers`
    * command to stop pm2 => `sudo pm2 stop start.sh`  
    * command to start pm2 => `sudo pm2 start start.sh`  
    * command to view all running instances in pm2 => `sudo pm2 list`  
* 4. update version only from "production" branch  
 
 ### For check MongoDB status  
* Follow steps one and two, but choose to connect to MongoDB instance.  
* When you are connect to ubuntu execute => `sudo systemctl status mongod`  


### Starts `Tests`
* Run unit tests and integration tests
  * `gulp tests:unit`
  * (gulp should be installed globally)

* Run browser tests with selenium
  * `npm install -g chromedriver`
  *  Open `cmd` in ViktioriaFlowers repo and run 
     * `java -jar selenium-server-standalone-3.4.0.jar`
  * In other terminal run `gulp tests:browser` 
  * Your browser should open itself
  * **Note** The tests run on chrome only!

### Set admin in Mongo db

```js
db.users.update(
    { "_id" : ObjectId("The_ID_HERE")}, 
    { $set:
      {
        roles: ['admin']
      }
});
```

### Set up `eslint`

* Install required libraries:
    * `npm install --save-dev eslint eslint-config-google`
    * `npm install --save-dev babel-eslint `

* In VS Code search in marketplace for `eslint` and install
* In root directory of the project make sure you have `.eslintrc`
* Open a `.js` file and write some code - you should see red underlining.
    * If not working check the `Output - ESLint` in VS Code
    * Normal output
      ```
         [Info  - 11:38:42 PM] ESLint server is running.
         [Info  - 11:38:43 PM] ESLint library loaded from: ~\ViktoriaFlowers\node_modules\eslint\lib\api.js
      ```
* (Optionally) Update typescript `npm install -g typescript@atest`

## Run `eslint`

* Type in the command (terminal) `npm run lint` (Lifecycle error is thrown - ignore it)


* Resoures
    * [babel-eslint - GitHub](https://github.com/babel/babel-eslint)
    * [eslint-config-google - GitHub](https://github.com/google/eslint-config-google)
    * [ESLint Setup with VSCode - YouTube](https://www.youtube.com/watch?v=w3qir73qU58)
    * [ESLint за отборните проекти - TelerikAcademy](http://telerikacademy.com/Forum/Questions/208193/ESLint-%D0%B7%D0%B0-%D0%BE%D1%82%D0%B1%D0%BE%D1%80%D0%BD%D0%B8%D1%82%D0%B5-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8-brace-style-%D0%B2%D1%8A%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82-%D0%B7%D0%B0-%D1%81%D0%B2%D0%BE%D0%B1%D0%BE%D0%B4%D0%B5%D0%BD-%D0%B8%D0%B7%D0%B1%D0%BE%D1%80)
