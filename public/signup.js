const $email = document.querySelector('#email');
const $emailDelBtn = document.querySelector('#email-del');
const $emailCheckBtn = document.querySelector('#email-check-btn');

const $joinForm = document.querySelector('#join-form');

const addListeners = () => {
    const checkEmailDuplicated = (e) => {
        const checkOK = $emailCheckBtn.previousElementSibling.querySelector('.check-ok');
        checkOK.src = "/ok.svg";
        $emailCheckBtn.disabled = true;
        
        $joinForm.appendChild(createInputGroup('닉네임', 'nickname', 'text'));
        $joinForm.appendChild(createInputGroup('비밀번호', 'password', 'password', 'change', passwordHandler));
        $joinForm.appendChild(createInputGroup('생년월일', 'birth', 'text', 'keyup', birthHandler));
    }

    const passwordHandler = ({target}) => {
        const value = target.value;
        const patternUpper = value.match(/[A-Z]/);
        const patternLower = value.match(/[a-z]/);
        const patternSpecial = value.match(/~!@#$%^&*/);

        const $password = document.querySelector('#password');
        const $descText = $password.parentNode.querySelector('.desc-text');
        const $checkOK = $password.parentNode.querySelector('.check-ok');


        if(value.match(/(\w)\1\1/)) {
            $password.style.border = '0px solid red';
            $password.style['border-bottom-width'] = '0.1rem';
            $descText.innerText = '같은 숫자 혹은 연속된 숫자를 3개 이상 입력할 수 없습니다.';
        }
        else if(value.length < 10 || !((!!patternUpper && !!patternLower) || (!!patternUpper && !!patternSpecial) || (!!patternSpecial && !!patternLower))) {
            $descText.innerText = '10자 이상 영어 대문자, 소문자, 특수문자 중 2종류를 조합해야 합니다.';
            $password.style.border = '0px solid red';
            $password.style['border-bottom-width'] = '0.1rem';
        }
        else {
            $password.style.border = '0px solid lightgrey';
            $password.style['border-bottom-width'] = '0.1rem';
            $descText.innerText = '';
            $checkOK.src = "/ok.svg";
        }
        console.log(patternUpper,
            patternLower,
            patternSpecial,)
    }

    const birthHandler = ({target}) => {
        const value = target.value.replace(/\./g, '');
        const birth = {
            year : Number(value.slice(0, 4)),
            month : Number(value.slice(4, 6)),
            date : Number(value.slice(6, 8))
        }
        const validDate = Date.parse(`${birth.year}-${birth.month}-${birth.date}`);
        if(value.length > 10) {
            target.value = value.substring(0, 10);
            return;
        }
        
        if(birth.date !== 0) target.value = `${birth.year}.${birth.month}.${birth.date}`;
        else if(birth.month !== 0) target.value = `${birth.year}.${birth.month}.`;
        else if(birth.year > 1000) target.value = `${birth.year}.`;

        if(birth.month === 0 && target.value[target.value.length-1] === '.') 
            target.value = birth.year;
        else if(birth.date === 0 && target.value[target.value.length-1] === '.') 
            target.value = `${birth.year}.${birth.month}`;

        const $birth = document.querySelector('#birth');
        const $descText = $birth.parentNode.querySelector('.desc-text');
        const $checkOK = $birth.parentNode.querySelector('.check-ok');
        if(!validDate) {
            $birth.style.border = '0px solid red';
            $birth.style['border-bottom-width'] = '0.1rem';
            $descText.innerText = '올바른 생년월일을 입력해야 합니다.';
        }
        else {
            $birth.style.border = '0px solid lightgrey';
            $birth.style['border-bottom-width'] = '0.1rem';
            $descText.innerText = '';
            $checkOK.src = "/ok.svg";
        }
    }
    
    const deleteEmailInput = (e) => {
        $email.value = "";
    }

    $emailCheckBtn.addEventListener('click', checkEmailDuplicated);
    $emailDelBtn.addEventListener('click', deleteEmailInput);
}

const createInputGroup = (labelText, inputId, inputType, eventName, handler) => {
    const label = document.createElement('label');
    label.innerText = labelText;

    const input = document.createElement('input');
    input.className = 'text-input';
    input.id = inputId;
    input.type = inputType;

    const img = document.createElement('img');
    img.className = 'check-ok';
    img.src = '/notok.svg';

    const descText = document.createElement('div');
    descText.className = 'desc-text';

    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.appendChild(label);
    inputGroup.appendChild(input);
    inputGroup.appendChild(img);
    inputGroup.appendChild(descText);
    if(!!eventName) inputGroup.addEventListener(eventName, handler);

    return inputGroup;
}

addListeners();