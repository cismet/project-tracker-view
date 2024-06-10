/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9sQ0rSmy3Ga
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

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
      id: 1,
      budget: 120,
      progress: 80,
      title: "Website Redesign",
      description: "Revamp the company website with a modern design.",
      tags: ["Support", "DZ", "Wunda"],
    },
    {
      id: 2,
      budget: 90,
      progress: 60,
      title: "Mobile App Development",
      description: "Build a new mobile app for our customers.",
      tags: ["Support", "DZ"],
    },
    {
      id: 3,
      budget: 180,
      progress: 40,
      title: "ERP System Implementation",
      description: "Implement a new enterprise resource planning system.",
      tags: ["Wunda"],
    },
    {
      id: 4,
      budget: 150,
      progress: 70,
      title: "Marketing Campaign",
      description:
        "Launch a new marketing campaign to increase brand awareness.",
      tags: ["Marketing", "Design", "DZ"],
    },
    {
      id: 5,
      budget: 100,
      progress: 90,
      title: "Customer Support Automation",
      description: "Implement a new customer support automation system.",
      tags: ["Support", "Engineering"],
    },
    {
      id: 6,
      budget: 200,
      progress: 30,
      title: "Data Analytics Platform",
      description: "Build a new data analytics platform for business insights.",
      tags: ["Data", "Engineering", "DZ"],
    },
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
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-green-600">Hi Hi</h1>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              "Support",
              "DZ",
              "Wunda",
              "Marketing",
              "Design",
              "Engineering",
              "Data",
            ].map((tag) => (
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
                    : "gray-600"
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
            ))}
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
