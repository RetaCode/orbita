package models

type Usuario struct {
	ID           int    `json:"id"`
	Correo       string `json:"correo"`
	Nombre       string `json:"nombre"`
	Contrasena   string `json:"contrasena"`
	Apodo1       string `json:"apodo1"`
	Apodo2       string `json:"apodo2"`
	Preferencias string `json:"preferencias"`
	EstadoAnimo  string `json:"estado_animo"`
	CreadoEn     string `json:"creado_en"`
}
