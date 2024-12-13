import { useEffect } from "react"

type SearchDialogProps = {
  onClose: () => void
}

const SearchDialog = ({ onClose }: SearchDialogProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 bg-slate-950 opacity-40" onClick={onClose} />
      <div className="absolute p-3 -top-3 -right-3 bg-slate-950 shadow-xl rounded-xl h-[80vh] w-[calc(100%+26px)] border-2 border-slate-600 boredr-solid">
        Search Dialog
      </div>
    </>
  )
}

export default SearchDialog
