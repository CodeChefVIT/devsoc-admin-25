import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { handleCopy } from '@/lib/utils'

const CopyLabel = ({label}:{label:string}) => {
  return (
    <div>
      <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="hover:cursor-pointer" asChild>
              <span
                className="relative block max-w-[120px] cursor-pointer truncate text-ellipsis capitalize whitespace-nowrap text-white"
                onClick={() => handleCopy(label)}
              >
                {label}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    </div>
  )
}

export default CopyLabel
