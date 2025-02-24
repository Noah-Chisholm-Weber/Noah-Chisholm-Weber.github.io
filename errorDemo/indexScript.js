//error types
    //four:
        //syntax
            //the code violates the rules and required structure of the standard js code, that is the compiler can't parse it correctly
            //typically stop the program from running
        //load
            //when required resources fail to load
            //does not always have to be human error (broken paths, or no internet connection)
        //logic
            //program runs fine but does not preform as intended
        //runtime
            //occur during execution
            //not dependent on syntax

    //helpful rules
        //if you can solve the problem with proper code, do that.
        //if not should you use exception handeling?
        //example:
        //asking for user input like putting -1 for an array like

    //exception handeling for where something goes wrong, mostly user input
        //usually two or three blocks
            //try
                //attempt to execute the potentially problematic code
            //catch
                //if the potentially problematic code becomes problematic this recognizes that
            //finally
                //runs after either case
try {
    let usrInpt = 57.02;
    if(usrInpt < 0) {
        throw Error("less than zeor")
    }
    if(usrInpt > 100) throw Error("Too big!");
    let arr = new Array(usrInpt);
    console.log(x);
} catch (error){
    console.log("Invalid input!\n" + error);
} finally {
    console.log("finished");
}

class customError extends Error {
    constructor(message) {
        super(message);
        this.name = "customError";
    }
}

try {
    throw new customError("This is custom");
} catch (error) {
    console.log(error);
}