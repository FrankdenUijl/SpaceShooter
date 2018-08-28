import { injectable } from "inversify";
import { Start } from "./ExecutionOrderController";
import firebase = require("firebase");
import { FireBaseRef } from "./FireBaseRef";

interface SpaceShip 
{
    Name: string;
    x: number;
    y: number;
    color: number;
}

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
        var config = {
            apiKey: "AIzaSyDyongZ-5Qzm5hvK4CqpvFtHkEnhXxbWNg",
            authDomain: "spaceshooter-e66e1.firebaseapp.com",
            databaseURL: "https://spaceshooter-e66e1.firebaseio.com",
            projectId: "spaceshooter-e66e1",
            storageBucket: "spaceshooter-e66e1.appspot.com",
            messagingSenderId: "1007794740657"
        };

        firebase.initializeApp(config);

        var defaultDatabase = firebase.database();

        var spaceShipsRef = defaultDatabase.ref("SpaceShips");

        var spaceship:SpaceShip = {
            Name: "test",
            x: 100,
            y: 100,
            color: 0xFFFFFF
        };
        var spaceShipA = new FireBaseRef<SpaceShip>(spaceship, spaceShipsRef.child(spaceship.Name), true, true);

        spaceShipA.OnValueChange.subscribe((spaceShipValues) => {
            console.log(spaceShipValues);
        });

        setTimeout(() => {
            var spaceship:SpaceShip = {
                Name: "test",
                x: 150,
                y: 150,
                color: 0xFFFFFF
            };

            spaceShipA.SetValues(spaceship);
        }, 3000);
    }
}