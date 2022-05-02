We're really glad you're reading this. 👏

## Instructions
### Install
These steps will guide you through contributing to this project:

- Fork the repo
- Clone it and install dependencies

```console
$ git clone https://github.com/<YOUR-USERNAME>/vite-plugin-cem
$ cd vite-plugin-cem
$ npm install
```

You must also install the example project. This project allow you to test easly the plugin without setup an another project. To do this run these commands :

```console
$ cd example
$ npm install
```

### Develop

To develop you must build the library and test it into the example project. To do this run this command first :

```
$ npm run dev
```

And in an another terminal run this command :

```
$ npm run example:dev
```

The first command will build the ``vite-plugin-cem`` plugin and the second command will run an example project which the builded plugin.

### Build 

To build the plugin just run this command :

```console
$ npm run build
```

And if you want build the example project run this command :

```console
$ npm run example:build
```

Make and commit your changes. Make sure the commands ``npm run build`` is working.

### Commmit

Before begin to write some code create a branch :

```console
# For a feature always namespace your branch with `feature`
$ git branch -b feature/my-super-feat

# For a hot fix always namespace your branch with `fix`
$ git branch -b fix/fix-an-big-trouble
```

This repository use [gitmoji](https://gitmoji.dev/) as commit convention. You can write commit manually or use the gitmoji-cli :

```console
$ npm install -g gitmoji-cli
```

This is an example of feature commit :

```
✨ My super feature
```


Finally send a GitHub Pull Request with a clear list of what you've done (read more [about pull requests](https://help.github.com/articles/about-pull-requests/)). Make sure all of your commits are atomic (one feature per commit).