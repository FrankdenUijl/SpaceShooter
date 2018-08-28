import { multiInject, optional } from "inversify";
import { Update } from "./ExecutionOrderController";

export interface OnKeyDown 
{
    OnKeyDown(keyboardEvent: string[], deltaTime?: number): void;
}

export interface OnKeyPressed
{
    OnKeyPressed(keyboardEvent: KeyboardEvent): void;
}

export interface OnKeyUp
{
    OnKeyUp(keyboardEvent: KeyboardEvent): void;
}

export class Input implements Update
{
    private onKeyDowns: OnKeyDown[] = [];
    private onKeyPresseds: OnKeyPressed[] = [];
    private onKeyUps: OnKeyPressed[] = [];

    private keyboardKeysDown: string[];

    public constructor(@multiInject("OnKeyDown") @optional() onKeyDowns: OnKeyDown[],
        @multiInject("OnKeyDown") @optional() onKeyPresseds: OnKeyPressed[],
        @multiInject("OnKeyDown") @optional() onKeyUps: OnKeyPressed[])
    {
        this.onKeyDowns = onKeyDowns;
        this.onKeyPresseds = onKeyPresseds;
        this.onKeyUps = onKeyUps;
    }

    public Update(deltaTime: number): void 
    {
        if(this.keyboardKeysDown.length != 0)
        {
            for(let onKeyDown of this.onKeyDowns)
            {
                onKeyDown.OnKeyDown(this.keyboardKeysDown, deltaTime); 
            }
        }
    }

    public OnKeyPressed(keyboardEvent: KeyboardEvent): void 
    {
        this.keyboardKeysDown.push(keyboardEvent.key);
        for(let onKeyPressed of this.onKeyPresseds)
        {
            onKeyPressed.OnKeyPressed(keyboardEvent); 
        }
    }

    public OnKeyUp(keyboardEvent: KeyboardEvent): void 
    {
        for(let onKeyUp of this.onKeyUps)
        {
            onKeyUp.OnKeyPressed(keyboardEvent); 
        }

        let index = this.keyboardKeysDown.indexOf(keyboardEvent.key, 0);
        if (index > -1) 
        {
            this.keyboardKeysDown.splice(index, 1);
        }
    }
}