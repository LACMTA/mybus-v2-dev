# MyBus v2.0

The MyBus site was re-implemented using [`LACMTA/11ty-web-template`](https://github.com/LACMTA/11ty-web-template).

## Quickstart

### Install

Use `node --version` to verify you're running Node 12 or newer.

### Local Development

Run this command to build & serve the site locally. It will automatically rebuild and reload the site if any files are modified.

``` bash
npm run dev:serve
```

❗❗❗ If this is your first time running `@11ty/eleventy`, the package will be installed. Type `y` when prompted to proceed.

Open `http://localhost:8080/` in your browser to view the site.

### Config

`package.json` includes a few pre-defined scripts and a local environment variable to help with running/building the site.  The logic to check the environment variable and determine whether to build with the `pathPrefix` is in `.eleventy.js`.

| Command | `NODE_ENV` | Usage |
| ------- | ---------- | ----- |
| `npm run dev:serve` | `dev` | Use this locally while developing to build and serve the site for testing. By default, this will use the `pathPrefix` value (defined in `.eleventy.js`) but the `pathPrefix` only matters here if you are serving the site from a parent directory instead of the repo's directory. |
| `npm run dev:build` | `dev` | Use this to build the site for deploying to a GitHub repo hosted via GitHub Pages **without** a custom domain. This is because the site's URL will be under a subdirectory: `<org-name>.github.io/<repo-name>/` and you will need the paths to be built accordingly. |
| `npm run prod:build` | `prod` | Use this to build the site for deploying to a GitHub repo hosted via GitHub Pages **with** a custom domain. This will cause link paths to be built without a `pathPrefix`. |

`.github/workflows/node.js.yml` needs to use the npm command you want to be run via GitHub Actions:

``` yaml
    - name: Build Site
      run: npm run prod:build
```

### Development Notes

Make sure links to site pages, assets, etc. are built relatively using this syntax:

```
{{ 'path' | url }}
```

Where `path` is the path to the resource under the `src` folder. It needs a leading `/`. Example:

```
/img/articulated-buses-mobile.png
```

## Using 11ty

### Publishgin to GitHub Pages

The `.eleventy.js` config file needs the following two settings for GitHub Pages publishing:

1. Change the output directory from the default `_site/` to the directory used by GitHub Pages: `docs/`.
2. Add a path prefix with the repository name because 11ty builds links using the root as the default, but GitHub Pages without a custom domain follow the format `account.github.io/repository-name/`.

Example:

``` js
module.exports = function(eleventyConfig) {
    return {
        pathPrefix: "/11ty-website-example/",
        dir: {
            output: "docs"
        }
    }
}
```

### Ignored Files

The `.eleventyignore` works like other ignore files.  The `README.md` file is added here so that 11ty does not try to build the README into a page.

### NPM Setup

This repository's `package.json` file was initialized using `npm init -y`.

11ty does not automatically clean the output folder before building so any deleted source files will need to be deleted from the output folder.  One easy way to take care of this is to just delete the entire output folder before building. This can be done using a shortcut script built into the `package.json` file.

Here are some shortcut scripts that have already been added in this repo:

``` js
"build": "npx @11ty/eleventy",
"serve": "npx @11ty/eleventy --serve"
```

Scripts can be chained together like this:

``` js
"clean": "rm -rf docs",
"build": "npx @11ty/eleventy",
"clean:build": "npm run clean && npm run build",
"start": "npm run clean && npm run build && npm run serve"
```

Use the following command to get started:

``` bash
npm run start
```

### Liquid Templates

#### Using Includes

To use includes without quotes, they need to be enabled via `dynamicPartials: false` in the Liquid options. Front matter in the include file will not be evaluated. By default, includes must be formatted this way: `{% include 'user' %}`, which looks for `_includes/user.liquid`.
