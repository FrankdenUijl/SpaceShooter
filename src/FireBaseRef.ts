import firebase = require("firebase/app");
import { ILiteEvent, LiteEvent } from "./LiteEvent";

export class FireBaseRef<T>
{
    public get OnValueChange(): ILiteEvent<T> 
    { 
        return this.onValueChange; 
    }

    public get Read():boolean
    {
        return this.read;
    }

    public set Read(value:boolean)
    {
        this.read = value;
    }

    public get Write():boolean
    {
        return this.write;
    }

    public set Write(value:boolean)
    {
        this.write = value;
    }

    private read:boolean;
    private write:boolean;

    private readonly onValueChange = new LiteEvent<T>();
    private readonly firebaseDatabaseRef: firebase.database.Reference;
    private readonly object:T;

    public constructor(object: T,
        firebaseDatabaseRef: firebase.database.Reference,
        read: boolean,
        write: boolean)
    {
        this.firebaseDatabaseRef = firebaseDatabaseRef;
        this.object = object;
        this.read = read;
        this.write = write;

        this.firebaseDatabaseRef.parent.once("value", (snapshot) =>
        {
            let exist = snapshot
                .child(this.firebaseDatabaseRef.key)
                .exists();

            if(!exist)
            {
                this.SetValues(object);
            }

            this.setFirebaseEvents();
        });
    }

    private setFirebaseEvents(): void{
        this.firebaseDatabaseRef.on("value", (snapshot) => {

            if(!this.read)
            {
                return;
            }

            var newValues:any = {};
            for(let key of Object.keys(this.object))
            {
                newValues[key] = snapshot.child(key).val();
            }

            this.onValueChange.invoke(newValues);
        });
    }

    public SetValues(object:T, onComplete?: (a: Error) => any): void 
    {
        if(!this.write)
        {
            throw new Error("Write is false.");
        }

        this.firebaseDatabaseRef.set(object, onComplete);
    }
}