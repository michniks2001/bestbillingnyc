export const EmailTemplate = ({name, email, phone, message}) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Consultation Request</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Message: {message}</p>
        </div>
    )
}
