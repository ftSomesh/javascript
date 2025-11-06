const passwordBox = document.getElementById("password");
const clipboardSvg = document.getElementById("clipboard")
const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbols = "@#$%^&*()_+~|{}[]></-=";

let allChars = upperCase + lowerCase + number + symbols;
function createPassword() {
    const mappingChars = {
        0: upperCase,
        1: lowerCase,
        2: number,
        3: symbols
    }
    let password = ""
    let minArr = [0, 1, 2, 3];
    minArr.sort(() => Math.random() - 0.5);
    minArr.forEach((num) => {
        password += [mappingChars[num][Math.floor(Math.random() * mappingChars[num].length)]]
    })
    while (length > password.length) {
        password += allChars[Math.floor(Math.random() * allChars.length)]
    }

    return password;

}

function showPassword() {
    passwordBox.value = createPassword();
}

function copyText() {
    navigator.clipboard.writeText(passwordBox.value)
        .then(() => {
            clipboardSvg.innerHTML = `
        <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Z"/>
        `
            setTimeout(() => {
                clipboardSvg.innerHTML = `
                <path
                    d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                `
            }, 1000);
            
        })
        
}
