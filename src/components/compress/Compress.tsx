import { useCallback, useState } from "react"
import "./style.scss"
import React from "react"
import toast from "react-hot-toast"
import svg from "../../assets/selectImage.svg"
import ImgComponent from "./components/Img"
import imageCompression from "browser-image-compression"

const Compress = () => {
  const [fetch, set_fetch] = useState<"ideal" | "loading" | "success">("ideal")
  const [img, set_img] = useState<File | null>(null)
  const [compressedImg, set_compressedImg] = useState<File | null>(null)
  const [qlty, set_qlty] = useState(0.5)

  const handleSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      set_img(e.target.files[0])
      set_fetch("ideal")
    }
  }, [])

  const handleClick = async () => {
    set_fetch("loading")
    const loader = toast.loading("compressing...", {
      style: {
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        textTransform: "capitalize",
        fontSize: "1.2rem",
      },
    })
    const res = await imageCompression(img!, {
      useWebWorker: true,
      initialQuality: qlty,
    })
    set_compressedImg(res)
    set_fetch("success")
    toast.dismiss(loader)
  }

  return (
    <main className="comp">
      <ul>
        <h2>Guide:</h2>
        <li>press select image button</li>
        <li>Locate the image you want to compress.</li>
        <li>Select Image Compression Percentage</li>
        <li>Download Compressed Image</li>
      </ul>
      <div>
        <input
          type="file"
          id="image_input"
          accept="image/*"
          onChange={handleSelect}
          multiple={false}
        />
        <label htmlFor="image_input">select image</label>
      </div>
      {!img ? (
        <img
          src={svg}
          alt="not found"
        />
      ) : (
        <>
          <section>
            <h2>Compression Percentage</h2>
            <select
              value={qlty}
              onChange={(e) => set_qlty(parseFloat(e.target.value))}
            >
              {[...Array(9)].map((_i, num) => (
                <option
                  value={(num + 1) / 10}
                  key={`option-${num}`}
                >
                  {(num + 1) / 10}
                </option>
              ))}
            </select>
          </section>
          <div className="imgdiv">
            <ImgComponent
              download={false}
              src={URL.createObjectURL(img)}
              size={img.size}
              key={`component-1`}
            />
            {fetch === "success" && (
              <ImgComponent
                download={true}
                size={compressedImg!.size}
                src={URL.createObjectURL(compressedImg!)}
                key={`component-2`}
                name={img.name}
              />
            )}
          </div>
          <button
            className="compbtn"
            onClick={handleClick}
          >
            compress <div></div>
          </button>
        </>
      )}
    </main>
  )
}

export default Compress
