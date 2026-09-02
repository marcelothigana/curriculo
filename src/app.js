// Curriculo Web App - Interface de Edição
// Carrega os dados do currículo de data.json

// Estado da aplicação
let currentData = null;

// Elementos DOM
const app = document.getElementById('app');

// Carregar dados do JSON
async function loadData() {
  try {
    // Sempre carrega do data.json
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error('Erro ao carregar data.json');
    }
    currentData = await response.json();
    console.log('Dados carregados do data.json');
    
    render();
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    app.innerHTML = '<p style="color: red; text-align: center;">Erro ao carregar dados do currículo. Verifique se o arquivo data.json existe.</p>';
  }
}

// Inicialização
function init() {
  loadData();
}

// Renderização principal
function render() {
  if (!currentData) return;

  app.innerHTML = '';

  // Container principal do currículo
  const container = document.createElement('div');
  container.className = 'resume-container';

  // Botão de Edição (topo esquerda, antes da sidebar)
  const editButton = createEditButton();
  app.appendChild(editButton);

  // Botão de Imprimir (topo direita)
  const printButton = createPrintButton();
  app.appendChild(printButton);

  // Sidebar (esquerda)
  const sidebar = createSidebar();
  container.appendChild(sidebar);

  // Conteúdo principal (direita)
  const main = createMainContent();
  container.appendChild(main);

  // Divisor vertical
  const divider = document.createElement('div');
  divider.className = 'vertical-divider';
  container.appendChild(divider);

  app.appendChild(container);

  // Adicionar classe 'visible' para mostrar as seções de conteúdo
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.add('visible');
  });

  // Inicializar ícones Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Botão de Imprimir
function createPrintButton() {
  const btn = document.createElement('button');
  btn.id = 'print-btn';
  btn.className = 'print-button';
  btn.innerHTML = `
    <i data-lucide="printer"></i>
    Imprimir Currículo
  `;
  btn.onclick = () => {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      section.classList.add('visible');
    });
    
    setTimeout(() => {
      window.print();
    }, 100);
  };
  return btn;
}

// Botão de Edição
function createEditButton() {
  const btn = document.createElement('button');
  btn.id = 'edit-btn';
  btn.className = 'edit-button';
  btn.innerHTML = `
    <i data-lucide="edit"></i>
    Editar
  `;
  btn.onclick = () => {
    window.open('https://github.com/marcelothigana/curriculo/blob/main/data.json', '_blank');
  };
  return btn;
}

// Sidebar (esquerda)
function createSidebar() {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  aside.appendChild(createNameHeader());
  aside.appendChild(createDivider());
  aside.appendChild(createContactSection());
  aside.appendChild(createDivider());
  aside.appendChild(createAreaAtuacaoSection());
  aside.appendChild(createDivider());
  aside.appendChild(createCompetenciasSection());

  // Idiomas (só se houver)
  const idiomasSection = createIdiomasSection();
  if (idiomasSection) {
    aside.appendChild(createDivider());
    aside.appendChild(idiomasSection);
  }

  return aside;
}

// Conteúdo principal (direita)
function createMainContent() {
  const main = document.createElement('main');
  main.className = 'main-content';

  main.appendChild(createResumoSection());
  main.appendChild(createFormacaoSection());
  
  // Experiência Docente
  const expDocenteSection = createExperienciaDocenteSection();
  if (expDocenteSection) {
    main.appendChild(expDocenteSection);
  }
  
  // Experiência Internacional
  const expInternacionalSection = createExperienciaInternacionalSection();
  if (expInternacionalSection) {
    main.appendChild(expInternacionalSection);
  }
  
  main.appendChild(createCursosSection());

  // Publicações e Pesquisas
  const publicacoesSection = createPublicacoesSection();
  if (publicacoesSection) {
    main.appendChild(publicacoesSection);
  }

  // Mídia - Entrevistas e Podcasts
  const entrevistasSection = createEntrevistasSection();
  if (entrevistasSection) {
    main.appendChild(entrevistasSection);
  }

  // Mídia - Vídeos YouTube
  const videosSection = createVideosSection();
  if (videosSection) {
    main.appendChild(videosSection);
  }

  // Mídia - Matérias em Portais
  const materiasSection = createMateriasSection();
  if (materiasSection) {
    main.appendChild(materiasSection);
  }

  // Mídia - Arquivos Drive
  const arquivosSection = createArquivosDriveSection();
  if (arquivosSection) {
    main.appendChild(arquivosSection);
  }

  // Informações Adicionais
  const infoSection = createInformacoesAdicionaisSection();
  if (infoSection) {
    main.appendChild(infoSection);
  }

  return main;
}

