package dtos

import "backend/models/entities"

// AuthRequest representa una solicitud de autenticación
type AuthRequest struct {
	Correo     string `json:"correo" binding:"required,email"`
	Contrasena string `json:"contrasena" binding:"required,min=6"`
}

// RegisterRequest representa una solicitud de registro
type RegisterRequest struct {
	Correo     string `json:"correo" binding:"required,email"`
	Nombre     string `json:"nombre" binding:"required,min=2"`
	Contrasena string `json:"contrasena" binding:"required,min=6"`
}

// GoogleAuthResponse representa la respuesta de autenticación con Google
type GoogleAuthResponse struct {
	Token   string           `json:"token"`
	Usuario entities.Usuario `json:"usuario"`
	IsNew   bool             `json:"is_new_user"`
}

// RefreshTokenRequest representa una solicitud de renovación de token
type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

// PasswordResetRequest representa una solicitud de reseteo de contraseña
type PasswordResetRequest struct {
	Correo string `json:"correo" binding:"required,email"`
}

// PasswordResetConfirmRequest representa la confirmación de reseteo de contraseña
type PasswordResetConfirmRequest struct {
	Token           string `json:"token" binding:"required"`
	NuevaContrasena string `json:"nueva_contrasena" binding:"required,min=6"`
}
