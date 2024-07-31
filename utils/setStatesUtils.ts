export default (_question:any) => {
    let states = { 'hidden': false, 'disabled': false };
    if(_question.attributes){
        let attributes = JSON.parse(_question['attributes']);
        //Check Disable
        if(attributes['disabled']) {
            states['disabled'] = true;
        }
        //Check Disable
        if(attributes['hidden']) {
            states['hidden'] = true;
        }

        if(Object.keys(states).length){
            return JSON.stringify(states);
        }
    }
}