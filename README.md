# ore_mobile

Mobile version of O.R.E.

The project can be executed on a browser, but it's not recommended to use the application that way since it uses localStorage, and the data that is stored is not encrypted. On mobile, we are using [a secure storage plugin](https://github.com/martinkasa/capacitor-secure-storage-plugin), so the data is safely stored locally.

## Running the app

The web version of the app can be started up by using `ng serve` at the root of the project.

In order to use the mobile version, you will need to build the application by using `ng build` or `npm run build` and to copy the source files to the mobile platforms by using `npx cap copy` or `npx cap sync`. You can do this in one command with `ng build && npx cap sync`.

Once the source files have been copied, you will need to open the IDE for your project by using `npx cap open ios` or `npx cap open android`. The former will open Xcode while the latter will open Android Studio. You must have these IDEs installed in order to run the app on that specific platform.

## Building the application for production

To build the application for production, run `ng build --configuration production`. `ng build --prod` is deprecated since Angular 12 and has been deleted since Angular 14.

## Changing the URL towards ERPLibre in the configuration files

The URL towards ERPLibre must be changed in the configuration files.
The environment configuration files can be found in `src/environments`.
The URL in `src/proxy.conf.json` must also be changed.
The proxy works automatically when you serve the application with `ng serve`, as it is configured in `angular.json`.

## Install the Restful module

For the application to work, [restful](https://github.com/ajepe/odoo-addons/tree/12.0/restful) by ajepe must be installed.

## Debugging on Android devices

It is possible to open Google Chrome's Development Tools on an android device that is running the application by going to `chrome://inspect` on Chrome or Chromium on the host machine.
