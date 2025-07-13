const malla = [
  {
    titulo: "PRIMER AÑO - I SEMESTRE",
    ramos: ["morfologia", "biocelular", "integracion1", "filosofia", "teologia", "biomatematicas", "quimica", "ingles", "comunicacion"]
  },
  {
    titulo: "PRIMER AÑO - II SEMESTRE",
    ramos: ["morfologia", "biocelular", "integracion1", "filosofia", "teologia", "bioestadisticas", "bioquimica1", "biofisica", "introMed"]
  },
  {
    titulo: "SEGUNDO AÑO - III SEMESTRE",
    ramos: ["fisiologia", "atencion", "integracion2", "antropologia", "microbiologia", "metodologia", "bioquimica2", "neurociencia", "histologia"]
  },
  {
    titulo: "SEGUNDO AÑO - IV SEMESTRE",
    ramos: ["fisiologia", "atencion", "integracion2", "antropologia", "microbiologia", "epidemiologia", "farmacologia", "integracionsaberes1", "inmunologia"]
  },
  {
    titulo: "TERCER AÑO - V SEMESTRE",
    ramos: ["fisiopatologia", "fundamentosaccion", "integracion3", "saludpública", "semiologia", "patologiagral", "optativo1"]
  },
  {
    titulo: "TERCER AÑO - VI SEMESTRE",
    ramos: ["fisiopatologia", "fundamentosaccion", "integracion3", "saludpública", "integrada1", "anatomiapatologica", "patologiaquirurgica", "integracionsaberes1"]
  },
  {
    titulo: "CUARTO AÑO - VII SEMESTRE",
    ramos: ["integrada2", "cirugia", "integracion4", "bioetica", "cienciasbasicas", "proyecto", "geriatria", "optativo1"]
  },
  {
    titulo: "CUARTO AÑO - VIII SEMESTRE",
    ramos: ["integrada2", "cirugia", "integracion4", "bioetica", "cienciasbasicas", "proyecto", "geriatria", "integracionsaberes2"]
  },
  {
    titulo: "QUINTO AÑO - IX SEMESTRE",
    ramos: ["obstetricia", "pediatria", "integracion5", "bioeticaespecial", "psiquiatria", "especialidades", "neurologia", "integracionsaberes2"]
  },
  {
    titulo: "QUINTO AÑO - X SEMESTRE",
    ramos: ["obstetricia", "pediatria", "integracion5", "bioeticaespecial", "psiquiatria", "especialidades", "neurologia", "medicinalegal", "optativo2"]
  },
  {
    titulo: "SEXTO AÑO - XI SEMESTRE",
    ramos: ["bioetica1", "internadopediatria", "internadogineco", "internadoespecialidad"]
  },
  {
    titulo: "SÉPTIMO AÑO - XII SEMESTRE",
    ramos: ["bioetica2", "internadosaludfamiliar", "internadocirugia", "internadomedicinainterna"]
  }
];

function crearRamoHTML(ramoData) {
  const div = document.createElement('div');
  div.className = 'ramo bloqueado';
  div.id = ramoData.codigo;
  div.textContent = ramoData.nombre;
  div.addEventListener('click', () => {
    if (div.classList.contains('bloqueado')) return;
    div.classList.toggle('aprobado');
    const aprobado = div.classList.contains('aprobado');
    if (ramoData.abre && aprobado) {
      ramoData.abre.forEach(codigo => {
        const siguiente = document.getElementById(codigo);
        if (siguiente && siguiente.classList.contains('bloqueado')) {
          siguiente.classList.remove('bloqueado');
        }
      });
    }
  });
  return div;
}

function cargarMalla() {
  const contenedor = document.getElementById('malla');

  malla.forEach((bloque) => {
    const seccion = document.createElement('div');
    seccion.classList.add('semestre');
    const titulo = document.createElement('h2');
    titulo.textContent = bloque.titulo;
    seccion.appendChild(titulo);

    const container = document.createElement('div');
    container.classList.add('ramos-container');

    bloque.ramos.forEach(codigo => {
      const ramoData = ramos.find(r => r.codigo === codigo);
      if (ramoData) {
        const div = crearRamoHTML(ramoData);
        container.appendChild(div);
      }
    });

    seccion.appendChild(container);
    contenedor.appendChild(seccion);
  });
  desbloquearIniciales();
}

function desbloquearIniciales() {
  ramos.forEach(ramo => {
    const tieneRequisito = ramos.some(r => r.abre?.includes(ramo.codigo));
    if (!tieneRequisito) {
      const div = document.getElementById(ramo.codigo);
      div?.classList.remove('bloqueado');
    }
  });
}

document.addEventListener('DOMContentLoaded', cargarMalla);

