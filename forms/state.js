const stateObj = {
    username: '',
    password: '',
    loginInfo: getLoginInfo,
    topicsArr: ['HTML', 'CSS', 'javascript', 'jQuery', 'APIs', 'Video Games'],
    activeTopic: '',
    topicText: getTopicText
};

function getLoginInfo() {
    return `Your username is ${this.username} and your password is ${this.password}`;
}

function getTopicText() {
    return `We are currently learning ${this.activeTopic}`;
}

export default stateObj; 