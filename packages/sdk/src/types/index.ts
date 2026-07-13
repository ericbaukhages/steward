export type ProjectStatus = 'active' | 'archived' | 'completed'

export interface Project {
  id: string
  name: string
  description?: string
  status: ProjectStatus
  createdAt: Date
  updatedAt: Date
}

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string
  projectId?: string
  title: string
  description?: string
  status: TaskStatus
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}
