import Dexie, { type EntityTable} from 'dexie';

export interface Task {
    _id: string,
    title: string,
    description: string,
    status: 'todo' | 'doing' | 'done',
    createdAt: number
}

export interface SyncDB {
    syncID: string,
    action: 'create' | 'update' | 'delete',
    payload: {
        _id: string,
        title: string,
        description: string,
        status: 'todo' | 'doing' | 'done',
        createdAt: number
    }
    status: 'pending' | 'synced' | 'failed',
    retryCount: number,
    createdAt: number
}

const db = new Dexie('KanbanDB') as Dexie & {
    tasks: EntityTable<Task, '_id'>;
    syncQueue: EntityTable<SyncDB, 'syncID'>;
};

db.version(1).stores({
    tasks: '_id , status',
    syncQueue: 'syncID, status'
});

export { db };
