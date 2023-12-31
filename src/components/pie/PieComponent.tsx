import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Pie } from "react-chartjs-2"

type Props = {
  headerList: string[]
  data: object[]
  color: string[]
}

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

const PieChart = React.memo(({ color, data, headerList }: Props) => {
  const [selectedHeaders, set_selectedHeaders] = useState("")
  const [info, set_info] = useState<number[]>([])

  const [label, set_label] = useState<string[]>([])

  const [yLabel, setYlabel] = useState("")

  const memo_data = useMemo(() => {
    return data
  }, [data])

  const handleLabel = useCallback(
    (_e: React.ChangeEvent<HTMLInputElement> | null, item: string) => {
      const obj: Record<string, number> = {}
      setYlabel(item)
      const early_data = memo_data.map(
        (i) => (i as Record<string, unknown>)[item]
      )
      if (typeof early_data[0] !== "number") {
        memo_data.forEach((i) => {
          !Object.prototype.hasOwnProperty.call(
            obj,
            (i as Record<string, string | number>)[selectedHeaders]
              .toString()
              .toUpperCase()
          )
            ? (obj[
                (i as Record<string, string | number>)[selectedHeaders]
                  .toString()
                  .toUpperCase()
              ] = 1)
            : (obj[
                (i as Record<string, string | number>)[selectedHeaders]
                  .toString()
                  .toUpperCase()
              ] =
                obj[
                  (i as Record<string, string | number>)[selectedHeaders]
                    .toString()
                    .toUpperCase()
                ] + 1)
        })
        set_info(Object.keys(obj).map((i) => obj[i]))
        set_label(Object.keys(obj))
      } else {
        memo_data.forEach((i) => {
          !Object.prototype.hasOwnProperty.call(
            obj,
            (i as Record<string, string | number>)[selectedHeaders]
              .toString()
              .toUpperCase()
          )
            ? (obj[
                (i as Record<string, string | number>)[selectedHeaders]
                  .toString()
                  .toUpperCase()
              ] = (i as Record<string, number>)[item])
            : (obj[
                (i as Record<string, string | number>)[selectedHeaders]
                  .toString()
                  .toUpperCase()
              ] =
                obj[
                  (i as Record<string, string | number>)[selectedHeaders]
                    .toString()
                    .toUpperCase()
                ] + (i as Record<string, number>)[item])
        })
        set_info(Object.keys(obj).map((i) => obj[i]))
        set_label(Object.keys(obj))
      }
    },
    [memo_data, selectedHeaders]
  )

  useEffect(() => {
    if (yLabel) {
      handleLabel(null, yLabel)
    }
  }, [data, handleLabel, yLabel])

  useEffect(() => {
    if (selectedHeaders !== "" && info.length !== 0) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [info, selectedHeaders])

  return (
    <div className="bar-graph-div polar-div">
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
        <Pie
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
          options={{
            plugins: {
              tooltip: {
                callbacks: {
                  label(tooltipItem) {
                    return `Count of ${yLabel} in ${tooltipItem.label}:${tooltipItem.parsed}`
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  )
})

export default PieChart
