ustudio-theme
====================

##Installation

1. Install [Node.js](http://nodejs.org/)

2. Install via [npm](https://www.npmjs.org/)

```sh
cd path/to/ustudio-theme
sudo npm install -g
```

If you encounter errors running commands also run
```sh
sudo npm install
```

If ```npm -v``` is < 2.0 you will also need to upgrade for the latest version to work
```sh
npm update npm -g
```
If you encounter any issues see: [Fixing npm On Mac OS X for Homebrew Users](https://gist.github.com/DanHerbert/9520689)

##Usage

Set your ustudio keys in config.json and create a theme in the themes/directory following the example of the sample theme.

###List Themes
```sh
ustudio-theme list
```

###Create a new theme
```sh
ustudio-theme create -t [theme name]
```

###Delete an existing theme
```sh
ustudio-theme delete -t [theme name]
```

###Upload a theme
```sh
ustudio-theme upload -t [theme name]
```

###Set a theme to a destination
```sh
ustudio-theme set -t [theme name] -d [destination uid]
```

###List destinations
```sh
ustudio-theme destinations
```

###Watch
```sh
ustudio-theme watch -t [theme name]
```

###Help
```sh
ustudio-theme help
```

All commands also support the `--debug` and `--test` options for debug output and not making API requests respectively.


## Livereload
see [Livereload instructions](http://feedback.livereload.com/knowledgebase/articles/67441-how-do-i-start-using-livereload) and [Installing Livereload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)
[Chrome Extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

##Documentation
Official uStudio docs can be found in the docs/ folder.