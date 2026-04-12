import Dexie, { type EntityTable} from 'dexie'

export interface Task {
    id: number,
    title: string,
    description: string,
    status: 'todo' | 'doing' | 'done',
    createdAt: number
}

const db = new Dexie('KanbanDB') as Dexie & {
    tasks: EntityTable<Task, 'id'>;
};

db.version(1).stores({
    tasks: '++id , status'
});

export { db };
