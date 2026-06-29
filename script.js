let total = 0;
let rebut = 0;
let productes = {
    'Cervesa': { preu: 2.5, count: 0, class: 'groc' },
    'Refresc': { preu: 2.5, count: 0, class: 'groc' },
    'Aigua': { preu: 1.5, count: 0, class: 'blau' },
    'Combinat': { preu: 6.0, count: 0, class: 'vermell' },
    'Ratafia': { preu: 3.5, count: 0, class: 'verd' },
    'Got': { preu: 1.0, count: 0, class: 'rossa' }
};

// Inicialitzar app
function init() {
    const grid = document.getElementById('gridProductes');
    for (let nom in productes) {
        let p = productes[nom];
        grid.innerHTML += `
            <button class="producte ${p.class}" onclick="afegir('${nom}')">
                ${nom.toUpperCase()} 
                <span style="font-size:12px">(${p.preu.toFixed(2)}€)</span>
                <span class="comptador" id="count-${nom}">${p.count}</span>
                <button class="btn-minus" onclick="event.stopPropagation(); restar('${nom}')">-</button>
            </button>`;
    }
}

function afegir(nom) {
    total += productes[nom].preu;
    productes[nom].count++;
    actualitzar();
}

function restar(nom) {
    if (productes[nom].count > 0) {
        total -= productes[nom].preu;
        productes[nom].count--;
        actualitzar();
    }
}

function actualitzar() {
    document.getElementById("total").innerHTML = total.toFixed(2) + " €";
    let resum = "";
    for (let nom in productes) {
        if (productes[nom].count > 0) resum += `${nom}×${productes[nom].count} `;
        document.getElementById(`count-${nom}`).innerHTML = productes[nom].count;
    }
    document.getElementById("resum-venda").innerHTML = resum;
}

function pagar(tipus) {
    document.getElementById('pantallaPrincipal').style.display = 'none';
    document.getElementById('pantallaEfectiu').style.display = 'block';
    document.getElementById('total-efectiu').innerHTML = total.toFixed(2) + " €";
}

function afegirDiners(v) {
    rebut += v;
    let canvi = rebut - total;
    document.getElementById('canvi-display').innerHTML = "Torna: " + Math.max(0, canvi).toFixed(2) + " €";
}

function finalitzarVenda() {
    alert("Venda registrada!");
    reiniciar();
}

function reiniciar() {
    total = 0; rebut = 0;
    for (let nom in productes) productes[nom].count = 0;
    document.getElementById('pantallaPrincipal').style.display = 'flex';
    document.getElementById('pantallaEfectiu').style.display = 'none';
    document.getElementById('canvi-display').innerHTML = "Torna: 0,00 €";
    actualitzar();
}

init();