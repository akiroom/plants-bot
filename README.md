# Plants bot

Simple slack bot

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone https://github.com/akiroom/plants-bot.git # or clone your own fork
$ cd plants-bot
$ npm install
$ SLACK_TOKEN='xxxxxxxxxxx' node ./index.js
```

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

Herokuの環境変数のSLACK_TOKENを設定してください。
