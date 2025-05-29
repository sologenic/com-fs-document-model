/*
The user_store middleware package provides:
- Initialization of the user_store service client

The config:
- Parses the config as provided to the app
- Can only parse the config parts relevant to this middleware
- Depends on providing the config as environment variables so that init() can run independent per component and no coordination is required

Service fails (with panic) to initialize if the environment variable is not set.
*/
package user

import (
	"context"

	grpcdef "github.com/sologenic/com-fs-document-model"
	grpcclient "github.com/sologenic/com-fs-utils-lib/go/grpc-client"
)

const (
	endpoint = "DOCUMENT_STORE"
)

var (
	client     grpcdef.DocumentServiceClient
	grpcClient *grpcclient.GRPCClient
)

/*
Initialize the client.
Depending on the parameter, the environment is determined to be either in cluster of local by:
localhost:port => local
localhost => No port is not local
*/
func initClient() {
	grpcClient = grpcclient.InitClient(endpoint)
	client = grpcdef.NewDocumentServiceClient(grpcClient.Conn)
}

func Client() grpcdef.DocumentServiceClient {
	if client == nil {
		initClient()
	}
	return client
}

func AuthCtx(ctx context.Context) context.Context {
	if grpcClient == nil {
		initClient()
	}
	return grpcClient.AuthCtx(ctx)
}
