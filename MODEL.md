# Document Model Documentation

This document provides comprehensive documentation for the `document.proto` Protocol Buffer definition file, which defines the data model for document management and compliance tracking within an organization.

## Overview

The document model enables organizations to manage documents throughout their lifecycle, from creation to publication to deprecation. It supports document versioning, signature requirements, file integrity verification, and user compliance tracking. Documents are designed to be network-agnostic, allowing them to be used across different blockchain networks or systems without modification.

Key features of the document model include:
- Document lifecycle management (unpublished, active, outdated)
- File integrity verification using MD5 checksums
- Version tracking for document updates
- Signature requirement flags for compliance documents
- User document compliance tracking with signed document history
- Transaction ID tracking for immutable signature records

## document.proto

### Package Information

- **Package Name**: `document`
- **Go Package Path**: `github.com/sologenic/com-fs-document-model;document`
- **Syntax**: `proto3`

### File Overview

The `document.proto` file defines the core data structures for document management. It includes messages for document details, file references, document collections, and user compliance tracking. The file also defines enums for document status and document state to manage the document lifecycle and user compliance states.

### Dependencies

- `google/protobuf/timestamp.proto` - Provides timestamp fields for tracking when documents were signed
- `sologenic/com-fs-utils-lib/models/metadata/metadata.proto` - Provides metadata information (note: Network field should not be assigned as documents are network agnostic)
- `sologenic/com-fs-utils-lib/models/audit/audit.proto` - Provides audit trail information for document operations

### Message Definitions

#### Document

The root message representing a complete document with its details, metadata, and audit information. This is the primary message used to represent a document in the system.

**Use Cases:**
- Storing and retrieving complete document information
- Passing documents between services
- Document persistence and serialization

**Field Table:**

| Field | Type | Required/Optional | Description |
|-------|------|------------------|-------------|
| `Document` | `DocumentDetails` | Required | The document details including organization, name, version, file, and status |
| `MetaData` | `metadata.MetaData` | Optional | Metadata information. **Important:** Network field should not be assigned as documents are network agnostic |
| `Audit` | `audit.Audit` | Optional | Audit trail information for the document, tracking creation and modification history |

**Important Notes:**
- The `MetaData.Network` field must not be assigned, as documents are network-agnostic
- All three fields work together to provide complete document information: details, metadata, and audit trail

#### DocumentDetails

Contains the core information about a document, including organization ownership, name, version, description, file reference, signature requirements, and status.

**Key Format:** Documents are identified using the format: `OrganizationID_File.MD5SUM`

**Use Cases:**
- Creating new documents
- Updating document information
- Querying documents by organization
- Managing document lifecycle through status changes

**Field Table:**

| Field | Type | Required/Optional | Description |
|-------|------|------------------|-------------|
| `OrganizationID` | `string` | Required | The identifier of the organization that owns the document. Used as part of the document key format |
| `Name` | `string` | Required | The name of the document, used for identification and display |
| `Version` | `string` | Required | The latest version of the document. Updated when document content changes |
| `Description` | `string` | Required | A human-readable description of the document's purpose and content |
| `File` | `File` | Required | The file associated with the document, containing reference, extension, and integrity checksum |
| `SignatureRequired` | `bool` | Required | If `false`, the document is for display/reference only. If `true`, users must sign the document for compliance |
| `Status` | `DocumentStatus` | Required | The current lifecycle status of the document (see DocumentStatus enum) |

**Important Notes:**
- The document key format combines `OrganizationID` and `File.MD5SUM` to ensure unique identification
- The `Version` field represents the latest version; signed documents may reference older versions
- When `SignatureRequired` is `false`, the document is informational only and does not require user signatures

#### File

Represents a file associated with a document, including its storage reference, file extension, optional user-defined name, and MD5 checksum for integrity verification.

**Use Cases:**
- Storing file metadata separate from file content
- Verifying file integrity using MD5 checksum
- Providing user-friendly file names for display purposes
- Referencing files stored in external storage systems

**Field Table:**

| Field | Type | Required/Optional | Description |
|-------|------|------------------|-------------|
| `Reference` | `string` | Required | The reference to the file, typically a storage location or identifier |
| `Extension` | `string` | Required | The file extension (e.g., "pdf", "docx") indicating the file type |
| `Name` | `optional string` | Optional | User-defined name of the file, used as a "description" for display purposes. This is not used to reference the file |
| `MD5SUM` | `string` | Required | MD5 checksum of the file for integrity verification. Used as part of the document key format |

