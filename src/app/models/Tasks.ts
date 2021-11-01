export interface Tasks {
  data: Task[];
}

export interface Task {
  title: string,
  due_date?: string,
  creation_date: string,
  numeric_reference?: number,
  type: string;
  observation: string,
  id: string,
  user_id: string,
  calendar_event?: boolean
}
