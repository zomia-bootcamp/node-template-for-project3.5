import stateObj  from '/forms/state.js';
$(document).ready(() => {
    hideInitialElements();
    displayTopic();
    handleLoginSubmit();
    handleClearLogin();
    createTopicsDropwdown();
    handleTopicChange();
    
    function hideInitialElements() {
        $('#login-display-info').hide();
        $('#clear-login-display').hide();
        $('#video-games-comment').hide();
    }

    function displayTopic() {
        $('#current-topic').text(stateObj.topicText())
    }

    function createTopicsDropwdown() {
        stateObj.topicsArr.forEach(topic => {
            let topicOption = $("<option></option>")
                .text(topic);

            $('#topics').append(topicOption);
        });
    }

    function handleTopicChange() {
        $('#topics').on('change', () => {
            let selectedTopic = $('#topics option:selected').text();
            updateState('activeTopic', selectedTopic);

            displayTopic();

            if (stateObj.activeTopic === 'Video Games') {
                $('#video-games-comment').show();
            } else {
                $('#video-games-comment').hide();
            }
        });
    };

    function handleClearLogin() {
        $('#clear-login-display').on('click', () => {
            updateState('username', '');
            updateState('password', '');

            $('#login-display-info').hide();
            $('#clear-login-display').hide();
        });
    };
    
    function handleLoginSubmit() {
        $('#loginForm').on("submit", (e) => {
            e.preventDefault();

            let username = $("#username")[0].value;
            let password = $("#password")[0].value;
            let validatedInputs = validateLoginInputs(username, password);

            if (validatedInputs.hasError) {
                let loginErrorMsgs = $('<div></div>')
                    .attr('id', 'login-error-msgs');
                validatedInputs.errorMessages.forEach(msg => {
                    loginErrorMsgs.append('<p></p>').text(msg);
                });
                $('#login-error-msg-box').append(loginErrorMsgs);
                //???????
            } else {
                updateState('username', username);
                updateState('password', password);
                
                $('#login-display-info')
                    .text(stateObj.loginInfo())
                    .show();
                
                $('#clear-login-display').show();
            }
        });
    }
    
    function validateLoginInputs(username, password) {
        let isUsernameValid = username.length >= 4;
        let isPasswordValid = password.length >= 6;
        let validationObject = {
            hasError: false,
            errorMessages: []
        }

        if (!isUsernameValid) {
            validationObject.hasError = true;
            validationObject.errorMessages.push(getLoginErrorMsg('username', 4));
        }
        
        if (!isPasswordValid) {
            validationObject.hasError = true;
            validationObject.errorMessages.push(getLoginErrorMsg('password', 6));
        }

        return validationObject;
    }

    function getLoginErrorMsg(type, limit) {
        return `Invalid ${type}, must be at least ${limit} characters`;
    }

    function updateState(key, value) {
        stateObj[key] = value;
    }
});