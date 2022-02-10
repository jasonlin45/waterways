# Waterway 💦

A fun way to keep your goals and make sure you drink enough water.
Waterway automatically calculates daily targets for water intake
based on weight and exercise level.  

A dashboard feature allows the viewing of friends and their daily progress in their individual goals.  
***Drinking excessive amounts of water can be dangerous.  Please keep a healthy pace and do not overconsume***.

## Feature Requests / Bug Reporting
Please submit issues to the repo and tag them accordingly. \
The project board shows a roadmap of what is being worked on
and things that are planned.

## Tech Stack

This project is build in [Svelte](https://svelte.dev) and using [Tailwind](tailwindcss.com/).  Routing is done using [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router).  

The app uses [Google Firebase](https://firebase.google.com/), specifically for its NoSQL database and authentication.

*This app is not intended to be shining example of code quality.  This is a fun project I did for my lab, and I would like to do some heavy refactoring*

### Get started
Install the dependencies...

```bash
cd waterways 
npm install
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080)

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

To preview:
```bash
npm run start
```
This uses [sirv](https://github.com/lukeed/sirv)