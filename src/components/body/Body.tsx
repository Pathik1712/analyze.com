import React, { useCallback, useId, useState } from "react"
import "./style.scss"
import papa from "papaparse"

const Body = () => {
  const id = useId()

  const [file, setFile] = useState("")
  const [data, setData] = useState(null)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.value)
    papa.parse(e.target.files![0], {
      delimiter: ",",
      header: true,
      complete(results) {
        console.log(results)
      },
    })
  }
  return (
    <div className="body">
      <ul>
        <h2>File:</h2>
        <li>press select file button</li>
        <li>Locate the CSV file you want to convert to a graph.</li>
        <li>file must be in csv formate</li>
        <h2>Charts:</h2>
        <li>select the graph you want to visulize your data in </li>
        <li>Select the appropriate data columns for the X and Y axes.</li>
        <li>Choose the desired graph type </li>
        <li>Download the generated graph as an image </li>
      </ul>
      <input
        type="file"
        value={file}
        onClick={() => {
          setFile("")
        }}
        onChange={handleChange}
        id={id}
        multiple={false}
        // accept=".csv/text/csv"
      />
      <label htmlFor={id}>Select File 📂</label>
      {data}
    </div>
  )
}

export default Body
