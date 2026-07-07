const pageConfig = {
  title: "Trabajadores",
  stats: [
    { label: "Trabajadores activos", value: "10" },
    { label: "Horas programadas", value: "10" },
    { label: "Turnos asignados", value: "10" },
    { label: "Contratos vigentes", value: "10" }
  ],
  items: [
    "José Aguilar",
    "Marco Bustamante",
    "Teresa Campos",
    "Raúl Delgado"
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
