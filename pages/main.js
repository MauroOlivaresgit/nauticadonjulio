document.addEventListener("DOMContentLoaded", () => {
    const servicioSelect = document.getElementById("servicio");
    const extrasContainer = document.getElementById("extrasContainer");
    const cotizadorForm = document.getElementById("cotizadorForm");
  
    // archivo JSON
    fetch("datos.json")
      .then((res) => res.json())
      .then((data) => {
        // servicios
        data.servicios.forEach((servicio) => {
          const option = document.createElement("option");
          option.value = servicio.id;
          option.textContent = `${servicio.nombre} - $${servicio.precio}`;
          servicioSelect.appendChild(option);
        });
  
        //extras
        data.extras.forEach((extra) => {
          const div = document.createElement("div");
          div.innerHTML = `
            <label>
              <input type="checkbox" value="${extra.id}" data-precio="${extra.precio}">
              ${extra.nombre} - $${extra.precio}
            </label>`;
          extrasContainer.appendChild(div);
        });
  
        // formulario
        cotizadorForm.addEventListener("submit", (e) => {
          e.preventDefault();
  
          const servicioSeleccionado = data.servicios.find(
            (s) => s.id === parseInt(servicioSelect.value)
          );
          const checkboxes = extrasContainer.querySelectorAll("input[type='checkbox']");
          let total = servicioSeleccionado.precio;
          let extrasSeleccionados = [];
  
          checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
              total += parseFloat(checkbox.dataset.precio);
              const nombreExtra = checkbox.parentElement.textContent.trim();
              extrasSeleccionados.push(nombreExtra);
            }
          });
  
          // Cotizacion final
          Swal.fire({
            title: "Cotización Completa",
            html: `
              <strong>Servicio:</strong> ${servicioSeleccionado.nombre} <br/>
              <strong>Extras:</strong> ${extrasSeleccionados.join(", ") || "Ninguno"} <br/>
              <strong>Total:</strong> $${total.toFixed(2)}
            `,
            icon: "info"
          });
        });
      });
  });
  