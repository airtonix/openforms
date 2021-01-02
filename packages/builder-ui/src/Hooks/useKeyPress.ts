import { useEffect, useState } from 'react';

/**
 * converted to typescript from https://usehooks.com/useKeyPress/
 * See: https://developer.mozilla.org/en-US/docs/Web/API/SyntheticEvent/key/Key_Values
 * for a list of key values
 * @param targetKey string
 */
export function useKeyPress(
  targetKey: string,
  options?: {
    onKeyPressed?: (event: KeyboardEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
  }
): boolean {
  const { onKeyDown, onKeyPressed, onKeyUp } = options || {};
  // State for keeping track of whether key is pressed
  const [isKeyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    if (key === targetKey) {
      setKeyPressed(true);
      if (typeof onKeyDown === 'function') onKeyDown(event);
    }
  }

  // If released key is our target key then set to false
  function handleKeyUp(event: KeyboardEvent) {
    const { key } = event;
    if (key === targetKey) {
      setKeyPressed(false);
      if (typeof onKeyUp === 'function') onKeyUp(event);
      if (typeof onKeyPressed === 'function') onKeyPressed(event);
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isKeyPressed;
}
