const candles_data = [
    {
        id:"1",
        name:"Lemon Pound Cake",
        Image:[
            "pictures/lemonpoundcake.jpg",
            "pictures/lemonpoundcake2.jpg"
        ],
        video:"",
        price:"PHP359",
        description:"",
        scent:"Lemon",
        wax:"natural soy",
        burnTime:"2 days"
    },
    {
        id:"2",
        name:"Lavender Driftwood",
        Image:[
            "pictures/lavender.jpg",
            "pictures/lavender2.jpg"
        ],
        video:"",
        price:"PHP439",
        description:"",
        scent:"Sakura",
        wax:"natural soy",
        burnTime:"2 hours"
    },
    {
        id:"3",
        name:"Babypowder",
        Image:[
            "pictures/babypowder.jpg",
            "pictures/babypowder2.jpg"
        ],
        video:"",
        price:"PHP419",
        description:"",
        scent:"Sandalwood",
        wax:"natural soy",
        burnTime:"7 hours"
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
        <img src="${candle.Image[0]}" alt="${candle.name}">
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
            const pictureArray = candle.Image;
            let medienHTML = `
                <div class="galerie-container">
                    <img id="main-picture" src="${pictureArray[0]}" alt="${candle.name}" class="main-picture">

                    <div class="thumbnail-list">
                        ${pictureArray.map((imgSrc, index) => `
                            <img src="${imgSrc}" alt="Preview ${index + 1}" class="thumbnail ${index === 0 ? 'aktiv' : ''}" onclick="changeImage('${imgSrc}', this)">
                        `).join('')}
                    </div>
                </div>
            `;

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

function changeImage(imgSrc, element) {
    document.getElementById("main-picture").src = imgSrc;

    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('aktiv'));
    element.classList.add('aktiv');
}