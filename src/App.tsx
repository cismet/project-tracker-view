import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import { createMarkdownTableFromProjectData } from "./lib/utils";

interface Project {
  id: string;
  budget: number;
  title: string;
  description: string;
  tags: string[];
  visible: boolean;
  isLoading?: boolean;
  balance?: number;
  progress?: number;
  details?: string;
  github?: string;
  hideDetails?: boolean;
  datefrom?: string;
}

export default function Component() {
  const [filters, setFilters] = useState<string[]>([]);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const projectsRef = useRef([]);
  const [projectsConfig, setProjectsConfig] = useState([]);

  useEffect(() => {
    projectsRef.current = projects;
  }, [projects]);

  useEffect(() => {
    console.log("init");

    const storedLogin = localStorage.getItem("login");
    const storedPassword = localStorage.getItem("password");
    if (storedLogin && storedPassword) {
      setLogin(storedLogin);
      setPassword(storedPassword);
      setIsLoggedIn(true);
    }

    fetch("./conf/projects.json")
      .then((response) => response.json())
      .then((data) => {
        const updatedProjects = data.map((project: Project) => ({
          ...project,
          visible: false,
        }));
        setProjectsConfig(updatedProjects);
      })
      .catch((error) => console.error("Error loading projects:", error));
  }, []);

  useEffect(() => {
    if (projectsConfig.length > 0) {
      setProjects(projectsConfig);
      setTimeout(() => {
        handleRefresh();
      }, 1000);
    }
  }, [projectsConfig]);

  const handleLogin = () => {
    localStorage.setItem("login", login);
    localStorage.setItem("password", password);
    setIsLoggedIn(true);
    handleRefresh();
  };

  const handleLogout = () => {
    localStorage.removeItem("password");
    setPassword("");
    setIsLoggedIn(false);
    handleRefresh();
  };

  const handleRefresh = async () => {
    if (projectsRef.current) {
      for (const project of projectsRef.current) {
        refreshProject(project);
      }
    }
  };

  const refreshProject = async (project: Project) => {
    project.isLoading = true;
    setProjects((prevProjects) => [...prevProjects]);

    let datefilter = "";
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const formattedToday = `${yyyy}-${mm}-${dd}`;

    if (project.datefrom) {
      datefilter = `${project.datefrom}:${formattedToday}`;
    } else {
      datefilter = "1900-01-01:" + formattedToday;
    }

    const url = `https://tracker.cismet.de/ProjectTracker/ProjectTracker/Search?username=${login}&password=${password}&project=Wuppertal&workpackage=${project.id}&details=true&datefilter=${datefilter}`;

    try {
      const response = await fetch(url, { method: "GET", mode: "cors" });

      if (!response.ok) {
        // if (response.status === 403) {
        //   // Suppress log for permission errors
        //   console.warn(`No permission to access project ${project.id}`);
        // } else {
        //   throw new Error(`Error fetching data: ${response.statusText}`);
        // }
        return project; // Return the project as-is if there's an error
      }

      const data = await response.json();
      // console.log(project.id, JSON.stringify(data, null, 2));

      const balance = data.reduce(
        (sum: number, entry: { workinghours: number }) =>
          sum + entry.workinghours,
        0
      );
      const projectHours = project.budget * 8;
      const done = balance + projectHours;
      const progress = (done / projectHours) * 100;

      project.balance = balance;
      project.progress = progress;
      project.visible = true;
      project.details = createMarkdownTableFromProjectData(data);
      // console.log(project.id, project.details);
    } catch (error) {
      // console.error(`Error fetching data for project ${project.id}:`, error);
    } finally {
      project.isLoading = false;
      setProjects((prevProjects) => [...prevProjects]);
    }
  };

  let filteredProjects: Project[] = [];
  if (projectsRef.current) {
    filteredProjects = projectsRef.current.filter((project: Project) =>
      filters.every((tag) => project.tags?.includes(tag))
    );
  }
  const toggleFilter = (tag: string) => {
    if (filters.includes(tag)) {
      setFilters(filters.filter((f) => f !== tag));
    } else {
      setFilters([...filters, tag]);
    }
  };

  const colorConfig: { [key: string]: { border: string; bg: string } } = {
    DZ: {
      border: "border-blue-600",
      bg: "bg-blue-600",
    },
    WuNDa: {
      border: "border-orange-600",
      bg: "bg-orange-600",
    },
    LagIS: {
      border: "border-green-600",
      bg: "bg-green-600",
    },
    VerDIS: {
      border: "border-pink-600",
      bg: "bg-pink-600",
    },
    BelIS: {
      border: "border-purple-600",
      bg: "bg-purple-600",
    },
    TopicMaps: {
      border: "border-indigo-600",
      bg: "bg-indigo-600",
    },
    Kontingent: {
      border: "border-yellow-600",
      bg: "bg-indigo-600",
    },
    "vor RV": {
      border: "border-gray-600",
      bg: "bg-gray-600",
    },
    Umwelt: {
      // New color for Analytics
      border: "border-teal-600",
      bg: "bg-teal-600",
    },
    default: {
      border: "border-gray-600",
      bg: "bg-gray-600",
    },
  };

  const tags = Object.keys(colorConfig).filter((tag) => {
    if (tag === "default") {
      return false;
    } else {
      return projectsRef.current.some(
        (project: Project) => project.visible && project.tags.includes(tag)
      );
    }
  });

  return (
    <div
      key={"div" + isLoggedIn}
      className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <Progress value={100} />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const config = colorConfig[tag] || colorConfig.default;
              return (
                <Badge
                  key={tag}
                  variant={filters.includes(tag) ? "destructive" : "outline"}
                  className={`${config.border} ${
                    filters.includes(tag)
                      ? `${config.bg} text-white`
                      : "white dark:bg-gray-950 text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => toggleFilter(tag)}
                >
                  {tag}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Input
                disabled={true}
                type="login"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <Input
                disabled={true}
                type="password"
                placeholder="Password"
                value={"password"}
              />

              <Button onClick={handleRefresh}>Refresh</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Input
                type="login"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleLogin}>Login</Button>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          if (project.visible) {
            return (
              <Card
                key={project.id}
                className={project.isLoading ? "loading" : ""}
              >
                <div className="relative">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="absolute top-2 right-2">
                        <FontAwesomeIcon icon={faGithub} />
                      </button>
                    </a>
                  )}
                  {project.hideDetails !== true && (
                    <button
                      onClick={() => {
                        navigator.clipboard
                          .writeText(project?.details || "empty")
                          .then(() => {
                            console.log("Text copied to clipboard");
                          })
                          .catch((err) => {
                            console.error("Failed to copy text: ", err);
                          });
                      }}
                      className="absolute top-2 left-2"
                    >
                      <FontAwesomeIcon icon={faTableCells} />
                    </button>
                  )}
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                    <div className="text-4xl font-bold">{project.budget}</div>
                    <div className="text-lg font-medium">{project.title}</div>
                    <div className="relative w-full">
                      <Progress
                        value={
                          (project?.progress || 0) > 100
                            ? 100
                            : project?.progress || 0
                        }
                        className="w-full"
                      />

                      {project.progress !== undefined &&
                        !isNaN(project.progress) && (
                          <div className="absolute inset-0 flex items-center justify-center text-black font-light">
                            {Math.round(project.progress)}%
                          </div>
                        )}
                    </div>

                    <div className="text-gray-500 dark:text-gray-400">
                      {project.description}
                    </div>
                    <div className="flex gap-2 mt-4">
                      {project.tags.map((tag) => {
                        const config = colorConfig[tag] || colorConfig.default;
                        return (
                          <Badge
                            key={tag}
                            variant={
                              filters.includes(tag) ? "default" : "outline"
                            }
                            className={`${config.border} ${
                              filters.includes(tag)
                                ? `${config.bg} text-white`
                                : "white dark:bg-gray-950 text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {tag}
                          </Badge>
                        );
                      })}
                    </div>
                    {/* <Button variant="outline" className="mt-4">
                    Report
                  </Button> */}
                  </CardContent>
                </div>
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
}
