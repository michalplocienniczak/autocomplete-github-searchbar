import { XCircleIcon } from "@primer/octicons-react"

type ErrorMessageProps = {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="w-full h-full min-h-32 overflow-y-auto grid items-center" data-testid="error-message">
    <div className="flex flex-col gap-2">
      <div className="text-red-600 text-center">
        <XCircleIcon size={24} className="w-14 h-14" />
      </div>
      <div className="text-center">{message}</div>
    </div>
  </div>
)

export default ErrorMessage
