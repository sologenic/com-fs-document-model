import _m0 from "protobufjs/minimal";
import { Audit } from "./sologenic/com-fs-utils-lib/models/audit/audit";
import { MetaData } from "./sologenic/com-fs-utils-lib/models/metadata/metadata";
export declare const protobufPackage = "document";
export declare enum DocumentType {
    NOT_USED_TYPE = 0,
    PRIVACY = 1,
    REGULATORY = 2,
    INFORMATION = 3,
    MARGIN = 4,
    SHORT = 5,
    UNRECOGNIZED = -1
}
export declare function documentTypeFromJSON(object: any): DocumentType;
export declare function documentTypeToJSON(object: DocumentType): string;
export declare enum DocumentState {
    NOT_USED_STATE = 0,
    TO_BE_SIGNED = 1,
    SIGNED = 2,
    DISPLAY_ONLY = 3,
    UNRECOGNIZED = -1
}
export declare function documentStateFromJSON(object: any): DocumentState;
export declare function documentStateToJSON(object: DocumentState): string;
export interface Document {
    Document: DocumentDetails | undefined;
    /** Network is not to be assigned (documents are network agnostic) */
    MetaData: MetaData | undefined;
    Audit: Audit | undefined;
}
export interface DocumentDetails {
    /** uuid */
    DocumentID: string;
    OrganizationID: string;
    DocumentType: DocumentType;
    /** Latest version of the document */
    Version: string;
    File: File | undefined;
    SignatureRequired: boolean;
    IsActive: boolean;
}
export interface File {
    /** The reference to the file */
    Reference: string;
    Extension: string;
    /** User defined name of the file, used as a "description" and not to reference the file */
    Name?: string | undefined;
}
export interface Documents {
    Documents: Document[];
    Offset: number;
}
/** UserDocumentCompliance is embedded in User object to track user document compliance */
export interface UserDocumentCompliance {
    SignedDocuments: SignedDocument[];
    ComplianceCheckedAt: Date | undefined;
    /** Flag indicating if user needs to sign documents */
    SigningRequired: boolean;
}
export interface SignedDocument {
    DocumentID: string;
    /** The version of the document that was signed. This may differ from the current/latest version. */
    SignedVersion: string;
    DocumentState: DocumentState;
    SignedAt: Date | undefined;
}
export declare const Document: {
    encode(message: Document, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Document;
    fromJSON(object: any): Document;
    toJSON(message: Document): unknown;
    create<I extends {
        Document?: {
            DocumentID?: string | undefined;
            OrganizationID?: string | undefined;
            DocumentType?: DocumentType | undefined;
            Version?: string | undefined;
            File?: {
                Reference?: string | undefined;
                Extension?: string | undefined;
                Name?: string | undefined;
            } | undefined;
            SignatureRequired?: boolean | undefined;
            IsActive?: boolean | undefined;
        } | undefined;
        MetaData?: {
            Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
            UpdatedAt?: Date | undefined;
            CreatedAt?: Date | undefined;
            UpdatedByAccount?: string | undefined;
        } | undefined;
        Audit?: {
            ChangedBy?: string | undefined;
            ChangedAt?: Date | undefined;
            Reason?: string | undefined;
        } | undefined;
    } & {
        Document?: ({
            DocumentID?: string | undefined;
            OrganizationID?: string | undefined;
            DocumentType?: DocumentType | undefined;
            Version?: string | undefined;
            File?: {
                Reference?: string | undefined;
                Extension?: string | undefined;
                Name?: string | undefined;
            } | undefined;
            SignatureRequired?: boolean | undefined;
            IsActive?: boolean | undefined;
        } & {
            DocumentID?: string | undefined;
            OrganizationID?: string | undefined;
            DocumentType?: DocumentType | undefined;
            Version?: string | undefined;
            File?: ({
                Reference?: string | undefined;
                Extension?: string | undefined;
                Name?: string | undefined;
            } & {
                Reference?: string | undefined;
                Extension?: string | undefined;
                Name?: string | undefined;
            } & { [K in Exclude<keyof I["Document"]["File"], keyof File>]: never; }) | undefined;
            SignatureRequired?: boolean | undefined;
            IsActive?: boolean | undefined;
        } & { [K_1 in Exclude<keyof I["Document"], keyof DocumentDetails>]: never; }) | undefined;
        MetaData?: ({
            Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
            UpdatedAt?: Date | undefined;
            CreatedAt?: Date | undefined;
            UpdatedByAccount?: string | undefined;
        } & {
            Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
            UpdatedAt?: Date | undefined;
            CreatedAt?: Date | undefined;
            UpdatedByAccount?: string | undefined;
        } & { [K_2 in Exclude<keyof I["MetaData"], keyof MetaData>]: never; }) | undefined;
        Audit?: ({
            ChangedBy?: string | undefined;
            ChangedAt?: Date | undefined;
            Reason?: string | undefined;
        } & {
            ChangedBy?: string | undefined;
            ChangedAt?: Date | undefined;
            Reason?: string | undefined;
        } & { [K_3 in Exclude<keyof I["Audit"], keyof Audit>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof Document>]: never; }>(base?: I | undefined): Document;
    fromPartial<I_1 extends {
        Document?: {
            DocumentID?: string | undefined;
            OrganizationID?: string | undefined;
            DocumentType?: DocumentType | undefined;
            Version?: string | undefined;
            File?: {
                Reference?: string | undefined;
                Extension?: string | undefined;
                Name?: string | undefined;
            } | undefined;
            SignatureRequired?: boolean | undefined;
            IsActive?: boolean | undefined;
        } | undefined;
        MetaData?: {
            Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
            UpdatedAt?: Date | undefined;
            CreatedAt?: Date | undefined;
            UpdatedByAccount?: string | undefined;
        } | undefined;
        Audit?: {
            ChangedBy?: string | undefined;
            ChangedAt?: Date | undefined;
            Reason?: string | undefined;
        } | undefined;
    } & {
        Document?: ({
            DocumentID?: string | undefined;
            OrganizationID?: string | undefined;
            DocumentType?: DocumentType | undefined;
            Version?: string | undefined;
            File?: {
                Reference?: string | undefined;
                Extension?: string | undefined;
                Name?: string | undefined;
            } | undefined;
            SignatureRequired?: boolean | undefined;
            IsActive?: boolean | undefined;
        } & {
            DocumentID?: string | undefined;
            OrganizationID?: string | undefined;
            DocumentType?: DocumentType | undefined;
            Version?: string | undefined;
            File?: ({
                Reference?: string | undefined;
                Extension?: string | undefined;
                Name?: string | undefined;
            } & {
                Reference?: string | undefined;
                Extension?: string | undefined;
                Name?: string | undefined;
            } & { [K_5 in Exclude<keyof I_1["Document"]["File"], keyof File>]: never; }) | undefined;
            SignatureRequired?: boolean | undefined;
            IsActive?: boolean | undefined;
        } & { [K_6 in Exclude<keyof I_1["Document"], keyof DocumentDetails>]: never; }) | undefined;
        MetaData?: ({
            Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
            UpdatedAt?: Date | undefined;
            CreatedAt?: Date | undefined;
            UpdatedByAccount?: string | undefined;
        } & {
            Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
            UpdatedAt?: Date | undefined;
            CreatedAt?: Date | undefined;
            UpdatedByAccount?: string | undefined;
        } & { [K_7 in Exclude<keyof I_1["MetaData"], keyof MetaData>]: never; }) | undefined;
        Audit?: ({
            ChangedBy?: string | undefined;
            ChangedAt?: Date | undefined;
            Reason?: string | undefined;
        } & {
            ChangedBy?: string | undefined;
            ChangedAt?: Date | undefined;
            Reason?: string | undefined;
        } & { [K_8 in Exclude<keyof I_1["Audit"], keyof Audit>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof Document>]: never; }>(object: I_1): Document;
};
export declare const DocumentDetails: {
    encode(message: DocumentDetails, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DocumentDetails;
    fromJSON(object: any): DocumentDetails;
    toJSON(message: DocumentDetails): unknown;
    create<I extends {
        DocumentID?: string | undefined;
        OrganizationID?: string | undefined;
        DocumentType?: DocumentType | undefined;
        Version?: string | undefined;
        File?: {
            Reference?: string | undefined;
            Extension?: string | undefined;
            Name?: string | undefined;
        } | undefined;
        SignatureRequired?: boolean | undefined;
        IsActive?: boolean | undefined;
    } & {
        DocumentID?: string | undefined;
        OrganizationID?: string | undefined;
        DocumentType?: DocumentType | undefined;
        Version?: string | undefined;
        File?: ({
            Reference?: string | undefined;
            Extension?: string | undefined;
            Name?: string | undefined;
        } & {
            Reference?: string | undefined;
            Extension?: string | undefined;
            Name?: string | undefined;
        } & { [K in Exclude<keyof I["File"], keyof File>]: never; }) | undefined;
        SignatureRequired?: boolean | undefined;
        IsActive?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I, keyof DocumentDetails>]: never; }>(base?: I | undefined): DocumentDetails;
    fromPartial<I_1 extends {
        DocumentID?: string | undefined;
        OrganizationID?: string | undefined;
        DocumentType?: DocumentType | undefined;
        Version?: string | undefined;
        File?: {
            Reference?: string | undefined;
            Extension?: string | undefined;
            Name?: string | undefined;
        } | undefined;
        SignatureRequired?: boolean | undefined;
        IsActive?: boolean | undefined;
    } & {
        DocumentID?: string | undefined;
        OrganizationID?: string | undefined;
        DocumentType?: DocumentType | undefined;
        Version?: string | undefined;
        File?: ({
            Reference?: string | undefined;
            Extension?: string | undefined;
            Name?: string | undefined;
        } & {
            Reference?: string | undefined;
            Extension?: string | undefined;
            Name?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["File"], keyof File>]: never; }) | undefined;
        SignatureRequired?: boolean | undefined;
        IsActive?: boolean | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof DocumentDetails>]: never; }>(object: I_1): DocumentDetails;
};
export declare const File: {
    encode(message: File, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): File;
    fromJSON(object: any): File;
    toJSON(message: File): unknown;
    create<I extends {
        Reference?: string | undefined;
        Extension?: string | undefined;
        Name?: string | undefined;
    } & {
        Reference?: string | undefined;
        Extension?: string | undefined;
        Name?: string | undefined;
    } & { [K in Exclude<keyof I, keyof File>]: never; }>(base?: I | undefined): File;
    fromPartial<I_1 extends {
        Reference?: string | undefined;
        Extension?: string | undefined;
        Name?: string | undefined;
    } & {
        Reference?: string | undefined;
        Extension?: string | undefined;
        Name?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof File>]: never; }>(object: I_1): File;
};
export declare const Documents: {
    encode(message: Documents, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Documents;
    fromJSON(object: any): Documents;
    toJSON(message: Documents): unknown;
    create<I extends {
        Documents?: {
            Document?: {
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } | undefined;
            MetaData?: {
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } | undefined;
            Audit?: {
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } | undefined;
        }[] | undefined;
        Offset?: number | undefined;
    } & {
        Documents?: ({
            Document?: {
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } | undefined;
            MetaData?: {
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } | undefined;
            Audit?: {
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } | undefined;
        }[] & ({
            Document?: {
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } | undefined;
            MetaData?: {
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } | undefined;
            Audit?: {
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } | undefined;
        } & {
            Document?: ({
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } & {
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: ({
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } & {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } & { [K in Exclude<keyof I["Documents"][number]["Document"]["File"], keyof File>]: never; }) | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } & { [K_1 in Exclude<keyof I["Documents"][number]["Document"], keyof DocumentDetails>]: never; }) | undefined;
            MetaData?: ({
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } & {
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } & { [K_2 in Exclude<keyof I["Documents"][number]["MetaData"], keyof MetaData>]: never; }) | undefined;
            Audit?: ({
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } & {
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } & { [K_3 in Exclude<keyof I["Documents"][number]["Audit"], keyof Audit>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["Documents"][number], keyof Document>]: never; })[] & { [K_5 in Exclude<keyof I["Documents"], keyof {
            Document?: {
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } | undefined;
            MetaData?: {
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } | undefined;
            Audit?: {
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        Offset?: number | undefined;
    } & { [K_6 in Exclude<keyof I, keyof Documents>]: never; }>(base?: I | undefined): Documents;
    fromPartial<I_1 extends {
        Documents?: {
            Document?: {
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } | undefined;
            MetaData?: {
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } | undefined;
            Audit?: {
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } | undefined;
        }[] | undefined;
        Offset?: number | undefined;
    } & {
        Documents?: ({
            Document?: {
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } | undefined;
            MetaData?: {
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } | undefined;
            Audit?: {
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } | undefined;
        }[] & ({
            Document?: {
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } | undefined;
            MetaData?: {
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } | undefined;
            Audit?: {
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } | undefined;
        } & {
            Document?: ({
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } & {
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: ({
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } & {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } & { [K_7 in Exclude<keyof I_1["Documents"][number]["Document"]["File"], keyof File>]: never; }) | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } & { [K_8 in Exclude<keyof I_1["Documents"][number]["Document"], keyof DocumentDetails>]: never; }) | undefined;
            MetaData?: ({
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } & {
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } & { [K_9 in Exclude<keyof I_1["Documents"][number]["MetaData"], keyof MetaData>]: never; }) | undefined;
            Audit?: ({
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } & {
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } & { [K_10 in Exclude<keyof I_1["Documents"][number]["Audit"], keyof Audit>]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I_1["Documents"][number], keyof Document>]: never; })[] & { [K_12 in Exclude<keyof I_1["Documents"], keyof {
            Document?: {
                DocumentID?: string | undefined;
                OrganizationID?: string | undefined;
                DocumentType?: DocumentType | undefined;
                Version?: string | undefined;
                File?: {
                    Reference?: string | undefined;
                    Extension?: string | undefined;
                    Name?: string | undefined;
                } | undefined;
                SignatureRequired?: boolean | undefined;
                IsActive?: boolean | undefined;
            } | undefined;
            MetaData?: {
                Network?: import("./sologenic/com-fs-utils-lib/models/metadata/metadata").Network | undefined;
                UpdatedAt?: Date | undefined;
                CreatedAt?: Date | undefined;
                UpdatedByAccount?: string | undefined;
            } | undefined;
            Audit?: {
                ChangedBy?: string | undefined;
                ChangedAt?: Date | undefined;
                Reason?: string | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        Offset?: number | undefined;
    } & { [K_13 in Exclude<keyof I_1, keyof Documents>]: never; }>(object: I_1): Documents;
};
export declare const UserDocumentCompliance: {
    encode(message: UserDocumentCompliance, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UserDocumentCompliance;
    fromJSON(object: any): UserDocumentCompliance;
    toJSON(message: UserDocumentCompliance): unknown;
    create<I extends {
        SignedDocuments?: {
            DocumentID?: string | undefined;
            SignedVersion?: string | undefined;
            DocumentState?: DocumentState | undefined;
            SignedAt?: Date | undefined;
        }[] | undefined;
        ComplianceCheckedAt?: Date | undefined;
        SigningRequired?: boolean | undefined;
    } & {
        SignedDocuments?: ({
            DocumentID?: string | undefined;
            SignedVersion?: string | undefined;
            DocumentState?: DocumentState | undefined;
            SignedAt?: Date | undefined;
        }[] & ({
            DocumentID?: string | undefined;
            SignedVersion?: string | undefined;
            DocumentState?: DocumentState | undefined;
            SignedAt?: Date | undefined;
        } & {
            DocumentID?: string | undefined;
            SignedVersion?: string | undefined;
            DocumentState?: DocumentState | undefined;
            SignedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["SignedDocuments"][number], keyof SignedDocument>]: never; })[] & { [K_1 in Exclude<keyof I["SignedDocuments"], keyof {
            DocumentID?: string | undefined;
            SignedVersion?: string | undefined;
            DocumentState?: DocumentState | undefined;
            SignedAt?: Date | undefined;
        }[]>]: never; }) | undefined;
        ComplianceCheckedAt?: Date | undefined;
        SigningRequired?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, keyof UserDocumentCompliance>]: never; }>(base?: I | undefined): UserDocumentCompliance;
    fromPartial<I_1 extends {
        SignedDocuments?: {
            DocumentID?: string | undefined;
            SignedVersion?: string | undefined;
            DocumentState?: DocumentState | undefined;
            SignedAt?: Date | undefined;
        }[] | undefined;
        ComplianceCheckedAt?: Date | undefined;
        SigningRequired?: boolean | undefined;
    } & {
        SignedDocuments?: ({
            DocumentID?: string | undefined;
            SignedVersion?: string | undefined;
            DocumentState?: DocumentState | undefined;
            SignedAt?: Date | undefined;
        }[] & ({
            DocumentID?: string | undefined;
            SignedVersion?: string | undefined;
            DocumentState?: DocumentState | undefined;
            SignedAt?: Date | undefined;
        } & {
            DocumentID?: string | undefined;
            SignedVersion?: string | undefined;
            DocumentState?: DocumentState | undefined;
            SignedAt?: Date | undefined;
        } & { [K_3 in Exclude<keyof I_1["SignedDocuments"][number], keyof SignedDocument>]: never; })[] & { [K_4 in Exclude<keyof I_1["SignedDocuments"], keyof {
            DocumentID?: string | undefined;
            SignedVersion?: string | undefined;
            DocumentState?: DocumentState | undefined;
            SignedAt?: Date | undefined;
        }[]>]: never; }) | undefined;
        ComplianceCheckedAt?: Date | undefined;
        SigningRequired?: boolean | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof UserDocumentCompliance>]: never; }>(object: I_1): UserDocumentCompliance;
};
export declare const SignedDocument: {
    encode(message: SignedDocument, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignedDocument;
    fromJSON(object: any): SignedDocument;
    toJSON(message: SignedDocument): unknown;
    create<I extends {
        DocumentID?: string | undefined;
        SignedVersion?: string | undefined;
        DocumentState?: DocumentState | undefined;
        SignedAt?: Date | undefined;
    } & {
        DocumentID?: string | undefined;
        SignedVersion?: string | undefined;
        DocumentState?: DocumentState | undefined;
        SignedAt?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof SignedDocument>]: never; }>(base?: I | undefined): SignedDocument;
    fromPartial<I_1 extends {
        DocumentID?: string | undefined;
        SignedVersion?: string | undefined;
        DocumentState?: DocumentState | undefined;
        SignedAt?: Date | undefined;
    } & {
        DocumentID?: string | undefined;
        SignedVersion?: string | undefined;
        DocumentState?: DocumentState | undefined;
        SignedAt?: Date | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SignedDocument>]: never; }>(object: I_1): SignedDocument;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
