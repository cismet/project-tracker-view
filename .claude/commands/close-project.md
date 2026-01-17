# Close Project

Move a completed project from `projects.json` to `closed.json` after invoicing.

## Instructions

1. Read the current projects from `public/conf/projects.json`
2. Display the list of active projects with their id, title, and description
3. Ask the user which project to close (by title or id)
4. Read `public/conf/closed.json`
5. Remove the selected project from `projects.json`
6. Add the project to the beginning of `closed.json`
7. Write both files back with proper JSON formatting (2-space indentation)
8. Confirm the project was moved successfully

If an argument is provided (e.g., `/close-project DZ_E_GA1`), use that to match the project title or id directly instead of asking.