// Nome
function createNameHeader() {
  const div = document.createElement('header');
  div.className = 'name-header';
  
  const partesNome = currentData.nome.split(' ');
  const nomeHTML = partesNome.map((parte, index) => {
    if (index < partesNome.length - 1) {
      return parte + '<br>';
    }
    return parte;
  }).join('');
  
  div.innerHTML = `<h1>${nomeHTML}</h1>`;
  return div;
}

// Separador vertical
function createDivider() {
  const div = document.createElement('div');
  div.className = 'sidebar-divider';
  return div;
}

// Contato
function createContactSection() {
  const section = document.createElement('section');
  section.className = 'sidebar-section';

  let contatoHTML = `
    <h2>Contato</h2>
    <div class="contact-item"><i data-lucide="phone"></i><span>${currentData.contato.telefones[0]}</span></div>
  `;

  if (currentData.contato.telefones.length > 1) {
    contatoHTML += `<div class="contact-item"><i data-lucide="phone"></i><span>${currentData.contato.telefones[1]}</span></div>`;
  }

  contatoHTML += `
    <div class="contact-item"><i data-lucide="mail"></i><a href="mailto:${currentData.contato.email}">${currentData.contato.email}</a></div>
  `;

  if (currentData.contato.linkedin) {
    contatoHTML += `
    <div class="contact-item"><svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg><a href="https://${currentData.contato.linkedin}" target="_blank">${currentData.contato.linkedin}</a></div>
    `;
  }

  contatoHTML += `
    <div class="contact-item"><i data-lucide="map-pin"></i><span>${currentData.contato.localizacao}</span></div>
  `;

  section.innerHTML = contatoHTML;

  return section;
}

// Área de Atuação
function createAreaAtuacaoSection() {
  const section = document.createElement('section');
  section.className = 'sidebar-section';

  let areaHTML = '';
  currentData.areaAtuacao.forEach(area => {
    areaHTML += `<div class="area-item"><span>${area}</span></div>`;
  });

  section.innerHTML = `
    <h2>Área de Atuação</h2>
    ${areaHTML}
  `;

  return section;
}

// Competências
function createCompetenciasSection() {
  const section = document.createElement('section');
  section.className = 'sidebar-section';

  let skillsHTML = '';
  currentData.competencias.forEach(comp => {
    skillsHTML += `<div class="skill-item"><span>${comp}</span></div>`;
  });

  section.innerHTML = `
    <h2>Habilidades</h2>
    ${skillsHTML}
  `;

  return section;
}

// Idiomas
function createIdiomasSection() {
  const section = document.createElement('section');
  section.className = 'sidebar-section';

  if (currentData.idiomas && currentData.idiomas.length > 0) {
    section.innerHTML = `
      <h2>Idiomas</h2>
      <ul class="language-list">
        ${currentData.idiomas.map(lang => `<li>${lang}</li>`).join('')}
      </ul>
    `;
    return section;
  }
  
  return null;
}

// Resumo
function createResumoSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  section.innerHTML = `
    <h2 class="section-title"><i data-lucide="user"></i>Resumo Profissional</h2>
    <p class="summary-text">${currentData.resumo}</p>
  `;

  return section;
}

// Formação
function createFormacaoSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  let entries = currentData.formacao.map(form => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${form.nivel}</span>
        <span class="entry-date">${form.conclusao}</span>
      </div>
      <div class="entry-subtitle">${form.instituicao}</div>
      ${form.local ? `<div class="entry-location">${form.local}</div>` : ''}
    </div>
  `).join('');

  section.innerHTML = `
    <h2 class="section-title"><i data-lucide="graduation-cap"></i>Formação</h2>
    ${entries}
  `;

  return section;
}

// Experiência Docente
function createExperienciaDocenteSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  if (!currentData.experienciaDocente || currentData.experienciaDocente.length === 0) {
    return null;
  }

  let entries = currentData.experienciaDocente.map(exp => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${exp.tipo}</span>
        <span class="entry-date">${exp.periodo}</span>
      </div>
      <ul class="entry-description">
        ${exp.atividades.map(desc => `<li>${desc}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  section.innerHTML = `
    <h2 class="section-title"><i data-lucide="briefcase"></i>Experiência Docente e Formativa</h2>
    ${entries}
  `;

  return section;
}

