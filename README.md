# Node.js Starter Kit with Typescript & Gulp
*A Web Developement starter kit for Node.js (express.js) using typescript.*

## About
We assume you know [Typescript](https://www.typescriptlang.org) and will be coding in typescript. Gulp will assist us in transpiling, compiling and minifying our files.


###### Tools
1. **Gulp**
    This project uses typescript as the language/script of choice and gulp as our
    automated task runner responsible for transpiling or compiling typescript code to pure javascript.
    It also converts sass files to css, concatenate and minify css and js files. Last but not the
    least, gulp takes care of nodemon and browser-sync for us.

2. **Express**

3. **Mongoose**

4. **Nunjucks**
     This project is configured with [Nunjucks](https://mozilla.github.io/nunjucks/getting-started.html) **Templating Engine**. 
     Nunjucks is  rich and powerful templating language for JavaScript. It uses Gulp to precompile all its files to template.js. 
     After compiling, you simply load templates.js on the page (layout.njk), and the system will automatically use the precompiled
     templates.

5. **Passport**

## Usage
Download or clone this project:
Clone as: 
> $ git clone https://github.com/opambour/Node-Starter-Kit-with-Typescript-Gulp.git projectName

Install dependdencies as
> $ npm install

Run Gulp to generate dist files
> $ npx gulp or npm run gulp

The above code will automate all task including **nodemon** and **browser-sync**. After running gulp, it will compile all typescript src files and folders to dist folder.

**Version #: 1**
