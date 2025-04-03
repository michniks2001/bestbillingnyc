export const EmailTemplate = ({name, email, phone, message}) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            backgroundColor: '#ffffff'
        }}>
            <div style={{
                background: 'linear-gradient(to right, #0a2351, #1a3a6c)',
                padding: '20px',
                borderRadius: '6px 6px 0 0',
                marginBottom: '20px'
            }}>
                <h1 style={{
                    color: '#ffffff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    margin: '0',
                    textAlign: 'center'
                }}>New Consultation Request</h1>
            </div>
            
            <div style={{padding: '0 20px'}}>
                <p style={{fontSize: '16px', color: '#555', marginBottom: '25px'}}>
                    A new consultation request has been submitted on {currentDate}.
                </p>
                
                <div style={{marginBottom: '20px'}}>
                    <h2 style={{fontSize: '18px', color: '#0a2351', borderBottom: '1px solid #eee', paddingBottom: '8px'}}>
                        Contact Information
                    </h2>
                    <p style={{margin: '8px 0', fontSize: '16px'}}>
                        <strong style={{color: '#333', display: 'inline-block', width: '80px'}}>Name:</strong> 
                        <span style={{color: '#555'}}>{name}</span>
                    </p>
                    <p style={{margin: '8px 0', fontSize: '16px'}}>
                        <strong style={{color: '#333', display: 'inline-block', width: '80px'}}>Email:</strong> 
                        <span style={{color: '#555'}}>{email}</span>
                    </p>
                    <p style={{margin: '8px 0', fontSize: '16px'}}>
                        <strong style={{color: '#333', display: 'inline-block', width: '80px'}}>Phone:</strong> 
                        <span style={{color: '#555'}}>{phone}</span>
                    </p>
                </div>
                
                <div style={{marginBottom: '20px'}}>
                    <h2 style={{fontSize: '18px', color: '#0a2351', borderBottom: '1px solid #eee', paddingBottom: '8px'}}>
                        Message
                    </h2>
                    <p style={{margin: '12px 0', fontSize: '16px', lineHeight: '1.5', color: '#555'}}>
                        {message}
                    </p>
                </div>
            </div>
            
            <div style={{
                background: '#f5f5f5',
                padding: '15px',
                borderRadius: '0 0 6px 6px',
                textAlign: 'center',
                fontSize: '14px',
                color: '#777',
                borderTop: '1px solid #eee'
            }}>
                <p style={{margin: '0'}}>
                    © {new Date().getFullYear()} Best Billing Co. All rights reserved.
                </p>
            </div>
        </div>
    );
}
