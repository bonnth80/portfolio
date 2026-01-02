/*
 * WORKFLOW: Adding New Project Entries
 * ====================================
 * 
 * 1. Add new entry to projectConfig below with:
 *    - Unique index number (0, 1, 2, etc.)
 *    - name: Human-readable project name
 *    - contentId: matches data-content in HTML content panel
 *    - overlayColor: rgba color for nav overlay
 *    - image: path to thumbnail image
 *    - panX: (optional) manual image pan position 0-100, overrides auto-calculation
 * 
 * 2. Add matching content panel to HTML:
 *    <div class="content-panel" data-content="your-content-id">
 *      <h3>Project Title</h3>
 *      <p>Project description...</p>
 *    </div>
 * 
 * 3. Add image file to images/ directory
 * 
 * 4. Refresh page - entry automatically appears in nav!
 * 
 * Note: Order in projectConfig determines left-to-right display order
 */

// =============================================================================
// CONSTANTS & DATA
// =============================================================================

const projectConfig = {
  0: {
    name: 'Roid',
    contentId: 'roid',
    overlayColor: 'rgba(50, 128, 245, 1)',  // Red
    image: 'images/roid/thumb.png',
    // panX: 100  // Manual pan override (0-100)
  },
  1: {
    name: 'Loadout',
    contentId: 'loadout', 
    overlayColor: 'rgba(77, 137, 201, 1)',  // Green
    image: 'images/loadout/thumb.jpg',
    panX: 70  // Manual pan override (0-100)
  },
  2: {
    name: 'Transformers',
    contentId: 'transformers',
    overlayColor: 'rgba(70, 70, 202, 1)',  // Blue
    image: 'images/transformers/thumb.png',
    // panX: 0  // Manual pan override (0-100)
  },
  3: {
    name: 'Aristotle',
    contentId: 'aristotle',
    overlayColor: 'rgba(105, 189, 249, 1)',  // Yellow
    image: 'images/aristotle/thumb.png'
    // panX: 0  // Manual pan override (0-100)
  },
  4: {
    name: 'Project Epsilon',
    contentId: 'project-epsilon',
    overlayColor: 'rgba(57, 35, 184, 1)',  // Magenta
    image: 'images/project-epsilon/thumb.png'
    // panX: 0  // Manual pan override (0-100)
  },
  5: {
    name: 'Project Zeta',
    contentId: 'project-zeta',
    overlayColor: 'rgba(78, 120, 219, 1)',  // Cyan
    image: 'images/project-zeta/thumb.png'
    // panX: 0  // Manual pan override (0-100)
  }
};

const defaultProject = {
  overlayColor: 'rgba(206, 166, 166, 1)',  // Gray
  image: 'images/default/thumb.png'
};

let entries = document.querySelectorAll('.entry');
const entryGrid = document.querySelector('.entry-grid');
const count = Object.keys(projectConfig).length;

// =============================================================================
// EVENT HOOKS & INITIALIZATION
// =============================================================================

// Generate project entries from config
Object.entries(projectConfig).forEach(([index, config]) => {
  // Create entry element
  const entryDiv = document.createElement('div');
  entryDiv.className = 'entry';
  entryDiv.setAttribute('data-content', config.contentId);
  
  // Create image element
  const navIcon = document.createElement('img');
  navIcon.className = 'nav-icon';
  navIcon.src = config.image;
  navIcon.alt = `${config.contentId} thumbnail`;
  
  // Append image to entry
  entryDiv.appendChild(navIcon);
  
  // Append entry to grid
  entryGrid.appendChild(entryDiv);
});

// Re-query entries after they're created
entries = document.querySelectorAll('.entry');

// Configure generated entries
entries.forEach((entry, index) => {
  const config = projectConfig[index] || defaultProject;
  
  // Use manual panX if provided, otherwise calculate automatically
  const panX = config.panX !== undefined ? config.panX : 
               (count === 1 ? 50 : (index / (count - 1)) * 100);
  
  const navIcon = entry.querySelector('.nav-icon');
  
  // Set pan position on the image
  navIcon.style.setProperty('--pan-x', `${panX}%`);
  
  // Set overlay color on the entry div
  entry.style.setProperty('--overlay-color', config.overlayColor);
  entry.style.setProperty('--overlay-opacity', '0.3');
  
  // Add event listeners
  entry.addEventListener('click', () => handleEntryClick(index));
  entry.addEventListener('mouseenter', () => handleEntryHover(index));
});

// =============================================================================
// FUNCTION DEFINITIONS
// =============================================================================

function handleEntryClick(index) {
  const entry = entries[index];
  const contentId = entry.dataset.content;
  const config = projectConfig[index] || defaultProject;
  
  console.log('Entry clicked:', {
    index: index,
    contentId: contentId,
    entry: entry,
    config: config
  });
  
  showContentPanel(contentId);
}

function showContentPanel(contentId) {
  hideAllContentPanels();

  // Show the matching panel (target content panels specifically, not nav entries)
  const targetPanel = document.querySelector(`.content-panel[data-content="${contentId}"]`);
  console.log('Showing panel:', targetPanel);
  if (targetPanel) {
    console.log('Activating panel:', targetPanel);
    targetPanel.classList.add('active');
  }
}

function handleEntryHover(index) {
  // TODO: Define hover behavior
}

function hideAllContentPanels() {
  document.querySelectorAll('.content-panel').forEach(panel => {
    console.log('Hiding panel:', panel);
    panel.classList.remove('active');
  });
}