**Important Notes:**
- The `Name` field is optional and is for display purposes only; it should not be used to reference or retrieve the file
- The `MD5SUM` is critical for file integrity verification and is part of the document key format
- The `Reference` field should point to the actual file storage location

#### Documents

A collection of documents with pagination support, used for listing and retrieving multiple documents.

**Use Cases:**
- Listing documents for an organization
- Paginated document retrieval
- Batch document operations
- Search result collections

**Field Table:**

| Field | Type | Required/Optional | Description |
|-------|------|------------------|-------------|
| `Documents` | `repeated Document` | Required | A list of documents returned in the collection |
| `Offset` | `int32` | Required | Pagination offset indicating the starting position for the next page of results |

**Important Notes:**
- Used for paginated document retrieval
- The `Offset` field helps implement pagination by indicating where the next page should start
- Typically used in conjunction with limit parameters in query operations

#### UserDocumentCompliance

Embedded in User object to track user document compliance. Contains a list of documents that have been signed by the user, allowing tracking of which documents a user has completed.

**Use Cases:**
- Tracking which documents a user has signed
- Determining user compliance status
- Displaying user's document signing history
- Verifying user has signed required documents

**Field Table:**

| Field | Type | Required/Optional | Description |
|-------|------|------------------|-------------|
| `SignedDocuments` | `repeated SignedDocument` | Required | List of documents that have been signed by the user, including version, state, and signature details |

**Important Notes:**
- This message is embedded within a User object, not used standalone
- Each entry in `SignedDocuments` represents one document that the user has signed
- A user may have multiple entries for the same document if they signed different versions

#### SignedDocument

Represents a document that has been signed by a user, including the version that was signed, the document state, timestamp, file checksum, and transaction ID for immutable record keeping.

**Use Cases:**
- Recording when a user signed a specific document version
- Tracking document compliance state per user
- Providing immutable proof of signature via transaction ID
- Verifying which version of a document was signed

**Field Table:**

| Field | Type | Required/Optional | Description |
|-------|------|------------------|-------------|
| `Name` | `string` | Required | The name of the signed document, matching the document name |
| `SignedVersion` | `string` | Required | The version of the document that was signed. This may differ from the current/latest version of the document |
| `DocumentState` | `DocumentState` | Required | The state of the document from the user's perspective (see DocumentState enum) |
| `SignedAt` | `google.protobuf.Timestamp` | Required | Timestamp when the document was signed by the user |
| `FileMD5SUM` | `string` | Required | MD5 checksum of the file that was signed, ensuring the exact file version is recorded |
| `TXID` | `string` | Required | Transaction ID of the signed document, typically from a blockchain transaction, providing immutable proof of signature |

**Important Notes:**
- The `SignedVersion` may differ from the current document version, allowing tracking of compliance with specific document versions
- The `FileMD5SUM` ensures the exact file that was signed is recorded, preventing version confusion
- The `TXID` provides an immutable record of the signature, typically stored on a blockchain
- The `SignedAt` timestamp records when the signature occurred

### Enum Definitions

#### DocumentStatus

Represents the lifecycle status of a document, tracking whether a document is in draft, active, or deprecated state.

**Use Cases:**
- Managing document publication workflow
- Determining which documents are required for users
- Filtering documents by status
- Deprecating outdated documents while maintaining historical records

**Value Table:**

| Value | Name | Description |
|-------|------|-------------|
| `0` | `NOT_USED_STATUS` | Default/unused status value. Should not be used in practice |
| `1` | `UNPUBLISHED` | Document is unpublished and in draft state. Not yet available to users |
| `2` | `ACTIVE` | Document is active and required for users. Users should sign this document if `SignatureRequired` is `true` |
| `3` | `OUTDATED` | Document is outdated and no longer required. Kept for historical reference but new signatures are not required |

**Important Notes:**
- Documents typically progress from `UNPUBLISHED` → `ACTIVE` → `OUTDATED`
- Only `ACTIVE` documents with `SignatureRequired=true` require user signatures
- `OUTDATED` documents remain in the system for historical compliance tracking

#### DocumentState

Represents the state of a document from a user compliance perspective, tracking whether a document needs to be signed, has been signed, or is display-only.

**Use Cases:**
- Tracking user compliance status per document
- Determining which documents a user still needs to sign
- Identifying display-only documents that don't require signatures
- Managing user document workflow

**Value Table:**

