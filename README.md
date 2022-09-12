#the Api's

## How it works?

It's a mix of two different API (free) which provides Location by IP: https://app.ipgeolocation.io/ and Maps:https://developer.tomtom.com/ , both are free with limited requests. Please make it sure you don't abuse to search stuff 😅

## Packages:

- For icons material
- Tailwindcss
- Vite ReactJS env
- tomtom.com

## Cool things:

- Implementation of free API didn't attached logic for url, the regExp check valid IPv4 otherwise return the error message as required or general compnent Boundary with the reloadPage

- If the session is reload, the API resset status. (Also as in required)
- App avopid to use Redux which is also possible but not neccesary. Instead is allocated in LocalStorage
- It tooks me 2 days develop checking also documentations around 10 different api's
