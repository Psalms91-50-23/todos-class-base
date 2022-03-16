
const characters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V", "W","X", "Y","Z","0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","&","*"]
//70 characters in total

let encodedNum = null
let passwordEncoded = null

const emailRegex = /^(\w{3,})@([a-zA-Z\d]{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
const capitalLetterRegex = /[A-Z]{1}/ //1 character match A-Z
const lowerCaseLetterRegex = /[a-z]{1}/ //1 character match a-z
const numberRegex = /\d{1}/ //1 digit match 0-9
const specialCharRegex = /[!@#$%^&]{1}/ //must have 1 special character '!@#$%^&*
const minEmailReqRegex = /\w{3,}/

export function validateEmail(userEmail){
    //test if email matches email regex expression and that it has all the min requirements for an email
    if(emailRegex.test(userEmail)) return true
    else return false
}

export function minEmailLength(email){
    const minChar = email.substring(0,3)
    if(minEmailReqRegex.test(minChar)) return true
    else return false
}

export function minPasswordCharReqReached(password){

    const passwordArray = password.split("")
    var capitalLetterCounter = 0
    var lowerCaseLetterCounter = 0
    var numberCounter = 0
    var specialCharCounter = 0
    var minPasswordCharReached = false //instantiated as false
    //test for length of password, if 5 or lower return false
    if(passwordArray.length <= 5) return minPasswordCharReached
    //after above condition passes do below
    for(var i = 0; i < passwordArray.length ; i++){
        
        var character = passwordArray[i]
        if(capitalLetterRegex.test(character)){
            capitalLetterCounter++
        }
        if(numberRegex.test(character)){
            numberCounter++
        }
        if(lowerCaseLetterRegex.test(character)){
            lowerCaseLetterCounter++
        }
        if(specialCharRegex.test(character)){
            specialCharCounter++
        }
        if(capitalLetterCounter >= 1 && numberCounter >= 1 && lowerCaseLetterCounter >= 1 && specialCharCounter >= 1){
            minPasswordCharReached = true
            return minPasswordCharReached 
        }
    }
    return minPasswordCharReached
}

export function validatePassword(password){
    if(minPasswordCharReqReached(password)) return true
    else return false
}


export function encodePassword(password){
    let passwordChar = password.split("")
    encodedNum = []
    passwordEncoded = ""
    for(var i = 0 ; i < passwordChar.length ; i ++){

        //this variable will hold how many characters within password to hide actual password
        let numOfHashCharToAdd = Math.floor(Math.random()*10)+1
        for(var j = 0 ; j < numOfHashCharToAdd ; j ++){
            
            let randomChar = Math.floor(Math.random()*70)
            let tempChar = characters[randomChar]
        
            if( j ===  numOfHashCharToAdd-1 ){
                //when j loop reaches end add the letter from password in
                passwordEncoded += passwordChar[i]
                //keep track of location of the letter in the array for decoding
                encodedNum.push(passwordEncoded.split("").length)
            }else{
                //add all characters to string
                passwordEncoded += tempChar
            }
        }
    }
    return passwordEncoded
}

export function decodePassword( encodedPattern, passwordEncoded ){

    let passwordDecoded = ""
    for( var i = 0 ; i < encodedPattern.length ; i++ ){
        let passwordCharIndex = encodedPattern[i]
        passwordDecoded += passwordEncoded.charAt(passwordCharIndex-1)
    }
    return passwordDecoded
}

export function matchPassword( password, confirmPassword ){
    if(password === confirmPassword) return true
    else return false
}

export function registerUser( userState, slideDown, updateState ){
    let allUsers = null
    // let currentUser = null
    //test if all user data is in local storage then assign it
    if (localStorage.getItem("users")) {
        allUsers = JSON.parse(localStorage.getItem("users"))
    }
    //if currentUser already exists and users, test if email is already saved before registering
    if( allUsers ){
            (JSON.parse(localStorage.getItem("users")));
            let foundUser = null;
            foundUser = allUsers.find( (user) => {
                (Object.keys(user));
                if(Object.keys(user)[0] === userState.email){  
                    return user ;
                }
                else{
                    return null
                }
            }) 

            if(!foundUser){
                let tempEncodedPassword = encodePassword(userState.password)
                const newUser = { [userState.email]: { username: userState.username, password: tempEncodedPassword , email: userState.email, encodedPattern: encodedNum } };
                allUsers.push(newUser);
                localStorage.setItem("users", JSON.stringify(allUsers));
                slideDown()
            }else{
                updateState({
                    userExists: true
                });
            }
    }
    else{
        allUsers = [];
        let tempEncodedPassword = encodePassword(userState.password);
        const newUser = { [userState.email]: { username: userState.username, password: tempEncodedPassword , email: userState.email, encodedPattern: encodedNum} };
        allUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(allUsers));
        slideDown();
    }
    
}

export function loginUser( userState, handleLoggedIn, updateValue ){

    let allUsers = null;
    let passwordMatch = false;
    if (localStorage.getItem("users")) {
        allUsers = JSON.parse(localStorage.getItem("users"));
    }
    if( allUsers ){
        let foundUser = null;
        (JSON.parse(localStorage.getItem("users")));
        foundUser =  allUsers.find(user => {

            let tempObject = Object.values(user)[0];
            let userkey = Object.keys(user)[0];
            let passwordDecoded = null
            passwordDecoded = decodePassword(tempObject.encodedPattern, tempObject.password )

            if( userkey === userState.email && passwordDecoded === userState.password){
                passwordMatch = true
                return user;
            }
            else{
                return null
            }
            // emailCombineKeys = emailCombineKeys.concat(Object.keys(user))
        })
        if(passwordMatch === false){
            updateValue({
                passwordMatchError: true
            })
            return
        }

        if(foundUser && passwordMatch === true){
            let foundUserValues = Object.values(foundUser)[0]
            let newUser = { [userState.email] : { username: foundUserValues.username ,password: foundUserValues.password, email: foundUserValues.email, todos: foundUserValues.todos, encodedPattern: foundUserValues.encodedPattern}}
            localStorage.setItem("currentUser", JSON.stringify(newUser))
            allUsers.push(newUser)
            handleLoggedIn()
        }
        else{
            console.log(`user already exists with email: ${userState.email}`);
        }
    }
    else {
        const newUser = { [userState.email]: { username: userState.username,  password: userState.password, email: userState.email}}
        allUsers.push(newUser)
        localStorage.setItem("currentUser", JSON.stringify(newUser))
        localStorage.setItem("users",JSON.stringify(allUsers))
        handleLoggedIn()
    }   
    
}

export function saveTodo(todo){
    let currentUser = Object.values(JSON.parse(localStorage.getItem("currentUser")))
    let tempTodos = null
    if(currentUser[0].todos.length){
        // tempTodos = [todo, ...currentUser[0].todos]
        currentUser[0].todos.splice(0,1,todo)
    }else{
        tempTodos = [todo]
        currentUser[0].todos = tempTodos
    }
    localStorage.setItem("currentUser", JSON.stringify({[currentUser[0].email]: currentUser[0]}))
}

export function updateCurrentUserTodos(todos){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    let userKey = Object.keys(currentUser)[0]
    let userValues = Object.values(currentUser)[0]
    let currentUserTodosUpdated = {[userKey] : {...userValues, todos}}
    localStorage.setItem("currentUser", JSON.stringify(currentUserTodosUpdated))
}

export function getTodos(){
    //grab the current user details
    let currentUser = Object.values(JSON.parse(localStorage.getItem("currentUser")))[0]
    let currentUserKey = currentUser.email
    // let currentUserValues = currentUser[0]
    let todos = null
    if(currentUser.todos){
        todos = currentUser.todos
        return todos
    }
    else{
        todos = []
        currentUser.todos = todos;
        localStorage.setItem("currentUser", JSON.stringify({[currentUserKey]: currentUser}))
        return todos
    }
}

export function deleteTodo(todos, todoIdKey){
    //grab current User details 
    let currentUser = Object.values(JSON.parse(localStorage.getItem("currentUser")))[0]
    let todosUpdated = null
    //filter todos
    todosUpdated = todos.filter((_, index) => index !== todoIdKey)
    currentUser.todos = todosUpdated
    //save it back to local Storage
    localStorage.setItem("currentUser", JSON.stringify({[currentUser.email]: currentUser}))
    //returns filtered Todos so state can be updated
    return todosUpdated
}

export function saveTodoToLocalStorage(todos){
    if(localStorage.getItem("currentUser")){
        let currentUserDetails = JSON.parse(localStorage.getItem("currentUser"))
        let currentUserValues = Object.values(currentUserDetails)[0]
        currentUserValues.todos = todos
        let currentUserKey = Object.keys(currentUserDetails)[0]
        let allUsers = JSON.parse(localStorage.getItem("users"))
        //update all users in local storage with current User data before logging out
        let tempAllUsers = allUsers.map((user,i) => {
            let userKey = Object.keys(user)[0]
            if(userKey === currentUserKey){
                let tempCurrentUser = { [currentUserKey]: currentUserValues }
                localStorage.setItem("currentUser", JSON.stringify(tempCurrentUser))
                return tempCurrentUser
                // allUsers.splice( i, 1, tempCurrentUser )
            }else{
                return user
            }
        })
        localStorage.setItem("users", JSON.stringify(tempAllUsers))
    }
}

export function saveFilteredTodos(todos){
    localStorage.setItem("filtered", JSON.stringify(todos))
}
