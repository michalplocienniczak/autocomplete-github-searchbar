import { forwardRef } from "react"

const SearchDialog = forwardRef<HTMLDialogElement>((_, ref) => {
  return <dialog ref={ref}>Search Dialog</dialog>
})

export default SearchDialog
