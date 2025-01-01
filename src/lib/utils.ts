/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(dateString: string | Date): string {
  const now: Date = new Date();
  const pastDate: Date = new Date(dateString);
  const secondsDiff = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const intervals = [
    { label: "Year", seconds: 31536000 },
    { label: "Month", seconds: 2592000 },
    { label: "Day", seconds: 86400 },
    { label: "Hour", seconds: 3600 },
    { label: "Minute", seconds: 60 },
    { label: "Second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsDiff / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} Ago`;
    }
  }

  return "Just Now";
}

export function convertJobLocation(jobLocationString: string): string[] {
  const locations = jobLocationString.split(",");
  const jobLocationArray: string[] = [];

  for (let i = 0; i < locations.length; i += 2) {
    if (i + 1 < locations.length) {
      jobLocationArray.push(
        `${locations[i].trim()}, ${locations[i + 1].trim()}`
      );
    }
  }

  return jobLocationArray;
}

export function getJobWorkPlaceType(job: any) {
  if (!job) return { status: "Unknown", backgroundColor: "#FFFFFF" };

  let status = "";
  let backgroundColor = "";

  if (job === "remote") {
    status = "Remote";
    backgroundColor = "#DBC3FF";
  } else if (job === "hybrid") {
    status = "Hybrid";
    backgroundColor = "#FFE6BD";
  } else if (job === "on-site") {
    status = "On-site";
    backgroundColor = "#DCF7E8";
  } else {
    status = job;
    backgroundColor = "#FFFFFF";
  }

  return { status, backgroundColor };
}
