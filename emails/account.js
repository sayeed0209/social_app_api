// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);
const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "abu.sayeed@natanekiberia.com",
		subject: "Thanks for joining in!",
		text: `Welcome to the blog , ${name} .Let me know how you get along with the app`,
	});
};

const sendCancellationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "abu.sayeed@natanekiberia.com",
		subject: "Sorry to see you go!",
		text: `Goodbye, ${name} .Thanks for your time with us ! I hope to see you back sometime soon`,
	});
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
