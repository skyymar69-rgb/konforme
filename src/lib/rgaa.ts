/**
 * Référentiel RGAA 4.1.2 complet — les 106 critères officiels, en français.
 *
 * Le RGAA (Référentiel Général d'Amélioration de l'Accessibilité) est la
 * méthode technique française de référence pour vérifier la conformité au
 * WCAG 2.1 AA et, par extension, à la directive européenne (UE) 2019/882
 * (European Accessibility Act, applicable depuis le 28 juin 2025).
 *
 * Chaque critère porte :
 *  - `title`   : l'exigence officielle, condensée ;
 *  - `plain`   : une explication vulgarisée (info-bulle côté client) — ce que
 *                ça veut dire concrètement et qui est pénalisé quand ça manque ;
 *  - `level`   : le niveau WCAG (A ou AA) ;
 *  - `wcag`    : les critères de succès WCAG correspondants ;
 *  - `coverage`: ce que notre moteur sait tester — `auto` (détection fiable),
 *                `partial` (détection partielle), `manual` (vérification humaine requise).
 */

export type CriterionCoverage = 'auto' | 'partial' | 'manual'

export type RgaaTopic = {
  id: number
  name: string
  description: string
}

export type RgaaCriterion = {
  id: string
  topic: number
  title: string
  level: 'A' | 'AA'
  wcag: string[]
  coverage: CriterionCoverage
  plain: string
}

export const RGAA_TOPICS: RgaaTopic[] = [
  { id: 1, name: 'Images', description: 'Chaque image porteuse d’information doit avoir une alternative textuelle exploitable par les lecteurs d’écran.' },
  { id: 2, name: 'Cadres', description: 'Les cadres (iframe) doivent être identifiés par un titre pertinent.' },
  { id: 3, name: 'Couleurs', description: 'L’information ne doit jamais reposer sur la couleur seule et les contrastes doivent être suffisants.' },
  { id: 4, name: 'Multimédia', description: 'Vidéos et sons doivent proposer transcription, sous-titres ou audiodescription selon les cas.' },
  { id: 5, name: 'Tableaux', description: 'Les tableaux de données doivent déclarer leurs en-têtes pour être compréhensibles hors de leur mise en forme visuelle.' },
  { id: 6, name: 'Liens', description: 'Chaque lien doit avoir un intitulé explicite qui annonce sa destination.' },
  { id: 7, name: 'Scripts', description: 'Les composants interactifs (menus, carrousels, modales…) doivent être utilisables au clavier et compatibles avec les technologies d’assistance.' },
  { id: 8, name: 'Éléments obligatoires', description: 'Doctype, langue, titre de page et validité du code : les fondations techniques de chaque page.' },
  { id: 9, name: 'Structuration de l’information', description: 'Titres hiérarchisés, listes et citations correctement balisés pour permettre une lecture structurée.' },
  { id: 10, name: 'Présentation de l’information', description: 'La mise en forme (CSS) ne doit pas empêcher la lecture : zoom 200 %, focus visible, contenu adaptable.' },
  { id: 11, name: 'Formulaires', description: 'Chaque champ doit avoir une étiquette, les erreurs doivent être signalées et corrigeables.' },
  { id: 12, name: 'Navigation', description: 'Plusieurs moyens de navigation, liens d’évitement, ordre de tabulation cohérent, pas de piège clavier.' },
  { id: 13, name: 'Consultation', description: 'Contrôle des limites de temps, des ouvertures de fenêtres, des animations et des documents en téléchargement.' },
]

