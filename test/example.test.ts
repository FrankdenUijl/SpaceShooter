import "reflect-metadata";
import { assert } from "chai";

interface interfacetest {
    test1: string;
    test2: number;
}

describe("Example test", () =>
{
    it("should not fail", (done) =>
    {
        let object = {
            test1: 1,
            test2: "hoi"
        }
        for(let key of Object.keys(object))
        {
            console.log(key);
        }

        done();
    });
});