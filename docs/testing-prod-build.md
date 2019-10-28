# Testing production build

`prod-like-srv.sh` is a script that runs express-js that serves static production build and perform
correct redirections to dev backend. So you can test production build in your local environment.
Just create production build and run .sh script that will generate SSL cert and start the configured
server.

```
yarn build:prod
sh ./scripts/prod-like-srv.sh # go to https://localhost:9090
```
