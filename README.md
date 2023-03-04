# Hackathon Submission Entry form

## Team name
Bring Back the Hack

## Category
 Best Enhancement to SXA Headless

## Description

Logging in using external identity providers (google, github etc) to access gated content is a common usage pattern users engage with every day.  Among other applications, it is a reliable starting point for gathering user data, tracking their journey through a site,  optimizing for maximum engagement.

This module implements complete implemntation of Authentication and Authorization for Sitecore that is still minimal and ready to be built upon and customized.

### Features
- Integration with external authentication provider - GitHub, out of the box and can be readily expanded with other any providers offered by [NextAuth.js](https://next-auth.js.org/).
  ![Screenshot of github authentication](.Images\GitHubLogin.png)
- Control what areas of the website are secured/gated from Site setting area in CMS
   [TODO:  IMAGE OF A PAGE BEING BLOCKED, OR A PAGE THAT IS GATES (PROFILE), OR SOMETHING]
- Building custom NextJs middleware using Sitecores middlware plugin architecutre to determine whether the user have access to the requested page.
  [Edge Middleware Reference](https://vercel.com/docs/concepts/functions/edge-middleware/middleware-api)
- Implement caching on top of GraphQl to query the secured pages mapping less frequently, and have the majority of the work done on Edge runtime
- Extending SXA toolbox to include Account related components
- It features integration with Gravatron globaly recognizable avatars [Link](https://en.gravatar.com/) which can be further configured to match you'r sites look and feel.
![Different Configurations of Avatars](.Images\Gravatars.png)

## Video link
⟹ Provide a video highlighing your Hackathon module submission and provide a link to the video. You can use any video hosting, file share or even upload the video to this repository. _Just remember to update the link below_

⟹ [Replace this Video link](#video-link)

## Pre-requisites and Dependencies
We are using local containarized environment, everything you need is already configured inside the repo and should be automatically installed when you finish the installation instructions
- Uses docker - so no need to configure it.


## Installation instructions
### To start application

1. Download prerequesites
    * NodeJs 16.x
    * Visual Studio 2019+/ Visual Code
    * Docker for Windows, with Windows Containers enabled
2. Download or use Git to pull down this project
3. Add Sitecore license to the project
    * Option 1: Add _Licese.xml_ file to _.\license_ folder
4. If your local IIS is listening on port 443, you'll need to stop it. This requires an elevated PowerShell or command prompt.
   ```
   iisreset /stop
   ```
5. run powershell script from repositories root 
    ```
    \.Init.ps1
    ```
6. run powershell script from repositories root, if the script fails the first time, trying runing .\down.ps1 then .\up.ps1
    ```
    .\up.ps1
    ```
### To shut down the application
1. Execute powershell script from project root folder 
    ```
    .\down.ps1
    ```

After these steps run successfully you are ready to go. up.ps1 should take care of pushing serialized templates/rendering/items to CM


### Configuration

#### Gravatar Configuration
Module allows users to configure their Gravatar options (default image, and rating filter) through content editor.  User profile block component takes datasource item that implements _UserProfileBlockRenderingDatasource_ template.

## Usage instructions

### Login with Github account
1. Open up browser and navigate to https://www.hackback.localhost/
2. Click on login link on the top menu, this will redirect to Github login page, you can configure other IDPs inside this file ./src/pages/api/auth[...nextauth].ts
3. After filling your github credintials, you will be logged in within the site


### Configuring secured pages within Sitecore CMS
This module allow content authors to lock down specific pages or entire path behind login , to configure that follow these steps:
1. Open up browser and navigate to https://cm.hackback.localhost/sitecore/shell , login with admin/b
2. Inside content Editor, navigate to /sitecore/content/HackBack/www/Settings/Security Maps folder, right click and create item of template SecuredPages
3. In "Path of the secured page" field, type in the path/s (or regularExpression/s) you want to lock behind login, you can enter multiple lines
4. in "login Redirect Url" type in "/api/auth/signin"
5. Save and publish
6. To test the previously configured secure path/s, Navigate to https://www.hackback.localhost/, make sure you are logged off
7. Then navigate to the path you configured previously, you should be redirect back to login page
    Make sure you created dummy page that match the path you configured

>⟹ Provide documentation about your module, how do the users use your module, >where are things located, what do the icons mean, are there any secret >shortcuts etc.
>
>Include screenshots where necessary. You can add images to the `./images` .>folder and then link to them from your documentation:
>
>.![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")
>
>And you can embed external images too:
>
>![Random](https://thiscatdoesnotexist.com/)
>_Remove this subsection if your entry does not require >any configuration that >is not fully covered in the >installation instructions already_


- Two components
    User profile components
    [IMAGE HERE]
    SignIn/SignOut component
    [IMAGE HERE]


## Comments
If you'd like to make additional comments that is important for your module entry.
