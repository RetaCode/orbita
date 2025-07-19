# Usa la imagen base de Golang
FROM golang:1.24.5-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de módulos de Go y descarga las dependencias
COPY go.mod go.sum ./
RUN go mod download

# Copia el resto del código fuente de la aplicación
COPY . .

# Compila la aplicación de Go
RUN go build -o main .

# Expone el puerto en el que corre la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["./main"]