export const RGAA_CRITERIA: RgaaCriterion[] = [
  /* ------------------------------ 1. Images ------------------------------ */
  {
    id: '1.1', topic: 1, level: 'A', wcag: ['1.1.1'], coverage: 'auto',
    title: 'Chaque image porteuse d’information a une alternative textuelle',
    plain: 'Une personne aveugle « lit » les images grâce au texte de remplacement (attribut alt). Sans lui, le lecteur d’écran annonce « image » sans autre précision : l’information est perdue.',
  },
  {
    id: '1.2', topic: 1, level: 'A', wcag: ['1.1.1'], coverage: 'partial',
    title: 'Chaque image de décoration est ignorée par les technologies d’assistance',
    plain: 'Une image purement décorative (filet, icône d’ambiance) doit porter un alt vide (alt="") pour ne pas polluer la lecture vocale avec des annonces inutiles.',
  },
  {
    id: '1.3', topic: 1, level: 'A', wcag: ['1.1.1'], coverage: 'partial',
    title: 'L’alternative textuelle de chaque image informative est pertinente',
    plain: 'Un alt du type « IMG_0123.jpg » ou « photo » n’apporte rien. L’alternative doit transmettre la même information que l’image : que comprendrait-on au téléphone si on devait la décrire ?',
  },
  {
    id: '1.4', topic: 1, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'L’alternative d’un CAPTCHA ou d’une image-test identifie sa nature et sa fonction',
    plain: 'Un CAPTCHA image doit au minimum annoncer « CAPTCHA : test de sécurité » pour que l’utilisateur comprenne ce qu’on lui demande, même s’il ne voit pas l’image.',
  },
  {
    id: '1.5', topic: 1, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'Chaque CAPTCHA propose une solution d’accès alternative',
    plain: 'Un CAPTCHA visuel doit offrir une alternative (version audio, question logique…) sinon il bloque totalement les personnes aveugles ou malvoyantes — souvent à l’étape la plus critique (paiement, contact).',
  },
  {
    id: '1.6', topic: 1, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'Chaque image porteuse d’information a, si nécessaire, une description détaillée',
    plain: 'Un graphique, un schéma ou une infographie complexe ne tient pas dans un alt court : il faut une description longue (texte adjacent, page dédiée) qui restitue toutes les données.',
  },
  {
    id: '1.7', topic: 1, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'La description détaillée de chaque image est pertinente',
    plain: 'La description longue doit vraiment reprendre l’information de l’image (chiffres d’un graphique, étapes d’un schéma), pas seulement la paraphraser.',
  },
  {
    id: '1.8', topic: 1, level: 'AA', wcag: ['1.4.5'], coverage: 'manual',
    title: 'Les images de texte sont remplacées par du texte stylé quand c’est possible',
    plain: 'Un texte inséré en image devient flou au zoom, illisible pour les lecteurs d’écran et ne s’adapte pas aux réglages de l’utilisateur. Le même rendu est presque toujours possible en CSS.',
  },
  {
    id: '1.9', topic: 1, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'Chaque légende d’image est correctement reliée à son image',
    plain: 'Une légende doit être associée programmatiquement à son image (figure/figcaption), sinon le lecteur d’écran ne fait pas le lien entre les deux.',
  },

  /* ------------------------------ 2. Cadres ------------------------------ */
  {
    id: '2.1', topic: 2, level: 'A', wcag: ['4.1.2'], coverage: 'auto',
    title: 'Chaque cadre (iframe) a un titre',
    plain: 'Sans attribut title, un lecteur d’écran annonce « cadre » sans dire ce qu’il contient (carte, vidéo, paiement…). L’utilisateur doit deviner s’il doit y entrer ou non.',
  },
  {
    id: '2.2', topic: 2, level: 'A', wcag: ['4.1.2'], coverage: 'partial',
    title: 'Le titre de chaque cadre est pertinent',
    plain: 'Un title générique (« iframe », « widget ») ne sert à rien. Il doit décrire le contenu réel : « Carte d’accès à nos locaux », « Vidéo de présentation ».',
  },

  /* ----------------------------- 3. Couleurs ----------------------------- */
  {
    id: '3.1', topic: 3, level: 'A', wcag: ['1.4.1'], coverage: 'manual',
    title: 'L’information n’est jamais donnée uniquement par la couleur',
    plain: 'Environ 8 % des hommes sont daltoniens. « Les champs en rouge sont obligatoires » ne fonctionne pas pour eux : il faut aussi un texte, une icône ou un motif.',
  },
  {
    id: '3.2', topic: 3, level: 'AA', wcag: ['1.4.3'], coverage: 'manual',
    title: 'Le contraste entre le texte et son arrière-plan est suffisant (4,5:1)',
    plain: 'Un texte gris clair sur fond blanc est illisible pour les personnes malvoyantes, les seniors, ou simplement en plein soleil sur mobile. Le ratio minimal est de 4,5:1 (3:1 pour les gros titres).',
  },
  {
    id: '3.3', topic: 3, level: 'AA', wcag: ['1.4.11'], coverage: 'manual',
    title: 'Les composants d’interface et éléments graphiques porteurs d’information sont suffisamment contrastés (3:1)',
    plain: 'Bordures de champs, icônes fonctionnelles, courbes de graphiques : s’ils sont trop pâles (ratio < 3:1), une partie des utilisateurs ne les distingue tout simplement pas.',
  },

  /* ---------------------------- 4. Multimédia ---------------------------- */
  {
    id: '4.1', topic: 4, level: 'A', wcag: ['1.2.1'], coverage: 'manual',
    title: 'Chaque média pré-enregistré a, si nécessaire, une transcription textuelle ou une audiodescription',
    plain: 'Une transcription texte permet aux personnes sourdes de lire un podcast et aux personnes aveugles d’accéder au contenu d’une vidéo. C’est aussi un atout SEO majeur.',
  },
  {
    id: '4.2', topic: 4, level: 'A', wcag: ['1.2.1', '1.2.3'], coverage: 'manual',
    title: 'La transcription ou l’audiodescription de chaque média est pertinente',
    plain: 'La transcription doit être complète et fidèle : dialogues, intervenants, informations visuelles importantes — pas un simple résumé.',
  },
  {
    id: '4.3', topic: 4, level: 'A', wcag: ['1.2.2'], coverage: 'partial',
    title: 'Chaque vidéo pré-enregistrée a, si nécessaire, des sous-titres synchronisés',
    plain: 'Sans sous-titres, une vidéo est inaccessible aux personnes sourdes ou malentendantes — et à tous ceux qui regardent sans le son (80 % des vidéos sur mobile).',
  },
  {
    id: '4.4', topic: 4, level: 'A', wcag: ['1.2.2'], coverage: 'manual',
    title: 'Les sous-titres de chaque vidéo sont pertinents',
    plain: 'Des sous-titres auto-générés truffés d’erreurs ne suffisent pas : ils doivent être synchronisés, fidèles et identifier les locuteurs et bruits significatifs.',
  },
  {
    id: '4.5', topic: 4, level: 'AA', wcag: ['1.2.5'], coverage: 'manual',
    title: 'Chaque vidéo pré-enregistrée a, si nécessaire, une audiodescription synchronisée',
    plain: 'L’audiodescription raconte ce qui se passe à l’écran (actions, textes affichés) pendant les silences, pour les personnes aveugles ou malvoyantes.',
  },
  {
    id: '4.6', topic: 4, level: 'AA', wcag: ['1.2.5'], coverage: 'manual',
    title: 'L’audiodescription de chaque vidéo est pertinente',
    plain: 'L’audiodescription doit couvrir tous les éléments visuels nécessaires à la compréhension, au bon moment, sans chevaucher les dialogues.',
  },
  {
    id: '4.7', topic: 4, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'Chaque média temporel est clairement identifiable',
    plain: 'L’utilisateur doit savoir qu’un lecteur vidéo ou audio est présent et ce qu’il contient (titre adjacent, intitulé) avant de le lancer.',
  },
  {
    id: '4.8', topic: 4, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'Chaque média non temporel (carte, animation interactive…) a, si nécessaire, une alternative',
    plain: 'Une carte interactive ou une animation complexe doit avoir un équivalent accessible : liste d’adresses, tableau de données, texte descriptif.',
  },
  {
    id: '4.9', topic: 4, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'L’alternative de chaque média non temporel est pertinente',
    plain: 'L’alternative doit donner accès aux mêmes informations et aux mêmes fonctions que le média original, pas à une version appauvrie.',
  },
  {
    id: '4.10', topic: 4, level: 'A', wcag: ['1.4.2'], coverage: 'auto',
    title: 'Chaque son déclenché automatiquement est contrôlable',
    plain: 'Un son qui se lance tout seul couvre la voix de synthèse des lecteurs d’écran : l’utilisateur aveugle n’entend plus rien. Il faut pouvoir l’arrêter immédiatement.',
  },
  {
    id: '4.11', topic: 4, level: 'A', wcag: ['2.1.1'], coverage: 'manual',
    title: 'La consultation de chaque média temporel est contrôlable au clavier et au pointeur',
    plain: 'Lecture, pause, volume, sous-titres : tous les boutons du lecteur doivent fonctionner au clavier seul, pour les personnes qui ne peuvent pas utiliser de souris.',
  },
  {
    id: '4.12', topic: 4, level: 'A', wcag: ['2.1.1'], coverage: 'manual',
    title: 'La consultation de chaque média non temporel est contrôlable au clavier et au pointeur',
    plain: 'Une carte interactive doit pouvoir être parcourue au clavier (zoom, déplacement, sélection des points d’intérêt), pas uniquement à la souris ou au tactile.',
  },
  {
    id: '4.13', topic: 4, level: 'A', wcag: ['2.1.1', '4.1.2'], coverage: 'manual',
    title: 'Chaque média est compatible avec les technologies d’assistance',
    plain: 'Le lecteur vidéo/audio doit exposer ses boutons aux lecteurs d’écran (noms, rôles, états). Les lecteurs exotiques « faits maison » échouent souvent ici.',
  },

  /* ----------------------------- 5. Tableaux ----------------------------- */
  {
    id: '5.1', topic: 5, level: 'A', wcag: ['1.3.1'], coverage: 'manual',
    title: 'Chaque tableau de données complexe a un résumé',
    plain: 'Un tableau à double entrée ou à en-têtes multiples doit être précédé d’un résumé expliquant sa structure, pour qu’un utilisateur de lecteur d’écran sache comment le parcourir.',
  },
  {
    id: '5.2', topic: 5, level: 'A', wcag: ['1.3.1'], coverage: 'manual',
    title: 'Le résumé de chaque tableau complexe est pertinent',
    plain: 'Le résumé doit décrire réellement l’organisation du tableau (ce que représentent lignes et colonnes), pas répéter son titre.',
  },
  {
    id: '5.3', topic: 5, level: 'A', wcag: ['1.3.2'], coverage: 'manual',
    title: 'Le contenu de chaque tableau de mise en forme reste compréhensible une fois linéarisé',
    plain: 'Si un tableau sert uniquement à la mise en page, son contenu lu ligne par ligne (comme le fait un lecteur d’écran) doit rester dans un ordre logique.',
  },
  {
    id: '5.4', topic: 5, level: 'A', wcag: ['1.3.1'], coverage: 'partial',
    title: 'Le titre de chaque tableau de données est correctement associé (caption)',
    plain: 'Le titre d’un tableau doit être balisé en <caption>, pas en simple paragraphe au-dessus : c’est ce qui permet au lecteur d’écran de l’annoncer avec le tableau.',
  },
  {
    id: '5.5', topic: 5, level: 'A', wcag: ['1.3.1'], coverage: 'manual',
    title: 'Le titre de chaque tableau de données est pertinent',
    plain: 'Le caption doit permettre de comprendre de quoi parle le tableau sans le lire en entier : « Tarifs 2026 par formule » plutôt que « Tableau 3 ».',
  },
  {
    id: '5.6', topic: 5, level: 'A', wcag: ['1.3.1'], coverage: 'auto',
    title: 'Chaque en-tête de ligne et de colonne est correctement déclaré (th)',
    plain: 'Sans cellules d’en-tête balisées <th>, un lecteur d’écran lit les valeurs sans contexte : « 42 » au lieu de « Prix mensuel : 42 ». Le tableau devient une suite de chiffres sans sens.',
  },
  {
    id: '5.7', topic: 5, level: 'A', wcag: ['1.3.1'], coverage: 'partial',
    title: 'Chaque cellule est associée à ses en-têtes (scope, headers)',
    plain: 'Dans les tableaux complexes, chaque cellule doit être reliée à ses en-têtes via scope ou headers/id pour que la lecture vocale annonce le bon contexte.',
  },
  {
    id: '5.8', topic: 5, level: 'A', wcag: ['1.3.1'], coverage: 'manual',
    title: 'Les tableaux de mise en forme n’utilisent pas d’éléments propres aux tableaux de données',
    plain: 'Un tableau de mise en page ne doit contenir ni <th>, ni <caption>, ni scope : ces balises feraient croire au lecteur d’écran qu’il s’agit de données structurées.',
  },

  /* ------------------------------- 6. Liens ------------------------------ */
  {
    id: '6.1', topic: 6, level: 'A', wcag: ['2.4.4'], coverage: 'partial',
    title: 'Chaque lien est explicite',
    plain: 'Les utilisateurs de lecteurs d’écran naviguent souvent de lien en lien : une série de « cliquez ici », « en savoir plus » identiques ne permet pas de savoir où mène chaque lien.',
  },
  {
    id: '6.2', topic: 6, level: 'A', wcag: ['2.4.4', '4.1.2'], coverage: 'auto',
    title: 'Chaque lien a un intitulé',
    plain: 'Un lien vide (icône sans texte, image sans alt) est annoncé « lien » sans aucune destination. L’utilisateur ne peut pas savoir s’il doit cliquer.',
  },

  /* ------------------------------ 7. Scripts ----------------------------- */
  {
    id: '7.1', topic: 7, level: 'A', wcag: ['4.1.2'], coverage: 'partial',
    title: 'Chaque script est, si nécessaire, compatible avec les technologies d’assistance',
    plain: 'Menus déroulants, onglets, modales, carrousels : chaque composant interactif doit exposer son nom, son rôle et son état (ouvert/fermé, sélectionné…) aux lecteurs d’écran, via les attributs ARIA appropriés.',
  },
  {
    id: '7.2', topic: 7, level: 'A', wcag: ['4.1.2'], coverage: 'manual',
    title: 'L’alternative de chaque script est pertinente',
    plain: 'Quand une fonctionnalité JavaScript propose une alternative accessible, celle-ci doit donner accès aux mêmes informations et actions.',
  },
  {
    id: '7.3', topic: 7, level: 'A', wcag: ['2.1.1'], coverage: 'partial',
    title: 'Chaque script est contrôlable au clavier et par tout dispositif de pointage',
    plain: 'Tout ce qui se fait à la souris doit pouvoir se faire au clavier : ouvrir un menu, fermer une modale, faire défiler un carrousel. Un div cliquable sans gestion clavier exclut les utilisateurs de clavier seul.',
  },
  {
    id: '7.4', topic: 7, level: 'A', wcag: ['3.2.1', '3.2.2'], coverage: 'partial',
    title: 'L’utilisateur est averti ou garde le contrôle des changements de contexte',
    plain: 'Une page qui se recharge ou redirige toute seule (au choix d’une liste, à la saisie d’un champ) désoriente complètement les utilisateurs de lecteurs d’écran.',
  },
  {
    id: '7.5', topic: 7, level: 'AA', wcag: ['4.1.3'], coverage: 'manual',
    title: 'Les messages de statut sont correctement restitués par les technologies d’assistance',
    plain: '« Produit ajouté au panier », « 3 résultats trouvés », « Formulaire envoyé » : ces messages doivent être annoncés vocalement (role="status", aria-live) sans déplacer le focus.',
  },

  /* ----------------------- 8. Éléments obligatoires ---------------------- */
  {
    id: '8.1', topic: 8, level: 'A', wcag: ['4.1.1'], coverage: 'partial',
    title: 'Chaque page a un type de document (doctype) valide',
    plain: 'Sans doctype, les navigateurs et technologies d’assistance interprètent la page en mode dégradé, avec des comportements imprévisibles.',
  },
  {
    id: '8.2', topic: 8, level: 'A', wcag: ['4.1.1'], coverage: 'partial',
    title: 'Le code source de chaque page est valide',
    plain: 'Balises mal fermées, identifiants dupliqués, imbrications interdites : un code invalide fait dérailler les lecteurs d’écran, qui lisent du contenu en double ou n’en lisent pas du tout.',
  },
  {
    id: '8.3', topic: 8, level: 'A', wcag: ['3.1.1'], coverage: 'auto',
    title: 'Chaque page a une langue par défaut',
    plain: 'L’attribut lang="fr" indique au lecteur d’écran quelle voix utiliser. Sans lui, une page française peut être lue avec une prononciation anglaise, incompréhensible.',
  },
  {
    id: '8.4', topic: 8, level: 'A', wcag: ['3.1.1'], coverage: 'partial',
    title: 'Le code de langue de chaque page est pertinent',
    plain: 'Un lang="en" sur une page en français fait lire tout le contenu avec un accent anglais. Le code doit correspondre à la vraie langue de la page.',
  },
  {
    id: '8.5', topic: 8, level: 'A', wcag: ['2.4.2'], coverage: 'auto',
    title: 'Chaque page a un titre de page (title)',
    plain: 'Le <title> est la première chose annoncée par un lecteur d’écran et ce qui s’affiche dans les onglets. Sans lui, impossible de se repérer entre plusieurs pages.',
  },
  {
    id: '8.6', topic: 8, level: 'A', wcag: ['2.4.2'], coverage: 'manual',
    title: 'Le titre de chaque page est pertinent',
    plain: 'Chaque page doit avoir un titre unique et descriptif : « Panier — Ma Boutique » et non « Accueil » partout. C’est le repère principal de navigation entre onglets.',
  },
  {
    id: '8.7', topic: 8, level: 'A', wcag: ['3.1.2'], coverage: 'manual',
    title: 'Chaque changement de langue est indiqué dans le code',
    plain: 'Un mot ou passage dans une autre langue (citation, « newsletter »…) doit porter un attribut lang pour être prononcé correctement par la synthèse vocale.',
  },
  {
    id: '8.8', topic: 8, level: 'A', wcag: ['3.1.2'], coverage: 'partial',
    title: 'Le code de langue de chaque changement de langue est valide et pertinent',
    plain: 'Les codes de langue utilisés (fr, en, de…) doivent être des codes ISO valides et correspondre à la langue réelle du passage.',
  },
  {
    id: '8.9', topic: 8, level: 'A', wcag: ['1.3.1'], coverage: 'partial',
    title: 'Les balises ne sont pas utilisées uniquement à des fins de présentation',
    plain: 'Utiliser un <h2> parce qu’il « rend bien » ou <blockquote> pour indenter trompe les lecteurs d’écran : chaque balise a un sens, pas seulement un style.',
  },
  {
    id: '8.10', topic: 8, level: 'A', wcag: ['1.3.2'], coverage: 'manual',
    title: 'Les changements du sens de lecture sont signalés',
    plain: 'Un passage en arabe ou en hébreu (lecture de droite à gauche) doit être signalé avec l’attribut dir="rtl" pour être affiché et lu correctement.',
  },

  /* --------------------------- 9. Structuration -------------------------- */
  {
    id: '9.1', topic: 9, level: 'A', wcag: ['1.3.1'], coverage: 'partial',
    title: 'L’information est structurée par des titres (h1-h6) appropriés',
    plain: 'Les utilisateurs de lecteurs d’écran naviguent de titre en titre pour parcourir une page. Une hiérarchie incohérente (h1 puis h4, titres vides) rend la page illisible pour eux.',
  },
  {
    id: '9.2', topic: 9, level: 'A', wcag: ['1.3.1'], coverage: 'manual',
    title: 'La structure du document est cohérente (header, main, footer, nav)',
    plain: 'Les zones principales de la page (en-tête, contenu, pied de page, navigation) doivent être balisées avec les éléments HTML prévus pour permettre une navigation rapide par régions.',
  },
  {
    id: '9.3', topic: 9, level: 'A', wcag: ['1.3.1'], coverage: 'partial',
    title: 'Chaque liste est correctement structurée (ul, ol, dl)',
    plain: 'Une vraie liste balisée annonce « liste de 5 éléments » au lecteur d’écran, qui peut la sauter ou la parcourir. Des tirets dans des <div> ne donnent aucune de ces informations.',
  },
  {
    id: '9.4', topic: 9, level: 'A', wcag: ['1.3.1'], coverage: 'manual',
    title: 'Chaque citation est correctement indiquée (blockquote, q)',
    plain: 'Les citations doivent être balisées <blockquote> ou <q> pour que l’utilisateur sache que ce texte est une citation et non un propos du site.',
  },

  /* --------------------------- 10. Présentation -------------------------- */
  {
    id: '10.1', topic: 10, level: 'A', wcag: ['1.3.1'], coverage: 'partial',
    title: 'Des feuilles de styles contrôlent la présentation (pas d’attributs de présentation HTML)',
    plain: 'La mise en forme doit passer par le CSS, pas par des balises ou attributs obsolètes (<font>, align, bgcolor…) : c’est ce qui permet à l’utilisateur d’adapter l’affichage à ses besoins.',
  },
  {
    id: '10.2', topic: 10, level: 'A', wcag: ['1.1.1', '1.3.1'], coverage: 'manual',
    title: 'Le contenu visible reste présent quand les feuilles de styles sont désactivées',
    plain: 'Aucune information ne doit être portée uniquement par le CSS (contenu en ::before/::after, image de fond informative) : elle disparaîtrait pour les technologies d’assistance.',
  },
  {
    id: '10.3', topic: 10, level: 'A', wcag: ['1.3.2'], coverage: 'manual',
    title: 'L’information reste compréhensible sans les feuilles de styles',
    plain: 'Sans CSS, le contenu doit apparaître dans un ordre logique. Si la page devient incohérente, les utilisateurs de lecteurs d’écran subissent ce désordre en permanence.',
  },
  {
    id: '10.4', topic: 10, level: 'AA', wcag: ['1.4.4'], coverage: 'partial',
    title: 'Le texte reste lisible avec un zoom à 200 %',
    plain: 'Beaucoup de personnes malvoyantes zooment à 200 %. Le texte doit s’agrandir sans être coupé, superposé ou masqué — et le zoom ne doit jamais être bloqué (user-scalable=no).',
  },
  {
    id: '10.5', topic: 10, level: 'A', wcag: ['1.4.3', '1.4.8'], coverage: 'manual',
    title: 'Les couleurs de fond et de police CSS sont correctement utilisées',
    plain: 'Si on définit une couleur de texte, il faut aussi définir la couleur de fond (et inversement), sinon les réglages personnels de l’utilisateur peuvent rendre le texte invisible (blanc sur blanc).',
  },
  {
    id: '10.6', topic: 10, level: 'A', wcag: ['1.4.1'], coverage: 'manual',
    title: 'Chaque lien est visuellement distinguable du texte environnant',
    plain: 'Un lien dans un paragraphe doit se repérer autrement que par sa seule couleur (soulignement, contraste 3:1 + indicateur) : indispensable pour les personnes daltoniennes.',
  },
  {
    id: '10.7', topic: 10, level: 'AA', wcag: ['2.4.7'], coverage: 'manual',
    title: 'La prise de focus est visible pour chaque élément interactif',
    plain: 'Quand on navigue au clavier (Tab), on doit toujours voir où l’on se trouve. Supprimer l’outline de focus (outline: none) sans le remplacer rend la navigation clavier impossible.',
  },
  {
    id: '10.8', topic: 10, level: 'A', wcag: ['4.1.2'], coverage: 'partial',
    title: 'Les contenus cachés ont vocation à être ignorés par les technologies d’assistance',
    plain: 'Un contenu masqué visuellement (menu replié, modale fermée) doit aussi être masqué des lecteurs d’écran — et inversement, pas de contenu focusable dans une zone aria-hidden.',
  },
  {
    id: '10.9', topic: 10, level: 'A', wcag: ['1.3.3'], coverage: 'manual',
    title: 'L’information n’est pas donnée uniquement par la forme, la taille ou la position',
    plain: '« Cliquez sur le bouton rond à droite » n’a aucun sens pour une personne aveugle ou sur un affichage recomposé. L’instruction doit fonctionner sans référence visuelle.',
  },
  {
    id: '10.10', topic: 10, level: 'A', wcag: ['1.3.3'], coverage: 'manual',
    title: 'L’information donnée par la forme, la taille ou la position est aussi disponible autrement',
    plain: 'Quand la mise en page porte du sens (élément mis en avant, regroupements visuels), ce sens doit aussi être exprimé dans le contenu ou la structure.',
  },
  {
    id: '10.11', topic: 10, level: 'AA', wcag: ['1.4.10'], coverage: 'partial',
    title: 'Le contenu se présente sans défilement horizontal à 320 px de large (reflow)',
    plain: 'À fort zoom ou sur petit écran, le contenu doit se réorganiser sur une colonne. Devoir défiler horizontalement à chaque ligne rend la lecture épuisante.',
  },
  {
    id: '10.12', topic: 10, level: 'AA', wcag: ['1.4.12'], coverage: 'manual',
    title: 'Les espacements du texte peuvent être augmentés sans perte de contenu',
    plain: 'Les personnes dyslexiques augmentent souvent interlignage et espacement des lettres. La page doit le supporter sans que le texte soit coupé ou chevauché.',
  },
  {
    id: '10.13', topic: 10, level: 'AA', wcag: ['1.4.13'], coverage: 'manual',
    title: 'Les contenus apparaissant au survol ou au focus sont contrôlables',
    plain: 'Une info-bulle ou un sous-menu qui apparaît au survol doit pouvoir être masqué (Échap), survolé sans disparaître, et rester affiché tant que nécessaire.',
  },
  {
    id: '10.14', topic: 10, level: 'A', wcag: ['2.1.1'], coverage: 'manual',
    title: 'Les contenus additionnels affichés via CSS sont atteignables au clavier',
    plain: 'Un menu qui ne s’ouvre qu’au survol de la souris (:hover) est inaccessible au clavier. L’ouverture doit aussi fonctionner à la prise de focus.',
  },

  /* ---------------------------- 11. Formulaires --------------------------- */
  {
    id: '11.1', topic: 11, level: 'A', wcag: ['1.3.1', '3.3.2', '4.1.2'], coverage: 'auto',
    title: 'Chaque champ de formulaire a une étiquette',
    plain: 'Sans étiquette (label) reliée au champ, un lecteur d’écran annonce « édition » sans dire quoi saisir. Un placeholder qui disparaît à la saisie ne suffit pas.',
  },
  {
    id: '11.2', topic: 11, level: 'A', wcag: ['2.4.6', '3.3.2'], coverage: 'manual',
    title: 'Chaque étiquette de champ est pertinente',
    plain: 'L’étiquette doit dire clairement ce qui est attendu, y compris le format : « Date de naissance (JJ/MM/AAAA) » plutôt que « Date ».',
  },
  {
    id: '11.3', topic: 11, level: 'AA', wcag: ['3.2.4'], coverage: 'manual',
    title: 'Les étiquettes de même fonction sont cohérentes dans tout le site',
    plain: 'Le même champ doit porter le même nom partout : si « E-mail » devient « Courriel » puis « Adresse électronique », l’utilisateur perd ses repères.',
  },
  {
    id: '11.4', topic: 11, level: 'A', wcag: ['3.3.2'], coverage: 'manual',
    title: 'Chaque étiquette est accolée à son champ',
    plain: 'L’étiquette doit être visuellement proche de son champ. Pour une personne qui utilise une loupe d’écran, une étiquette éloignée sort du champ de vision.',
  },
  {
    id: '11.5', topic: 11, level: 'A', wcag: ['1.3.1'], coverage: 'manual',
    title: 'Les champs de même nature sont regroupés, si nécessaire',
    plain: 'Les blocs de champs liés (adresse de livraison vs adresse de facturation) doivent être regroupés (fieldset) pour que l’on sache à quel bloc appartient chaque champ.',
  },
  {
    id: '11.6', topic: 11, level: 'A', wcag: ['1.3.1'], coverage: 'partial',
    title: 'Chaque regroupement de champs a une légende',
    plain: 'Un groupe de boutons radio ou de cases à cocher doit avoir une légende (legend) : sans elle, on entend « Oui / Non » sans savoir à quelle question cela répond.',
  },
  {
    id: '11.7', topic: 11, level: 'A', wcag: ['1.3.1'], coverage: 'manual',
    title: 'Chaque légende de regroupement est pertinente',
    plain: 'La légende doit énoncer la question ou le thème du groupe de champs, de façon compréhensible hors contexte visuel.',
  },
  {
    id: '11.8', topic: 11, level: 'A', wcag: ['1.3.1'], coverage: 'manual',
    title: 'Les items de même nature d’une liste de choix sont regroupés de manière pertinente',
    plain: 'Dans les longues listes déroulantes, les options doivent être regroupées par catégories (optgroup) pour rester parcourables.',
  },
  {
    id: '11.9', topic: 11, level: 'A', wcag: ['2.4.6', '4.1.2'], coverage: 'auto',
    title: 'L’intitulé de chaque bouton est pertinent',
    plain: 'Un bouton doit dire ce qu’il fait : « Envoyer ma demande » et non « OK ». Un bouton-icône sans texte accessible est annoncé « bouton » — inutilisable à l’aveugle.',
  },
  {
    id: '11.10', topic: 11, level: 'A', wcag: ['3.3.1', '3.3.2'], coverage: 'partial',
    title: 'Le contrôle de saisie est utilisé de manière pertinente',
    plain: 'Les champs obligatoires doivent être signalés avant la validation, et les erreurs indiquées clairement : quel champ, quel problème, comment corriger.',
  },
  {
    id: '11.11', topic: 11, level: 'AA', wcag: ['3.3.3'], coverage: 'manual',
    title: 'Le contrôle de saisie est accompagné de suggestions de correction',
    plain: 'Quand un format est erroné, le message doit proposer la solution : « La date doit être au format JJ/MM/AAAA, par exemple 01/06/2026 » plutôt que « Champ invalide ».',
  },
  {
    id: '11.12', topic: 11, level: 'AA', wcag: ['3.3.4'], coverage: 'manual',
    title: 'Les saisies à conséquences (financières, juridiques…) sont vérifiables, modifiables ou confirmables',
    plain: 'Avant une commande, une résiliation ou un paiement, l’utilisateur doit pouvoir vérifier et corriger sa saisie, ou disposer d’un moyen d’annulation.',
  },
  {
    id: '11.13', topic: 11, level: 'AA', wcag: ['1.3.5'], coverage: 'partial',
    title: 'La finalité des champs personnels est identifiable (autocomplete)',
    plain: 'Les attributs autocomplete (name, email, tel…) permettent le remplissage automatique : une aide décisive pour les personnes ayant des troubles cognitifs ou moteurs.',
  },

  /* ---------------------------- 12. Navigation ---------------------------- */
  {
    id: '12.1', topic: 12, level: 'AA', wcag: ['2.4.5'], coverage: 'manual',
    title: 'Le site dispose d’au moins deux systèmes de navigation différents',
    plain: 'Chacun navigue à sa façon : il faut au moins deux moyens parmi menu, plan du site et moteur de recherche pour atteindre chaque page.',
  },
  {
    id: '12.2', topic: 12, level: 'AA', wcag: ['3.2.3'], coverage: 'manual',
    title: 'Menus et barres de navigation sont toujours à la même place',
    plain: 'La navigation doit apparaître au même endroit et dans le même ordre sur toutes les pages : les habitués (et les lecteurs d’écran) comptent sur cette stabilité.',
  },
  {
    id: '12.3', topic: 12, level: 'AA', wcag: ['2.4.5'], coverage: 'manual',
    title: 'La page « plan du site » est pertinente',
    plain: 'Le plan du site doit refléter la structure réelle et pointer vers des pages existantes : c’est une porte d’entrée alternative essentielle.',
  },
  {
    id: '12.4', topic: 12, level: 'AA', wcag: ['3.2.3'], coverage: 'manual',
    title: 'Le plan du site est atteignable de manière identique depuis toutes les pages',
    plain: 'Le lien vers le plan du site doit se trouver au même endroit sur chaque page (généralement le pied de page).',
  },
  {
    id: '12.5', topic: 12, level: 'AA', wcag: ['3.2.3'], coverage: 'manual',
    title: 'Le moteur de recherche est atteignable de manière identique depuis toutes les pages',
    plain: 'S’il existe une recherche interne, elle doit être accessible au même endroit sur tout le site.',
  },
  {
    id: '12.6', topic: 12, level: 'A', wcag: ['1.3.1'], coverage: 'partial',
    title: 'Les zones de regroupement de contenus peuvent être atteintes ou évitées (landmarks)',
    plain: 'Les grandes zones (navigation, contenu principal, pied de page) doivent être balisées en régions pour qu’un utilisateur de lecteur d’écran saute directement à ce qui l’intéresse.',
  },
  {
    id: '12.7', topic: 12, level: 'A', wcag: ['2.4.1'], coverage: 'auto',
    title: 'Un lien d’évitement vers le contenu principal est présent',
    plain: 'Sans lien « Aller au contenu », un utilisateur au clavier doit retraverser tout le menu (parfois 40 liens) sur chaque page avant d’atteindre le contenu.',
  },
  {
    id: '12.8', topic: 12, level: 'A', wcag: ['2.4.3'], coverage: 'partial',
    title: 'L’ordre de tabulation est cohérent',
    plain: 'La touche Tab doit parcourir la page dans un ordre logique. Les tabindex positifs ou les insertions dynamiques mal gérées font sauter le focus dans tous les sens.',
  },
  {
    id: '12.9', topic: 12, level: 'A', wcag: ['2.1.2'], coverage: 'manual',
    title: 'La navigation ne contient pas de piège au clavier',
    plain: 'Un composant dont on ne peut plus sortir au clavier (lecteur vidéo, widget, modale) bloque définitivement l’utilisateur : c’est l’un des défauts les plus graves.',
  },
  {
    id: '12.10', topic: 12, level: 'A', wcag: ['2.1.4'], coverage: 'manual',
    title: 'Les raccourcis clavier à touche unique sont contrôlables',
    plain: 'Un raccourci sur une simple lettre peut être déclenché par erreur par la dictée vocale. Il doit pouvoir être désactivé ou reconfiguré.',
  },
  {
    id: '12.11', topic: 12, level: 'A', wcag: ['2.1.1'], coverage: 'manual',
    title: 'Les contenus additionnels (au survol, focus ou activation) sont atteignables au clavier',
    plain: 'Info-bulles, sous-menus et popovers doivent pouvoir être ouverts et parcourus au clavier, pas seulement à la souris.',
  },

  /* ---------------------------- 13. Consultation --------------------------- */
  {
    id: '13.1', topic: 13, level: 'A', wcag: ['2.2.1', '2.2.4'], coverage: 'auto',
    title: 'L’utilisateur contrôle chaque limite de temps modifiant le contenu',
    plain: 'Rafraîchissement automatique, déconnexion express, redirection chronométrée : l’utilisateur doit pouvoir arrêter, prolonger ou supprimer toute limite de temps.',
  },
  {
    id: '13.2', topic: 13, level: 'A', wcag: ['3.2.1'], coverage: 'partial',
    title: 'Aucune nouvelle fenêtre ne s’ouvre sans action de l’utilisateur',
    plain: 'Une fenêtre ou un onglet qui s’ouvre tout seul désoriente les utilisateurs de lecteurs d’écran, qui perdent leur contexte de navigation sans comprendre pourquoi.',
  },
  {
    id: '13.3', topic: 13, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'Chaque document en téléchargement (PDF…) a, si nécessaire, une version accessible',
    plain: 'Un PDF scanné ou non balisé est illisible par un lecteur d’écran. Il faut un PDF balisé ou une version alternative (HTML, document accessible).',
  },
  {
    id: '13.4', topic: 13, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'La version accessible de chaque document offre la même information',
    plain: 'La version accessible d’un document doit être aussi complète et à jour que l’original, pas un résumé.',
  },
  {
    id: '13.5', topic: 13, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'Chaque contenu cryptique (ASCII art, émoticône, syntaxe cryptique) a une alternative',
    plain: 'Un smiley en caractères « :-) » ou un art ASCII est lu caractère par caractère par une synthèse vocale : il faut une alternative textuelle claire.',
  },
  {
    id: '13.6', topic: 13, level: 'A', wcag: ['1.1.1'], coverage: 'manual',
    title: 'L’alternative de chaque contenu cryptique est pertinente',
    plain: 'L’alternative doit exprimer le sens réel du contenu (« sourire », « logo en ASCII »…), de façon compréhensible.',
  },
  {
    id: '13.7', topic: 13, level: 'A', wcag: ['2.3.1'], coverage: 'manual',
    title: 'Les flashs et changements brusques de luminosité sont correctement utilisés',
    plain: 'Plus de 3 flashs par seconde peuvent déclencher des crises d’épilepsie photosensible. C’est un critère de sécurité pour les personnes concernées.',
  },
  {
    id: '13.8', topic: 13, level: 'A', wcag: ['2.2.2'], coverage: 'manual',
    title: 'Chaque contenu en mouvement ou clignotant est contrôlable',
    plain: 'Carrousels automatiques, textes défilants, animations : l’utilisateur doit pouvoir les mettre en pause. Un mouvement permanent empêche certaines personnes de lire le reste de la page.',
  },
  {
    id: '13.9', topic: 13, level: 'AA', wcag: ['1.3.4'], coverage: 'manual',
    title: 'Le contenu est consultable quelle que soit l’orientation de l’écran',
    plain: 'Le site doit fonctionner en portrait comme en paysage : certaines personnes ont leur appareil fixé sur un fauteuil roulant dans une orientation donnée.',
  },
  {
    id: '13.10', topic: 13, level: 'A', wcag: ['2.5.1'], coverage: 'manual',
    title: 'Les gestes complexes ont une alternative en geste simple',
    plain: 'Pincer pour zoomer, glisser à deux doigts : toute fonctionnalité doit aussi marcher d’un simple appui, pour les personnes à mobilité réduite.',
  },
  {
    id: '13.11', topic: 13, level: 'A', wcag: ['2.5.2'], coverage: 'manual',
    title: 'Les actions au pointeur peuvent être annulées',
    plain: 'Une action ne doit pas se déclencher dès l’appui (pointer-down) : on doit pouvoir glisser hors du bouton pour annuler un clic malencontreux.',
  },
  {
    id: '13.12', topic: 13, level: 'A', wcag: ['2.5.4'], coverage: 'manual',
    title: 'Les fonctionnalités déclenchées par un mouvement de l’appareil ont une alternative',
    plain: 'Secouer le téléphone pour annuler, incliner pour naviguer : il faut une alternative par bouton classique, et pouvoir désactiver la détection de mouvement.',
  },
]

