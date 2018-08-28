import { Container } from "inversify";
import { ExecutionOrderController, Start } from "./ExecutionOrderController";
import { Game } from "./Game";

var container = new Container();

container.bind(ExecutionOrderController)
    .toSelf()
    .inSingletonScope();

container.bind(Game)
    .toSelf()
    .inSingletonScope();
container.bind<Start>("Start")
    .toDynamicValue(ctx => ctx.container.get(Game))
    .inSingletonScope();

export default container;