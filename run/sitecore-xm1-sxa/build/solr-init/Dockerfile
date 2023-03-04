# escape=`

ARG PARENT_IMAGE
ARG SXA_RESOURCES_IMAGE

FROM ${SXA_RESOURCES_IMAGE} AS sxa_resources
FROM ${PARENT_IMAGE}

# COPY SXA
COPY --from=sxa_resources C:\module\solr\cores-sxa.json C:\data\cores-sxa.json
