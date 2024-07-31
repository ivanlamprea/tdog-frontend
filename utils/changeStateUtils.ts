export default (_state:string, _elementQuestion:any) => {
    console.log(_state);
    switch(_state) {
        case 'visible':
            _elementQuestion.style.display = 'block';
            break;
        case 'hidden':
            _elementQuestion.style.display = 'none';
            break;
        case 'active':
            let enableElements = _elementQuestion.querySelectorAll('input, select, textarea');
            enableElements.forEach((_enaEl:any) => _enaEl.removeAttribute('disabled'));
            break;
        case 'disabled': 
            let disableElements = _elementQuestion.querySelectorAll('input, select, textarea');
            disableElements.forEach((_disEl:any) => _disEl.setAttribute('disabled', 'disabled'));
            break;
    }
}