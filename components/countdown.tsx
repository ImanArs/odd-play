"use client"

import { useState, useEffect } from "react"

export function Countdown() {
  const [count, setCount] = useState(3)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const sequence = [3, 2, 1, "GO!"]
    let currentIndex = 0

    const timer = setInterval(() => {
      if (currentIndex < sequence.length) {
        setCount(sequence[currentIndex] as number)
        currentIndex++
      } else {
        setShow(false)
        clearInterval(timer)
      }
    }, 500)

    return () => clearInterval(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-sky-300 to-sky-200">
      <div
        className="
          countdown-text
          animate-in zoom-in-50 duration-300
          animate-out zoom-out-50 slide-out-to-top-4
        "
        key={count}
      >
        {count}
      </div>
    </div>
  )
}
