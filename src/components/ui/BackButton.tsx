import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export function BackButton() {
  return (
    <Button variant="outline" size="icon" >
      <ChevronLeft />
    </Button>
  )
}
