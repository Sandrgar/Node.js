import fs from "fs"

fs.writeFile("./readme.txt", "hello, world", (error,data) =>  {
    if(error){
        console.log(error)
        return
    }
    console.log("file added")
})