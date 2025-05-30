import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_SERVICE_ID = 'service_restaurant'; // À configurer dans EmailJS
const EMAILJS_TEMPLATE_ID = 'template_devis';    // À configurer dans EmailJS  
const EMAILJS_PUBLIC_KEY = 'your_public_key';    // À configurer dans EmailJS

// Fonction pour envoyer un devis événement
export const sendEventQuote = async (formData) => {
  try {
    // Préparation des données pour l'email
    const emailData = {
      to_email: 'restaurant.traiteur.leclub@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      event_type: formData.eventType,
      event_date: formData.date,
      guests_count: formData.guests,
      message: formData.message,
      subject: `Demande de devis - ${formData.eventType} - ${formData.name}`,
      // Formatage du message complet
      formatted_message: `
        NOUVELLE DEMANDE DE DEVIS ÉVÉNEMENT
        
        === INFORMATIONS CLIENT ===
        Nom: ${formData.name}
        Email: ${formData.email}
        Téléphone: ${formData.phone}
        
        === DÉTAILS DE L'ÉVÉNEMENT ===
        Type d'événement: ${formData.eventType}
        Date souhaitée: ${formData.date}
        Nombre d'invités: ${formData.guests}
        
        === MESSAGE ===
        ${formData.message}
        
        === CONTACT ===
        Cette demande a été envoyée depuis le site web du Restaurant Le Club.
        Répondez directement à ${formData.email} ou appelez le ${formData.phone}.
      `
    };

    // Envoi via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailData,
      EMAILJS_PUBLIC_KEY
    );

    return { success: true, response };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du devis:', error);
    return { success: false, error };
  }
};

// Fonction pour envoyer un message de contact général
export const sendContactMessage = async (formData) => {
  try {
    const emailData = {
      to_email: 'restaurant.traiteur.leclub@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject_type: formData.subject,
      message: formData.message,
      subject: `Contact Restaurant Le Club - ${formData.subject} - ${formData.name}`,
      formatted_message: `
        NOUVEAU MESSAGE DE CONTACT
        
        === INFORMATIONS CLIENT ===
        Nom: ${formData.name}
        Email: ${formData.email}
        Téléphone: ${formData.phone || 'Non renseigné'}
        Sujet: ${formData.subject}
        
        === MESSAGE ===
        ${formData.message}
        
        === CONTACT ===
        Cette demande a été envoyée depuis le site web du Restaurant Le Club.
        Répondez directement à ${formData.email}${formData.phone ? ' ou appelez le ' + formData.phone : ''}.
      `
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailData,
      EMAILJS_PUBLIC_KEY
    );

    return { success: true, response };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return { success: false, error };
  }
};

// Fonction de fallback qui crée un mailto: avec toutes les informations
export const createMailtoLink = (formData, isEvent = false) => {
  const subject = isEvent 
    ? `Demande de devis - ${formData.eventType} - ${formData.name}`
    : `Contact Restaurant Le Club - ${formData.subject} - ${formData.name}`;
  
  const body = isEvent 
    ? `DEMANDE DE DEVIS ÉVÉNEMENT

INFORMATIONS CLIENT:
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}

DÉTAILS DE L'ÉVÉNEMENT:
Type d'événement: ${formData.eventType}
Date souhaitée: ${formData.date}
Nombre d'invités: ${formData.guests}

MESSAGE:
${formData.message}`
    : `MESSAGE DE CONTACT

INFORMATIONS:
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone || 'Non renseigné'}
Sujet: ${formData.subject}

MESSAGE:
${formData.message}`;

  return `mailto:restaurant.traiteur.leclub@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};