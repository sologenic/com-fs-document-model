package client

import (
	"context"
	"sync"

	grpcdef "github.com/sologenic/com-fs-document-model"
	grpcclient "github.com/sologenic/com-fs-utils-internal-lib/go/grpc-client"
)

const endpoint = "DOCUMENT_STORE"

var client grpcdef.DocumentServiceClient
var grpcClient *grpcclient.GRPCClient
var once sync.Once

/*
Initialize the client.
Depending on the parameter, the environment is determined to be either in cluster of local by:
localhost:port => local
localhost => No port is not local
*/
func initClient() {
	grpcClient = grpcclient.InitClient(endpoint)
	cl := grpcdef.NewDocumentServiceClient(grpcClient.Conn)
	client = cl
}

func Client() grpcdef.DocumentServiceClient {
	once.Do(initClient)
	return client
}

func AuthCtx(ctx context.Context) context.Context {
	once.Do(initClient)
	return grpcClient.AuthCtx(ctx)
}
