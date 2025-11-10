let userInput = document.querySelector("#date")
userInput.max = new Date().toISOString().split("T")[0]

let result = document.getElementById("result")

function calculateAge(){
    let birthday = new Date(userInput.value)

    let d1 = birthday.getDate();
    let m1 = birthday.getMonth();
    let y1 = birthday.getFullYear();


    let today = new Date();

    let d2 = today.getDate();
    let m2 = today.getMonth();
    let y2 = today.getFullYear();

    let d3, m3, y3;

    y3 = y2 - y1;

    if(m2 >= m1){
        m3 = m2 - m1;
    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }

    if(d2 >= d1){
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }
    result.innerHTML = `You are <span>${y3}</span> ${y3 > 1 ? "years": "year"}, <span>${m3}</span> ${m3 > 1 ? "months": "month"} and <span>${d3}</span> ${d3 > 1 ? "days": "day"} old.` 
}

function getDaysInMonth(year, month){
    return new Date(year, month, 0).getDate();
}