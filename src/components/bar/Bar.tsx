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

type Props = {
  labeles: string[]
  dataGroup: Record<string, number[]>
}

const BarComponent = ({ labeles,dataGroup }: Props) => {
  return <Bar
data={{
    labels:labeles,
    datasets:[]
}}
  />
}

export default BarComponent
