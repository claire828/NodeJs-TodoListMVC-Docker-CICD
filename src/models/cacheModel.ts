import TaskConfig from "../configs/TaskConfig";
import '../extensions/numberExtension';
import '../extensions/arrayExtension';
import '../extensions/stringExtension';
import DbModel from "./dbModel";

export default class CacheModel extends DbModel {

    readonly ExpiredSec = (4).exHoursInSec();

    public async getAll(account:string):Promise<TaskConfig.Task[]>{
        const strTasks = await this.retrieveByKey(account);
        if(strTasks) return strTasks.exToObj() as TaskConfig.Task[];
        return null;
    }

     // 儲存整筆Task的快取
    public async saveAll(account:string, allTasks:TaskConfig.Task[] ){
        this.db.setex(account,this.ExpiredSec , JSON.stringify(allTasks));
    }

    // add task (draf)
    public async add(account:string, draf:TaskConfig.Draf, tId:string):Promise<boolean>{
        const cacheList = await this.retrieveTaskList(account)
        if(cacheList){
            cacheList.push({
                title:draf.title,
                content:draf.content,
                tId,
                status:TaskConfig.Status.Draf,
            });
            this.saveAll(account,cacheList);
        }
        return true;
    }

    // conform DrafToTask
    public async conform( account:string, tId:string, task:TaskConfig.Task ):Promise<TaskConfig.Task>{
        const cacheList = await this.retrieveTaskList(account)
        if(cacheList){
            const inx = cacheList.findIndex( x=> x.tId === tId);
            if(inx === -1) return;
            cacheList[inx] = task;
            this.saveAll(account,cacheList);
        }
        return task;
    }

    public async retrieveTaskList(account:string):Promise<TaskConfig.Task[]>{
        const oldCache = await this.retrieveByKey(account);
        return oldCache ? (oldCache.exToObj() as TaskConfig.Task[]) : null;
    }



}