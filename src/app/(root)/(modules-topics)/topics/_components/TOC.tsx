"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface Section {
  id: string
  title: string
}

interface TableOfContentsProps {
  sections: Section[]
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -80% 0px" },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [sections])

  return (
    <nav aria-labelledby="toc-heading" className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 id="toc-heading" className="text-xl font-semibold tracking-tight text-gray-50 mb-4">
        On This Page
      </h2>
      <ul className="space-y-3 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              className={cn(
                "group flex items-center py-1 text-gray-400 hover:text-gray-50 transition-colors",
                activeSection === section.id && "text-gray-50 font-medium",
              )}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(section.id)?.scrollIntoView({
                  behavior: "smooth",
                })
                setActiveSection(section.id)
              }}
              aria-current={activeSection === section.id ? "location" : undefined}
            >
              <ChevronRight
                className={cn(
                  "mr-2 h-4 w-4 transition-transform",
                  activeSection === section.id ? "text-gray-50" : "text-gray-500",
                  activeSection === section.id && "transform rotate-90",
                )}
              />
              <span className="truncate">{section.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

