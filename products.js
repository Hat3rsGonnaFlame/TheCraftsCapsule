const candles_data = [
    {
        id:"1",
        name:"You Should Run",
        Image:"pictures/You_Should_Run.JPG",
        video:"",
        price:"PHP150",
        description:"",
        scent:"",
        wax:"bee",
        burnTime:"5 hours"
    },
    {
        id:"2",
        name:"Citrus Cocktail",
        Image:"pictures/citrus_cocktail.JPG",
        video:"",
        price:"PHP200",
        description:"",
        scent:"Citrus",
        wax:"soy",
        burnTime:"3 hours"

    },
    {
        id:"3",
        name:"Lemon Pound Cake",
        Image:"pictures/lemon_pound_cake.JPG",
        video:"",
        price:"PHP150",
        description:"",
        scent:"Lemon",
        wax:"natural soy",
        burnTime:"2 days"
    },
    {
        id:"4",
        name:"Rainwater",
        Image:"pictures/rainwater.JPG",
        video:"",
        price:"PHP500",
        description:"",
        scent:"Rain",
        wax:"bee",
        burnTime:"6 hours"
    },
    {
        id:"5",
        name:"Sakura",
        Image:"pictures/sakura.JPG",
        video:"",
        price:"PHP134",
        description:"",
        scent:"Sakura",
        wax:"soy",
        burnTime:"2 hours"
    },
    {
        id:"6",
        name:"Sandalwood",
        Image:"pictures/sandalwood.JPG",
        video:"",
        price:"PHP999",
        description:"",
        scent:"Sandalwood",
        wax:"bee",
        burnTime:"7 hours"
    },
    {
        id:"7",
        name:"Watch This",
        Image:"pictures/watch_this.JPG",
        video:"",
        price:"PHP1500",
        description:"",
        scent:"Watch this",
        wax:"soy",
        burnTime:"24 hours"
    }
];



// Dieser Code wird automatisch ausgeführt, sobald die Seite fertig geladen ist
document.addEventListener("DOMContentLoaded", () => {
    
    // Prüfen, ob wir uns auf der Startseite befinden (gibt es den Container dort?)
    const productContainer = document.getElementById("product-container");
    
    if (productContainer) {
        // WICHTIG: Dieser Code läuft NUR auf der index.html!
        load_index(); 
    }
    
    // Falls du auf der Detailseite bist, kannst du hier prüfen:
    const detailContainer = document.getElementById("product-detail-container");
    if (detailContainer) {
        // WICHTIG: Dieser Code läuft NUR auf der detail.html!
        console.log("test");
        load_details();
    }

});


function load_index(){
const container = document.getElementById("product-container");

candles_data.forEach(candle => {
    const card = document.createElement("a");
            card.href = `detail.html?id=${candle.id}`;
            card.classList.add("product-card");

    card.innerHTML = `
        <img src="${candle.Image}" alt="${candle.name}">
        <div class="product-info">
            <h3 class="product-name">${candle.name}</h3>
            <p class="product-price">${candle.price}</p>
        </div>
        `;

        container.append(card);
});}




function load_details(){
    // 1. URL-Parameter auslesen (z.B. ?id=vanille)
        const urlParams = new URLSearchParams(window.location.search);
        const produktId = urlParams.get("id");

        const container = document.getElementById("product-detail-container");

        // 2. Das passende Produkt in der Liste suchen
        const candle= candles_data.find(k => k.id === produktId);

        if (candle) {
            // Medien zusammenbauen (Bild + optionales Video)
            let medienHTML = `<img src="${candle.Image}" alt="${candle.name}">`;
            if (candle.video) {
                medienHTML += `<video controls src="${candle.video}"></video>`;
            }

            // HTML für die Detailansicht generieren
            container.innerHTML = `
                <div class="detail-ansicht">
                    <div class="detail-medien">
                        ${medienHTML}
                    </div>
                    <div class="detail-text">
                        <h1>${candle.name}</h1>
                        <div class="preis">${candle.price}</div>
                        <p class="beschreibung">
                            Experience the delightful scent of <strong>${candle.scent}</strong>.
                            Carefully crafted using <strong>${candle.wax}</strong>, this candle offers a long-lasting burn time of <strong>${candle.burnTime}</stront>.
                        </p> 
                    </div>
                </div>
            `;
            // Titel im Browser-Tab anpassen
            document.title = `${candle.name} - The Crafts Capsule`;
        } else {
            // Falls die ID nicht gefunden wurde oder ungültig ist
            container.innerHTML = `
                <div class="fehler-meldung">
                    <h2>Produkt nicht gefunden</h2>
                    <p>Das gesuchte Produkt existiert leider nicht oder wurde entfernt.</p>
                </div>
            `;
        }
}