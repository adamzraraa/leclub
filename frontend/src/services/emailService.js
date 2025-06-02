import emailjs from '@emailjs/browser';

// Configuration EmailJS pour envoi automatique
const EMAILJS_SERVICE_ID = 'service_restaurant_leclub';
const EMAILJS_TEMPLATE_ID = 'template_devis_leclub';    
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';

// Fonction pour envoyer un devis événement automatiquement
export const sendEventQuote = async (formData) => {
  try {
    // Initialiser EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Préparation des données pour l'email automatique
    const emailData = {
      to_email: 'restaurant.traiteur.leclub@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      event_type: formData.eventType,
      event_date: formData.date,
      guests_count: formData.guests,
      message: formData.message,
      subject: `Demande de devis ${formData.eventType} - ${formData.name}`,
      // Message formaté
      formatted_message: `
NOUVELLE DEMANDE DE DEVIS ÉVÉNEMENT
Restaurant Le Club

=== INFORMATIONS CLIENT ===
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}

=== DÉTAILS DE L'ÉVÉNEMENT ===
Type d'événement: ${formData.eventType}
Date souhaitée: ${formData.date}
Nombre d'invités: ${formData.guests}

=== MESSAGE DU CLIENT ===
${formData.message}

=== À FAIRE ===
- Préparer un devis personnalisé
- Contacter le client par email ou téléphone
- Proposer un rendez-vous si nécessaire

Restaurant Le Club
41 Rue de Rondelet, 34970 Lattes
06 66 53 30 99
      `
    };

    // Envoi automatique via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailData
    );

    console.log('Email envoyé avec succès:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { success: false, error };
  }
};

// Fonction principale pour envoyer les devis par email - approche simple et fiable
export const sendQuoteByEmail = async (formData) => {
  try {
    // Solution 1: Utiliser Formspree avec un endpoint générique
    const formspreeResponse = await fetch('https://formspree.io/f/mwpevdvo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'restaurant.traiteur.leclub@gmail.com',
        subject: `🎉 Nouvelle demande de devis ${formData.eventType} - ${formData.name}`,
        name: formData.name,
        client_email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        date: formData.date,
        guests: formData.guests,
        message: formData.message,
        full_message: `
🎉 NOUVELLE DEMANDE DE DEVIS ÉVÉNEMENT
Restaurant Le Club

=== INFORMATIONS CLIENT ===
👤 Nom: ${formData.name}
📧 Email: ${formData.email}
📞 Téléphone: ${formData.phone}

=== DÉTAILS DE L'ÉVÉNEMENT ===
🎊 Type d'événement: ${formData.eventType}
📅 Date souhaitée: ${formData.date}
👥 Nombre d'invités: ${formData.guests}

=== MESSAGE DU CLIENT ===
💬 ${formData.message}

=== À FAIRE ===
- Préparer un devis personnalisé
- Contacter le client par email ou téléphone
- Proposer un rendez-vous si nécessaire

📍 Restaurant Le Club
41 Rue de Rondelet, 34970 Lattes
📞 06 66 53 30 99
        `
      })
    });

    if (formspreeResponse.ok) {
      console.log('Email envoyé avec succès via Formspree');
      return { success: true, method: 'formspree' };
    } else {
      throw new Error(`Erreur Formspree: ${formspreeResponse.status}`);
    }
    
  } catch (error) {
    console.error('Erreur envoi Formspree:', error);
    
    // Solution 2: Fallback - Ouvrir le client email avec un mailto préconfiguré
    try {
      const emailSubject = `🎉 Nouvelle demande de devis ${formData.eventType} - ${formData.name}`;
      const emailBody = `
🎉 NOUVELLE DEMANDE DE DEVIS ÉVÉNEMENT
Restaurant Le Club

=== INFORMATIONS CLIENT ===
👤 Nom: ${formData.name}
📧 Email: ${formData.email}
📞 Téléphone: ${formData.phone}

=== DÉTAILS DE L'ÉVÉNEMENT ===
🎊 Type d'événement: ${formData.eventType}
📅 Date souhaitée: ${formData.date}
👥 Nombre d'invités: ${formData.guests}

=== MESSAGE DU CLIENT ===
💬 ${formData.message}

📍 Restaurant Le Club
41 Rue de Rondelet, 34970 Lattes
📞 06 66 53 30 99
      `.trim();

      const mailtoUrl = `mailto:restaurant.traiteur.leclub@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Ouvrir le client email
      window.open(mailtoUrl, '_blank');
      
      return { success: true, method: 'mailto' };
      
    } catch (mailtoError) {
      console.error('Erreur mailto:', mailtoError);
      return { success: false, error: mailtoError, method: 'email' };
    }
  }
};

// Fonction de fallback qui utilise un service email public (formspree ou similaire)
export const sendEmailFallback = async (formData) => {
  try {
    // Utiliser un service de formulaire public comme Formspree
    const response = await fetch('https://formspree.io/f/xkndvzqa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'restaurant.traiteur.leclub@gmail.com',
        subject: `Demande de devis ${formData.eventType} - ${formData.name}`,
        message: `
NOUVELLE DEMANDE DE DEVIS ÉVÉNEMENT
Restaurant Le Club

INFORMATIONS CLIENT:
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}

DÉTAILS DE L'ÉVÉNEMENT:
Type: ${formData.eventType}
Date: ${formData.date}
Invités: ${formData.guests}

MESSAGE:
${formData.message}

Restaurant Le Club - 41 Rue de Rondelet, 34970 Lattes
        `,
        email: formData.email,
        name: formData.name
      })
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Erreur du service email');
    }
  } catch (error) {
    console.error('Erreur fallback email:', error);
    return { success: false, error };
  }
};

// Fonction de fallback WhatsApp si les emails ne marchent pas
export const createWhatsAppFallback = (formData) => {
  const message = `🎉 DEMANDE DE DEVIS ÉVÉNEMENT - Restaurant Le Club

👤 INFORMATIONS CLIENT:
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}

🎊 DÉTAILS DE L'ÉVÉNEMENT:
Type: ${formData.eventType}
Date souhaitée: ${formData.date}
Nombre d'invités: ${formData.guests}

💬 MESSAGE:
${formData.message}

📍 Restaurant Le Club
41 Rue de Rondelet, 34970 Lattes`;

  const whatsappUrl = `https://wa.me/33666533099?text=${encodeURIComponent(message)}`;
  return whatsappUrl;
};