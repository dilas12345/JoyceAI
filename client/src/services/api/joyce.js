import { useState } from 'react';

import { Configuration, OpenAIApi } from 'openai';

const joyce =()=> {
  const configuration = new Configuration({
		apiKey: process.env.REACT_APP_OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

  console.log("CheDIlas", openai.configuration)
  
	const [storedValues, setStoredValues] = useState([]);

	const generateResponse = async (newQuestion, setNewQuestion) => {
		let options = {
			model: 'text-davinci-003',
			temperature: 0,
			max_tokens: 100,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
			stop: ['/'],
		};

		let completeOptions = {
			...options,
			prompt: newQuestion,
		};

		const response = await openai.createCompletion(completeOptions);

		if (response.data.choices) {
			setStoredValues([
				{
					question: newQuestion,
					answer: response.data.choices[0].text,
				},
				...storedValues,
			]);
			setNewQuestion('');
		}
	};

  return generateResponse();
}

export default joyce;