const currentTime = () => {

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

const currentDate = () => {
    return new Date().toISOString().slice(0, 10);
}

const dataTimeToTimestamp = (dateString, timeString) => {

    // Combine the date and time strings into one
    // const combinedString = `${dateString}T${timeString}:00`;
    const combinedString = `${dateString}T${timeString}:00`;
    // Create a new Date object from the combined string in local time (IST)
    let result = Date.parse(combinedString);

    return Number(result);
}


export {
    currentTime,
    currentDate,
    dataTimeToTimestamp
}