// Experiência Internacional
function createExperienciaInternacionalSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  if (!currentData.experienciaInternacional || currentData.experienciaInternacional.length === 0) {
    return null;
  }

  let entries = currentData.experienciaInternacional.map(exp => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${exp.local}</span>
      </div>
      <div class="entry-subtitle">${exp.tipo}</div>
    </div>
  `).join('');

  section.innerHTML = `
    <h2 class="section-title"><i data-lucide="globe"></i>Experiência Internacional</h2>
    ${entries}
  `;

  return section;
}

// Cursos
function createCursosSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  let entries = currentData.cursos.map(curso => {
    let subtitle = '';
    if (curso.instituicao && curso.cargaHoraria) {
      subtitle = `${curso.instituicao} (${curso.cargaHoraria})`;
    } else if (curso.cargaHoraria) {
      subtitle = `Carga Horária: ${curso.cargaHoraria}`;
    } else if (curso.instituicao) {
      subtitle = curso.instituicao;
    }
    return `
    <div class="course-item">
      <div class="course-name">${curso.nome}</div>
      ${subtitle ? `<div class="course-hours">${subtitle}</div>` : ''}
    </div>
  `}).join('');

  section.innerHTML = `
    <h2 class="section-title"><i data-lucide="award"></i>Cursos</h2>
    ${entries}
  `;

  return section;
}

// Publicações
function createPublicacoesSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  if (!currentData.publicacoes || currentData.publicacoes.length === 0) {
    return null;
  }

  let entries = currentData.publicacoes.map(pub => {
    let linksHTML = '';
    if (pub.linkVenda) {
      linksHTML += `<a href="${pub.linkVenda}" target="_blank" class="publication-link">Página de vendas</a>`;
    }
    if (pub.linkCompra) {
      linksHTML += ` <a href="${pub.linkCompra}" target="_blank" class="publication-link">Comprar</a>`;
    }
    if (pub.link) {
      linksHTML += `<a href="${pub.link}" target="_blank" class="publication-link">Acessar</a>`;
    }

    return `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${pub.titulo}</span>
        <span class="entry-date">${pub.tipo}</span>
      </div>
      <div class="entry-description">${pub.descricao}</div>
      ${linksHTML ? `<div class="entry-links">${linksHTML}</div>` : ''}
    </div>
  `}).join('');

  section.innerHTML = `
    <h2 class="section-title"><i data-lucide="book-open"></i>Publicações e Pesquisas</h2>
    ${entries}
  `;

  return section;
}

// Mídia - Entrevistas e Podcasts
function createEntrevistasSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  if (!currentData.midia || !currentData.midia.entrevistasPodcasts || currentData.midia.entrevistasPodcasts.length === 0) {
    return null;
  }

  let entries = currentData.midia.entrevistasPodcasts.map(item => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${item.titulo}</span>
        <span class="entry-date">${item.data}</span>
      </div>
      <div class="entry-subtitle">${item.fonte}</div>
      <div class="entry-links">
        <a href="${item.link}" target="_blank" class="publication-link">Assistir/ Ler</a>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <h2 class="section-title"><i data-lucide="mic"></i>Entrevistas e Podcasts</h2>
    ${entries}
  `;

  return section;
}

// Mídia - Vídeos YouTube
function createVideosSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  if (!currentData.midia || !currentData.midia.videosYoutube || currentData.midia.videosYoutube.length === 0) {
    return null;
  }

  let entries = currentData.midia.videosYoutube.map(item => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${item.titulo}</span>
      </div>
      <div class="entry-links">
        <a href="${item.link}" target="_blank" class="publication-link">Assistir no YouTube</a>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <h2 class="section-title"><i data-lucide="video"></i>Vídeos</h2>
    ${entries}
  `;

  return section;
}

// Mídia - Matérias em Portais
function createMateriasSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  if (!currentData.midia || !currentData.midia.materiasPortais || currentData.midia.materiasPortais.length === 0) {
    return null;
  }

  let entries = currentData.midia.materiasPortais.map(item => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${item.titulo}</span>
        <span class="entry-date">${item.data}</span>
      </div>
      <div class="entry-subtitle">${item.portal}</div>
      <div class="entry-links">
        <a href="${item.link}" target="_blank" class="publication-link">Ler matéria</a>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <h2 class="section-title"><i data-lucide="newspaper"></i>Matérias em Portais</h2>
    ${entries}
  `;

  return section;
}

