document.addEventListener("DOMContentLoaded", function () {

    console.log("Bienvenue sur Perles Élégance !");


    const boutonMenu = document.getElementById("menu-hamburger");
    const menuNavigation = document.getElementById("menu-navigation");

    if (boutonMenu && menuNavigation) {

        boutonMenu.addEventListener("click", function () {

            const estOuvert = menuNavigation.classList.toggle("active");

            boutonMenu.setAttribute("aria-expanded", String(estOuvert));

            boutonMenu.setAttribute(
                "aria-label",
                estOuvert ? "Fermer le menu" : "Ouvrir le menu"
            );

            boutonMenu.textContent = estOuvert ? "×" : "☰";

        });

        const liensMenu = menuNavigation.querySelectorAll("a");

        liensMenu.forEach(function (lien) {

            lien.addEventListener("click", function () {

                menuNavigation.classList.remove("active");

                boutonMenu.setAttribute("aria-expanded", "false");
                boutonMenu.setAttribute("aria-label", "Ouvrir le menu");

                boutonMenu.textContent = "☰";

            });

        });


        document.addEventListener("click", function (evenement) {

            const clicDansLeMenu = menuNavigation.contains(evenement.target);
            const clicSurBouton = boutonMenu.contains(evenement.target);

            if (!clicDansLeMenu && !clicSurBouton) {

                menuNavigation.classList.remove("active");

                boutonMenu.setAttribute("aria-expanded", "false");
                boutonMenu.setAttribute("aria-label", "Ouvrir le menu");

                boutonMenu.textContent = "☰";

            }

        });

        document.addEventListener("keydown", function (evenement) {

            if (evenement.key === "Escape") {

                menuNavigation.classList.remove("active");

                boutonMenu.setAttribute("aria-expanded", "false");
                boutonMenu.setAttribute("aria-label", "Ouvrir le menu");

                boutonMenu.textContent = "☰";

            }

        });

    } else {

        console.warn(
            "Menu non trouvé : vérifie les identifiants menu-hamburger et menu-navigation."
        );

    }

    const boutonsCommander = document.querySelectorAll(
        ".commander, .bouton-commande, .bouton.commander"
    );

    boutonsCommander.forEach(function (bouton) {

        bouton.addEventListener("click", function (evenement) {


            const carteProduit = bouton.closest(
                ".produit, .carte-produit, .produit-card, article"
            );

            const formulaireCommande = document.getElementById(
                "formulaire-commande"
            );

            if (!carteProduit) {
                return;
            }
            const titreProduit = carteProduit.querySelector("h3");

            if (!titreProduit) {
                return;
            }

            const nomProduit = titreProduit.textContent.trim();

            const champProduit = document.querySelector(
                "#produit, [name='produit'], [name='article']"
            );

            if (champProduit) {

                if (champProduit.tagName === "SELECT") {

                    const options = Array.from(champProduit.options);

                    const optionCorrespondante = options.find(function (option) {

                        return option.textContent.trim().toLowerCase() ===
                            nomProduit.toLowerCase();

                    });

                    if (optionCorrespondante) {

                        champProduit.value = optionCorrespondante.value;

                    } else {

                        alert(
                            "Le produit « " + nomProduit +
                            " » doit être ajouté à la liste du formulaire."
                        );

                    }

                } else {

                    champProduit.value = nomProduit;

                }

            }
            if (formulaireCommande) {

                formulaireCommande.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            } else {

                const sectionContact = document.getElementById("contact");

                if (sectionContact) {

                    sectionContact.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    const formulaireCommande = document.getElementById(
        "formulaire-commande"
    );

    const formulaireCommandeFinal =
        formulaireCommande ||
        document.querySelector(".formulaire-commande");


    if (formulaireCommandeFinal) {

        formulaireCommandeFinal.addEventListener(
            "submit",
            function (evenement) {
                evenement.preventDefault();

                if (!formulaireCommandeFinal.reportValidity()) {
                    return;
                }

                const donnees = new FormData(formulaireCommandeFinal);

                const nom = obtenirValeur(
                    donnees,
                    ["nom", "nom-client"]
                );

                const prenom = obtenirValeur(
                    donnees,
                    ["prenom", "prénom"]
                );

                const telephone = obtenirValeur(
                    donnees,
                    ["telephone", "téléphone", "tel"]
                );

                const ville = obtenirValeur(
                    donnees,
                    ["ville"]
                );

                const adresse = obtenirValeur(
                    donnees,
                    ["adresse"]
                );

                const produit = obtenirValeur(
                    donnees,
                    ["produit", "article"]
                );

                const quantite = obtenirValeur(
                    donnees,
                    ["quantite", "quantité"]
                );

                const paiement = obtenirValeur(
                    donnees,
                    ["paiement", "mode-paiement"]
                );

                const message = obtenirValeur(
                    donnees,
                    ["message", "commentaire"]
                );

                if (!nom || !prenom) {

                    alert(
                        "Veuillez renseigner votre nom et votre prénom."
                    );

                    return;

                }
                if (!telephone) {

                    alert(
                        "Veuillez renseigner votre numéro de téléphone."
                    );

                    return;

                }

                if (!produit) {

                    alert(
                        "Veuillez sélectionner un produit."
                    );

                    return;

                }
                const nombreArticles = Number(quantite || 1);

                if (
                    !Number.isInteger(nombreArticles) ||
                    nombreArticles < 1
                ) {

                    alert(
                        "La quantité doit être un nombre entier supérieur à zéro."
                    );

                    return;

                }
                const recapitulatif = [
                    "Merci " + prenom + " " + nom + " !",
                    "",
                    "Votre formulaire de commande a été vérifié.",
                    "",
                    "Produit : " + produit,
                    "Quantité : " + nombreArticles,
                    "Téléphone : " + telephone,
                    "Ville : " + (ville || "Non renseignée"),
                    "Adresse : " + (adresse || "Non renseignée"),
                    "Paiement : " + (paiement || "Non renseigné"),
                    "Message : " + (message || "Aucun"),
                    "",
                    "Pour transmettre votre commande, utilisez WhatsApp."
                ].join("\n");

                alert(recapitulatif);

            }
        );

    }

    const tousLesFormulaires = document.querySelectorAll("form");

    tousLesFormulaires.forEach(function (formulaire) {

        if (formulaire === formulaireCommandeFinal) {
            return;
        }

        formulaire.addEventListener("submit", function (evenement) {

            const estFormulaireContact =
                formulaire.id === "formulaire-contact" ||
                formulaire.classList.contains("formulaire-contact");

            if (!estFormulaireContact) {
                return;
            }

            evenement.preventDefault();

            if (!formulaire.reportValidity()) {
                return;
            }
            const donnees = new FormData(formulaire);

            const nom = obtenirValeur(
                donnees,
                ["nom", "nom-client"]
            );

            const message = obtenirValeur(
                donnees,
                ["message", "commentaire"]
            );

            if (!nom || !message) {

                alert(
                    "Veuillez renseigner votre nom et votre message."
                );

                return;

            }

            alert(
                "Merci " + nom +
                " ! Votre formulaire est valide.\n\n" +
                "Pour que votre message nous parvienne réellement, " +
                "le formulaire doit être relié à un service d'envoi."
            );

        });

    });

    const boutonsWhatsApp = document.querySelectorAll(
        ".envoyer-whatsapp, [data-whatsapp-commande]"
    );

    boutonsWhatsApp.forEach(function (bouton) {

        bouton.addEventListener("click", function (evenement) {

            evenement.preventDefault();

            const formulaire = formulaireCommandeFinal;

            if (!formulaire) {

                alert(
                    "Le formulaire de commande est introuvable."
                );

                return;

            }

            if (!formulaire.reportValidity()) {
                return;
            }

            const donnees = new FormData(formulaire);

            const nom = obtenirValeur(
                donnees,
                ["nom", "nom-client"]
            );

            const prenom = obtenirValeur(
                donnees,
                ["prenom", "prénom"]
            );

            const telephone = obtenirValeur(
                donnees,
                ["telephone", "téléphone", "tel"]
            );

            const ville = obtenirValeur(
                donnees,
                ["ville"]
            );

            const adresse = obtenirValeur(
                donnees,
                ["adresse"]
            );

            const produit = obtenirValeur(
                donnees,
                ["produit", "article"]
            );

            const quantite = obtenirValeur(
                donnees,
                ["quantite", "quantité"]
            );

            const paiement = obtenirValeur(
                donnees,
                ["paiement", "mode-paiement"]
            );

            const messageClient = obtenirValeur(
                donnees,
                ["message", "commentaire"]
            );

            if (!nom || !prenom || !telephone || !produit) {

                alert(
                    "Veuillez renseigner votre nom, prénom, téléphone et produit."
                );

                return;

            }

            const messageWhatsApp = [
                "Bonjour Perles Élégance !",
                "",
                "Je souhaite passer une commande.",
                "",
                "Nom : " + nom,
                "Prénom : " + prenom,
                "Téléphone : " + telephone,
                "Ville : " + (ville || "Non renseignée"),
                "Adresse : " + (adresse || "Non renseignée"),
                "Produit : " + produit,
                "Quantité : " + (quantite || "1"),
                "Paiement : " + (paiement || "À préciser"),
                "Message : " + (messageClient || "Aucun"),
                "",
                "Merci !"
            ].join("\n");


            const numeroWhatsApp = "2290192450882";

            const lienWhatsApp =
                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                encodeURIComponent(messageWhatsApp);

            window.open(
                lienWhatsApp,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });

    const elementAnnee = document.getElementById("annee");

    if (elementAnnee) {

        elementAnnee.textContent = new Date().getFullYear();

    }

    function obtenirValeur(donnees, nomsPossibles) {

        for (const nomChamp of nomsPossibles) {

            const valeur = donnees.get(nomChamp);

            if (valeur !== null && String(valeur).trim() !== "") {

                return String(valeur).trim();

            }

        }

        return "";

    }


});