package domain

import (
	"fmt"

	docgrpc "github.com/sologenic/com-fs-document-model"
)

func KeyStr(doc *docgrpc.Document) string {
	return fmt.Sprintf("%s_%s", doc.Document.OrganizationID, doc.Document.File.MD5SUM)
}
