# Document Documentation

## Table of Contents

- [Overview](#overview)
- [document.proto](#document)
  - [Messages](#messages)
    - [Document](#document)
    - [File](#file)
    - [Documents](#documents)
    - [UserDocumentCompliance](#userdocumentcompliance)
- [Version Information](#version-information)
- [Support](#support)

## Overview

The Document provides a comprehensive data structure for managing document within the system. This model supports status management: tracks status for administrative control, pagination support: provides offset-based pagination for collections, identification: provides unique identifiers for document, and more. 

Key features of the {model_name.lower()} model include:
- **Status Management**: Tracks status for administrative control
- **Pagination Support**: Provides offset-based pagination for collections
- **Identification**: Provides unique identifiers for document

## document.proto

### Package Information

- **Package Name**: `document`
- **Go Package Path**: `github.com/sologenic/com-fs-document-model;document`

### Overview

The `document.proto` file defines the core document model for document management. It provides message types for representing document data and operations. The file integrates with external utility libraries: `metadata.proto`, `audit.proto`.

### Messages

#### Document {#document}

The `Document` message provides document data and operations.

**Field Table:**

| Field Name | Type | Required/Optional | Description |
|------------|------|-------------------|-------------|
| Version | `string` | Required | Version value |
| Description | `string` | Required | Additional descriptive information about this item |
| File | `File` | Required | File field |
| SignatureRequired | `bool` | Required | SignatureRequired field |
| Status | `DocumentStatus` | Required | Current status of this item (see related enum) |

**Use Cases:**
- Creating new document records
- Retrieving document information
- Updating document data
- Tracking status for administrative purposes

**Important Notes:**
- The `Status` field determines the current state of this item

#### File {#file}

The `File` message provides file data and operations.

**Field Table:**

| Field Name | Type | Required/Optional | Description |
|------------|------|-------------------|-------------|
| Reference | `string` | Required | Reference value |
| Extension | `string` | Required | Extension value |
| Name | `string` | Optional | The name of this item |
| MD5SUM | `string` | Required | MD5SUM value |

**Use Cases:**
- Creating new file records
- Retrieving file information
- Updating file data

**Important Notes:**
- This message provides the file representation

#### Documents {#documents}

The `Documents` message represents a collection of document with pagination support for handling large result sets.

**Field Table:**

| Field Name | Type | Required/Optional | Description |
|------------|------|-------------------|-------------|
| Documents | `Document` | Optional | Documents field |
| Offset | `int32` | Required | Offset field |

**Use Cases:**
- Returning paginated lists of document from queries or searches
- Implementing pagination in document listing APIs
- Handling large documents efficiently
- Providing continuation tokens for subsequent page requests

**Important Notes:**
- If `Offset` is not set (or is 0), it indicates that all available items have been returned
- Clients should use the `Offset` value in subsequent requests to retrieve the next page of results

#### UserDocumentCompliance {#userdocumentcompliance}

The `UserDocumentCompliance` message provides userdocumentcompliance data and operations.

**Field Table:**

| Field Name | Type | Required/Optional | Description |
|------------|------|-------------------|-------------|
| SignedVersion | `string` | Required | SignedVersion value |
| DocumentState | `DocumentState` | Required | DocumentState field |
| SignedAt | `google.protobuf.Timestamp` | Required | SignedAt field |
| FileMD5SUM | `string` | Required | FileMD5SUM value |
| TXID | `string` | Required | Unique identifier for the tx |

**Use Cases:**
- Creating new userdocumentcompliance records
- Retrieving userdocumentcompliance information
- Updating userdocumentcompliance data

**Important Notes:**
- The `TXID` field must match a valid identifier format

## Version Information

This documentation corresponds to the Protocol Buffer definitions in `document.proto`. The proto file(s) use `proto3` syntax. When referencing this documentation, ensure that the version of the proto files matches the version of the generated code and API implementations you are using.

## Support

For additional information and support:
- See `README.md` for project setup, installation, and usage instructions
- Refer to the Protocol Buffer definitions in `document.proto` for the authoritative source of truth
- Check the imported utility libraries for details on related types:
  - `sologenic/com-fs-utils-lib/models/metadata/metadata.proto`
  - `sologenic/com-fs-utils-lib/models/audit/audit.proto`
