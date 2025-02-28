import { EmailTemplate } from "../../../components/Contact/EmailTemplate";
import { Resend } from "resend";

console.log(process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { firstName, lastName, email, message } = await request.json();

  console.log(firstName, lastName, email, message);

  try {
    const { data, error } = await resend.emails.send({
      from: "noelpos@noelpos.tech",
      to: ["u6530183@au.edu"],
      subject: "Hello world",
      react: EmailTemplate({
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message,
      }),
    });

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
