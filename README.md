# Projekt dzięki któremu zajęliśmy 1 miejsce (eng version below)

# Uruchomienie projektu

## Baza danych

- W głównym katalogu znajduje się plik 'docker-compose.yml', który zawiera konfigurację obrazu do uruchomienia bazy danych
- W celu uruchomienia bazy danych należy uruchomić komendę `docker-compose up -d`
- Baza danych będzie dostępna pod adresem `http://localhost:5432`
- Po utworzeniu obrazu należy wykonać migracje, w tym celu należy uruchomić komendę `npm run migrate` w katalogu `backend`
- W celu usunięcia bazy danych należy uruchomić komendę `docker-compose down`

## Backend

- W katalogu `backend` uruchom komendę `npm install` aby zainstalować wszystkie zależności
- Następnie uruchom komendę `npm start` aby uruchomić serwer
- Serwer będzie dostępny pod adresem `http://localhost:8000`
- Dokumentacja API dostępna jest pod adresem `http://localhost:8000/api`
- W pliku `backend/.env` znajdują się zmienne środowiskowe, które można zmienić. Wrzucone na repo dla naszej wygody, w normalnych warunkach nie wrzucalibyśmy ich na repo.

## Frontend

- W katalogu `frontend` uruchom komendę `npm install` aby zainstalować wszystkie zależności
- Następnie uruchom komendę `npm start` aby uruchomić aplikację
- Aplikacja będzie dostępna pod adresem `http://localhost:3000`

## Autorzy

- Klaudiusz Biegacz - klaudiusz.biegacz@gmail.com
- Marek Dzwonnik - mardzw7@gmail.com
- Krzysztof Pańtak - krzysztofpantak@gmail.com

## Działanie aplikacji

- Domyślnie generowani są 3 użytkownicy:
  - login: `admin`, hasło: `Test123$`
  - login: `master`, hasło: `Test123$`
  - login: `user`, hasło: `Test123$`
- Każdy nowy użytkownik ma przypisaną rolę `user`
- Admin ma dostęp do dashboardu, gdzie może usuwać użytkowników oraz zmieniać role użytkownikom
- Master ma dostęp do dashboardu, gdzie może wyświetlać wszystkie swoje utworzone gry oraz dodawać nowe
- User ma dostęp do dashboardu, gdzie może wyświetlać wszystkie gry utworzone przez mastera

# Project: 1st Place Winner

# Project Setup

## Database

    The docker-compose.yml file in the main directory contains the configuration for starting the database container.
    To start the database, run the command docker-compose up -d.
    The database will be accessible at http://localhost:5432.
    After creating the container, run the migrations by executing the command npm run migrate in the backend directory.
    To stop the database, run the command docker-compose down.

## Backend

    In the backend directory, run the command npm install to install all dependencies.
    Then, run the command npm start to start the server.
    The server will be accessible at http://localhost:8000.
    API documentation is available at http://localhost:8000/api.
    The backend/.env file contains environment variables that can be modified. These are included in the repo for our convenience, but would not normally be included in a repo.

## Frontend

    In the frontend directory, run the command npm install to install all dependencies.
    Then, run the command npm start to start the application.
    The application will be accessible at http://localhost:3000.

## Authors

    Klaudiusz Biegacz - klaudiusz.biegacz@gmail.com
    Marek Dzwonnik - mardzw7@gmail.com
    Krzysztof Pańtak - krzysztofpantak@gmail.com

## Application Functionality

    By default, 3 users are generated:
        Login: admin, password: Test123$
        Login: master, password: Test123$
        Login: user, password: Test123$
    Each new user is assigned the role user.
    The admin has access to the dashboard, where they can delete users and change user roles.
    The master has access to the dashboard, where they can view all their created games and add new ones.
    The user has access to the dashboard, where they can view all games created by the master.