/** Index par identifiant de critère (« 1.1 » → critère). */
export const RGAA_BY_ID: ReadonlyMap<string, RgaaCriterion> = new Map(
  RGAA_CRITERIA.map((c) => [c.id, c]),
)

/**
 * Correspondances explicites règle moteur → critère RGAA, pour les règles
 * dont l'identifiant ne contient pas (ou pas le bon) numéro de critère.
 */
const RULE_OVERRIDES: Record<string, string> = {
  'RGAA 8.2 / Listes': '9.3', // structure de listes : critère 9.3, pas 8.2
  'WCAG 1.4.4 / Zoom': '10.4',
  'WCAG 1.4.10 / Viewport': '10.11',
  'WCAG 1.3.5 / Autocomplete': '11.13',
  'WCAG 3.2.2 / Formulaire': '7.4',
  'WCAG 4.1.2 / aria-hidden': '10.8',
}

/** Correspondances règles axe-core → critère RGAA (issues `axe:<rule>`). */
const AXE_TO_RGAA: Record<string, string> = {
  // ARIA / composants interactifs
  'aria-allowed-attr': '7.1', 'aria-allowed-role': '7.1', 'aria-braille-equivalent': '7.1',
  'aria-command-name': '7.1', 'aria-conditional-attr': '7.1', 'aria-deprecated-role': '7.1',
  'aria-dialog-name': '7.1', 'aria-hidden-body': '10.8', 'aria-meter-name': '7.1',
  'aria-progressbar-name': '7.1', 'aria-prohibited-attr': '7.1', 'aria-required-attr': '7.1',
  'aria-required-children': '7.1', 'aria-required-parent': '7.1', 'aria-text': '7.1',
  'aria-tooltip-name': '7.1', 'aria-treeitem-name': '7.1', 'aria-valid-attr': '7.1',
  'aria-valid-attr-value': '7.1', 'summary-name': '7.1', 'presentation-role-conflict': '8.9',
  // Formulaires
  'aria-input-field-name': '11.1', 'aria-toggle-field-name': '11.1', 'select-name': '11.1',
  'form-field-multiple-labels': '11.1', 'label-title-only': '11.1',
  'label-content-name-mismatch': '11.1', 'input-button-name': '11.9',
  // Images & médias
  'object-alt': '1.1', 'server-side-image-map': '1.1', 'no-autoplay-audio': '4.10',
  // Tableaux
  'td-headers-attr': '5.7', 'th-has-data-cells': '5.7', 'scope-attr-valid': '5.7',
  'table-duplicate-name': '5.4', 'table-fake-caption': '5.4', 'empty-table-header': '5.6',
  // Langues
  'valid-lang': '8.8', 'html-xml-lang-mismatch': '8.4',
  // Structure & navigation
  'definition-list': '9.3', 'dlitem': '9.3', 'p-as-heading': '9.1',
  'landmark-banner-is-top-level': '12.6', 'landmark-complementary-is-top-level': '12.6',
  'landmark-contentinfo-is-top-level': '12.6', 'landmark-main-is-top-level': '12.6',
  'landmark-no-duplicate-banner': '12.6', 'landmark-no-duplicate-contentinfo': '12.6',
  'landmark-no-duplicate-main': '12.6', 'landmark-unique': '12.6',
  'identical-links-same-purpose': '6.1',
  // Cadres & divers
  'frame-focusable-content': '2.1', 'frame-title-unique': '2.2',
  'meta-viewport-large': '10.4',
}

