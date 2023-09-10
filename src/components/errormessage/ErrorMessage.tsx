export interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({
  message = "Opps, something went wrong. Please check your parameters and try again.",
}: ErrorProps) => {
  return (
    <div className="bg-red-200 text-red-700 p-4 rounded-md">{message}</div>
  );
};
