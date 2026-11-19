const SUPABASE_URL = "https://whjivcfpmbnsrtttilnz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_28T6vvn0FyRqN63agBBcAQ_yZO4sVZn";
const TABLA = "actividades_huerta";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("actividad-form");
const formTitle = document.getElementById("form-title");
const idInput = document.getElementById("actividad-id");
const canteroInput = document.getElementById("cantero");
const cultivoInput = document.getElementById("cultivo");
const tareaInput = document.getElementById("tarea");
const fechaInput = document.getElementById("fecha");
const equipoInput = document.getElementById("equipo_responsable");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const mensajeEstado = document.getElementById("mensaje-estado");
const filtroTarea = document.getElementById("filtro-tarea");
const tablaBody = document.getElementById("tabla-actividades");

function mostrarMensaje(texto, esError = false) {
  mensajeEstado.textContent = texto;
  mensajeEstado.style.color = esError ? "#b71c1c" : "#c2185b";
}

function resetearFormulario() {
  idInput.value = "";
  form.reset();
  formTitle.textContent = "Nueva actividad";
  submitBtn.textContent = "Guardar actividad";
  cancelBtn.classList.add("hidden");
}

function escapeHtml(valor) {
  const div = document.createElement("div");
  div.textContent = valor ?? "";
  return div.innerHTML;
}

async function cargarActividades() {
  tablaBody.innerHTML = `<tr><td colspan="6" class="empty-msg">Cargando registros...</td></tr>`;

  let query = supabaseClient
    .from(TABLA)
    .select("*")
    .order("id", { ascending: false });

  const tareaSeleccionada = filtroTarea.value;
  if (tareaSeleccionada && tareaSeleccionada !== "todas") {
    query = query.eq("tarea", tareaSeleccionada);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al listar:", error);
    tablaBody.innerHTML = `<tr><td colspan="6" class="empty-msg">Error al cargar los datos.</td></tr>`;
    mostrarMensaje("No se pudieron cargar las actividades.", true);
    return;
  }

  renderizarTabla(data || []);
}

function renderizarTabla(filas) {
  if (filas.length === 0) {
    tablaBody.innerHTML = `<tr><td colspan="6" class="empty-msg">No hay actividades para mostrar.</td></tr>`;
    return;
  }

  tablaBody.innerHTML = filas
    .map(
      (item) => `
      <tr>
        <td>${escapeHtml(item.cantero)}</td>
        <td>${escapeHtml(item.cultivo)}</td>
        <td><span class="tag-tarea">${escapeHtml(item.tarea)}</span></td>
        <td>${escapeHtml(item.fecha)}</td>
        <td>${escapeHtml(item.equipo_responsable)}</td>
        <td>
          <button class="btn btn-edit" onclick="prepararEdicion(${item.id})">Editar</button>
          <button class="btn btn-delete" onclick="eliminarActividad(${item.id})">Eliminar</button>
        </td>
      </tr>
    `
    )
    .join("");
}

window.prepararEdicion = async function (id) {
  const { data, error } = await supabaseClient
    .from(TABLA)
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    mostrarMensaje("No se pudo cargar el registro para editar.", true);
    return;
  }

  idInput.value = data.id;
  canteroInput.value = data.cantero;
  cultivoInput.value = data.cultivo;
  tareaInput.value = data.tarea;
  fechaInput.value = data.fecha;
  equipoInput.value = data.equipo_responsable;

  formTitle.textContent = "Modificar actividad";
  submitBtn.textContent = "Actualizar actividad";
  cancelBtn.classList.remove("hidden");
  mostrarMensaje("Editando registro #" + id);
};

window.eliminarActividad = async function (id) {
  const confirmar = confirm("¿Seguro que querés eliminar este registro?");
  if (!confirmar) return;

  const { error } = await supabaseClient
    .from(TABLA)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar:", error);
    mostrarMensaje("Error al eliminar el registro.", true);
    return;
  }

  if (idInput.value === String(id)) {
    resetearFormulario();
  }

  mostrarMensaje("Registro eliminado correctamente.");
  await cargarActividades();
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    cantero: canteroInput.value.trim(),
    cultivo: cultivoInput.value.trim(),
    tarea: tareaInput.value.trim().toLowerCase(),
    fecha: fechaInput.value,
    equipo_responsable: equipoInput.value.trim(),
  };

  const idActual = idInput.value;

  if (idActual) {
    const { error } = await supabaseClient
      .from(TABLA)
      .update(payload)
      .eq("id", idActual);

    if (error) {
      console.error("Error al actualizar:", error);
      mostrarMensaje("Error al modificar el registro.", true);
      return;
    }

    mostrarMensaje("Actividad modificada con éxito.");
    resetearFormulario();
  } else {
    const { error } = await supabaseClient
      .from(TABLA)
      .insert([payload]);

    if (error) {
      console.error("Error al crear:", error);
      mostrarMensaje("Error al guardar la actividad.", true);
      return;
    }

    mostrarMensaje("Actividad guardada con éxito.");
    form.reset();
  }

  await cargarActividades();
});

cancelBtn.addEventListener("click", () => {
  resetearFormulario();
  mostrarMensaje("Edición cancelada.");
});

filtroTarea.addEventListener("change", cargarActividades);

// Cargar datos al abrir la página
cargarActividades();