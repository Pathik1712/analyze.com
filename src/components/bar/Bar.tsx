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
import React, { useCallback, useState } from "react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  // labeles: string[]
  // dataGroup: Record<string, number[]>
  headerList: string[]
  data: object[]
}

const BarComponent = ({ headerList, data }: Props) => {
  const [xLabel, set_xLabel] = useState<unknown[]>([])

  const [yLabel, set_yLabel] = useState<unknown[]>([])

  const [label_name, set_labelName] = useState({
    x: "",
    y: "",
  })

  // const arr = Object.keys(dataGroup).map(
  //   (i) => ({ data: dataGroup[i] } as ChartDataset<"bar">)
  // )

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
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      set_labelName({
        ...label_name,
        y: e.target.value,
      })
      set_yLabel(
        data.map((i) => (i as Record<string, unknown>)[e.target.value])
      )
    },
    [data, label_name]
  )

  return (
    <div className="bar-graph-div">
      <section>
        <h4>select x-axes:</h4>
        <select onChange={handleXlabel}>
          {headerList.map(
            (i, num) =>
              i !== label_name.y && (
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
        <select onChange={handleYlabel}>
          {headerList.map(
            (i, num) =>
              i !== label_name.x && (
                <option
                  value={i}
                  key={`y-axes-${num}`}
                >
                  {i}
                </option>
              )
          )}
        </select>
      </section>

      {label_name.x !== "" && label_name.y !== "" && (
          <Bar
            data={{
              labels: xLabel,
              datasets: [
                {
                  label: label_name.y,
                  data: yLabel,
                  backgroundColor: "rgb(255, 99, 132)",
                },
              ],
            }}
          />
      )}
    </div>
  )
}

export default BarComponent
