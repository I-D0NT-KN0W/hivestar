"use client"

import * as React from "react"
import { SliderProps } from "@radix-ui/react-slider"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface TemperatureSelectorProps {
  defaultValue: SliderProps["defaultValue"]
}

export function Votes({
  defaultValue,
}: TemperatureSelectorProps) {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div className="grid gap-2 pt-2">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Vote</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="temperature"
              max={100}
              defaultValue={value}
              step={10}
              onValueChange={setValue}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="vote"
            />
          </div>
    </div>
  )
}