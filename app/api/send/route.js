import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend"
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        // Parse the request body to get form data
        const formData = await request.json();
        const { name, email, phone, message } = formData;
        
        // Validate required fields
        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { error: "Missing required fields", formData }, 
                { status: 400 }
            );
        }

        // Log data for debugging
        console.log("Sending email with data:", { name, email, phone, message });
        
        // Check if API key is available
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not defined");
            return NextResponse.json(
                { error: "Email service configuration error" }, 
                { status: 500 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: `${name.replace(/\s/g, '')}@updates.bestbillingnyc.com`, // Use the verified sender from Resend
            to: "contact@bestbillingnyc.com",
            subject: "New Consultation Request",
            react: EmailTemplate({
                name,
                email,
                phone,
                message
            })
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}