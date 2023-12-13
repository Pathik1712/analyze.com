import React, { useCallback, useId, useState } from "react"
import "./style.scss"
import papa from "papaparse"
import toast from "react-hot-toast"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Body = () => {
  const id = useId()

  const [file, setFile] = useState("")
  const [data, setData] = useState<object[]>([])
  const [header, setHearder] = useState<string[]>([])
  const [selectedData, set_selectedData] = useState<string[]>([])

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setFile(e.target.value)
      if (!e.target.files![0].name.includes("csv")) {
        toast.error("please select csv file")
        setFile("")
        return
      }
      papa.parse(e.target.files![0], {
        delimiter: ",",
        dynamicTyping: true,
        header: true,
        complete(results) {
          if (results.data.length === 0) {
            return toast.error("file is empty")
          }
          console.log(results.data)
          const arr = Object.keys(results.data[0]!).map((key) => key)
          setHearder(arr)
          setData(results.data as object[])
        },
      })
    },
    []
  )

  const handleTitleSelect = useCallback(
    (name: string) => {
      setHearder(header.filter((i) => i !== name))
      set_selectedData([...selectedData, name])
    },
    [header, selectedData]
  )

  const handleRemove = useCallback(
    (name: string) => {
      set_selectedData(selectedData.filter((i) => i !== name))
      setHearder([...header, name])
    },
    [header, selectedData]
  )

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
      />
      <label htmlFor={id}>Select File 📂</label>
      {data.length !== 0 && (
        <section>
          <h3>choose title:</h3>
          {header.map((i, num) => (
            <button
              key={`select-title-${num}`}
              onClick={() => handleTitleSelect(i)}
            >
              {i} +
            </button>
          ))}
        </section>
      )}
      {selectedData.length != 0 && (
        <section className="remove-section">
          <h3>selected title:</h3>
          {selectedData.map((i, num) => (
            <button
              key={`remove-title.${num}`}
              onClick={() => {
                handleRemove(i)
              }}
            >
              {i} -
            </button>
          ))}
        </section>
      )}

      {selectedData.length >= 2 && (
        <Bar
          data={{
            labels: data.map(
              (i) => (i as Record<string, unknown>)[selectedData[0]]
            ),
            datasets: [
              {
                data: data.map(
                  (i) => (i as Record<string, unknown>)[selectedData[1]]
                ),
                backgroundColor: "red",
              },
            ],
          }}
        />
      )}
    </div>
  )
}

export default Body
