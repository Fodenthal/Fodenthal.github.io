You are setting up the bones of a personal research website using Quarto.

Goal:
Create a clean Quarto website scaffold for my mechanistic interpretability research notes. Do not write the actual research posts. Use placeholders and templates only.

Context:
I am an undergraduate researcher working on mechanistic interpretability. The site should be simple, professional, and suitable for hosting research notes, project pages, and future writeups. The initial project is about "causal atoms" / sparse dictionaries over SAE causal signatures, but do not write the actual post content.

Requirements:
1. Create a Quarto website project in the current repository.
2. Use a clean minimal theme.
3. Add the following pages:
   - Home
   - Research
   - Notes
   - About
4. Add a notes/blog section where future posts can live.
5. Create one placeholder draft post for causal atoms, but leave the actual content as section headings and TODOs.
6. Add a simple custom CSS file for mild styling only.
7. Add a `.gitignore` that excludes Quarto render outputs.
8. Add a short README explaining how to preview, render, and publish the site.
9. Make sure `quarto render` succeeds.
10. Do not overengineer. No complicated JavaScript, no custom build system, no external theme dependency unless necessary.

Desired file structure:

.
├── _quarto.yml
├── index.qmd
├── research.qmd
├── notes.qmd
├── about.qmd
├── styles.css
├── README.md
├── .gitignore
└── notes/
    └── causal-atoms-pilot.qmd

Site design:
- Navbar links: Home, Research, Notes, About
- Site title: "Felix Odenthal"
- Subtitle / description: "Mechanistic interpretability research notes"
- Use Quarto's built-in HTML format.
- Use a readable theme such as cosmo, flatly, or litera.
- Enable table of contents for pages/posts.
- Keep the style understated and academic.

Content instructions:

index.qmd:
- Short landing page.
- Include a brief placeholder intro:
  "I’m an undergraduate at UChicago working on mechanistic interpretability."
- Include sections:
  - Current work
  - Research notes
  - Contact
- Link to the Research and Notes pages.
- Do not fabricate contact info. Use placeholder text like "[email/contact link here]".

research.qmd:
- Title: "Research"
- Include a section for "Causal atoms"
- Include placeholders for:
  - Research question
  - Motivation
  - Methods
  - Current status
  - Future directions
- Do not write the actual content beyond brief placeholder text.

notes.qmd:
- Title: "Notes"
- Should list/link to the placeholder causal atoms post.
- If Quarto supports listing pages easily, use a listing configuration. Otherwise, manually link to `notes/causal-atoms-pilot.qmd`.

about.qmd:
- Title: "About"
- Include a short placeholder bio.
- Include placeholders for:
  - Education
  - Research interests
  - Contact
- Do not invent details beyond UChicago undergraduate and mechanistic interpretability.

notes/causal-atoms-pilot.qmd:
- Title: "Causal Atoms: Pilot Notes"
- Mark clearly as a draft / working note.
- Include only section headings and TODO bullets:
  - Motivation
  - Experimental setup
  - Baselines
  - Pilot diagnostics
  - Current interpretation
  - Limitations
  - Next steps
- Do not write the actual post.

_quarto.yml:
- Configure project type as website.
- Configure navbar.
- Configure output directory if needed.
- Use `styles.css`.
- Enable table of contents.
- Add metadata for title and description.

.gitignore:
Include at least:
_site/
.quarto/
.DS_Store
.Rproj.user/
__pycache__/
.ipynb_checkpoints/

README.md:
Explain:
- `quarto preview`
- `quarto render`
- `quarto publish gh-pages`
- Mention that GitHub Pages can serve the site from the `gh-pages` branch after publishing.

After creating the files:
1. Run `quarto render`.
2. If render fails, fix the issue.
3. Print the final file tree.
4. Print the exact commands I should run to preview and publish.

Important:
- Do not write a polished research post.
- Do not claim results.
- Do not add fake links, fake publications, fake email, or fake CV.
- Keep the website simple and easy to edit.

Assume I will publish with:

quarto publish gh-pages

Do not commit `_site/` to git. Make sure `.gitignore` excludes `_site/` and `.quarto/`.
