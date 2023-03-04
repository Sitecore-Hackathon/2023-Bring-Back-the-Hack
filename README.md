# TEMP

![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")
# Sitecore Hackathon 2023

- MUST READ: **[Submission requirements](SUBMISSION_REQUIREMENTS.md)**
- [Entry form template](ENTRYFORM.md)
  
### ⟹ [Insert your documentation here](ENTRYFORM.md) <<

> __Important__  
> 
> Copy and paste the content of this file into README.md or face automatic __disqualification__  
> All headlines and subheadlines shall be retained if not noted otherwise.  
> Fill in text in each section as instructed and then delete the existing text, including this blockquote.

You can find a very good reference to Github flavoured markdown reference in [this cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). If you want something a bit more WYSIWYG for editing then could use [StackEdit](https://stackedit.io/app) which provides a more user friendly interface for generating the Markdown code. Those of you who are [VS Code fans](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview) can edit/preview directly in that interface too.

# TEMP-END

# Hackathon Submission Entry form

## Team name
Bring Back the Hack

## Category
 Best Enhancement to SXA Headless

## Description
>⟹ Write a clear description of your hackathon entry.  
>
>  - Module Purpose
>  - What problem was solved (if any)
>    - How does this module solve it
>
>_You can alternately paste a [link here](#docs) to a document within this repo >containing the description._

Logging in to access gated content is a common usage pattern users engage with every day.  Among other applications, it is a reliable starting point for gathering user data, tracking their journey through a site,  optimizing for maximum engagement.

This module implements complete implemntation of Authentication and Authorization for Sitecore that is still minimal and ready to be built upon and customized.

### Features
- Integration with external authentication provider - GitHub, out of the box and can be readily expanded with other providers.
![Screenshot of github authentication](.Images\GithubAuthentication.png)

- Allows content creator to create protected pages that require Authentication to view.
[IMAGE OF A PAGE BEING BLOCKED, OR A PAGE THAT IS GATES (PROFILE), OR SOMETHING]

- It features integration with Gravatron globaly recognizable avatars [Link](https://en.gravatar.com/) which can be further configured to match you'r sites look and feel.
![](.Images\Gravatars.png)

- Efficent caching of auth-gated resources on the edge



## Video link
⟹ Provide a video highlighing your Hackathon module submission and provide a link to the video. You can use any video hosting, file share or even upload the video to this repository. _Just remember to update the link below_

⟹ [Replace this Video link](#video-link)



## Pre-requisites and Dependencies

> ⟹ Does your module rely on other Sitecore modules or frameworks?
>
>- List any dependencies
>- Or other modules that must be installed
>- Or services that must be enabled/configured
>
>_Remove this subsection if your entry does not have any prerequisites other than Sitecore_

- Sitecore SXA Headless
- NextJS


## Installation instructions

>⟹ Write a short clear step-wise instruction on how to install your module.  
>
> _A simple well-described installation process is required to win the Hackathon._  
> Feel free to use any of the following tools/formats as part of the installation:
> - Sitecore Package files
> - Docker image builds
> - Sitecore CLI
> - msbuild
> - npm / yarn
> 
> _Do not use_
> - TDS
> - Unicorn
>
>for example:
>
>1. Use the Sitecore Installation wizard to install the [package] (#link-to-package)
>2. ...
>3. profit

1. Download prerequesites
    - Docker
    - DotNet
    - Powershell
    - Github
2.  Pull down this repository [Link goes here]


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
>You can embed images of different formats too:
>
>![Deal With It](docs/images/deal-with-it.gif?raw=true "Deal With It")
>
>And you can embed external images too:
>
>![Random](https://thiscatdoesnotexist.com/)
>_Remove this subsection if your entry does not require any configuration that >is not fully covered in the installation instructions already_



## Comments
If you'd like to make additional comments that is important for your module entry.