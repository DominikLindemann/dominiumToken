# docker buildx ls
docker buildx create --name testbuilder --platform linux/arm/v7
docker buildx inspect --bootstrap
docker buildx build -t doli/dominiumtoken --platform=linux/arm/v7 -o type=docker,dest=e:\dominiumtoken_arm.tar .
# docker buildx build -t doli/dominiumtoken -o type=docker,dest=e:\dominiumtoken_arm.tar .
docker buildx rm testbuilder
