package dtos

// ApiResponse representa una respuesta estándar de la API
type ApiResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Error   *ApiError   `json:"error,omitempty"`
}

// ApiError representa un error de la API
type ApiError struct {
	Code    string                 `json:"code"`
	Message string                 `json:"message"`
	Details map[string]interface{} `json:"details,omitempty"`
}

// PaginationRequest representa los parámetros de paginación
type PaginationRequest struct {
	Page     int    `form:"page" binding:"min=1"`
	Limit    int    `form:"limit" binding:"min=1,max=100"`
	OrderBy  string `form:"order_by"`
	OrderDir string `form:"order_dir" binding:"oneof=asc desc"`
}

// PaginationResponse representa la metadata de paginación
type PaginationResponse struct {
	CurrentPage int  `json:"current_page"`
	PerPage     int  `json:"per_page"`
	Total       int  `json:"total"`
	TotalPages  int  `json:"total_pages"`
	HasNext     bool `json:"has_next"`
	HasPrev     bool `json:"has_prev"`
}

// ListResponse representa una respuesta de lista con paginación
type ListResponse struct {
	Items      interface{}        `json:"items"`
	Pagination PaginationResponse `json:"pagination"`
}

// HealthCheckResponse representa el estado de salud del sistema
type HealthCheckResponse struct {
	Status    string            `json:"status"`
	Version   string            `json:"version"`
	Timestamp string            `json:"timestamp"`
	Services  map[string]string `json:"services"`
}

// ValidationError representa errores de validación
type ValidationError struct {
	Field   string      `json:"field"`
	Message string      `json:"message"`
	Value   interface{} `json:"value"`
}

// ValidationErrorResponse representa una respuesta con errores de validación
type ValidationErrorResponse struct {
	ApiResponse
	ValidationErrors []ValidationError `json:"validation_errors"`
}
