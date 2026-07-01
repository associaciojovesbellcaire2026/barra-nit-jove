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

let vendesTotals = {}; // Per guardar el total de la nit

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
    actualitzarResum();
}

function afegir(nom) { total += productes[nom].preu; productes[nom].count++; render(); }
function reiniciar() { if(confirm("Segur que vols reiniciar la comanda actual?")) { total = 0; for(let n in productes) productes[n].count = 0; render(); } }

function pagar(tipus) {
    if (total === 0) return;
    if (confirm(`Venda amb ${tipus} per ${total.toFixed(2)}€?`)) {
        registrarVendes();
        alert("Venda registrada!");
        reiniciar();
    }
}

function registrarVendes() {
    for (let nom in productes) {
        if (productes[nom].count > 0) {
            vendesTotals[nom] = (vendesTotals[nom] || 0) + productes[nom].count;
        }
    }
}

function confirmarFinalitzar() {
    if (confirm("Finalitzar venda en efectiu?")) { registrarVendes(); reiniciar(); tornar(); }
}

function toggleResum() { const p = document.getElementById('panelResum'); p.style.display = p.style.display === 'none' ? 'block' : 'none'; }

function actualitzarResum() {
    let html = "<b>Vendes acumulades:</b><br>";
    for (let nom in vendesTotals) html += `${nom}: ${vendesTotals[nom]}<br>`;
    document.getElementById('llistatVendes').innerHTML = html;
}

function exportarExcel() {
    let csv = "Producte,Quantitat\n";
    for (let nom in vendesTotals) csv += `${nom},${vendesTotals[nom]}\n`;
    let blob = new Blob([csv], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url; a.download = "vendes_nit.csv"; a.click();
}

// ... (resta funcions efectiu: sumarEfectiu, resetEfectiu, tornar, etc)
function sumarEfectiu(val) { pagat += val; actualitzarPantallaEfectiu(); }
function resetEfectiu() { pagat = 0; actualitzarPantallaEfectiu(); }
function afegirManual() { let input = document.getElementById('input-manual'); let v = parseFloat(input.value); if (!isNaN(v)) { pagat += v; input.value = ''; actualitzarPantallaEfectiu(); } }
function actualitzarPantallaEfectiu() { document.getElementById('display-canvi').innerHTML = `Total: ${total.toFixed(2)}€ | Rebut: ${pagat.toFixed(2)}€ <br> <b>Torna: ${Math.max(0, pagat - total).toFixed(2)}€</b>`; }
function tornar() { document.getElementById('pantallaPrincipal').style.display = 'flex'; document.getElementById('pantallaEfectiu').style.display = 'none'; }
render();