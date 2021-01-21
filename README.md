## Description

The primary aim of this project is to play with nodeJS callbacks.
The second, to keep a code as clean as possible, avoiding the easy spagetty way.

As i do POO since a long time, it's a good exercise to learn one of the NodeJS's way to develop and apply good developement pratices to it.

This application manipulate files in order to register company basic informations.

## Get started
Build the docker image: `docker build -t hello-callback .`

Run the container: `docker container run --rm -it --name hello-callback --volume $(pwd):/var/www --workdir /var/www hello-callback sh`

If you want to develop locally and test in the container add `--volume $(pwd):/var/www` before the image name.

To register a company, run: `npm run register-company COMPANY_NAME`