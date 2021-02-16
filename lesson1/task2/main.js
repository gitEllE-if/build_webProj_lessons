console.log("It's main.js");

loadScript(["module1.js", "module2.js"], () => {
    console.log("modules loaded")
});

// loadScript("module1.js", () => {
//     console.log("modules loaded");
// });

// loadScript(() => {
//     console.log("modules loaded");
// });