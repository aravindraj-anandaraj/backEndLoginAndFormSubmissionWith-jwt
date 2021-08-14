const Form = require('./../model/form');

exports.getFormDetails = async (req, res, next) => {
    const forms = await Form.find({ submittedBy: req.user.id });
    res.status(200).json(forms);
};

exports.saveFormDetails = async (req, res, next) => {
    const newForm = new Form(req.body);
    newForm.submittedBy = req.user.id;
    try{
        const form = await newForm.save();
        res.status(200).json(form);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.deleteFormDetails = async (req, res, next) => {
    const { id } = req.params;
    try {
        const idExists = await Form.findById(id);
        if(idExists) {
            await Form.findByIdAndRemove(id);
            res.status(200).json({ message: 'The specified form is deleted' });
        }
        res.status(400).json({ message: 'Id does not exist' }); 
    } catch (error) {
        error.status = 400;
        next(error);
    }
};