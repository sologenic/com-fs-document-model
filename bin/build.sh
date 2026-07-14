#!/bin/bash
set -e

mkdir -p dependencies/buf/validate
curl https://raw.githubusercontent.com/bufbuild/protovalidate/refs/heads/main/proto/protovalidate/buf/validate/validate.proto > dependencies/buf/validate/validate.proto

# move to the root dir of the package
rd=$(git rev-parse --show-toplevel)

# Handle dependencies
lib_dirs=(
    "../com-fs-utils-lib"
)

# Function to fetch and checkout appropriate branch
checkout_lib_branch() {
    # Fetch latest remote branches
    git fetch origin
    
    # Check if staging branch exists in remote
    if git ls-remote --heads origin staging | grep -q staging; then
        echo "Switching to staging branch..."
        git checkout staging 2>/dev/null || git checkout -b staging origin/staging
    else
        echo "Staging branch not found, switching to main branch..."
        git checkout main 2>/dev/null || git checkout -b main origin/main
    fi
}

for lib_dir in "${lib_dirs[@]}"; do
    # Extract directory name from path (e.g., "../com-fs-utils-lib" -> "com-fs-utils-lib")
    lib_name=$(basename "$lib_dir")
    lib_repo="git@github.com:sologenic/${lib_name}.git"
    
    if [ -d "$lib_dir" ] && [ -d "$lib_dir/.git" ]; then
        echo "Updating ${lib_name} repository..."
        cd "$lib_dir"
        checkout_lib_branch
        # Pull latest changes
        git pull
        # Return to original directory
        cd "$rd"
    elif [ ! -d "$lib_dir" ]; then
        echo "${lib_name} repository not found. Cloning..."
        parent_dir=$(dirname "$rd")
        cd "$parent_dir"
        git clone "$lib_repo" "$lib_name"
        cd "$lib_name"
        checkout_lib_branch
        # Return to original directory
        cd "$rd"
    else
        echo "Warning: ${lib_name} directory exists but is not a git repository at $lib_dir"
    fi
done
cd $rd

proto_parent=$(dirname "$(dirname "$rd")")
PROTO_PATH_ARGS=(
  --proto_path=.
  --proto_path="$proto_parent"
  --proto_path="$rd/dependencies"
)

protoc "${PROTO_PATH_ARGS[@]}" "document.proto" \
    "--go_out=." --go_opt=paths=source_relative \
    --go-grpc_opt=require_unimplemented_servers=false \
    "--go-grpc_out=." --go-grpc_opt=paths=source_relative

protoc "${PROTO_PATH_ARGS[@]}" "document-grpc.proto" \
    "--go_out=." --go_opt=paths=source_relative \
    --go-grpc_opt=require_unimplemented_servers=false \
    "--go-grpc_out=." --go-grpc_opt=paths=source_relative

# if there's TS project in the package, generate a protobuf file for TS
rm -rf node_modules
npm i

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    "${PROTO_PATH_ARGS[@]}" \
    --ts_proto_out=. \
    --ts_proto_opt=esModuleInterop=true \
    document.proto

npm run build
git add build/

git add *.ts
rm -rf node_modules
