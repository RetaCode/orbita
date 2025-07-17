package utils

import (
	"fmt"
	"net/smtp"
	"os"
)

func EnviarCorreo(destinatario, asunto, cuerpo string) error {
	remitente := os.Getenv("EMAIL_SENDER")
	contrasena := os.Getenv("EMAIL_PASSWORD")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")

	// Mensaje completo con asunto y cuerpo
	mensaje := fmt.Sprintf("From: %s\nTo: %s\nSubject: %s\n\n%s",
		remitente, destinatario, asunto, cuerpo)

	// Autenticación SMTP
	auth := smtp.PlainAuth("", remitente, contrasena, smtpHost)

	// Enviar correo
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, remitente,
		[]string{destinatario}, []byte(mensaje))

	return err
}
