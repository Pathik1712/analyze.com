import React, { useCallback, useEffect, useId, useState } from "react"
import "./style.scss"
import papa from "papaparse"
import toast from "react-hot-toast"

import BarComponent from "../bar/Bar"
import LineComponent from "../line/Line"
import PolarChart from "../polar/PolarChart"
import PieChart from "../pie/PieComponent"
import img from "../../assets/Empty.jpg"

type Graph = "Bar" | "Pie" | "Line" | "Polar" | ""

const Body = () => {
  const id = useId()

  const [file, setFile] = useState("")
  const [data, setData] = useState<object[]>([])
  const [header, setHearder] = useState<string[]>([])
  const [barType, set_barType] = useState<Graph>("")
  const [cleaning, set_cleaning] = useState(false)

  const color = [
    "rgb(255, 99, 132)",
    "rgb(75, 192, 192)",
    "rgb(255, 205, 86)",
    "rgb(201, 203, 207)",
    "rgb(54, 162, 235)",
  ]

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setFile(e.target.value)
      if (!e.target.files![0].name.includes("csv")) {
        toast.error("please select csv file",{
          style: {
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            textTransform:'capitalize',
            fontSize:'1.2rem'
          },
        })
        setFile("")
        return
      }
      papa.parse(e.target.files![0], {
        delimiter: ",",
        dynamicTyping: true,
        header: true,
        complete(results) {
          if (results.data.length === 0) {
            return toast.error("file is empty",{
              style: {
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
              },
            })
          }
          const arr = Object.keys(results.data[0]!).map((key) => key)
          setHearder(arr)
          setData(results.data as object[])
          set_cleaning(true)
        },
      })
    },
    []
  )

  useEffect(() => {
    if (cleaning === true) {
      const load = toast.loading("Cleaning Data", {
        style: {
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
        },
      })
      const arr = data.filter((i) => Object.keys(i).length === header.length)
      setData(arr)
      set_cleaning(false)
      toast.dismiss(load)
    }
  }, [cleaning, data, header.length])

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

      {data.length !== 0 ? (
        <>
          <section className="Title">
            <h3>Titles:</h3>
            {header.map((i, num) => (
              <span key={`select-title-${num}`}>{i}</span>
            ))}
          </section>
          <select
            className="select-graph"
            defaultValue={""}
            onChange={(e) => set_barType(e.target.value as Graph)}
          >
            <option
              value=""
              hidden
              disabled
            >
              --Select Graph Type--
            </option>
            <option value="Bar">Bar</option>
            <option value="Line">Line</option>
            <option value="Polar">Polar</option>
            <option value="Pie">Pie</option>
          </select>
          {/* <input type="range" /> */}
        </>
      ) : (
        <img
          src={img}
          alt=""
          className="Empty-Image"
        />
      )}

      {barType === "Bar" ? (
        <BarComponent
          color={color}
          data={data}
          headerList={header}
        />
      ) : barType === "Line" ? (
        <LineComponent
          color={color}
          data={data}
          headerList={header}
        />
      ) : barType === "Polar" ? (
        <PolarChart
          color={color}
          data={data}
          headerList={header}
        />
      ) : barType === "Pie" ? (
        <PieChart
          color={color}
          data={data}
          headerList={header}
        />
      ) : (
        ""
      )}
    </div>
  )
}

export default Body
