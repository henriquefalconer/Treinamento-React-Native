class PiuData {
    constructor(avatar, name, username, 
        time, message, likes, replies, 
        likesActive, repliesActive, pinned) {
            this.avatar = avatar;
            this.name = name;
            this.username = username;
            this.time = time;
            this.message = message;
            this.likes = likes;
            this.replies = replies;
            this.likesActive = likesActive;
            this.repliesActive = repliesActive;
            this.pinned = pinned;
        }
}

export default PiuData;