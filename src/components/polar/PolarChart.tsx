import React, { useCallback, useState } from "react"
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { PolarArea } from "react-chartjs-2"

type Props = {
  headerList: string[]
  data: object[]
  color: string[]
}

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

const PolarChart = ({ color, data, headerList }: Props) => {
  const [selectedHeaders, set_selectedHeaders] = useState("")
  const [info, set_info] = useState<number[]>([])

  const [label, set_label] = useState<string[]>([])

  const handleLabel = useCallback(
    (_e: React.ChangeEvent<HTMLInputElement>, item: string) => {
      const obj: Record<string, number> = {}
      const early_data = data.map((i) => (i as Record<string, unknown>)[item])
      if (typeof early_data[0] !== "number") {
        data.forEach((i) => {
          Object.prototype.hasOwnProperty.call(
            obj,
            (i as Record<string, string | number>)[selectedHeaders]
          )
            ? (obj[(i as Record<string, string | number>)[selectedHeaders]] = 1)
            : (obj[(i as Record<string, string | number>)[selectedHeaders]] =
                obj[(i as Record<string, string | number>)[selectedHeaders]] +
                1)
        })
        set_info(Object.keys(obj).map((i) => obj[i]))
        set_label(Object.keys(obj))
      } else {
        data.forEach((i) => {
          Object.prototype.hasOwnProperty.call(
            obj,
            (i as Record<string, string | number>)[selectedHeaders]
          )
            ? (obj[(i as Record<string, string | number>)[selectedHeaders]] = (
                i as Record<string, number>
              )[item])
            : (obj[(i as Record<string, string | number>)[selectedHeaders]] =
                obj[(i as Record<string, string | number>)[selectedHeaders]] +
                (i as Record<string, number>)[item])
        })
        set_info(Object.keys(obj).map((i) => obj[i]))
        set_label(Object.keys(obj))
      }
    },
    [data, selectedHeaders]
  )

  return (
    <div className="bar-graph-div ">
      <section>
        <h4>select attribute:</h4>
        <select
          className="select-graph"
          defaultValue={""}
          onChange={(e) => {
            set_selectedHeaders(e.target.value)
          }}
        >
          <option
            value=""
            hidden
            disabled
          >
            --Select Data Type--
          </option>
          {headerList.map((i, num) => (
            <option
              value={i}
              key={`option-${num}`}
            >
              {i}
            </option>
          ))}
        </select>
      </section>
      <section>
        <h4>Select Header For Value</h4>
        {headerList.map(
          (i, num) =>
            i !== selectedHeaders && (
              <div key={`bar-y-${num}`}>
                <input
                  name="polar-chart"
                  type="radio"
                  id={`bar-yAxes-id-${num}`}
                  onChange={(e) => handleLabel(e, i)}
                />
                <label htmlFor={`bar-yAxes-id-${num}`}>{i}</label>
              </div>
            )
        )}
      </section>
      {selectedHeaders !== "" && info.length !== 0 && (
        <PolarArea
          className="graph-anm"
          data={{
            labels: label,
            datasets: [
              {
                data: info,
                backgroundColor: color,
              },
            ],
          }}
        />
      )}
    </div>
  )
}

export default PolarChart
