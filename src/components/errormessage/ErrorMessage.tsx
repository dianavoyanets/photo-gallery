export interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorProps) => {
  return (
    <div className="bg-red-200 text-red-700 p-4 rounded-md">{message}</div>
  );
};
