let total = 0;
let productes = {
    'Cervesa 🍺': { preu: 2.5, count: 0, class: 'groc' },
    'Combinat 🍹': { preu: 6.0, count: 0, class: 'vermell' },
    'Got 🥤': { preu: 1.0, count: 0, class: 'rossa' },
    'Refresc 🥤': { preu: 2.5, count: 0, class: 'groc' },
    'Aigua 💧': { preu: 1.5, count: 0, class: 'blau' },
    'Ratafia 🥃': { preu: 3.5, count: 0, class: 'verd' }
};

function render() {
    const grid = document.getElementById('gridProductes');
    grid.innerHTML = '';
    for (let nom in productes) {
        let p = productes[nom];
        grid.innerHTML += `<button class="producte ${p.class}" onclick="afegir('${nom}')">
            ${nom} <span class="comptador">${p.count}</span>
            <button class="btn-minus" onclick="event.stopPropagation(); restar('${nom}')">-</button>
        </button>`;
    }
    document.getElementById("total").innerHTML = total.toFixed(2) + " €";
}

function afegir(nom) { total += productes[nom].preu; productes[nom].count++; render(); }
function restar(nom) { if (productes[nom].count > 0) { total -= productes[nom].preu; productes[nom].count--; render(); } }
function reiniciar() { total = 0; for(let n in productes) productes[n].count = 0; render(); }
function pagar(tipus) {
    if (tipus === 'Targeta') { alert("Venda amb targeta registrada!"); reiniciar(); }
    else { document.getElementById('pantallaPrincipal').style.display = 'none'; document.getElementById('pantallaEfectiu').style.display = 'block'; }
}
function calcularCanvi() {
    let rebut = parseFloat(document.getElementById('input-manual').value) || 0;
    document.getElementById('display-canvi').innerHTML = `Total: ${total.toFixed(2)}€ | Torna: ${Math.max(0, rebut - total).toFixed(2)}€`;
}
function tornar() { document.getElementById('pantallaPrincipal').style.display = 'flex'; document.getElementById('pantallaEfectiu').style.display = 'none'; }
function finalitzar() { alert('Venda registrada'); reiniciar(); tornar(); }
render();
render();