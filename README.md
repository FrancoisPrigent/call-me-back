## Description

The primary aim of this project is to play with nodeJS callbacks.
The second, to keep a code as clean as possible, avoiding the easy spagetty way.

As i do POO since a long time, it's a good exercise to learn one of the NodeJS's way to develop and apply good developement pratices to it.

This application manipulate files in order to register company basic informations.

## Get started
Build the docker image: `docker build . -t hello-callback`

Enter in the container in interactive mode: `docker container run -it --name hello-callback-app hello-callback sh`

Then register a company: `npm run register-company COMPANY_NAME`

### Dev mode
Run the container with your host folder and the command to watch your updates and build your ts: `docker container run --name hello-callback-app --volume $(pwd):/var/www hello-callback npm run build-watch`

To run the tests: `npm run test`