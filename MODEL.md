# Document Model

This document describes the structure and usage of the `document.proto` Protocol Buffer definition file, which provides the data model for document management and compliance tracking.

## Overview

The document model defines the structure for managing documents within an organization, including document details, file references, versioning, signature requirements, and user compliance tracking. Documents are network-agnostic and can be tracked through their lifecycle from draft to active to outdated states.

## Package and Dependencies

- **Package**: `document`
- **Go Package**: `github.com/sologenic/com-fs-document-model;document`
- **Syntax**: `proto3`

### Dependencies

- `google/protobuf/timestamp.proto` - For timestamp fields
- `sologenic/com-fs-utils-lib/models/metadata/metadata.proto` - For metadata information (note: Network is not to be assigned as documents are network agnostic)
- `sologenic/com-fs-utils-lib/models/audit/audit.proto` - For audit trail information

## Message Definitions

### Document

The root message representing a complete document with its details, metadata, and audit information.

| Field | Type | Description |
|-------|------|-------------|
| `Document` | `DocumentDetails` | The document details including organization, name, version, file, and status |
| `MetaData` | `metadata.MetaData` | Metadata information (Network is not to be assigned - documents are network agnostic) |
| `Audit` | `audit.Audit` | Audit trail information for the document |

### DocumentDetails

Contains the core information about a document. The key format for documents is: `OrganizationID_File.MD5SUM`

| Field | Type | Description |
|-------|------|-------------|
| `OrganizationID` | `string` | The identifier of the organization that owns the document |
| `Name` | `string` | The name of the document |
| `Version` | `string` | The latest version of the document |
| `Description` | `string` | A description of the document |
| `File` | `File` | The file associated with the document |
| `SignatureRequired` | `bool` | If `false`, the document is for display/reference only. If `true`, signature is required |
| `Status` | `DocumentStatus` | The current status of the document (see DocumentStatus enum) |

### File

Represents a file associated with a document, including its reference, extension, optional name, and integrity checksum.

| Field | Type | Description |
|-------|------|-------------|
| `Reference` | `string` | The reference to the file |
| `Extension` | `string` | The file extension |
| `Name` | `optional string` | User-defined name of the file, used as a "description" and not to reference the file |
| `MD5SUM` | `string` | MD5 checksum of the file for integrity verification |

### Documents

A collection of documents with pagination support.

| Field | Type | Description |
|-------|------|-------------|
| `Documents` | `repeated Document` | A list of documents |
| `Offset` | `int32` | Pagination offset for retrieving documents |

### UserDocumentCompliance

Embedded in User object to track user document compliance. Contains a list of documents that have been signed by the user.

| Field | Type | Description |
|-------|------|-------------|
| `SignedDocuments` | `repeated SignedDocument` | List of documents that have been signed by the user |

### SignedDocument

Represents a document that has been signed by a user, including the version that was signed, the state, timestamp, file checksum, and transaction ID.

| Field | Type | Description |
|-------|------|-------------|
| `Name` | `string` | The name of the signed document |
| `SignedVersion` | `string` | The version of the document that was signed. This may differ from the current/latest version |
| `DocumentState` | `DocumentState` | The state of the document (see DocumentState enum) |
| `SignedAt` | `google.protobuf.Timestamp` | Timestamp when the document was signed |
| `FileMD5SUM` | `string` | MD5 checksum of the file that was signed |
| `TXID` | `string` | Transaction ID of the signed document (e.g., from the blockchain) |

## Enum Definitions

### DocumentStatus

Represents the lifecycle status of a document.

| Value | Name | Description |
|-------|------|-------------|
| `0` | `NOT_USED_STATUS` | Default/unused status value |
| `1` | `UNPUBLISHED` | Document is unpublished and in draft state |
| `2` | `ACTIVE` | Document is active and required for users |
| `3` | `OUTDATED` | Document is outdated and no longer required |

### DocumentState

Represents the state of a document from a user compliance perspective.

| Value | Name | Description |
|-------|------|-------------|
| `0` | `NOT_USED_STATE` | Default/unused state value |
| `1` | `TO_BE_SIGNED` | Document needs to be signed by the user |
| `2` | `SIGNED` | Document has been signed by the user |
| `3` | `DISPLAY_ONLY` | Document is for display/reference only (no signature required) |

## Key Format

Documents are identified using the following key format:
```
OrganizationID_File.MD5SUM
```

This format ensures unique identification of documents based on the organization and the specific file version (identified by its MD5 checksum).

## Usage Notes

### Document Lifecycle

1. **UNPUBLISHED**: Documents start in this state when they are created but not yet ready for users
2. **ACTIVE**: Documents in this state are required for users and should be signed (if `SignatureRequired` is `true`)
3. **OUTDATED**: Documents that are no longer required but may be kept for historical reference

### Signature Requirements

- When `SignatureRequired` is `true`, users must sign the document to be compliant
- When `SignatureRequired` is `false`, the document is for display/reference only
- The `DocumentState` enum tracks whether a document has been signed by a user

### Versioning

- Documents have a `Version` field in `DocumentDetails` representing the latest version
- When a user signs a document, the `SignedVersion` in `SignedDocument` records which version was signed
- The signed version may differ from the current/latest version, allowing tracking of compliance with specific document versions

### File Integrity

- Files are identified by their MD5 checksum (`MD5SUM` in `File` and `FileMD5SUM` in `SignedDocument`)
- This ensures integrity verification and prevents tampering
- The checksum is used as part of the document key format

### Network Agnostic

- Documents are network-agnostic, meaning the `MetaData.Network` field should not be assigned
- This allows documents to be used across different blockchain networks or systems

### Transaction Tracking

- Signed documents include a `TXID` (Transaction ID) field, which can reference a blockchain transaction or other transaction system
- This provides an immutable record of when and how the document was signed

