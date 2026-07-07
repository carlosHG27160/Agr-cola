const pageConfig = {
  title: "Agricultores",
  stats: [
    { label: "Agricultores registrados", value: "10" },
    { label: "Parcelas asociadas", value: "10" },
    { label: "Cobertura activa", value: "10" },
    { label: "Última actualización", value: "10" }
  ],
  items: [
    "Juan Pérez Lima",
    "María Gómez Torres",
    "Carlos Ramírez Díaz",
    "Ana Flores Vega"
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
