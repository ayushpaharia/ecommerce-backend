<h1 align="center">E-commerce Backend</h1>

## ✨ Entities

- `Users` `Products` `Catalog` `Orders`

## 🛠️ Tech Stack

- `Typescript` `Nodejs` `Express` `MongoDB`  

## :rocket: Local Development

Start developing locally.

#### Step-1

clone this repo

```sh
https://github.com/ayushpaharia/ecommerce-backend.git
```

#### Step-2

Install all dependencies

```sh
# install dependencies
cd ecommerce-backend
npm install
```

#### Step-3

Environment variables

_Now this is a bit tricky._

- create a new file .env in the root folder
- open [.env.EXAMPLE](./.env.EXAMPLE)
- copy the contents and paste it to the .env

And change all the dummy keys with your own valid ones.

#### Step-4: Starting the server

Finally to start the server execute this script

```sh
npm run dev:watch
```

#### All Package.json scripts

- Main Dev scripts
  - **dev:watch** - Runs server and watch changes
  - **build:watch** - Builds server and watches changes to be build
  - **build** - Build the server into dist
  - **serve** - Build the server into dist && runs it in dist/server.js
  - **start** - Runs server in dist/server.js
---

## :v: Contributing

You wanna contribute? wow amazing. thats great to hear.

After cloning & setting up the local project you can push the changes to your github fork and make a pull request.

### Pushing the changes

```bash
git add .
git commit -m "feat: added new stuff"
git push YOUR_REPO_URL BRANCH_NAME
```

---

Made with :heart: and javascript
