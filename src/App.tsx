/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9sQ0rSmy3Ga
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heading1Icon } from "lucide-react";

export default function Component() {
  const [filters, setFilters] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const projects = [
    {
      id: "10_ALKIS_Upgrade_2024",
      title: "ALKIS Umstellung",
      description: "der Benutzungskomponente",
      tags: ["WuNDa", "vor RV"],
      budget: 40,
      progress: 20,
    },
    {
      id: "10_Altlastenkataster",
      title: "Altlastenkataster",
      description: "10_Altlastenkataster",
      tags: ["WuNDa", "vor RV"],

      budget: 0,
      progress: 0,
    },
    {
      id: "10_DZ_B_3DI_3D_und_Integration",
      title: "DZ_B_3DI",
      description: "3D und Integration",
      tags: ["DZ"],
      budget: 0,
      progress: 0,
    },
    {
      id: "10_DZ_B_GA0_GenApp0",
      title: "DZ_B_GA0",
      description: "GenApp0",
      tags: ["DZ"],
      budget: 0,
      progress: 0,
    },
    {
      id: "10_DZ_B_KHB_Konventionenhandbuch",
      title: "DZ_B_KHB",
      description: "Konventionenhandbuch",
      tags: ["DZ"],
      budget: 0,
      progress: 0,
    },
    {
      id: "10_DZ_B_QTZ1-TopicMaps2Zwilling",
      title: "DZ_B_QTZ1",
      description: "TopicMaps2Zwilling",
      tags: ["DZ"],
      budget: 0,
      progress: 0,
    },
    {
      id: "10_EUS_Sandra",
      title: "EUS_Sandra",
      description: "10_EUS_Sandra",
      tags: ["WuNDa", "vor RV"],
      budget: 0,
      progress: 0,
    },
    {
      id: "60_ALWIS Kontingent",
      title: "ALWIS Kontingent",
      description: "Wartungskontingent",
      tags: ["WuNDa", "Kontingent"],
      budget: 0,
      progress: 0,
    },
    {
      id: "60_BelIS Kontingent",
      title: "BelIS Kontingent",
      description: "Wartungskontingent",
      tags: ["BelIS", "Kontingent"],
      budget: 0,
      progress: 0,
    },
    {
      id: "60_LagIS Kontingent",
      title: "LagIS Kontingent",
      description: "Wartungskontingent",
      tags: ["LagIS", "Kontingent"],
      budget: 0,
      progress: 0,
    },
    {
      id: "60_Umwelt Kontingent",
      title: "Umwelt Kontingent",
      description: "Wartungskontingent",
      tags: ["Umwelt", "Kontingent"],
      budget: 0,
      progress: 0,
    },
    {
      id: "60_VerdIS Kontingent",
      title: "VerdIS Kontingent",
      description: "Warungskontingent",
      tags: ["VerdIS", "Kontingent"],
      budget: 0,
      progress: 0,
    },
    {
      id: "60_WuNDa Kontingent",
      title: "WuNDa Kontingent",
      description: "Warungskontingent",
      tags: ["WuNDa", "Kontingent"],
      budget: 0,
      progress: 0,
    },
    // {
    //   id: "70_W_B_Sec_DMZ_Infrastruktur",
    //   title: "W_B_Sec_DMZ_Infrastruktur",
    //   description: "70_W_B_Sec_DMZ_Infrastruktur",
    //   tags: [],
    //   budget: 0,
    //   progress: 0,
    // },
    // {
    //   id: "70_WuNDa Konsolidierung 2021",
    //   title: "WuNDa Konsolidierung 2021",
    //   description: "70_WuNDa Konsolidierung 2021",
    //   tags: [],
    //   budget: 0,
    //   progress: 0,
    // },
    // {
    //   id: "80_Wartung",
    //   title: "Wartung",
    //   description: "80_Wartung",
    //   tags: [],
    //   budget: 0,
    //   progress: 0,
    // },
    // {
    //   id: "90_Akquise",
    //   title: "Akquise",
    //   description: "90_Akquise",
    //   tags: [],
    //   budget: 0,
    //   progress: 0,
    // },
  ];
  const filteredProjects = projects.filter((project) =>
    filters.every((tag) => project.tags.includes(tag))
  );
  const toggleFilter = (tag) => {
    if (filters.includes(tag)) {
      setFilters(filters.filter((f) => f !== tag));
    } else {
      setFilters([...filters, tag]);
    }
  };

  const colorConfig = {
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
    TopicsMaps: {
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

  const tags = Object.keys(colorConfig).filter((tag) => tag !== "default");

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
                  variant={filters.includes(tag) ? "filled" : "outline"}
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
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button>Login</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id}>
            <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
              <div className="text-4xl font-bold">{project.budget}</div>
              <div className="text-lg font-medium">{project.title}</div>
              <Progress value={project.progress} className="w-full" />
              {/* <Progress value={project.progress} className="w-full">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {project.progress}%
                </span>{" "}
              </Progress> */}
              {/* <Progress value={50} className="w-full" /> */}
              <div className="text-gray-500 dark:text-gray-400">
                {project.description}
              </div>
              <div className="flex gap-2 mt-4">
                {project.tags.map((tag) => {
                  const config = colorConfig[tag] || colorConfig.default;
                  return (
                    <Badge
                      key={tag}
                      variant={filters.includes(tag) ? "filled" : "outline"}
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {["DZ", "Wunda", "Marketing", "Design", "Engineering", "Data"].map(
              (tag) => (
                <Badge
                  key={tag}
                  variant={filters.includes(tag) ? "filled" : "outline"}
                  className={`${
                    tag === "Support"
                      ? "border-green-600"
                      : tag === "DZ"
                      ? "border-blue-600"
                      : tag === "Wunda"
                      ? "border-orange-600"
                      : tag === "Marketing"
                      ? "border-pink-600"
                      : tag === "Design"
                      ? "border-purple-600"
                      : tag === "Engineering"
                      ? "border-indigo-600"
                      : "border-gray-600"
                  } ${
                    filters.includes(tag)
                      ? `${
                          tag === "Support"
                            ? "bg-green-600"
                            : tag === "DZ"
                            ? "bg-blue-600"
                            : tag === "Wunda"
                            ? "bg-orange-600"
                            : tag === "Marketing"
                            ? "bg-pink-600"
                            : tag === "Design"
                            ? "bg-purple-600"
                            : tag === "Engineering"
                            ? "bg-indigo-600"
                            : "bg-gray-600"
                        } text-white`
                      : "white dark:bg-gray-950 text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => toggleFilter(tag)}
                >
                  {tag}
                </Badge>
              )
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button>Login</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id}>
            <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
              <div className="text-4xl font-bold">{project.budget}</div>
              <div className="text-lg font-medium">{project.title}</div>
              <Progress value={project.progress} className="w-full" />
              <div className="text-gray-500 dark:text-gray-400">
                {project.description}
              </div>
              <div className="flex gap-2 mt-4">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={filters.includes(tag) ? "filled" : "outline"}
                    className={`${
                      tag === "Support"
                        ? "border-green-600"
                        : tag === "DZ"
                        ? "border-blue-600"
                        : tag === "Wunda"
                        ? "border-orange-600"
                        : tag === "Marketing"
                        ? "border-pink-600"
                        : tag === "Design"
                        ? "border-purple-600"
                        : tag === "Engineering"
                        ? "border-indigo-600"
                        : "border-gray-600"
                    } ${
                      filters.includes(tag)
                        ? `${
                            tag === "Support"
                              ? "bg-green-600"
                              : tag === "DZ"
                              ? "bg-blue-600"
                              : tag === "Wunda"
                              ? "bg-orange-600"
                              : tag === "Marketing"
                              ? "bg-pink-600"
                              : tag === "Design"
                              ? "bg-purple-600"
                              : tag === "Engineering"
                              ? "bg-indigo-600"
                              : "bg-gray-600"
                          } text-white`
                        : "white dark:bg-gray-950 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
