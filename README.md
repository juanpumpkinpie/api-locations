#the Api's
<img width="1075" alt="Screenshot 2022-09-13 at 09 25 58" src="https://user-images.githubusercontent.com/14529200/189837876-65f0c0b5-052c-4245-bae6-d3f64de264c1.png">



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
