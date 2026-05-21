// app/api/submit/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import twilio from "twilio";

// Types for incoming payload (mirrors the form schema)
interface SubmitPayload {
  destinations: string[];
  startDate: string;
  endDate: string;
  guests: number;
  budget: string;
  requirements?: string;
  name: string;
  email: string;
  phone: string;
  country: string;
}

export async function POST(request: Request) {
  try {
    const data: SubmitPayload = await request.json();

    // 1️⃣ Send to HubSpot (form submission endpoint)
    const hubspotApiKey = process.env.HUBSPOT_API_KEY;
    const hubspotFormId = process.env.HUBSPOT_FORM_ID; // use a HubSpot form ID
    if (hubspotApiKey && hubspotFormId) {
      const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${hubspotFormId}`;
      const hubspotPayload = {
        fields: [
          { name: "email", value: data.email },
          { name: "firstname", value: data.name },
          { name: "phone", value: data.phone },
          { name: "destinations", value: data.destinations.join(", ") },
          { name: "travel_start", value: data.startDate },
          { name: "travel_end", value: data.endDate },
          { name: "guests", value: data.guests.toString() },
          { name: "budget", value: data.budget },
          { name: "requirements", value: data.requirements || "" },
          { name: "country", value: data.country },
        ],
        context: { pageUri: "https://axcconcierge.com/apply", pageName: "Apply Form" },
      };
      await axios.post(hubspotUrl, hubspotPayload, {
        headers: { "Content-Type": "application/json" },
        auth: { username: "", password: hubspotApiKey },
      });
    }

    // 2️⃣ Send WhatsApp notification via Twilio
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM; // e.g., "whatsapp:+14155238886"
    const whatsappTo = process.env.TWILIO_WHATSAPP_TO; // your sales team number
    if (twilioSid && twilioToken && whatsappFrom && whatsappTo) {
      const client = twilio(twilioSid, twilioToken);
      const message = `🛫 New Axc Concierge lead:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Budget: ${data.budget}
Destinations: ${data.destinations.join(", ")}`;
      await client.messages.create({
        from: whatsappFrom,
        to: whatsappTo,
        body: message,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 });
  }
}
