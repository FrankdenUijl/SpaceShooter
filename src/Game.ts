import { injectable } from "inversify";
import { Start } from "./ExecutionOrderController";

@injectable()
export class Game implements Start
{
    public get Container(): PIXI.Container 
    {
        return this.container;
    }

    private readonly container: PIXI.Container = new PIXI.Container();

    public Start()
    {
       
    }
}