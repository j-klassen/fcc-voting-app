## JWT Options for SPA

- Send the JWT straight to the SPA to be stored in `localStorage`.
	- Ensure no sensitive data exists in the payload.
	- XSS susceptible
- Store the JWT in a session and use a secure cookie for the session id.
	- Need scalable session store at scale.