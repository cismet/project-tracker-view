# Add Project

Add a new project to `projects.json`.

## Instructions

1. The user provides either a **title** or an **id**, optionally followed by a milestone number:
   - If it starts with `10_` or `70_` → it's the **id**
   - Otherwise (e.g., `DZ_A_XYZ`) → it's the **title**, ask for the exact id later
   - If a number follows the id/title (e.g., `70_DZ_B_VTI-3_VectorTiles 167`), that's the GitHub milestone number

2. If no milestone number was provided, ask for it (e.g., `165` for `https://github.com/cismet/wupp/milestone/165`)

3. Fetch the milestone from GitHub using: `gh api repos/cismet/wupp/milestones/{number}`
   - Extract the title and description from the response
   - Look for budget in the description (usually a number like "20 MT" or "20,5 MT")

4. If the user provided a **title** but no id, ask for the exact id (must be exact, otherwise tracking won't work)

5. For **70_ projects** (announced/pre-contract):
   - Add `budget` with the value from milestone description (or ask user if not found)
   - Tags: main tag based on id prefix + `"angek. Folgeauftrag"` (e.g., `["WuNDa", "angek. Folgeauftrag"]`)
   - Note: The `"angek. Folgeauftrag"` tag makes the budget display grey and shows hours instead of percentage

6. For **10_ projects** (active contracts):
   - Budget is required - if not found in milestone description, ask the user
   - Determine the main tag from the id prefix (after the number):
     - `DZ_` → `"DZ"`
     - `WU_` → `"WuNDa"`
     - `BE_` → `"BelIS"`
     - `LA_` → `"LagIS"`
     - `VE_` → `"VerDIS"`
     - `TM_` → `"TopicMaps"`

7. Create the project object with structure:
   ```json
   // For 10_ projects:
   {
     "id": "10_...",
     "title": "SHORT_TITLE",
     "description": "Description from milestone",
     "tags": ["..."],
     "budget": 20,
     "github": "https://github.com/cismet/wupp/milestone/XXX"
   }
   // For 70_ projects (budget shown grey, hours instead of %):
   {
     "id": "70_...",
     "title": "SHORT_TITLE",
     "description": "Description from milestone",
     "tags": ["...", "angek. Folgeauftrag"],
     "budget": 50,
     "github": "https://github.com/cismet/wupp/milestone/XXX"
   }
   ```

8. Read `public/conf/projects.json` and insert the new project:
   - **10_ projects**: Insert at the end of other `10_` entries (before any `60_` entries)
   - **70_ projects**: Insert just before the first `60_` entry

9. Write the updated JSON with 2-space indentation

10. Confirm the project was added and show the new entry

11. Start the dev server (`npm run dev`) in the background so the user can check the content before pushing
