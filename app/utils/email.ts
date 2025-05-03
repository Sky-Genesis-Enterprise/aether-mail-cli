export type Email = {
    id: string;
    from: string;
    to: string;
    subject: string;
    body: string;
    date: string;
    read: boolean;
  };
  
  export type SendEmailInput = Omit<Email, 'id' | 'date' | 'read' | 'from'> & {
    from?: string;
  };
  
  // Mock: send email
  export async function sendEmail(email: SendEmailInput): Promise<Email> {
    return {
      id: Math.random().toString(36).slice(2, 10),
      ...email,
      from: email.from || process.env.AMC_EMAIL || '',
      date: new Date().toISOString(),
      read: false,
    };
  }
  
  // Mock: list inbox
  export async function listInbox(): Promise<Email[]> {
    return [
      {
        id: 'abc123',
        from: 'bob@aethermail.example.com',
        to: process.env.AMC_EMAIL || '',
        subject: 'Welcome!',
        body: 'Welcome to Aether Mail!',
        date: new Date().toISOString(),
        read: false,
      },
    ];
  }
  
  // Mock: get single email
  export async function getEmailById(id: string): Promise<Email | null> {
    const inbox = await listInbox();
    return inbox.find((e) => e.id === id) || null;
  }