# Hackathon Submission Entry form

## Team name
Bring Back the Hack

## Category
 Best Enhancement to SXA Headless

## Description

Logging in to access gated content is a common usage pattern users engage with every day.  Among other applications, it is a reliable starting point for gathering user data, tracking their journey through a site,  optimizing for maximum engagement.

This module implements complete implemntation of Authentication and Authorization for Sitecore that is still minimal and ready to be built upon and customized.

### Features
- Integration with external authentication provider - GitHub, out of the box and can be readily expanded with other providers.
[LINK TO NEXT AUTH]
![Screenshot of github authentication](.Images\GitHubLogin.png)

- Allows content creator to create protected pages that require Authentication to view.
[IMAGE OF A PAGE BEING BLOCKED, OR A PAGE THAT IS GATES (PROFILE), OR SOMETHING]

- It features integration with Gravatron globaly recognizable avatars [Link](https://en.gravatar.com/) which can be further configured to match you'r sites look and feel.
![](.Images\Gravatars.png)

- Efficent caching of auth-gated resources on the edge


- Implemented through Sitecores middlware plugin architecutre.



## Video link
⟹ Provide a video highlighing your Hackathon module submission and provide a link to the video. You can use any video hosting, file share or even upload the video to this repository. _Just remember to update the link below_

⟹ [Replace this Video link](#video-link)



## Pre-requisites and Dependencies
- Uses docker - so no need to configure it.
- Sitecore SXA Headless
- NextJS
- NextAuth
- MemCache
- Any providers that you use.


## Installation instructions
### To start application

1. Download prerequesites
    * NodeJs 16.x
    * .NET 6.0 SDK
    * .NET Framework 4.8 SDK
    * Visual Studio 2019+
    * Docker for Windows, with Windows Containers enabled
2. Download or use Git to pull down this project
3. Add Sitecore license to the project
    * Option 1: Add _Licese.xml_ file to _.\license_ folder
    * Option 2: Add License code to _.\run\sitecore-xm1-sxa\ .env_
4. If your local IIS is listening on port 443, you'll need to stop it. This requires an elevated PowerShell or command prompt.
   ```
   iisreset /stop
   ```
5. run powershell script from repositories root 
    ```
    \.Init.ps1
    ```
6. run powershell script from repositories root 
    ```
    .\up.ps1
    ```
### To shut down the application
1. Execute powershell script from project root folder 
    ```
    .\down.ps1
    ```

After these steps run successfully you are ready to go.


### Configuration

#### Gravatar Configuration
Module allows users to configure their Gravatar options (default image, and rating filter) through content editor.  User profile block component takes datasource item that implements _UserProfileBlockRenderingDatasource_ template.

## Usage instructions
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