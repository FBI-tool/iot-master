
:: 1 ����protoc https://github.com/google/protobuf/releases
:: 2 ��ȡ������
:: go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
:: go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

:: 3 ����protoc --go_out=. *.proto

cd ..

protoc  --go_out=plugins=grpc:. plugin/*.proto

pause