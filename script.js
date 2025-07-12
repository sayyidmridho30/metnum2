document.getElementById("calcForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fxInput = document.getElementById("fungsi").value;
  const x = parseFloat(document.getElementById("x").value);
  const h = parseFloat(document.getElementById("h").value);
  const metode = document.getElementById("metode").value;
  const analitik = parseFloat(document.getElementById("analitik").value);

  try {
    const f = new Function("x", `return ${fxInput}`);

    let rumus = '';
    let substitusi = '';
    let hasil = 0;

    if (metode === "mundur") {
      rumus = "f'(x) ≈ (f(x) - f(x - h)) / h";
      substitusi = `(${f(x)} - ${f(x - h)}) / ${h}`;
      hasil = (f(x) - f(x - h)) / h;
    } else if (metode === "pusat") {
      rumus = "f'(x) ≈ (f(x + h) - f(x - h)) / (2h)";
      substitusi = `(${f(x + h)} - ${f(x - h)}) / (2 × ${h})`;
      hasil = (f(x + h) - f(x - h)) / (2 * h);
    }

    let galat = '';
    if (!isNaN(analitik)) {
      const galatAbs = Math.abs(hasil - analitik);
      galat = `<strong>Galat Absolut:</strong><br> |${hasil.toFixed(6)} - ${analitik}| = <span style='color:red;'>${galatAbs.toFixed(6)}</span><br>`;
    }

    document.getElementById("hasil").innerHTML = `
      <div class='output-box'>
        <h3>🧮 Jawaban:</h3>
        <strong>Rumus (${metode}):</strong><br>
        <code>${rumus}</code><br><br>
        <strong>Substitusi:</strong><br>
        <code>${substitusi} = ${hasil.toFixed(6)}</code><br><br>
        <strong>Hasil & Kesimpulan:</strong><br>
        Nilai hampiran turunan di x = ${x}: <span style='color:green'><b>${hasil.toFixed(6)}</b></span><br><br>
        ${galat}
      </div>
    `;
  } catch (error) {
    document.getElementById("hasil").innerHTML = "<div class='output-box'>Terjadi kesalahan saat menghitung. Pastikan fungsi valid.</div>";
  }
});