// Mídia - Arquivos Drive
function createArquivosDriveSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  if (!currentData.midia || !currentData.midia.arquivosDrive || currentData.midia.arquivosDrive.length === 0) {
    return null;
  }

  let entries = currentData.midia.arquivosDrive.map(item => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${item.titulo}</span>
        <span class="entry-date">${item.tipo}</span>
      </div>
      <div class="entry-links">
        <a href="${item.link}" target="_blank" class="publication-link">Acessar no Drive</a>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <h2 class="section-title"><i data-lucide="folder"></i>Arquivos e Vídeos no Drive</h2>
    ${entries}
  `;

  return section;
}

// Informações Adicionais
function createInformacoesAdicionaisSection() {
  const section = document.createElement('section');
  section.className = 'content-section';

  if (!currentData.informacoesAdicionais) {
    return null;
  }

  const info = currentData.informacoesAdicionais;
  let contentHTML = '';

  if (info.contribuicaoCultural) {
    contentHTML += `
      <div class="additional-info">
        <h3>Contribuição Cultural</h3>
        <p>${info.contribuicaoCultural}</p>
      </div>
    `;
  }

  if (info.abordagemTerapêutica) {
    contentHTML += `
      <div class="additional-info">
        <h3>Abordagem Terapêutica</h3>
        <p>${info.abordagemTerapêutica}</p>
      </div>
    `;
  }

  // Links das redes sociais
  const socialLinks = [];
  if (info.linktree) socialLinks.push({ name: 'Linktree', url: info.linktree });
  if (info.instagram) socialLinks.push({ name: 'Instagram', url: info.instagram });
  if (info.facebook) socialLinks.push({ name: 'Facebook', url: info.facebook });
  if (info.youtube) socialLinks.push({ name: 'YouTube', url: info.youtube });
  if (info.x) socialLinks.push({ name: 'X', url: info.x });

  if (socialLinks.length > 0) {
    contentHTML += `
      <div class="additional-info">
        <h3>Redes Sociais</h3>
        <div class="social-links">
          ${socialLinks.map(link => `<a href="${link.url}" target="_blank" class="social-link">${link.name}</a>`).join(' ')}
        </div>
      </div>
    `;
  }

  if (contentHTML) {
    section.innerHTML = `
      <h2 class="section-title"><i data-lucide="info"></i>Informações Adicionais</h2>
      ${contentHTML}
    `;
    return section;
  }

  return null;
}

// Renderizar formulário de edição
function renderEditForm() {
  const form = document.getElementById('edit-form');
  if (!form) return;

  let formHTML = '';

  // Seção de Informações Pessoais
  formHTML += `
    <div class="edit-section">
      <h3>Informações Pessoais</h3>
      <div class="form-group">
        <label>Nome Completo</label>
        <input type="text" id="edit-nome" value="${currentData.nome}">
      </div>
      <div class="form-group">
        <label>E-mail</label>
        <input type="email" id="edit-email" value="${currentData.contato.email}">
      </div>
      <div class="form-group">
        <label>Telefones (separados por vírgula)</label>
        <input type="text" id="edit-telefones" value="${currentData.contato.telefones.join(', ')}">
      </div>
      <div class="form-group">
        <label>Localização</label>
        <input type="text" id="edit-localizacao" value="${currentData.contato.localizacao}">
      </div>
    </div>
  `;

  // Seção de Resumo
  formHTML += `
    <div class="edit-section">
      <h3>Resumo Profissional</h3>
      <div class="form-group">
        <label>Resumo</label>
        <textarea id="edit-resumo">${currentData.resumo}</textarea>
      </div>
    </div>
  `;

  // Seção de Competências
  formHTML += `
    <div class="edit-section">
      <h3>Competências</h3>
      <div class="form-group">
        <label>Competências (uma por linha)</label>
        <textarea id="edit-competencias" rows="5">${currentData.competencias.join('\n')}</textarea>
      </div>
    </div>
  `;

  // Seção de Formação
  formHTML += `
    <div class="edit-section">
      <h3>Formação</h3>
      <div id="formacao-list">
        ${currentData.formacao.map((form, index) => `
          <div class="form-group formacao-item" data-index="${index}">
            <div class="form-actions">
              <label>Formação ${index + 1}</label>
              <button type="button" class="remove-item-btn" data-action="remove-formacao" data-index="${index}">Remover</button>
            </div>
            <input type="text" class="edit-formacao-nivel" value="${form.nivel}" placeholder="Nível de formação">
            <input type="text" class="edit-formacao-instituicao" value="${form.instituicao}" placeholder="Instituição">
            <input type="text" class="edit-formacao-conclusao" value="${form.conclusao}" placeholder="Conclusão">
            <input type="text" class="edit-formacao-local" value="${form.local || ''}" placeholder="Local (opcional)">
          </div>
        `).join('')}
      </div>
      <button type="button" class="add-item-btn" data-action="add-formacao">+ Adicionar Formação</button>
    </div>
  `;

  // Seção de Cursos
  formHTML += `
    <div class="edit-section">
      <h3>Cursos</h3>
      <div id="cursos-list">
        ${currentData.cursos.map((curso, index) => `
          <div class="form-group curso-item" data-index="${index}">
            <div class="form-actions">
              <label>Curso ${index + 1}</label>
              <button type="button" class="remove-item-btn" data-action="remove-curso" data-index="${index}">Remover</button>
            </div>
            <input type="text" class="edit-curso-nome" value="${curso.nome}" placeholder="Nome do curso">
            <input type="text" class="edit-curso-instituicao" value="${curso.instituicao}" placeholder="Instituição">
            <input type="text" class="edit-curso-periodo" value="${curso.periodo}" placeholder="Período">
            <input type="text" class="edit-curso-cargaHoraria" value="${curso.cargaHoraria || ''}" placeholder="Carga horária (opcional)">
          </div>
        `).join('')}
      </div>
      <button type="button" class="add-item-btn" data-action="add-curso">+ Adicionar Curso</button>
    </div>
  `;

  form.innerHTML = formHTML;

  // Adicionar event listeners para os botões
  const removeButtons = form.querySelectorAll('.remove-item-btn');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', handleRemoveClick);
  });

  const addButtons = form.querySelectorAll('.add-item-btn');
  addButtons.forEach(btn => {
    btn.addEventListener('click', handleAddClick);
  });
}

// Funções auxiliares para manipulação da formação
function removeFormacao(index) {
  currentData.formacao.splice(index, 1);
  renderEditForm();
}

function addFormacao() {
  currentData.formacao.push({
    nivel: '',
    instituicao: '',
    conclusao: '',
    local: ''
  });
  renderEditForm();
}

function removeCurso(index) {
  currentData.cursos.splice(index, 1);
  renderEditForm();
}

function addCurso() {
  currentData.cursos.push({
    nome: '',
    instituicao: '',
    periodo: '',
    cargaHoraria: ''
  });
  renderEditForm();
}

// Funções para tratar cliques nos botões
function handleRemoveClick(event) {
  const action = event.target.dataset.action;
  const index = parseInt(event.target.dataset.index);
  
  if (action === 'remove-formacao') {
    removeFormacao(index);
  } else if (action === 'remove-curso') {
    removeCurso(index);
  }
}

function handleAddClick(event) {
  const action = event.target.dataset.action;
  
  if (action === 'add-formacao') {
    addFormacao();
  } else if (action === 'add-curso') {
    addCurso();
  }
}

// Salvar alterações
async function saveEdits() {
  try {
    // Atualizar dados do currentData com os valores do formulário
    currentData.nome = document.getElementById('edit-nome').value.trim();
    currentData.contato.email = document.getElementById('edit-email').value.trim();
    currentData.contato.telefones = document.getElementById('edit-telefones').value
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    currentData.contato.localizacao = document.getElementById('edit-localizacao').value.trim();
    currentData.resumo = document.getElementById('edit-resumo').value.trim();
    currentData.competencias = document.getElementById('edit-competencias').value
      .split('\n')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    // Formação
    const formacaoElements = document.querySelectorAll('.formacao-item');
    currentData.formacao = Array.from(formacaoElements).map((el, i) => ({
      nivel: el.querySelector('.edit-formacao-nivel').value.trim(),
      instituicao: el.querySelector('.edit-formacao-instituicao').value.trim(),
      conclusao: el.querySelector('.edit-formacao-conclusao').value.trim(),
      local: el.querySelector('.edit-formacao-local').value.trim()
    }));

    alert('Alterações salvas com sucesso!\n\nAs alterações estão visíveis agora na tela.');

    // Recarregar o currículo para mostrar as alterações
    render();
  } catch (error) {
    console.error('Erro ao salvar:', error);
    alert('Erro ao salvar as alterações: ' + error.message + '\n\nTente novamente.');
  }
}

// Inicializar
init();