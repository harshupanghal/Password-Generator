import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
      <h1 className="text-5xl font-bold mb-7">Password Generator</h1>
      <div className="w-full max-w-md shadow-lg rounded-lg px-4 py-3 mb-8">
        <div className="relative mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="absolute top-0 right-0 mt-1 mr-2 bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800 focus:outline-none"
          >
            Copy
          </button>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="flex-1 w-full mr-2 appearance-none bg-gray-800 h-1 rounded cursor-pointer"
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label className="text-sm">{length} characters</label>
        </div>
        <div className="flex items-center gap-x-0.5 text-sm">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => { setNumberAllowed((prev) => !prev); }}
            className="mr-1"
          />
          <label htmlFor="numberInput" className="mr-4">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => { setCharAllowed((prev) => !prev); }}
            className="mr-1"
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
