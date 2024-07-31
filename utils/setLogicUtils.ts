export default (_question:any) => {
    let logic = { "question": null, "state": null, "validation": null, "value": null };
    if(_question.attributes){
        let attributes = JSON.parse(_question['attributes']);
        if(attributes['logic_question'] !== "none"){
            logic['question'] = attributes['logic_question'];
            logic['state'] = attributes['logic_state'];
            logic['validation'] = attributes['logic_validation'];
            logic['value'] = attributes['logic_value'];
            return JSON.stringify(logic);
        }
    }
}