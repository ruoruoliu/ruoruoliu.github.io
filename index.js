

function updateTime() {
    const time = new Date();
    let hours = time.getHours();
    const ampm = hours <= 12 ? "am" : "pm";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const time_str = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById("time").textContent = time_str;
}

updateTime();
setInterval(updateTime, 1000);
