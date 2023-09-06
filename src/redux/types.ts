export interface RejectedAction extends Action {
  error: Error;
}
