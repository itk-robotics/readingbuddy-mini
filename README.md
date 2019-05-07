# læsemakker-mini

# installation
Get the danish dialog script that supports readingbuddymini
https://github.com/itk-robotics/dk_dialog_scripted/tree/5f2b2f9dd240c982c44a5dbab1c172841825ff36

- open .pml in Choregraphe
- Connect to robot and install

# test
Test html content in your browser by connecting to the robot enter the URL
`http://<ROBOT-IP>/apps/readingbuddymini-dm64/`


# run
Say voice command "læsemakker" while in the dialog

# debug

- Connect to robot with SSH
- run `/home/nao/.local/share/PackageManager/apps/j-tablet-browser/adb logcat`

## frontend dev environment

Make sure you have node and yarn installed.

Then run

`yarn install` - Installs all reqired packages from package.json

`yarn build` - builds assets

`yarn watch` - continious build assets for development
