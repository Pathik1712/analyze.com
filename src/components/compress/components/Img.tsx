import { useEffect } from "react"
import "../style.scss"
import Download from "../../../svg/Download"

type Props = {
  src: string
  size: number
  download: boolean
  name?: string
}

const Img = ({ download, size, src, name }: Props) => {
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(src)
    }
  }, [src])
  return (
    <div className="compDiv">
      <img
        src={src}
        alt="not found"
      />
      <p>
        Size:
        {size / 1024 < 1000
          ? (size / 1024).toFixed(2) + " KB"
          : (size / 1024 / 1024).toFixed(2) + " MB"}
        {download && (
          <a
            download={`compressed-img-${name}`}
            href={src}
          >
            <Download />
          </a>
        )}
      </p>
    </div>
  )
}

export default Img
