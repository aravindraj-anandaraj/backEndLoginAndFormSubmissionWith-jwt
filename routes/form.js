const express = require('express');
const router = express.Router();

const { getFormDetails, saveFormDetails, deleteFormDetails } = require('./../contollers/form');

router.route('/get-details')
.get(getFormDetails);

router.route('/save-details')
.post(saveFormDetails);

router.route('/delete-details/:id')
.delete(deleteFormDetails);

module.exports = router;