RequireJS Angular
-----------------

RequireJS Angular is an add on to RequireJS that allows creating angular applications easier.

**The Problem:** Angular provide a good way to structure your code, not for loading it. RequireJS provide a good way for loading the code. Both use module systems - but they mean different things when they talk about modules.

**The solution:** In most cases both modules can be the same, and the distinction between the them can be discarded. So this add in provide an easy way to define them together, and have their dependencies use a common language. It also provide for a very easy way to link the bootstrap of the angular app with the async loading nature of RequireJS.

