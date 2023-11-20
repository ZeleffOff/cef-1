const commentList = document.getElementById("comment-list");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const message = document.getElementById("message");
const errorMessage = document.getElementById("error-message");

/**
 * Envoi d'un commentaire.
 * @param {SubmitEvent} event
 */
function sendComment(event) {
  // Empêche le chargement de la page
  event.preventDefault();

  try {
    checkFields();

    const comment = createComment();
    commentList.appendChild(comment);

    clearFields();
  } catch (error) {
    displayErrorMessage(true);
  }
}

/**
 * Créer un nouveau commentaire.
 * @returns {HTMLDivElement}
 */
function createComment() {
  // Créer un conteneur principal pour le commentaire
  const comment = document.createElement("div");
  comment.classList.add("flex", "space-x-4", "text-sm", "text-gray-500");

  // Créer un conteneur pour le contenu du commentaire
  const commentContent = document.createElement("div");
  commentContent.classList.add(
    "flex-1",
    "py-10",
    "border-t",
    "border-gray-200"
  );

  const author = createAuthor();
  const newMessage = createMessage();

  // Ajout des informations du commentaire au conteneur du contenu
  commentContent.appendChild(author);
  commentContent.appendChild(newMessage);

  // Ajout du commentaire au conteneur principal
  comment.appendChild(commentContent);

  return comment;
}

/**
 * Créer un nouvel auteur.
 * @returns {HTMLHeadingElement}
 */
function createAuthor() {
  const author = document.createElement("h3");
  author.classList.add("font-medium", "text-gray-900");

  const authorText = document.createTextNode(
    `${firstName.value} ${lastName.value}`
  );

  // Ajout des informations de l'auteur à l'élément h3
  author.appendChild(authorText);

  return author;
}

/**
 * Créer un nouveau message.
 * @returns {HTMLDivElement}
 */
function createMessage() {
  // Créer un conteneur pour le message
  const messageElement = document.createElement("div");
  messageElement.classList.add(
    "prose",
    "prose-sm",
    "mt-4",
    "max-w-none",
    "text-gray-500"
  );

  // Créer un élément de paragraphe
  const messageContentElement = document.createElement("p");

  // Créer un élément texte via la variable 'message'
  const messageContentText = document.createTextNode(message.value);

  // Ajoute l'élément texte au conteneur du message
  messageContentElement.appendChild(messageContentText);

  // Ajoute l'élément de paragraphe au conteneur du message
  messageElement.appendChild(messageContentElement);

  return messageElement;
}

/**
 * Affiche ou Cache le message d'erreur.
 * @param {boolean} state - Etat d'affichage du message d'erreur.
 */
function displayErrorMessage(state) {
  errorMessage.style.display = state ? "block" : "none";
}

/**
 * Vérifie que les champs du formulaire ne sont pas vide.
 */
function checkFields() {
  if (!firstName.value) {
    throw new Error("Prénom manquant.");
  } else if (!lastName.value) {
    throw new Error("Nom manquant.");
  } else if (!message.value) {
    throw new Error("Message manquant.");
  }
}

/**
 * Supprime les champs du formulaire ainsi que le message d'erreur s'il est visible.
 */
function clearFields() {
  firstName.value = "";
  lastName.value = "";
  message.value = "";

  displayErrorMessage(false);
}
