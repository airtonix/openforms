import { useState, useEffect } from 'react'
import copy from 'copy-to-clipboard'

export type CopyableContentType = string | number
export type UseCopyToCliboardHookState = boolean
export type UseCopyToCliboardHookStateSetter = (text: CopyableContentType) => void


export function useCopyToClipboard (
  resetTimeout: number
): [ UseCopyToCliboardHookState, UseCopyToCliboardHookStateSetter ] {
  const [isCopied, setCopied] = useState(false)

  function handleCopy (text: CopyableContentType) {
    if (typeof text === 'string' || typeof text == 'number') {
      copy(text.toString())
      setCopied(true)
    } else {
      setCopied(false)
      console?.error(
        `Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`
      )
    }
  }

  useEffect(() => {
    let timeout: number
    if (isCopied && resetTimeout > 0) {
      timeout = window.setTimeout(() => {
        setCopied(false)
      }, resetTimeout)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [isCopied, resetTimeout])

  return [isCopied, handleCopy]
}
