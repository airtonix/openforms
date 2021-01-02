import copyToClipboard from 'copy-to-clipboard'
import { useState, useRef, useEffect, useCallback } from 'react'


export type UseCopyAction = () => void
export type UseCopySetState = (value: boolean) => void
export type UseCopyState = boolean
export type UseCopyResponse = [
  UseCopyState,
  UseCopyAction,
  UseCopySetState
]

// https://github.com/animify/useCopy/blob/master/src/index.ts
export function useCopy (str: string): UseCopyResponse {
  const copyableString = useRef<string>(str)
  const [isCopied, setCopied] = useState<UseCopyState>(false)

  const copyAction = useCallback(() => {
    const hasBeenCopied = copyToClipboard(copyableString.current)
    setCopied(hasBeenCopied)
  }, [copyableString])

  useEffect(() => {
    copyableString.current = str
  }, [str])

  return [isCopied, copyAction, setCopied]
}
