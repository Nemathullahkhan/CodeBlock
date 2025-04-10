"use client"

import { Button } from "@/components/ui/button"
import React, { useState } from "react"

export interface IllustrationProps {
  illustration?: {
    explanation: string | null
    summary: string | null | undefined
    tips: string[]
    images: string[]
  } | null
}

export default function Illustration({ illustration }: IllustrationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const imagesLength = illustration?.images?.length || 0

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesLength)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagesLength - 1 : prevIndex - 1))
  }

  if (!illustration) return null

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-50 px-6 mb-6">Illustration</h2>

      {/* Slideshow Section */}
      <div className="flex justify-center">
        <div className="w-[600px]">
          {/* Image Container */}
          <div className="relative aspect-[2/1] overflow-hidden rounded-t-lg border border-zinc-800/50">
            <img
              src={illustration.images[currentIndex] || "/placeholder.svg"}
              alt={`Illustration ${currentIndex + 1}`}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center bg-zinc-900 p-3 rounded-b-lg border-t border-zinc-800/50">
            <Button onClick={goToPrevious} variant="outline" className="h-8 bg-black text-white hover:bg-zinc-700">
              Previous
            </Button>
            <p className="text-gray-300">
              <span className="text-green-400 px-1 font-semibold">{currentIndex + 1}</span>/{" "}
              {illustration.images.length}
            </p>
            <Button onClick={goToNext} variant="outline" className="h-8 bg-white text-black hover:bg-zinc-200">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="bg-zinc-900 p-6 rounded-xl text-gray-300 mt-8">
        <div className="text-gray-300 leading-7">
          {illustration.explanation
            ?.replace(/\\n/g, "\n") // Replace literal '\n' with actual newline characters
            .split("\n") // Split by actual newline characters
            .map((step, index, linesArray) => (
              <React.Fragment key={index}>
                <p>{step}</p>
                {index !== linesArray.length - 1 && (
                  <div className="h-4"></div> // Increased spacing between paragraphs
                )}
              </React.Fragment>
            ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold tracking-tight px-6 mb-4">Implementation tips</h3>
        <div className="space-y-2">
          {illustration.tips?.map((tip, idx) => (
            <p className="px-8 text-gray-300" key={idx}>
              <span className="text-gray-600 font-bold mr-2">-</span> {tip}
            </p>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold tracking-tight text-gray-50 px-6 mb-4">Summary</h3>
        <p className="text-gray-300 leading-7 px-8">{illustration.summary}</p>
      </div>
    </section>
  )
}

