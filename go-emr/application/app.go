package application

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"rupamkairi/emr/application/services"
)

type App struct {
	router http.Handler
}

func New() *App {
	app := &App{
		router: services.InitRouter(),
	}

	services.InitDatabase()

	return app
}

func (a *App) GetApp() *App {
	return a
}

func (a *App) Start(ctx context.Context) error {
	server := &http.Server{
		Addr:    "localhost:10000",
		Handler: a.router,
	}

	log.Println("Starting Server")
	err := server.ListenAndServe()
	if err != nil {
		return fmt.Errorf("failed %w", err)
	}

	return nil
}