| Value | Name | Description |
|-------|------|-------------|
| `0` | `NOT_USED_STATE` | Default/unused state value. Should not be used in practice |
| `1` | `TO_BE_SIGNED` | Document needs to be signed by the user. User has not yet signed this document |
| `2` | `SIGNED` | Document has been signed by the user. Compliance requirement is met |
| `3` | `DISPLAY_ONLY` | Document is for display/reference only. No signature is required (corresponds to `SignatureRequired=false`) |

**Important Notes:**
- `TO_BE_SIGNED` indicates the user needs to sign the document for compliance
- `SIGNED` indicates the user has completed the signature requirement
- `DISPLAY_ONLY` is used for informational documents that don't require signatures
- This enum is used in `SignedDocument` to track the user's relationship with each document

## Key Format

Documents are identified using the following key format:
```
OrganizationID_File.MD5SUM
```

This format ensures unique identification of documents based on:
- **OrganizationID**: The organization that owns the document
- **File.MD5SUM**: The MD5 checksum of the file, ensuring version-specific identification

**Example:** `org_123_abc123def456...`

This key format prevents collisions and allows precise version tracking, as each file version will have a unique MD5 checksum.

## Usage Notes

### Document Lifecycle

Documents progress through a lifecycle managed by the `DocumentStatus` enum:

1. **UNPUBLISHED**: Documents are created in this state when they are in draft and not yet ready for users. They are not visible or required for user compliance.

2. **ACTIVE**: Documents in this state are published and available to users. If `SignatureRequired` is `true`, users must sign these documents to be compliant. Active documents are the current version that users should interact with.

3. **OUTDATED**: Documents that are no longer current but are kept for historical reference. Users who signed outdated versions remain compliant, but new users are not required to sign outdated documents.

### Signature Requirements

The `SignatureRequired` field in `DocumentDetails` determines whether a document requires user signatures:

- **`true`**: Users must sign the document for compliance. The document will appear in user compliance tracking with state `TO_BE_SIGNED` until signed.

- **`false`**: The document is for display/reference only. Users can view it but are not required to sign it. These documents typically have `DocumentState` of `DISPLAY_ONLY`.

### Versioning

The document model supports version tracking:

- **Document Version**: The `Version` field in `DocumentDetails` represents the latest/current version of the document. This is updated when document content changes.

- **Signed Version**: The `SignedVersion` field in `SignedDocument` records which version of the document was actually signed by the user. This may differ from the current version.

- **Version Tracking Use Case**: If a document is updated (version changes), users who signed the previous version remain compliant with that version. New users or users re-signing will sign the new version.

### File Integrity

File integrity is ensured through MD5 checksums:

- **File MD5SUM**: The `MD5SUM` field in `File` contains the MD5 checksum of the file content, used for integrity verification.

- **Signed File MD5SUM**: The `FileMD5SUM` field in `SignedDocument` records the exact file checksum that was signed, ensuring the precise file version is recorded.

- **Key Format**: The MD5SUM is part of the document key format, ensuring each file version is uniquely identifiable.

- **Integrity Verification**: When retrieving files, the MD5SUM can be verified against the file content to ensure it hasn't been tampered with.

### Network Agnostic Design

Documents are designed to be network-agnostic:

- **No Network Assignment**: The `MetaData.Network` field should **not** be assigned when creating or updating documents.

- **Cross-Network Compatibility**: This design allows documents to be used across different blockchain networks or systems without modification.

- **Flexible Deployment**: Documents can be deployed and used regardless of the underlying network infrastructure.

### Transaction Tracking

Signed documents include transaction tracking for immutable records:

- **TXID Field**: The `TXID` field in `SignedDocument` contains a transaction ID, typically from a blockchain transaction.

- **Immutable Proof**: This provides an immutable, verifiable record of when and how the document was signed.

- **Audit Trail**: The transaction ID can be used to verify the signature on the blockchain or transaction system, providing a complete audit trail.

## Version Correspondence

This documentation corresponds to the `document.proto` file as of the current repository state. When the proto file is updated, this documentation should be regenerated to ensure accuracy. The documentation reflects the structure, fields, and enums defined in the proto file, including all comments and constraints specified in the source file.

## Support

For additional information and resources:

- **README.md**: See the main README.md file for project overview, client usage, and build instructions
- **Client Documentation**: See `/client/README.md` for client-specific documentation
- **Build Script**: Use `./bin/build.sh` to regenerate Go and TypeScript files after proto changes

For questions or issues, please refer to the repository documentation or contact the development team.
