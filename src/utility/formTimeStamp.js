const formTimeStamp = timestamp => {
    const timeSinceCreation = Math.floor((new Date() - new Date(timestamp)) / (1000 * 60));
    if (timeSinceCreation < 1)
        return 'Just Now';
    else if (timeSinceCreation >= 1 && timeSinceCreation < 2)
        return 1 + ' minute ago';
    else if (timeSinceCreation < 60 && timeSinceCreation > 1)
        return timeSinceCreation + ' minutes ago';
    else if (timeSinceCreation >= 60 && timeSinceCreation < 120)
        return Math.floor(timeSinceCreation / 60) + ' hour ago';
    else if (timeSinceCreation >= 120 && timeSinceCreation < 60 * 24)
        return Math.floor(timeSinceCreation / 60) + ' hours ago';
    else if (timeSinceCreation >= 60 * 24 && timeSinceCreation < 60 * 24 * 2)
        return Math.floor(timeSinceCreation / (60 * 24)) + ' day ago';
    else if (timeSinceCreation >= 60 * 24 * 2 && timeSinceCreation < 60 * 24 * 30)
        return Math.floor(timeSinceCreation / (60 * 24)) + ' days ago';
    else if (timeSinceCreation >= 60 * 24 * 30)
        return new Date(timestamp).toDateString();
}

export default formTimeStamp;