/**
 * Retrouve le critère RGAA correspondant à un `rule_id` d'issue.
 * Renvoie `null` pour les règles purement WCAG sans équivalent direct
 * (elles restent visibles dans la liste des non-conformités).
 */
export function criterionForRule(ruleId: string): RgaaCriterion | null {
  const override = RULE_OVERRIDES[ruleId]
  if (override) return RGAA_BY_ID.get(override) ?? null
  if (ruleId.startsWith('axe:')) {
    const mapped = AXE_TO_RGAA[ruleId.slice(4)]
    return mapped ? RGAA_BY_ID.get(mapped) ?? null : null
  }
  const m = /RGAA (\d+\.\d+)/.exec(ruleId)
  if (m) return RGAA_BY_ID.get(m[1]) ?? null
  return null
}

/* ------------------------------------------------------------------ */
/* Méthode officielle (accessibilite.numerique.gouv.fr)                */
/* ------------------------------------------------------------------ */

export const RGAA_VERSION = '4.1.2'
export const RGAA_METHOD_URL = 'https://accessibilite.numerique.gouv.fr/methode/'
export const RGAA_CRITERIA_URL = 'https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/'
export const RGAA_GLOSSARY_URL = 'https://accessibilite.numerique.gouv.fr/methode/glossaire/'
export const RGAA_TEST_ENV_URL = 'https://accessibilite.numerique.gouv.fr/methode/environnement-de-test/'

/** URL du texte officiel d'un critère (ancre sur la page « critères et tests »). */
export function rgaaCriterionUrl(id: string): string {
  return `${RGAA_CRITERIA_URL}#${id}`
}

/**
 * Environnement de test de référence du RGAA : les combinaisons technologie
 * d'assistance + navigateur avec lesquelles la restitution doit être vérifiée.
 */
export const RGAA_TEST_ENVIRONMENTS = [
  { platform: 'Ordinateur (Windows)', at: 'NVDA (dernière version)', browser: 'Firefox' },
  { platform: 'Ordinateur (Windows)', at: 'JAWS (version précédente)', browser: 'Firefox ou Internet Explorer' },
  { platform: 'Ordinateur (macOS)', at: 'VoiceOver (dernière version)', browser: 'Safari' },
  { platform: 'Mobile (Android natif)', at: 'TalkBack (dernière version)', browser: 'Chrome' },
  { platform: 'Mobile (iOS)', at: 'VoiceOver (dernière version)', browser: 'Safari' },
] as const
