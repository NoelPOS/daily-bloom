import * as React from "react";

export const EmailTemplate = ({ firstName, lastName, email, message }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>
      You have a new message from {firstName} {lastName} ({email}):
    </p>
    <p>{message}</p>

    <p>Best regards,</p>
  </div>
);
