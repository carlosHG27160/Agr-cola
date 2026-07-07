const pageConfig = {
  title: "Resumen",
  stats: [
    { label: "Producción total", value: "10" },
    { label: "Siembras activas", value: "10" },
    { label: "Cosechas registradas", value: "10" },
    { label: "Insumos críticos", value: "10" }
  ],
  items: [
    "Parcela El Sol",
    "Cultivo de algodón",
    "Inventario actualizado",
    "Venta en proceso"
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('page-title').textContent = pageConfig.title;
  document.getElementById('stats').innerHTML = pageConfig.stats.map((item) => `
    <div class="stat">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join('');
  document.getElementById('detail-list').innerHTML = pageConfig.items.map((item) => `<li>${item}</li>`).join('');
});
