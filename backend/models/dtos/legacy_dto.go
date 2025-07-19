package dtos

import "backend/models/entities"

// DTOs legacy para compatibilidad con código existente
type GoogleAuthRequest struct {
	Code  string `json:"code" binding:"required"`
	State string `json:"state"`
}

type AuthResponse struct {
	Token   string           `json:"token"`
	Usuario entities.Usuario `json:"usuario"`
}
