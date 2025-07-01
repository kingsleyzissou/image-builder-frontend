# Decomposer TODOs
- [ ] compose request in composes status
- [ ] store request as an artifact*
- [ ] store `created_at` value
- [ ] return path to artifact (/composes || /composes/{id})
- [ ] unify `upload_targets` & `upload_request` (see other notes)
- [x] fix nil pointer dereference for POST compose

## Compose response item type:
- id
- Created at
- Compose request
- blueprint id?

## Compose request type:
- Distro
- Image request
- customizations?

## Other notes
- CRC seems to use the old cloudapi v1
    - v1 used an upload_request
    - v2 uses upload_options
