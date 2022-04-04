/* global tStrings */

import React, {
	useState,
} from 'react';
import PropTypes from 'prop-types';

import {
	validateEmail,
} from '~mod/utils';

const YotpoQuestionForm = (props) => {
	const {
		onSubmit,
	} = props;

	const [question, setQuestion] = useState('');
	const [errorQuestion, setErrorQuestion] = useState(false);
	const [name, setName] = useState('');
	const [errorName, setErrorName] = useState(false);
	const [email, setEmail] = useState('');
	const [errorEmail, setErrorEmail] = useState(false);

	const [hasError, setHasError] = useState(false);

	const onSubmitButton = () => {
		const isQuestionErr = question === '';
		const isNameErr = name === '';
		const isEmailErr = !validateEmail(email);
		setErrorQuestion(isQuestionErr);
		setErrorName(isNameErr);
		setErrorEmail(isEmailErr);

		const error = isQuestionErr || isNameErr || isEmailErr;
		setHasError(error);

		if (!error) {
			const data = {
				review_content: question,
				display_name: name,
				email,
			};
			onSubmit(data);
		}
	};

	return (
		<div id="yotpoQuestionForm" className="collapse mt-4" data-parent="#yotpoFormCollapse">
			<div className="yotpo__review-fields d-flex flex-column">
				<div className="form-group">
					<h4 className="mb-3">{tStrings.yotpo.askQuestion}</h4>
					<p className="font-size-sm mb-2">
						<span className="text-secondary">* </span>
						{tStrings.yotpo.requiredField}
					</p>
				</div>
				<div className="form-group">
					<p className="font-size-sm mb-2">
						<span className="text-secondary">* </span>
						{tStrings.yotpo.question}
						:
					</p>
					<textarea className="form-control mb-2" id="yotpoFormQuestion" value={question} onChange={(e) => setQuestion(e.target.value)} rows="5" />
					{errorQuestion && <small className="text-secondary mb-2">{tStrings.yotpo.questionError}</small>}
				</div>
				<div className="row mx-0 mx-lg-ng mb-4 justify-content-lg-end">
					<div className="col-lg-4 px-0 px-lg-g mb-2 mb-lg-0">
						<p className="font-size-sm mb-2">
							<span className="text-secondary">* </span>
							{tStrings.yotpo.name}
							:
						</p>
						<input type="text" id="yotpoReviewName" className="form-control mb-2" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
						{errorName && <small className="text-secondary mb-2">{tStrings.yotpo.nameError}</small>}
					</div>
					<div className="col-lg-4 px-0 px-lg-g">
						<p className="font-size-sm mb-2">
							<span className="text-secondary">* </span>
							{tStrings.yotpo.email}
							:
						</p>
						<input type="email" id="yotpoReviewEmail" className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						{errorEmail && <small className="text-secondary mb-2">{tStrings.yotpo.emailError}</small>}
					</div>
				</div>
				<div className="d-flex form-group align-items-center justify-content-end">
					{hasError && <small className="text-secondary mr-2">{tStrings.yotpo.formError}</small>}
					<button type="button" className="btn btn-secondary btn-black" onClick={onSubmitButton}>{tStrings.yotpo.submit}</button>
				</div>
			</div>
		</div>
	);
};

YotpoQuestionForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default YotpoQuestionForm;
