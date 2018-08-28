import { Update } from "./ExecutionOrderController";
import { OnKeyDown } from "./Input";

export class SpaceShipPlayer implements Update, OnKeyDown
{
    public get Container(): PIXI.Container 
    {
        return this.container;
    }

    private speed:number;

    private readonly container: PIXI.Container = new PIXI.Container();

    private readonly maxSpeed: number = 3;
    private readonly celeration: number = 0.5;
    private readonly rotateSpeed: number = 0.5;

    public Update(deltaTime:number)
    {
        this.Move(deltaTime);
    }

    public OnKeyDown(keyboardKeysDown: string[], deltaTime: number): void 
    {
        let isRight = keyboardKeysDown.indexOf("ArrowRight") != -1;
        let isLeft = keyboardKeysDown.indexOf("ArrowLeft") != -1;
        let isUp = keyboardKeysDown.indexOf("ArrowUp") != -1;
        let isDown = keyboardKeysDown.indexOf("ArrowDown") != -1;

        if(isRight && isLeft && isUp && isDown)
        {
            this.IncreaseSpeed(deltaTime);
        }

        var lerp = function (a,  b,  c) {
            return a + c * (b - a);
        }

        this.container.rotation = lerp(this.container.rotation, 1, this.rotateSpeed * deltaTime);
    }

    private Move(deltaTime:number)
    {
        let step = this.speed * deltaTime;
        this.container.x = this.container.x + (step * Math.cos(this.container.rotation));
	    this.container.y = this.container.y + (step * Math.sin(this.container.rotation));
    }

    private IncreaseSpeed(deltaTime:number)
    {
        this.speed+= this.celeration * deltaTime;
    }
}