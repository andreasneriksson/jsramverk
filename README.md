[GitHub repo](https://github.com/andreasneriksson/jsramverk)

## Installera npm moduler

npm install

## Bygg prod

npm run build

## Starta applikationen

serve -s build






## Min installation

Detta projekt var "bootstrapped" med [Create React App](https://github.com/facebook/create-react-app).

Utöver det har jag installerat react-router-dom och react-markdown med nedan kommandon:

$ npm install --save react-router-dom


$ npm install --save react-markdown


## Tillgängliga Script

I projektkatalogen kan du köra:

### `npm start`

Kör appen i acceptans/utvecklings miljö.

Öppna [http://localhost:3000](http://localhost:3000) för att se den i din browser.

Sidan laddar om när du projektet sparas och man får se "lint errors" i konsolen.

### `npm test`

Startar test i interaktivt läge. (ej använt i detta kmom men adderas per automatik med "Create React App")

### `npm run build`

Skapar produktions miljön för appen, den "riktiga" miljön.

### `npm run eject`

(ej använt i detta kmom men adderas per automatik med "Create React App")

Men om jag förstår det rätt så kan man med denna "ejecta" byggverktygen och config så att de istället ligger direkt i projektet.



