
  # Microfrontend Application

  This is a code bundle for Microfrontend Application. The original project is available at https://www.figma.com/design/0wbDxtz7SlQRMzeCnr8YAo/Microfrontend-Application.

  ## Running the code

  Run `npm i` to install the dependencies for the shell app.

  Run `npm run dev` to start the shell development server (module federation host).

## Microfrontend structure

- **Shell app** (this repo): serves `/login`, `/landing`, and renders `Header`, `Footer`, and remote placeholders (`project-list-remote`, `project-card-remote`) via Module Federation.
- **ProjectList remote** (`project-list-remote/`): standalone Vite React project that exposes `ProjectListRemote`. It fetches the `/api/project/list/base-info` data and notifies the shell of selections.
- **ProjectCard remote** (`project-card-remote/`): standalone Vite React project that exposes `ProjectCardRemote`. It renders module cards based on the selected project passed from the shell.

## Running the microfrontends

1. `npm install` (from the shell root) and `npm run dev` to start the host on the default port (usually 5173). It will attempt to load `projectList` from `http://localhost:4173/assets/remoteEntry.js` and `projectCard` from `http://localhost:4174/assets/remoteEntry.js`.
2. In a second terminal, `cd project-list-remote && npm install && npm run dev` to start the list remote on port 4173.
3. In a third terminal, `cd project-card-remote && npm install && npm run dev` to start the card remote on port 4174.
4. Open the shell URL provided by `npm run dev`; it will lazy-load the remotes automatically.
--------------------------------------------------------------------------------------
Run locally
Open Terminal 01
cd project-list-remote
npm install
npm run build
npm run preview    or  npm run -- --port 4173

Open Terminal 02
cd project-card-remote
npm install
npm run build
npm run preview    or  npm run preview -- --port 4174

Open Terminal 03
stay in main folder shell(virtuele-microfrontend-application)
npm install
npm run dev

Once all the servers are running run http://localhost:5173


