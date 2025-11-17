import React, { use, useCallback, useEffect, useRef, useState } from 'react'

const App = () => {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);

  const PasswordGenerater = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*(){}:<>.,?|"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  }
    , [length, charAllowed, numAllowed, setPassword])

  const passwordRef = useRef(null)

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    PasswordGenerater()
  }, [length, numAllowed, charAllowed, PasswordGenerater])

  return (
    <div className='bg-black text-white min-h-screen p-20'>
      <div className=' p-10 w-full bg-gray-800 rounded-xl h-96'>
        <h1 className='flex justify-center  text-3xl'>Password Generater</h1>
        <div className='flex justify-center gap-3 mt-6'>
          <input type="text"
            className='bg-white text-black py-3 w-3/4 rounded-2xl px-4'
            readOnly
            ref={passwordRef}
            value={password}
          />
          <button className='bg-green-500 rounded-lg hover:bg-green-300 text-black px-3'
            onClick={copyToClipboard}
          >Copy</button>
        </div>

        <div className=' flex  gap-10 justify-center pt-10'>

          <div className='flex gap-2 '> 
            <input type="range"

              min={8}
              max={100}
              name="" id=""
              value={length}
              onChange={(e) => { setLength(e.target.value) }} />
            <label >length : {length}</label>
          </div>


          <div className='flex gap-2 ju'> <input type="checkbox" name="" id="numberInp"
            defaultChecked={setNumAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev)
            }}
          />
            <label htmlFor="">numbers</label></div>

          <div className='flex gap-2'>

            <input type="checkbox" name="" id="charInp"
              defaultChecked={setCharAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="">character</label>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App