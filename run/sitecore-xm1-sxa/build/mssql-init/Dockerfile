# escape=`

ARG PARENT_IMAGE
ARG HEADLESS_SERVICES_IMAGE
ARG SPE_RESOURCES_IMAGE

FROM ${HEADLESS_SERVICES_IMAGE} AS headless_services
FROM ${SPE_RESOURCES_IMAGE} AS spe_resources
FROM ${PARENT_IMAGE}

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Copy and init the JSS / Headless Services Module
COPY --from=headless_services C:\module\db C:\resources\jss

# Copy SPE
COPY --from=spe_resources C:\module\db C:\resources\spe