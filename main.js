/**
 * UTILIZZO
 * 
 * andare nella console e scrivere:
 * 
 * - inizio()       per far partire il timer da i secondi preimpostati (secondiADisposizione, secondiPerConcludere)
 * - pausa()        per mettere in pausa il timer
 * - riprendi(sec)  per far riprendere il timer da tot secondi (tendenzialmente si riprende da quando è stato fermato il timer)
 * - finito()       per concludere prima il timer
 * 
 * La motivazione è che il timer viene fatto partire da una finestra differente da quella in cui viene mostrato il timer!
 * Questo perchè l'idea è quella di controllare il timer da remoto in modo da non mostrare nella proiezione la parte di controllo
 * 
 * 
 * COMANDI:
 * 
 * - tim()          per far apparire o scomparire il timer 
 * - qr()           per far apparire o scomparire il QR-code
 * - dom([0, 1, 2]) per far apparire la domanda 0, 1 o 2 (nota che la 0 è una domanda vuota che "pulisce" quello che c'è scritto sullo schermo)
 * - inizia()       per far iniziare il timer da 4 minuti con 10 secondi di overshoot
 * - pausa()        per mettere in pausa il timer
 * - riprendi(sec)  per riprendere il timer da sec secondi (da usare solo dopo aver messo il timer in pausa!!!)
 * - annuncia("")   per scrivere qualcosa al posto della domanda
 * - finito()       per forzare lo stato di fine del timer
 */

// imposto la durata del timer in sencondi
const secondiADisposizione = 240;

// imposto i secondi a disposizione dopo la fine del timer
const secondiPerConcludere = 10;

let interval; // id dell'intervallometro di 1 sec
let inPausa = false;

const timer = document.getElementById('countDown');
const testo = document.getElementById('testo');
document.body.style.height = window.innerHeight + 'px'; // get height

function startTimer(sec, overshoot) {

    document.getElementById("orologio").style.backgroundColor = "blue";
    timer.innerHTML = `Start!`;

    let minutes = Math.floor(sec / 60)
    let remainingSec = sec % 60;

    interval = setInterval(downTime, 1000);

    function downTime() {

        if (sec > 0) { // timer normale

            minutes = Math.floor(sec / 60);
            remainingSec = sec % 60;

            if (remainingSec < 10) {
                minutes < 10 ? timer.textContent = `0${minutes} : 0${remainingSec}` : timer.textContent = `${minutes} : 0${remainingSec}`;
            } else {
                minutes < 10 ? timer.textContent = `0${minutes} : ${remainingSec}` : timer.textContent = `${minutes} : ${remainingSec}`;
            }

        } else if (sec > -overshoot) { // timer di overshoot
            timer.innerHTML = `<div>${sec+overshoot}</div>`;
            document.getElementById("orologio").style.backgroundColor = "red";
        } else {
            finito();
        }

        // decremento di un secondo
        sec -= 1;
        // in pratica al posto di schiacciare e partire da 3:59 si parte da 4:00
        console.log(sec);

    }

}


function iniziaDalMinuto(min) {

    startTimer(min*60, secondiADisposizione);

}

function inizia() {

    startTimer(secondiADisposizione, secondiPerConcludere);

}

// funzione per bloccare il timer
function finito() {
    timer.textContent = "FINE";
    if (!inPausa)
        clearInterval(interval);
}

// funzione per bloccare il timer
function pausa() {
    clearInterval(interval);
    inPausa = true;
}

function riprendi(sec) {

    if (inPausa) {
        startTimer(sec, secondiPerConcludere);
        inPausa = false;
    }
    
}

function annuncia(messaggio) {

    testo.innerText = messaggio;

}

function dom(numeroDomanda) {

    let domande = [
        `` // la domanda 0 è per pulire qualsiasi cosa ci sia scritta in testo
        ,`
            <h3>Domanda 1 - Politica Estera</h3>
            <br>
            <p>
                Negli ultimi anni abbiamo visto dilagare nel mondo conflitti di varia intensità (tanto che Papa Francesco è arrivato a parlare di una “Terza Guerra Mondiale combattuta a pezzi”) e allo stesso tempo hanno proliferato tendenze isolazioniste, in termini sia commerciali che politici, espresse su più fronti. Ci riferiamo, per esempio, alla gestione dei conflitti in Ucraina e a Gaza, ma anche alle politiche commerciali protezioniste di Cina e Stati Uniti. In che modo può l’Unione europea avere un ruolo risolutivo nell’affrontare le attuali crisi globali, sia in termini di politica estera, sia per difendere i propri interessi economici e la sicurezza dei suoi cittadini? In quali termini è possibile lavorare per una politica estera e di difesa sempre più comune? Come garantire la pace sia all’interno che all’esterno dell’Unione?
            </p>
        `,`
            <h3>Domanda 2 - Ambiente</h3>
            <br>
            <p>
                Il Green Deal è uno dei temi più caldi e polarizzanti in Europa. Sulle nuove politiche verdi dell'Unione si costruiscono e si disfano alleanze. Spesso l'Italia assume posizioni critiche rispetto alle istanze ambientaliste, come avvenuto di recente ad esempio con l'opposizione alla Restoration Law, la nuova legge sul ripristino degli habitat, o ancora con il no - comune a tutti i partiti italiani rappresentati in Europa - alle novità portate dal Regolamento Imballaggi. L'Italia infatti si oppone da sempre a tutte le regole che favoriscono il riuso o l'eliminazione degli imballaggi in plastica perché ci consideriamo un’eccellenza nel campo del riciclo. Decarbonizzazione, lotta all'inquinamento, protezione degli ecosistemi…quali dovranno essere le priorità della politica europea nei prossimi anni? Che politiche dovrebbe attuare l'unione europea nei confronti di temi come l'agricoltura, la riduzione delle emissioni, le politiche energetiche?
            </p>
        `

    ];

    testo.innerHTML = domande[numeroDomanda];

}

function tim() {

    let timer = document.getElementById("timer");

    if (timer.style.visibility === "hidden")
        timer.style.visibility = "visible";
    else
        timer.style.visibility = "hidden";

}

function qr() {

    let immagine = document.getElementById("immagine");

    if (immagine.style.visibility === "hidden")
        immagine.style.visibility = "visible";
    else
        immagine.style.visibility = "hidden";

}




// https://avbc.me/0xoU6YSJ