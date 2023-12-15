import React, { useState, useCallback } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataset,
} from "chart.js"
import { Line } from "react-chartjs-2"

type Props = {
  headerList: string[]
  data: object[]
  color: string[]
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const LineComponent = ({ data, headerList, color }: Props) => {
  const [xLabel, set_xLabel] = useState<unknown[]>([])

  const [dataGroup, set_dataGroup] = useState<object>({})

  const [label_name, set_labelName] = useState({
    x: "",
    y: [] as string[],
  })

  const arr = Object.keys(dataGroup).map(
    (i, num) =>
      ({
        data: (dataGroup as Record<string, unknown[]>)[i],
        label: i,
        backgroundColor: color[num % color.length],
        borderColor: color[num % color.length],
      } as ChartDataset<"line">)
  )

  const handleXlabel = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      set_labelName({
        ...label_name,
        x: e.target.value,
      })
      set_xLabel(
        data.map((i) => (i as Record<string, unknown>)[e.target.value])
      )
    },
    [data, label_name]
  )

  const handleYlabel = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, item: string) => {
      if (e.target.checked) {
        set_labelName({
          ...label_name,
          y: [...label_name.y, item],
        })
        set_dataGroup({
          ...dataGroup,
          [item]: data.map((i) => (i as Record<string, unknown>)[item]),
        })
      } else {
        set_labelName({
          ...label_name,
          y: label_name.y.filter((i) => i !== item),
        })
        const obj = {
          ...dataGroup,
        }
        console.log(obj)
        delete (obj as Record<string, unknown>)[item]
        set_dataGroup(obj)
      }
    },
    [data, dataGroup, label_name]
  )
  return (
    <div className="bar-graph-div">
      <section>
        <h4>select x-axes:</h4>
        <select
          onChange={handleXlabel}
          defaultValue={""}
        >
          <option
            value=""
            disabled
            hidden
          >
            --Select Data--
          </option>
          {headerList.map(
            (i, num) =>
              !label_name.y.includes(i) && (
                <option
                  value={i}
                  key={`x-axes-${num}`}
                >
                  {i}
                </option>
              )
          )}
        </select>
      </section>

      <section>
        <h4>select y-axes:</h4>
        {headerList.map(
          (i, num) =>
            i !== label_name.x && (
              <div key={`bar-y-${num}`}>
                <input
                  type="checkbox"
                  id={`bar-yAxes-id-${num}`}
                  onChange={(e) => handleYlabel(e, i)}
                />
                <label htmlFor={`bar-yAxes-id-${num}`}>{i}</label>
              </div>
            )
        )}
      </section>

      {label_name.x !== "" && label_name.y.length !== 0 && (
        <Line
          className="graph-anm"
          data={{
            labels: xLabel,
            datasets: arr,
          }}
        />
      )}
    </div>
  )
}

export default LineComponent