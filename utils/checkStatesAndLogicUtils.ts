export default () => {
    let questionElements:any = document.querySelectorAll('.question[set-states]');
    questionElements.forEach((_questionEl:any) => {
        let state = JSON.parse(_questionEl.getAttribute('set-states'));
        let logic = JSON.parse(_questionEl.getAttribute('set-logic'));

        if(state['hidden']){
            _questionEl.style.display = 'none';
        }
        else {
            _questionEl.style.display = 'block';
        }

        if(state['disabled']){
            let disableElements = _questionEl.querySelectorAll('input, select, textarea');
            disableElements.forEach((_disEl:any) => _disEl.setAttribute('disabled', 'disabled'));
        }
        else {
            let enableElements = _questionEl.querySelectorAll('input, select, textarea');
            enableElements.forEach((_enaEl:any) => _enaEl.removeAttribute('disabled'));
        }

        if(logic){
            let questionLogic:any = document.querySelector(`#Question${logic['question']} p.selected`);
            let dataQuestionLogic = JSON.parse(questionLogic.innerHTML);
            switch(logic['validation']) {
                case "empty":
                    if(dataQuestionLogic['data'].length == 0)
                    {
                        changeStateUtils(logic['state'], _questionEl);
                    }
                    break;
                case "filled":
                    if(dataQuestionLogic['data'].length > 0)
                    {
                        changeStateUtils(logic['state'], _questionEl);
                    }
                    break;
                case "is_equal":
                    if(dataQuestionLogic['data'] == logic['value']){
                        changeStateUtils(logic['state'], _questionEl);
                    }
                    break;
                case "not_equal":
                    if(dataQuestionLogic['data'] != logic['value']){
                        changeStateUtils(logic['state'], _questionEl);
                    }
                    break;
                case "less":
                    if(dataQuestionLogic['data'] < logic['value']){
                        changeStateUtils(logic['state'], _questionEl);
                    }
                    break;
                case "less_equal":
                    if(dataQuestionLogic['data'] <= logic['value']){
                        changeStateUtils(logic['state'], _questionEl);
                    }
                    break;
                case "greater":
                    if(dataQuestionLogic['data'] > logic['value']){
                        changeStateUtils(logic['state'], _questionEl);
                    }
                    break;
                case "greater_equal":
                    if(dataQuestionLogic['data'] >= logic['value']){
                        changeStateUtils(logic['state'], _questionEl);
                    }
                    break;
                case "contain":
                    let logicArrayValues = logic['value'].split(',');
                    let dataArrayValues = dataQuestionLogic['data'];
                    let containSomeValue = logicArrayValues.some((item:any) => dataArrayValues.includes(parseInt(item)))
                    if(containSomeValue){
                        changeStateUtils(logic['state'], _questionEl);
                    }
                    break;
            }
        }
        
    });
}
