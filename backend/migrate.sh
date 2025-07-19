#!/bin/bash

# Script para ejecutar migraciones de la base de datos
# Este script se conecta a PostgreSQL y ejecuta las migraciones

DB_HOST="localhost"
DB_PORT="5434"
DB_NAME="orbita_db"
DB_USER="user"
DB_PASSWORD="password"

echo "Ejecutando migraciones de la base de datos..."

# Ejecutar migraciones
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f migrations/001_create_tables.sql

if [ $? -eq 0 ]; then
    echo "✅ Migraciones ejecutadas exitosamente"
else
    echo "❌ Error ejecutando migraciones"
    exit 1
fi
