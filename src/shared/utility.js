export const updateObject = (oldState, updateProp) => {
    return {
        ...oldState,
        ...updateProp
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
//alert(value + ':::' + JSON.stringify(rules));
    if (!rules) {
        return true;
    }

    if (rules.required) {
		if(value){
                    isValid = (typeof value === 'string')?value.trim() !== '':value && isValid;
		}
		else{
			isValid = false;
		}
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        //TODO JTI code this rule
        isValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value) && isValid;
    }

    if (rules.isNumeric) {
        //TODO JTI code this rule
        isValid = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/.test(value) && isValid;
    }

    return isValid;
}
