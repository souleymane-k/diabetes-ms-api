const { v4: uuid } = require('uuid')

const months = [
    {id:uuid(), 
     monthName:"January",  
     mealName:"Breakfast",
     result:"115 mg/dl",
     date:"01/01/2021",
     description:" take 2hrs after breakfast. 2 bananas",
     dtype:"type 1" },
    {id:uuid(), monthName:"February",mealName:"Lunch",result:"110 mg/dl",date:"01/03/2021",description:"take 2hrs after breakfast. 2 bananas",dtype:"type 1" },
    {id:uuid(), monthName:"March",mealName:"Dinner",result:"140 mg/dl",date:"01/06/2021",description:"take 2hrs after breakfast. 2 bananas",dtype:"type 1" },
    { id:uuid(),monthName:"April",mealName:"Breakfast",result:"130 mg/dl",date:"01/05/2021",description:" take 2hrs after breakfast. 2 bananas",dtype:"type 1" },
    {id:uuid(), monthName:"May",mealName:"Fasting",result:"80 mg/dl",date:"01/09/2021",description:"nothing eaten","dtype":"type 1" },
    {id:uuid(), monthName:"June",mealName:"Breakfast",result:"120 mg/dl",date:"01/10/2021",description:" take 2hrs after breakfast. 2 bananas",dtype:"type 1" },
    { id:uuid(),monthName:"July",mealName:"Fasting",result:"75 mg/dl",date:"01/12/2021",description:"nothing eaten","dtype":"type 1" },
    {id:uuid(), monthName:"August",mealName:"Dinner",result:"140 mg/dl",date:"01/06/2021",description:"take 2hrs after breakfast. 2 bananas",dtype:"type 1" },
    { id:uuid(),monthName:"September",mealName:"Breakfast",result:"130 mg/dl",date:"01/05/2021",description:" take 2hrs after breakfast. 2 bananas",dtype:"type 1" },
    {id:uuid(), monthName:"October",mealName:"Fasting",result:"80 mg/dl",date:"01/09/2021",description:"nothing eaten","dtype":"type 1" },
    { id:uuid(),monthName:"November",mealName:"Breakfast",result:"120 mg/dl",date:"01/10/2021",description:" take 2hrs after breakfast. 2 bananas",dtype:"type 1" },
    { id:uuid(),monthName:"December",mealName:"Fasting",result:"75 mg/dl",date:"01/12/2021",description:"nothing eaten","dtype":"type 1" },
    { id:uuid(),monthName:"January",mealName:"Breakfast",result:"120 mg/dl",date:"01/10/2021",description:" take 2hrs after breakfast. 2 bananas",dtype:"type 1" },
    { id:uuid(),monthName:"May",mealName:"Fasting",result:"75 mg/dl",date:"01/12/2021",description:"nothing eaten","dtype":"type 1" },
    { id:uuid(),monthName:"November",mealName:"Breakfast",result:"120 mg/dl",date:"01/10/2021",description:" take 2hrs after breakfast. 2 bananas",dtype:"type 1" },
    { id:uuid(),monthName:"January",mealName:"Fasting",result:"75 mg/dl",date:"01/12/2021",description:"nothing eaten",dtype:"type 1" }
]

module.exports = { months }

// { id: uuid(),
//     title: 'Thinkful',
//     url: 'https://www.thinkful.com',
//     description: 'Think outside the classroom',
//     rating: 5 },
//   { id: uuid(),
//     title: 'Google',
//     url: 'https://www.google.com',
//     description: 'Where we find everything else',
//     rating: 4 },
//   { id: uuid(),
//     title: 'MDN',
//     url: 'https://developer.mozilla.org',
//     description: 'The only place to find web documentation',
//     rating: 5 },