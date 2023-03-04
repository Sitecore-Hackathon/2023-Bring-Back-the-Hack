# escape=`

ARG PARENT_IMAGE
ARG SOLUTION_IMAGE
ARG TOOLS_IMAGE
ARG MANAGEMENT_SERVICES_IMAGE
ARG HEADLESS_SERVICES_IMAGE
ARG SPE_RESOURCES_IMAGE
ARG SXA_RESOURCES_IMAGE

FROM ${SOLUTION_IMAGE} as solution
FROM ${TOOLS_IMAGE} as tools
FROM ${MANAGEMENT_SERVICES_IMAGE} AS management_services
FROM ${HEADLESS_SERVICES_IMAGE} AS headless_services
FROM ${SPE_RESOURCES_IMAGE} AS spe_resources
FROM ${SXA_RESOURCES_IMAGE} AS sxa_resources
FROM ${PARENT_IMAGE}

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

WORKDIR C:\inetpub\wwwroot

# Copy developer tools and entrypoint
COPY --from=tools C:\tools C:\tools

# Copy the Sitecore Management Services Module
COPY --from=management_services C:\module\cm\content ./

# Copy and init the JSS / Headless Services Module
COPY --from=headless_services C:\module\cm\content ./
COPY --from=headless_services C:\module\tools C:\module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath ./; `
    Remove-Item -Path C:\module -Recurse -Force;

# Copy solution website files
COPY --from=solution /artifacts/sitecore/ ./
COPY readme.md *.config*  c:\inetpub\wwwroot\App_Config\Include\

# Copy SPE
COPY --from=spe_resources C:\module\cm\content ./

# Copy SXA
COPY --from=sxa_resources C:\module\cm\content C:\inetpub\wwwroot
COPY --from=sxa_resources C:\module\tools C:\module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath ./; `
  Remove-Item -Path C:\module -Recurse -Force;
  
COPY .\transforms\ \transforms\cm\
RUN C:\tools\scripts\Invoke-XdtTransform.ps1 -Path .\ -XdtPath C:\transforms\cm