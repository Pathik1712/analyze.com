import { useState } from "react"

type Props = {
  data: object[]
  setDataRange: React.Dispatch<React.SetStateAction<object[]>>
}

const InputRange = ({ data, setDataRange }: Props) => {
  const [value, setValue] = useState(100)
  return (
    <>
      <input
        type="range"
        defaultValue={value}
        onChange={(e) => {
          setValue(parseInt(e.target.value))
        }}
      />
      <span>
        <button
          onClick={() => {
            const num = (value * data.length) / 100
            setDataRange([...data.slice(0, Math.floor(num))])
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }}
        >
          Select
        </button>{" "}
        {value}% Data
      </span>
    </>
  )
}

export default InputRange
