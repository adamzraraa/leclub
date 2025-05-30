# Configuration EmailJS pour Le Restaurant Le Club

## Instructions de Configuration

Pour activer l'envoi automatique des emails de devis et contact, suivez ces étapes :

### 1. Créer un compte EmailJS
1. Allez sur [emailjs.com](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Configurer le service email
1. Dans le dashboard EmailJS, allez dans "Email Services"
2. Cliquez "Add New Service"
3. Choisissez Gmail (ou votre fournisseur email)
4. Connectez votre compte `restaurant.traiteur.leclub@gmail.com`
5. Notez l'ID du service (ex: `service_restaurant`)

### 3. Créer un template email
1. Allez dans "Email Templates"
2. Cliquez "Create New Template"
3. Utilisez ce template :

```
Sujet: {{subject}}

{{formatted_message}}

---
Envoyé automatiquement depuis le site web du Restaurant Le Club
Email: {{from_email}}
Téléphone: {{phone}}
```

4. Notez l'ID du template (ex: `template_devis`)

### 4. Obtenir la clé publique
1. Allez dans "Account" > "General"
2. Copiez votre "Public Key"

### 5. Mettre à jour la configuration
Dans le fichier `/src/services/emailService.js`, remplacez :

```javascript
const EMAILJS_SERVICE_ID = 'votre_service_id';
const EMAILJS_TEMPLATE_ID = 'votre_template_id';  
const EMAILJS_PUBLIC_KEY = 'votre_cle_publique';
```

### 6. Système de Fallback
Si EmailJS ne fonctionne pas, le système ouvre automatiquement le client mail par défaut avec toutes les informations pré-remplies.

### 7. Test
1. Testez les formulaires sur le site
2. Vérifiez que les emails arrivent bien sur `restaurant.traiteur.leclub@gmail.com`

## Avantages de cette solution

✅ **Automatique** : Les devis arrivent directement par email
✅ **Fallback** : Si EmailJS ne marche pas, le client mail s'ouvre
✅ **Gratuit** : 200 emails/mois gratuits avec EmailJS
✅ **Sécurisé** : Pas besoin de serveur backend
✅ **Formaté** : Les emails contiennent toutes les informations organisées

## Support

En cas de problème :
1. Vérifiez que les IDs dans `emailService.js` sont corrects
2. Testez le système de fallback (mailto)
3. Contactez le support EmailJS si nécessaire