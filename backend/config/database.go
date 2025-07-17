package config

import (
	"github.com/jackc/pgx/v5/pgxpool"
	"context"
	"fmt"
	"log"
	"os"
	"time"
)

var DB *pgxpool.Pool

func ConnectDB() {
	dbUrl := os.Getenv("DB_URL")
	if dbUrl == "" {
		log.Fatal("DB_URL no está definida en el archivo .env")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	pool, err := pgxpool.New(ctx, dbUrl)
	if err != nil {
		log.Fatalf("No se pudo conectar a PostgreSQL: %v", err)
	}

	// Probar conexión
	err = pool.Ping(ctx)
	if err != nil {
		log.Fatalf("Ping a PostgreSQL falló: %v", err)
	}

	DB = pool
	fmt.Println("Conectado a la base de datos PostgreSQL")
}
