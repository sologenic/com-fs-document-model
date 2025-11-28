# Document Documentation

## Table of Contents

- [Overview](#overview)
- [document.proto](#document)
  - [Messages](#messages)
    - [Document](#document)
    - [DocumentDetails](#documentdetails)
    - [File](#file)
    - [Documents](#documents)
    - [UserDocumentCompliance](#userdocumentcompliance)
    - [SignedDocument](#signeddocument)
- [Version Information](#version-information)
- [Support](#support)

## Overview

The Document provides a comprehensive data structure for managing document within the system. This model supports metadata and audit: includes metadata and audit trails for tracking changes, organizational context: links items to organizations via organizationid, status management: tracks status for administrative control, and more. 

Key features of the {model_name.lower()} model include:
- **Metadata and Audit**: Includes metadata and audit trails for tracking changes
- **Organizational Context**: Links items to organizations via OrganizationID
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
| Document | `DocumentDetails` | Required | Document field |
| MetaData | `metadata.MetaData` | Required | Network is not to be assigned (documents are network agnostic) |
| Audit | `audit.Audit` | Required | Audit trail information for tracking changes and access |

**Use Cases:**
- Creating new document records
- Retrieving document information
- Updating document data

**Important Notes:**
- This message provides the document representation

#### DocumentDetails {#documentdetails}

The `DocumentDetails` message contains all the core information about a document, including essential details and metadata.

**Field Table:**

| Field Name | Type | Required/Optional | Description |
|------------|------|-------------------|-------------|
| OrganizationID | `string` | Required | UUID of the organization this item belongs to |
| Name | `string` | Required | The name of this item |
| Version | `string` | Required | Latest version of the document |
| Description | `string` | Required | Additional descriptive information about this item |
| File | `File` | Required | File field |
| SignatureRequired | `bool` | Required | if false, the document is for display/reference only |
| Status | `DocumentStatus` | Required | Current status of this item (see related enum) |

**Use Cases:**
- Creating new document records with complete information
- Updating document information
- Associating items with specific organizations
- Tracking status for administrative purposes

**Important Notes:**
- The `OrganizationID` must be a valid UUID format
- The `Status` field determines the current state of this item

#### File {#file}

The `File` message provides file data and operations.

**Field Table:**

| Field Name | Type | Required/Optional | Description |
|------------|------|-------------------|-------------|
| Reference | `string` | Required | The reference to the file |
| Extension | `string` | Required | Extension value |
| Name | `string` | Optional | User defined name of the file, used as a "description" and not to reference the file |
| MD5SUM | `string` | Required | MD5 checksum of the file for integrity verification |

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
| SignedDocuments | `SignedDocument` | Optional | SignedDocuments field |

**Use Cases:**
- Creating new userdocumentcompliance records
- Retrieving userdocumentcompliance information
- Updating userdocumentcompliance data

**Important Notes:**
- This message provides the userdocumentcompliance representation

#### SignedDocument {#signeddocument}

The `SignedDocument` message provides signeddocument data and operations.

**Field Table:**

| Field Name | Type | Required/Optional | Description |
|------------|------|-------------------|-------------|
| Name | `string` | Required | The name of this item |
| SignedVersion | `string` | Required | The version of the document that was signed. This may differ from the current/latest version. |
| DocumentState | `DocumentState` | Required | DocumentState field |
| SignedAt | `google.protobuf.Timestamp` | Required | SignedAt field |
| FileMD5SUM | `string` | Required | MD5 checksum of the file that was signed |
| TXID | `string` | Required | Transaction ID of the signed document (e.g. from the blockchain) |

**Use Cases:**
- Creating new signeddocument records
- Retrieving signeddocument information
- Updating signeddocument data

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
