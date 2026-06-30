let total = 0;
let pagat = 0;
let productes = {
    'CERVESA 🍺': { preu: 2.5, count: 0, class: 'groc' },
    'COMBINAT 🍹': { preu: 6.0, count: 0, class: 'vermell' },
    'GOT 🥤': { preu: 1.0, count: 0, class: 'rossa' },
    'REFRESC 🥤': { preu: 2.5, count: 0, class: 'groc' },
    'AIGUA 💧': { preu: 1.5, count: 0, class: 'blau' },
    'RATAFIA 🥃': { preu: 3.5, count: 0, class: 'verd' }
};

function render() {
    const grid = document.getElementById('gridProductes');
    grid.innerHTML = '';
    for (let nom in productes) {
        let p = productes[nom];
        grid.innerHTML += `<button class="producte ${p.class}" onclick="afegir('${nom}')">
            ${nom}<span class="preu-petit">${p.preu.toFixed(2)}€</span>
            <span class="comptador">${p.count}</span>
        </button>`;
    }
    document.getElementById("total").innerHTML = total.toFixed(2) + " €";
}

function afegir(nom) { total += productes[nom].preu; productes[nom].count++; render(); }
function reiniciar() { total = 0; pagat = 0; for(let n in productes) productes[n].count = 0; render(); }
function pagar(tipus) {
    if (tipus === 'Targeta') { alert("Venda amb targeta registrada!"); reiniciar(); }
    else { 
        document.getElementById('pantallaPrincipal').style.display = 'none'; 
        document.getElementById('pantallaEfectiu').style.display = 'block';
        actualitzarPantallaEfectiu();
    }
}
function sumarEfectiu(val) { pagat += val; actualitzarPantallaEfectiu(); }
function resetEfectiu() { pagat = 0; actualitzarPantallaEfectiu(); }
function actualitzarPantallaEfectiu() {
    document.getElementById('display-canvi').innerHTML = 
    `Total: ${total.toFixed(2)}€ | Rebut: ${pagat.toFixed(2)}€ <br> <b>Torna: ${Math.max(0, pagat - total).toFixed(2)}€</b>`;
}
function tornar() { document.getElementById('pantallaPrincipal').style.display = 'flex'; document.getElementById('pantallaEfectiu').style.display = 'none'; }
function finalitzar() { alert('Venda finalitzada'); reiniciar(); tornar(); }
render();