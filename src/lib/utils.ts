import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createMarkdownTableFromProjectData(projectData: any[]): string {
  const header = "| Day | Name | Working Hours | Description |";
  const separator = "|-----|------|---------------|-------------|";
  let rows = projectData.map((entry) => {
    const day = entry.day || "unknown";
    const name = `${entry.staff.firstname} ${entry.staff.name}`;
    const workingHours = parseFloat(entry.workinghours).toFixed(4);
    const description = entry.description.replace(
      /#(\d+)/g,
      "[$&](https://github.com/cismet/wupp/issues/$1)"
    );

    return `| ${day} | ${name} | ${getFormatedWorkingHours(
      parseFloat(workingHours)
    )} | ${description} |`;
  });

  // Calculate total working hours
  const totalHours = projectData.reduce(
    (sum, entry) => sum + parseFloat(entry.workinghours),
    0
  );

  const totalRow = `| **Total** |  | **${totalHours.toFixed(
    2
  )} (${getFormatedWorkingHours(totalHours.toFixed(2))})** |  |`;

  // console.log(
  //   totalHours.toFixed(2),
  //   getFormatedWorkingHours(totalHours.toFixed(2))
  // );

  // Sort rows by day, name, and working hours
  rows.sort((a, b) => {
    const [dayA, nameA, hoursA] = a.split(" | ").map((s) => s.trim());
    const [dayB, nameB, hoursB] = b.split(" | ").map((s) => s.trim());
    if (dayA !== dayB) return dayA.localeCompare(dayB);
    if (nameA !== nameB) return nameA.localeCompare(nameB);
    return parseFloat(hoursB) - parseFloat(hoursA);
  });

  return [header, separator, ...rows, totalRow].join("\n");
}

function getFormatedWorkingHours(workingHours: number): string {
  const sign = workingHours < 0 ? "-" : "";
  const absoluteWorkingHours = Math.abs(workingHours);
  const hours = Math.floor(absoluteWorkingHours);
  const minutes = Math.round((absoluteWorkingHours - hours) * 60);

  return `${sign}${hours}:${minutes.toString().padStart(2, "0")}h`;
}
