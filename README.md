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
- Admin ma dostęp do dashboardu, gdzie może usuwać oraz zmieniać role użytkownikom
- Masteruser ma dostęp do dashboardu, gdzie może wyświetlać wszystkie swoje utworzone gry oraz dodawać nowe
- User ma dostęp do dashboardu, gdzie może wyświetlać wszystkie gry utworzone przez masterusera
