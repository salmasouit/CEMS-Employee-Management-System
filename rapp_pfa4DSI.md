**Résumé**



**Dans le cadre de ce Projet de Fin d’Année réalisé au sein de Canal Informatique, le travail porte sur la conception et le développement de CEMS (Canal Employee Management System), une application web destinée à centraliser et à faciliter la gestion des employés et des processus associés au sein de l’entreprise.**



**La solution développée permet principalement de gérer les informations des employés et leur rattachement aux départements, les demandes de congés et leur suivi, ainsi que les rôles et les permissions attribués aux différents utilisateurs. Elle intègre également un système de notifications, un journal d’activités assurant la traçabilité des actions et un tableau de bord permettant une consultation synthétique des informations. Un mécanisme de contrôle d’accès basé sur les rôles (RBAC) permet de différencier les fonctionnalités accessibles selon le profil de l’utilisateur : Employé, Responsable RH ou Administrateur.**



**Sur le plan technique, CEMS repose sur une architecture Client-Serveur et une API REST. L’interface utilisateur est développée avec React.js, tandis que la partie Backend est réalisée avec Node.js et Express.js. Les données sont stockées dans une base MongoDB et manipulées à l’aide de Mongoose. La sécurité de l’application repose notamment sur une authentification utilisant les JSON Web Tokens (JWT), le hachage des mots de passe et le contrôle des autorisations.**



**Ce projet a ainsi permis de mettre en œuvre une solution web structurée, sécurisée et évolutive répondant aux besoins de gestion des employés de Canal Informatique, tout en mobilisant les connaissances acquises en développement web, conception logicielle, bases de données et sécurité des applications.**



**Mots-clés : CEMS, gestion des employés, application web, React.js, Node.js, Express.js, MongoDB, JWT, RBAC, API REST.**





**Introduction générale**



La transformation numérique occupe aujourd’hui une place importante dans l’organisation des entreprises. Au-delà des activités directement liées à leur cœur de métier, les organisations sont amenées à gérer un volume croissant d’informations internes concernant leurs collaborateurs, leurs responsabilités et les différents processus administratifs qui accompagnent leur activité. La mise en place d’outils informatiques adaptés permet alors de structurer ces informations, d’en faciliter l’accès et d’améliorer le suivi des opérations.



C’est dans ce contexte que s’inscrit le présent Projet de Fin d’Année, réalisé au sein de Canal Informatique, entreprise marocaine spécialisée dans les solutions informatiques, les infrastructures réseau et la fourniture de matériels informatiques. Créée en 1992 et implantée à Casablanca, l’entreprise intervient notamment dans la conception et l’installation de réseaux, la maintenance et le support technique ainsi que dans la configuration de solutions et d’équipements informatiques.



Le projet porte sur la conception et le développement de CEMS – Canal Employee Management System, une application web destinée à la gestion des employés et des principaux processus qui leur sont associés. Le système vise à regrouper au sein d’une plateforme unique les informations relatives aux collaborateurs, leur rattachement aux différents départements, la gestion des demandes de congés ainsi que l’administration des rôles et des permissions.



La problématique centrale du projet peut ainsi être formulée comme suit :



Comment concevoir et développer une application web centralisée, sécurisée et évolutive permettant d’améliorer la gestion des employés, des congés et des droits d’accès au sein de Canal Informatique ?



La réponse à cette problématique nécessite de prendre en considération plusieurs dimensions. Sur le plan fonctionnel, l’application doit répondre aux besoins de différentes catégories d’utilisateurs dont les responsabilités ne sont pas identiques. Un employé doit notamment pouvoir accéder à son profil et gérer ses demandes de congés, tandis qu’un responsable RH doit disposer de fonctionnalités supplémentaires liées à la gestion des collaborateurs et au traitement de ces demandes. L’administration des rôles et des permissions nécessite quant à elle des privilèges spécifiques.



Sur le plan technique, le projet doit assurer une séparation claire entre l’interface utilisateur, la logique métier et la gestion des données. Il doit également intégrer des mécanismes permettant de sécuriser l’authentification, de contrôler les autorisations et de garantir la traçabilité des opérations sensibles. Ces exigences ont orienté la conception de CEMS vers une application web reposant sur une architecture Client-Serveur et des échanges via une API REST.



Le développement de la solution s’appuie sur des technologies web modernes. La partie Frontend est réalisée avec React.js, tandis que le Backend repose sur Node.js et Express.js. La persistance des données est assurée par MongoDB à travers Mongoose. L’authentification utilise des JSON Web Tokens (JWT) et le contrôle des autorisations repose sur un modèle RBAC (Role-Based Access Control) permettant d’associer des permissions aux différents rôles du système.



Le présent rapport retrace les différentes étapes ayant conduit à la conception et à la réalisation de CEMS. Le premier chapitre présente le cadre du projet, l’entreprise d’accueil, l’étude de l’existant, la solution proposée, le modèle de développement retenu ainsi que le planning prévisionnel. Le deuxième chapitre est consacré à la spécification des besoins fonctionnels et non fonctionnels et à la modélisation des cas d’utilisation. Le troisième chapitre présente la conception du système à travers les différentes modélisations UML, la conception des données et l’architecture de l’application. Enfin, le quatrième chapitre expose l’environnement de développement et présente les principales interfaces réalisées.





Chapitre 1 : Présentation du cadre de projet

1\. Introduction



La réussite d’un projet informatique nécessite, avant toute phase de conception ou de développement, une compréhension précise de son environnement, des besoins auxquels il doit répondre et des contraintes liées à son contexte d’utilisation.



Le projet CEMS s’inscrit dans le contexte de la gestion interne de Canal Informatique et porte plus particulièrement sur la centralisation des informations et des processus relatifs aux employés. La définition de la solution nécessite ainsi de comprendre l’environnement de l’entreprise et d’identifier les besoins auxquels le futur système devra répondre.



Ce chapitre présente dans un premier temps Canal Informatique, son domaine d’activité et son organisation générale. Une étude de l’existant est ensuite menée afin de faire ressortir les principaux besoins et les possibilités d’amélioration. La solution CEMS proposée en réponse à ces constats est par la suite présentée, avant d’aborder le modèle de développement adopté et le planning prévisionnel établi pour la réalisation du projet.







2\. Présentation de la société d’accueil



Canal Informatique est une entreprise marocaine créée en 1992 et spécialisée dans le domaine des technologies de l’information. Implantée à Casablanca, elle intervient principalement dans la fourniture de solutions informatiques ainsi que dans la conception, l’installation et la maintenance d’infrastructures informatiques et réseau.



Ses activités couvrent différents domaines des systèmes informatiques. L’entreprise assure notamment la conception et l’installation de réseaux filaires et sans fil, la maintenance et le support technique des infrastructures réseau, la mise en œuvre de solutions de sécurité informatique ainsi que la fourniture et la configuration de matériels tels que les serveurs, les ordinateurs et différents périphériques.



Son activité implique ainsi des compétences à la fois techniques, commerciales et administratives. Le fonctionnement interne repose notamment sur une coordination entre les activités techniques et commerciales, permettant d’assurer la préparation et le suivi des différentes prestations réalisées pour les clients. Cette organisation et les interactions entre ces fonctions avaient également été observées lors du précédent stage effectué au sein de l’entreprise.



Les principales informations concernant l’entreprise sont présentées dans le tableau suivant.



Tableau 1 : Fiche d’identification de Canal Informatique



IMAGE



L’environnement de Canal Informatique constitue ainsi le cadre professionnel du projet CEMS. La présence de plusieurs collaborateurs exerçant des fonctions différentes implique la gestion d’informations relatives aux employés, à leur organisation et aux processus administratifs qui les concernent. La mise en place d’un système dédié à cette gestion constitue l’objet du présent projet.







3\. Etude de l’existant



L’étude de l’existant constitue une étape préalable à la définition d’une solution informatique. Elle permet de comprendre les processus concernés par le projet, d’identifier les informations manipulées et de mettre en évidence les éléments susceptibles d’être améliorés.



Dans le cadre de CEMS, l’analyse porte principalement sur la gestion des employés et sur les processus associés à leur activité au sein de l’entreprise. Elle s’intéresse notamment à la gestion des informations des collaborateurs, à leur rattachement organisationnel, aux demandes de congés et aux différents niveaux de responsabilité.



3.1. Description de l’existant



La gestion des collaborateurs nécessite la manipulation régulière de plusieurs catégories d’informations. Chaque employé est caractérisé par des données personnelles et professionnelles permettant notamment de l’identifier, de connaître sa fonction, son statut ainsi que son rattachement à un département.



À ces informations s’ajoutent différents processus administratifs. La gestion des congés constitue l’un des processus retenus dans le périmètre du projet. Une demande de congé doit être associée à un employé et comporter les informations nécessaires à son traitement, telles que le type de congé, les dates concernées et le motif. Elle doit ensuite pouvoir être examinée par la personne disposant de la responsabilité nécessaire afin d’être approuvée ou refusée.



La gestion interne implique également plusieurs niveaux de responsabilité. Les opérations qu’un employé peut effectuer sur ses propres informations ne sont pas nécessairement identiques à celles accessibles à un responsable chargé de gérer les collaborateurs. De même, certaines opérations relatives à l’administration du système nécessitent des privilèges plus élevés.



L’analyse de ces différents éléments fait apparaître le besoin d’un environnement capable de regrouper les données des collaborateurs et les différents processus associés, tout en tenant compte des responsabilités propres à chaque utilisateur.



3.2. Critique de l’existant



L’analyse réalisée met principalement en évidence un besoin de centralisation des informations et des processus liés aux employés. L’absence d’un environnement unique regroupant ces éléments peut rendre leur consultation et leur suivi moins efficaces.



La gestion des informations relatives aux collaborateurs nécessite notamment de disposer d’une vue structurée permettant de retrouver rapidement les informations personnelles et professionnelles, le département, la fonction et le statut d’un employé.



Le traitement des demandes de congés fait également apparaître un besoin de suivi. Une demande évolue au cours de son cycle de traitement et peut notamment être en attente, approuvée, refusée ou annulée. Il est donc nécessaire de conserver son état ainsi que son historique afin que l’employé et les responsables concernés disposent d’une information actualisée.



Le contrôle des droits d’accès représente un autre enjeu. Les utilisateurs ne disposent pas tous des mêmes responsabilités et ne doivent donc pas avoir accès aux mêmes opérations. Une distinction claire doit être établie entre les fonctionnalités accessibles aux employés, celles relevant de la gestion des ressources humaines et celles réservées à l’administration du système.



La traçabilité constitue également un besoin important. Certaines actions, telles que l’authentification, la modification d’informations ou le traitement d’une demande, doivent pouvoir être enregistrées afin de disposer d’un historique des opérations effectuées.



Enfin, l’exploitation des données nécessite une présentation synthétique permettant aux utilisateurs autorisés de consulter rapidement les principales informations liées à la gestion des collaborateurs.



Cette analyse fait ainsi ressortir plusieurs axes d’amélioration : la centralisation des données, la structuration des processus, le contrôle des accès, la traçabilité des actions et la mise à disposition d’indicateurs synthétiques.





3.3. Solution proposée



Afin de répondre aux besoins identifiés, la solution proposée consiste à concevoir et développer CEMS – Canal Employee Management System, une application web centralisée dédiée à la gestion des employés de Canal Informatique.



La solution a pour objectif de réunir au sein d’une même plateforme les principales fonctionnalités nécessaires à la gestion des collaborateurs.



La gestion des employés constitue le cœur du système. Elle permet de centraliser les informations personnelles et professionnelles de chaque collaborateur, notamment son identité, ses coordonnées, sa fonction, sa date d’embauche, son statut et son rattachement organisationnel.



La gestion des départements permet de structurer les collaborateurs selon l’organisation de l’entreprise et d’associer chaque employé au département correspondant.



Un module spécifique est consacré à la gestion des demandes de congés. L’employé peut soumettre une demande en précisant le type de congé, la période concernée et le motif. Il peut ensuite consulter son historique et suivre le statut de ses demandes. Les utilisateurs autorisés disposent des fonctionnalités nécessaires pour examiner ces demandes, les approuver ou les refuser et, le cas échéant, ajouter un commentaire.



Afin de garantir une gestion adaptée aux différentes responsabilités, CEMS intègre un mécanisme de contrôle d’accès basé sur les rôles (RBAC – Role-Based Access Control). Trois profils principaux sont considérés : Employé, Responsable RH et Administrateur. Un rôle regroupe différentes permissions déterminant les actions pouvant être réalisées par l’utilisateur auquel il est attribué.



Le système intègre également un module de notifications, permettant d’informer les utilisateurs de certains événements liés à leur activité, ainsi qu’un journal d’activités (Activity Log) destiné à enregistrer les actions importantes réalisées dans le système.



Un tableau de bord complète la solution afin de présenter de manière synthétique différentes informations utiles au suivi de l’activité. Les utilisateurs disposant des autorisations nécessaires peuvent également accéder aux fonctionnalités de consultation et d’export de rapports.



CEMS vise ainsi à mettre en place un environnement centralisé, structuré et sécurisé, capable de simplifier la gestion des employés et d’améliorer le suivi des opérations tout en respectant les responsabilités attribuées aux différents utilisateurs.



Figure 1 : Principe général de la solution CEMS



IMAGE 



4\. Choix de modèle de développement



Pour organiser les différentes étapes de réalisation de CEMS, le projet repose sur un modèle de développement itératif et incrémental.



Cette approche consiste à construire progressivement le système en plusieurs incréments. Contrairement à un développement réalisé en une seule séquence, chaque incrément permet de mettre en œuvre un ensemble cohérent de fonctionnalités, de le vérifier puis de l’intégrer progressivement à l’application.



La première étape du projet porte sur l’analyse du contexte et la spécification des besoins. Elle permet d’identifier les différents acteurs, les fonctionnalités attendues ainsi que les principales contraintes du système. Une phase de conception permet ensuite de définir les modèles nécessaires au développement, la structure des données et l’architecture générale de la solution.



La réalisation est ensuite organisée progressivement autour des différents modules fonctionnels. Les mécanismes fondamentaux, tels que l’authentification et la gestion des utilisateurs, constituent une première base. Les fonctionnalités de gestion des employés et des départements sont ensuite complétées par la gestion des congés, les rôles et permissions, les notifications, le journal d’activités et les fonctionnalités de tableau de bord.



Chaque incrément suit le même principe général :



Analyse → Conception → Développement → Test → Validation



Lorsque les fonctionnalités d’un incrément sont validées, elles sont intégrées à la version existante avant le développement de l’incrément suivant.



Ce modèle a été retenu en raison du caractère modulaire de CEMS. Il permet de limiter la complexité du développement en traitant progressivement les différentes fonctionnalités, tout en facilitant la détection des anomalies et les ajustements nécessaires au cours de la réalisation.



Figure 2 : Modèle de développement itératif et incrémental



IMAGE





5\. Planning prévisionnel



La réalisation du projet est organisée selon un planning prévisionnel permettant de répartir les différentes activités sur la durée du stage. Celui-ci tient compte des phases d’étude, de spécification, de conception, de développement et de validation.



Le démarrage du projet est consacré à l’étude préalable et à la compréhension du besoin. Cette phase est suivie par la spécification fonctionnelle et la modélisation du système. La réalisation technique occupe ensuite la partie principale du projet avec la mise en place de l’architecture et le développement progressif des différents modules de CEMS. Les dernières étapes sont consacrées aux tests, aux corrections, à la validation et à la documentation.



Tableau 2 : Planning prévisionnel du projet CEMS



IMAGE 





Ce planning permet de visualiser la progression prévue du projet et le chevauchement de certaines activités. Cette organisation est cohérente avec le modèle itératif et incrémental retenu, puisque la conception, le développement et les tests peuvent être répétés pour les différents modules avant leur intégration définitive.



6\. Conclusion



Ce chapitre a permis de présenter le contexte dans lequel s’inscrit le projet CEMS. La présentation de Canal Informatique a permis de situer l’environnement professionnel du stage, tandis que l’étude de l’existant a mis en évidence les principaux besoins relatifs à la centralisation des informations des employés, au suivi des demandes de congés, à la gestion des droits d’accès et à la traçabilité des opérations. La solution CEMS a été définie en réponse à ces besoins afin de proposer un système centralisé et sécurisé pour la gestion des collaborateurs. Le modèle de développement itératif et incrémental ainsi que le planning prévisionnel ont également permis de structurer les différentes étapes de réalisation du projet. Le chapitre suivant sera consacré à la spécification des besoins fonctionnels et non fonctionnels ainsi qu’à la présentation des acteurs et des cas d’utilisation du système.







Chapitre 2 : Spécification des besoins

1\. Introduction



Après avoir présenté le cadre général du projet et la solution proposée, il convient de définir précisément les besoins auxquels doit répondre CEMS (Canal Employee Management System). La spécification des besoins constitue une étape essentielle puisqu’elle permet de déterminer les fonctionnalités attendues du système ainsi que les contraintes qui doivent être respectées lors de sa conception et de sa réalisation.



Dans le cadre de CEMS, les besoins concernent principalement la gestion des employés et des départements, le traitement des demandes de congés, la gestion des rôles et des permissions, les notifications, la traçabilité des activités ainsi que la consultation des informations à travers un tableau de bord.



Ce chapitre présente dans un premier temps les besoins fonctionnels et non fonctionnels de l’application. Les différents acteurs du système sont ensuite identifiés et leurs responsabilités sont précisées. Enfin, les interactions entre ces acteurs et CEMS sont représentées à travers les principaux cas d’utilisation.



2\. Spécification des besoins fonctionnels

2.1. Authentification et gestion du compte



CEMS doit permettre à chaque utilisateur disposant d’un compte valide de s’authentifier afin d’accéder aux fonctionnalités qui lui sont autorisées.



L’utilisateur doit pouvoir se connecter à l’aide de ses identifiants, accéder à son espace personnel, consulter son profil, modifier les informations autorisées ainsi que son mot de passe et se déconnecter de manière sécurisée.



L’accès aux fonctionnalités protégées doit être accordé uniquement après vérification de l’identité et des autorisations de l’utilisateur.



2.2. Gestion des employés



La gestion des employés constitue une fonctionnalité centrale de CEMS. Elle permet de centraliser et d’administrer les informations relatives aux collaborateurs.



Le système doit notamment permettre de :



consulter la liste des employés ;

rechercher et consulter un employé ;

ajouter un nouvel employé ;

modifier ses informations ;

supprimer un employé ;

affecter un employé à un département ;

lui attribuer un rôle ;

gérer son statut actif ou inactif.

2.3. Gestion des départements



CEMS doit permettre d’organiser les employés selon les différents départements de l’entreprise.



Les utilisateurs autorisés peuvent consulter les départements existants, créer un nouveau département, modifier ses informations et rattacher les employés au département correspondant.



2.4. Gestion des demandes de congés



Le système permet à l’Employé de créer et de suivre ses demandes de congés.



Lors de la création d’une demande, l’employé renseigne le type de congé, les dates de début et de fin, le motif et, si nécessaire, un justificatif.



Une nouvelle demande possède initialement le statut Pending. Après traitement, elle peut devenir Approved, Rejected ou Cancelled.



Le Responsable RH peut consulter les demandes, les examiner, les approuver ou les refuser et ajouter un commentaire.



2.5. Gestion des rôles et permissions



CEMS repose sur un mécanisme de contrôle d’accès basé sur les rôles RBAC (Role-Based Access Control).



Un utilisateur possède un rôle auquel sont associées différentes permissions. L’Administrateur peut gérer les rôles et déterminer les permissions qui leur sont attribuées.



Avant l’exécution d’une opération protégée, le système vérifie que l’utilisateur dispose de la permission nécessaire.



2.6. Gestion des notifications



CEMS permet d’informer les utilisateurs de certains événements liés à leur activité.



Une notification contient notamment un titre, un message, sa date de création ainsi qu’un état indiquant si elle a été lue ou non.



2.7. Gestion des journaux d’activités



Le système conserve une trace de certaines opérations importantes afin d’assurer leur traçabilité.



Le journal d’activités peut notamment enregistrer l’utilisateur concerné, l’action réalisée et différentes informations associées à cette opération.



La consultation globale de ces journaux est réservée à l’Administrateur.



2.8. Tableau de bord et rapports



CEMS propose un tableau de bord permettant aux utilisateurs autorisés d’obtenir une vue synthétique des principales informations.



Le Responsable RH peut notamment consulter les statistiques RH disponibles et exporter certains rapports aux formats Excel ou PDF.



3\. Spécification des besoins non fonctionnels

3.1. Sécurité



L’accès aux ressources protégées doit être réservé aux utilisateurs authentifiés. Les mots de passe doivent être protégés avant leur stockage et les autorisations doivent être contrôlées avant toute opération sensible.



3.2. Performance



L’application doit assurer des temps de réponse satisfaisants lors des principales opérations telles que l’authentification, la consultation des employés, le traitement des congés et l’affichage du tableau de bord.



3.3. Ergonomie



L’interface doit être claire, intuitive et cohérente. Les formulaires doivent faciliter la saisie et signaler clairement les éventuelles erreurs.



L’interface doit également être responsive afin de s’adapter aux différentes dimensions d’écran.



3.4. Fiabilité



Le système doit vérifier la validité des données avant leur traitement et gérer correctement les situations d’erreur.



Les opérations incorrectes ne doivent pas provoquer d’incohérences dans les informations enregistrées.



3.5. Maintenabilité



L’organisation de l’application doit faciliter les corrections et les évolutions futures. La séparation des différentes responsabilités permet de modifier un composant en limitant les impacts sur les autres parties du système.



3.6. Évolutivité



CEMS doit permettre l’intégration de nouvelles fonctionnalités et l’évolution des fonctionnalités existantes sans nécessiter une restructuration complète de l’application.



3.7. Traçabilité



Les actions importantes effectuées dans le système doivent être enregistrées afin de conserver un historique exploitable et de faciliter le contrôle des opérations.





4\. Présentation des cas d’utilisation



La modélisation par cas d’utilisation permet de représenter les fonctionnalités du système du point de vue des utilisateurs. Elle met en évidence les différents acteurs qui interagissent avec l’application ainsi que les services auxquels ils peuvent accéder selon leurs responsabilités.



Dans le cadre de CEMS, trois acteurs principaux ont été identifiés : l’Employé, le Responsable RH et l’Administrateur. Chaque acteur dispose de fonctionnalités spécifiques définies en fonction de son rôle et des permissions qui lui sont attribuées.



4.1. Présentation des acteurs



Les acteurs représentent les différentes catégories d’utilisateurs susceptibles d’interagir avec CEMS. Leurs droits d’accès sont différenciés afin de garantir que chaque utilisateur puisse uniquement réaliser les opérations correspondant à ses responsabilités.



Employé



L’Employé représente l’utilisateur de base de CEMS. Son utilisation de l’application concerne principalement la gestion de ses propres informations et de ses demandes de congés.



Après authentification, il peut consulter son profil et mettre à jour les informations pour lesquelles il dispose des autorisations nécessaires. Il peut également modifier son mot de passe, soumettre une nouvelle demande de congé, consulter l’historique et le statut de ses demandes ainsi que visualiser les notifications qui lui sont destinées.



Son accès reste limité aux fonctionnalités directement liées à son compte et à ses propres demandes.



Responsable RH



Le Responsable RH assure les principales opérations liées à la gestion des ressources humaines. Il dispose des fonctionnalités accessibles à l’Employé auxquelles s’ajoutent des droits supplémentaires nécessaires à l’exercice de ses responsabilités.



Il peut notamment consulter et gérer les employés, créer ou modifier les départements et traiter les demandes de congés soumises par les collaborateurs. Lors du traitement d’une demande, il peut l’approuver ou la refuser et ajouter un commentaire lorsque cela est nécessaire.



Le Responsable RH dispose également d’un accès au tableau de bord et aux statistiques RH et peut exporter les rapports disponibles dans l’application.



Administrateur



L’Administrateur possède le niveau de privilège le plus élevé dans CEMS. En plus des fonctionnalités précédemment disponibles, il est chargé de l’administration des droits d’accès au système.



Il peut créer et gérer les rôles, leur attribuer différentes permissions et modifier les autorisations associées selon les besoins de l’organisation.



L’Administrateur peut également consulter les journaux d’activités afin de suivre les principales opérations effectuées dans l’application et d’assurer leur traçabilité.



Les caractéristiques des différents acteurs sont synthétisées dans le tableau suivant.



\[INSÉRER ICI L’IMAGE DU TABLEAU 3]



Tableau 3 : Acteurs de CEMS, leurs rôles et description



4.2. Description des cas d’utilisation



Les cas d’utilisation décrivent les principales interactions entre les acteurs et CEMS. Ils permettent de préciser les conditions nécessaires à l’exécution d’une fonctionnalité, son déroulement principal ainsi que les résultats attendus.



Parmi l’ensemble des fonctionnalités proposées par CEMS, quatre cas d’utilisation représentatifs ont été retenus pour une description détaillée : S’authentifier, Soumettre une demande de congé, Traiter une demande de congé et Gérer les employés.



4.2.1. Cas d’utilisation « S’authentifier »



Le cas d’utilisation « S’authentifier » constitue le point d’entrée vers les fonctionnalités sécurisées de CEMS. Il concerne l’ensemble des utilisateurs disposant d’un compte : Employé, Responsable RH et Administrateur.



Pour accéder à l’application, l’utilisateur renseigne son adresse électronique et son mot de passe dans l’interface de connexion. Le système vérifie les informations saisies ainsi que la validité du compte.



Lorsque les identifiants sont valides, l’utilisateur est authentifié et une session sécurisée est établie. Il est ensuite dirigé vers son espace, où les fonctionnalités accessibles sont déterminées en fonction de son rôle et de ses permissions.



Dans le cas où les identifiants sont incorrects ou le compte ne permet pas l’accès au système, l’authentification échoue et un message approprié est affiché.



Acteurs concernés : Employé, Responsable RH et Administrateur.

Précondition : l’utilisateur possède un compte valide.

Postcondition : l’utilisateur est authentifié et peut accéder aux fonctionnalités autorisées.



4.2.2. Cas d’utilisation « Soumettre une demande de congé »



Le cas d’utilisation « Soumettre une demande de congé » permet à un Employé d’enregistrer une nouvelle demande dans CEMS.



Après authentification, l’Employé accède au formulaire de demande de congé. Il sélectionne le type de congé souhaité, renseigne les dates de début et de fin ainsi que le motif de la demande. Un justificatif peut également être ajouté lorsqu’il est nécessaire.



Avant l’enregistrement, le système vérifie les informations renseignées, notamment la présence des champs obligatoires et la cohérence des dates.



Lorsque les données sont valides, la demande est enregistrée avec le statut initial « Pending » (En attente). Elle devient alors disponible pour traitement par le Responsable RH. Une notification est également générée afin d’informer le Responsable RH de la présence d’une nouvelle demande.



Une confirmation est enfin affichée à l’Employé afin de lui indiquer que sa demande a été enregistrée avec succès.



Acteur principal : Employé.

Précondition : l’Employé est authentifié et possède la permission de soumettre une demande.

Postcondition : la demande est enregistrée avec le statut « Pending » et devient disponible pour traitement.



4.2.3. Cas d’utilisation « Traiter une demande de congé »



Le cas d’utilisation « Traiter une demande de congé » concerne le Responsable RH et permet de prendre une décision concernant une demande soumise par un Employé.



Après authentification, le Responsable RH accède à la liste des demandes de congés et sélectionne une demande en attente. Le système affiche alors les informations correspondantes, notamment l’employé concerné, le type de congé, les dates, le motif ainsi que le justificatif lorsqu’il existe.



Après examen de ces informations, le Responsable RH peut choisir d’approuver ou de refuser la demande. Un commentaire peut être ajouté afin de préciser la décision prise.



Le système met ensuite à jour le statut de la demande. Celui-ci passe de « Pending » à « Approved » en cas d’acceptation ou à « Rejected » en cas de refus.



L’Employé concerné est ensuite informé de la décision afin qu’il puisse consulter le nouveau statut de sa demande.



Acteur principal : Responsable RH.

Précondition : le Responsable RH est authentifié, possède la permission nécessaire et la demande existe.

Postcondition : le statut de la demande est mis à jour et la décision devient accessible à l’Employé.



4.2.4. Cas d’utilisation « Gérer les employés »



Le cas d’utilisation « Gérer les employés » regroupe les principales opérations permettant d’administrer les collaborateurs enregistrés dans CEMS.



Après authentification, le Responsable RH ou l’Administrateur disposant des permissions nécessaires accède au module de gestion des employés. La liste des collaborateurs enregistrés dans le système est alors affichée.



Selon l’opération souhaitée, l’utilisateur peut consulter les informations détaillées d’un employé, enregistrer un nouveau collaborateur, modifier les informations d’un employé existant ou procéder à sa suppression.



Lors de l’ajout ou de la modification, les informations saisies sont vérifiées avant leur enregistrement. L’employé peut également être rattaché à un département, recevoir un rôle et disposer d’un statut actif ou inactif.



Après validation, les modifications sont enregistrées et un message confirme la réussite de l’opération. En cas de données incorrectes ou d’action non autorisée, l’opération est refusée et une information appropriée est retournée à l’utilisateur.



Acteur principal : Responsable RH / Administrateur.

Précondition : l’utilisateur est authentifié et dispose des permissions nécessaires à la gestion des employés.

Postcondition : les informations relatives à l’employé sont enregistrées ou mises à jour dans le système.



Les caractéristiques et scénarios de ces quatre cas d’utilisation sont synthétisés dans le tableau suivant.



\[INSÉRER ICI L’IMAGE DU TABLEAU 4]



Tableau 4 : Description de quelques cas d’utilisation de CEMS





4.3. Diagramme global des cas d’utilisation



Le diagramme global des cas d’utilisation offre une représentation synthétique des interactions entre les différents acteurs et les fonctionnalités proposées par CEMS.



L’Employé dispose des fonctionnalités de base liées à son compte. Il peut s’authentifier, gérer son profil, modifier son mot de passe, soumettre une demande de congé, consulter l’historique de ses demandes et consulter ses notifications.



Le Responsable RH dispose de fonctionnalités supplémentaires liées à la gestion opérationnelle des ressources humaines. Il peut gérer les employés et les départements, consulter et traiter les demandes de congés, approuver ou refuser une demande, consulter le tableau de bord et exporter les rapports.



L’Administrateur dispose des privilèges nécessaires à l’administration du système. Il peut notamment gérer les rôles et les permissions et consulter les journaux d’activités.



Une relation de généralisation permet de représenter la hiérarchie fonctionnelle entre les différents acteurs. Le Responsable RH bénéficie des fonctionnalités accessibles à l’Employé et dispose de droits supplémentaires. L’Administrateur bénéficie à son tour des fonctionnalités précédentes auxquelles s’ajoutent les fonctions d’administration du système.



La hiérarchie retenue est donc la suivante :



Employé ← Responsable RH ← Administrateur



L’accès aux fonctionnalités protégées nécessite une authentification préalable. Pour les opérations sensibles, le système vérifie également que l’utilisateur dispose des permissions requises avant d’autoriser leur exécution.



\[INSÉRER ICI LE DIAGRAMME GLOBAL DES CAS D’UTILISATION]



Figure 3 : Diagramme global des cas d’utilisation de CEMS





5\. Conclusion



Ce chapitre a permis de définir précisément les besoins auxquels doit répondre CEMS – Canal Employee Management System. L’étude des besoins fonctionnels a permis d’identifier les principales fonctionnalités attendues, notamment l’authentification, la gestion des employés et des départements, le traitement des demandes de congés, la gestion des rôles et permissions, les notifications, la traçabilité des activités ainsi que la consultation du tableau de bord et des rapports.



Les besoins non fonctionnels ont également permis de préciser les exigences relatives à la sécurité, aux performances, à l’ergonomie, à la fiabilité, à la maintenabilité, à l’évolutivité et à la traçabilité de l’application.



Enfin, l’identification des trois acteurs principaux — Employé, Responsable RH et Administrateur — ainsi que la description des principaux cas d’utilisation ont permis de définir clairement les interactions entre les utilisateurs et le système. Ces spécifications constituent ainsi une base fonctionnelle pour la conception de CEMS.





Chapitre 3 : Conception du système

1\. Introduction



La phase de conception permet de traduire les besoins fonctionnels identifiés précédemment en une représentation structurée du système avant sa réalisation. Elle constitue ainsi une étape intermédiaire entre la spécification des besoins et le développement de l’application.



Dans le cadre de CEMS – Canal Employee Management System, la conception repose sur une modélisation dynamique et statique. La modélisation dynamique permet de représenter les interactions entre les différents acteurs et composants du système au cours de l’exécution des principales fonctionnalités. La modélisation statique permet, quant à elle, de définir la structure des données ainsi que les relations entre les différentes entités de l’application.



Ce chapitre présente les principaux diagrammes de séquence relatifs aux scénarios essentiels de CEMS, notamment l’authentification, la soumission d’une demande de congé et son traitement. Il présente ensuite le diagramme de classes représentant les principales entités du système, avant d’aborder la structure des données et l’architecture générale de l’application.



2\. Modélisation dynamique



La modélisation dynamique permet de représenter le comportement du système au cours du temps. Elle met en évidence les échanges entre les acteurs, l’interface utilisateur, les différents composants du Backend ainsi que la base de données.



Pour CEMS, trois scénarios particulièrement représentatifs ont été retenus :



l’authentification d’un utilisateur ;

la soumission d’une demande de congé ;

le traitement d’une demande de congé.



Ces scénarios couvrent les principaux mécanismes du système, notamment l’authentification, le contrôle des autorisations, les échanges Frontend/Backend et la manipulation des données.





2.1. Diagrammes de séquences



2.1.1. Diagramme de séquence « Authentification »



Le processus d’authentification commence lorsque l’utilisateur saisit son adresse électronique et son mot de passe dans l’interface de connexion. Le Frontend transmet les données au Backend à travers une requête HTTP. Le contrôleur recherche ensuite l’utilisateur dans la base de données et vérifie le mot de passe saisi.



Lorsque les informations sont valides, le système génère les jetons nécessaires à la session et autorise l’accès aux fonctionnalités correspondant au rôle de l’utilisateur. En cas d’échec, un message d’erreur est retourné.



Figure 4 : Diagramme de séquence « Authentification »







2.1.2. Diagramme de séquence « Soumettre une demande de congé »



Ce scénario débute lorsque l’Employé remplit le formulaire de demande de congé. Les données sont d’abord validées au niveau du Frontend avant d’être envoyées au Backend.



Le middleware d’authentification vérifie le jeton JWT et le middleware de permission contrôle que l’utilisateur dispose de l’autorisation nécessaire. La demande est ensuite enregistrée avec le statut Pending et une notification est créée pour le Responsable RH.



Figure 5 : Diagramme de séquence « Soumettre une demande de congé »





2.1.3. Diagramme de séquence « Traiter une demande de congé »



Ce scénario représente le traitement d’une demande par le Responsable RH. Après consultation des demandes en attente, le Responsable RH sélectionne une demande et choisit de l’approuver ou de la refuser.



Le système vérifie son authentification et sa permission, met à jour le statut de la demande, enregistre le commentaire éventuel puis génère une notification à destination de l’Employé concerné.



Figure 6 : Diagramme de séquence « Traiter une demande de congé »





3\. Modélisation statique



La modélisation statique décrit la structure permanente du système. Elle présente les principales entités, leurs attributs ainsi que les relations existant entre elles.



Dans CEMS, les principales entités sont : User, Department, Role, Permission, LeaveRequest, Notification et ActivityLog.



3.1. Diagramme de classes



Le diagramme de classes permet de représenter les principales entités de CEMS ainsi que leurs relations.



La classe User représente les employés et utilisateurs du système. Chaque utilisateur peut être rattaché à un département et possède un rôle. Le rôle est lui-même associé à plusieurs permissions.



La classe LeaveRequest représente les demandes de congés créées par les utilisateurs. Les classes Notification et ActivityLog permettent respectivement de gérer les notifications et d’assurer la traçabilité des actions.



Figure 7 : Diagramme de classes de CEMS





3.2. Modèle relationnel



Le guide utilise l’intitulé « Modèle relationnel ». Toutefois, CEMS utilise MongoDB, qui repose sur un modèle orienté documents. Cette section conserve donc le titre demandé tout en présentant l’organisation réelle des données.



Les principales collections sont :



Tab 5:image



Les relations entre ces collections sont gérées au moyen de références de type ObjectId dans les schémas Mongoose.



3.3. Dictionnaire de données



Le dictionnaire de données permet de décrire les principaux champs manipulés par CEMS.



Tableau 6 : Dictionnaire de données 







3.4. Architecture de l’application

3.4.1. Architecture logiciel



CEMS repose sur une architecture Client-Serveur. Le Frontend et le Backend sont séparés et communiquent à travers des requêtes HTTP utilisant le format JSON.



Le Frontend est développé avec React.js. Il prend en charge l’affichage des interfaces, la navigation et les interactions avec l’utilisateur.



Le Backend repose sur Node.js et Express.js et expose une API REST. Il traite les requêtes, applique les règles métier, vérifie l’authentification et les permissions et communique avec MongoDB via Mongoose.



Le chemin principal d’une requête est le suivant :



Route → Middleware → Controller → Model → MongoDB



Les Middlewares sont notamment utilisés pour l’authentification, le contrôle des permissions et la validation des données.







3.4.2. Architecture matériel



L’architecture matérielle de CEMS peut être représentée à travers le poste utilisateur, le serveur applicatif et le serveur de base de données.



Figure 8 : Diagramme de déploiement de CEMS





4\. Conclusion



Ce chapitre a présenté la conception de CEMS – Canal Employee Management System. La modélisation dynamique a permis de décrire le comportement des principales fonctionnalités à travers trois scénarios : l’authentification, la soumission d’une demande de congé et le traitement de cette demande.



La modélisation statique a ensuite permis de représenter les principales entités du système et leurs relations. L’organisation des collections MongoDB ainsi que le dictionnaire de données ont permis de préciser la structure des informations manipulées.



Enfin, l’architecture logicielle et matérielle a permis de présenter la répartition des composants entre le Frontend, le Backend et la base de données. Cette conception constitue la base nécessaire à la réalisation technique de CEMS, qui sera présentée dans le chapitre suivant.



Chapitre 4 : Réalisation du système

1\. Introduction



Après avoir défini les besoins fonctionnels et non fonctionnels de CEMS – Canal Employee Management System, puis modélisé son fonctionnement et son architecture, cette phase est consacrée à la réalisation de la solution.



Ce chapitre présente l’environnement matériel et logiciel utilisé pour le développement de l’application ainsi que les principaux outils et technologies mobilisés. Il expose ensuite les principales interfaces graphiques réalisées afin d’illustrer concrètement les fonctionnalités offertes aux différents utilisateurs du système.



La réalisation de CEMS repose sur une architecture Web séparant le Frontend, développé avec React.js, du Backend, développé avec Node.js et Express.js. La persistance des données est assurée par MongoDB à travers Mongoose. Cette organisation a permis de développer séparément l’interface utilisateur, la logique métier et la gestion des données.



2\. Environnement de développement



La réalisation de CEMS a nécessité la mise en place d’un environnement de développement adapté à une application Web Full Stack. Cet environnement regroupe les ressources matérielles utilisées ainsi que l’ensemble des logiciels, frameworks, bibliothèques et outils nécessaires à la conception, au développement et aux tests de l’application.



Le guide demande effectivement de distinguer l’environnement matériel de l’environnement logiciel.



2.1. Environnement matériel



Le développement et les tests de l’application CEMS ont été réalisés sur un ordinateur personnel utilisé comme poste de développement. Celui-ci a permis l’exécution simultanée de l’environnement de développement, du serveur Backend Node.js, de l’application Frontend React ainsi que des différents outils nécessaires au projet.



Tu mets ensuite ce tableau :



Tableau 7 : Caractéristiques de l’environnement matériel



2.2. Environnement logiciel



L’environnement logiciel de CEMS est constitué de plusieurs technologies complémentaires. Chaque outil intervient à un niveau précis du développement : création de l’interface utilisateur, développement de l’API, gestion des données, sécurité, communication entre le Frontend et le Backend ou modélisation du système.



Tableau 8 : Environnement logiciel utilisé pour le développement de CEMS



2.2.1. React.js



React.js a été utilisé pour développer la partie Frontend de CEMS. L’application est organisée sous forme de composants fonctionnels réutilisables permettant de construire les différentes interfaces tout en limitant la duplication du code.



L’utilisation des Hooks, notamment useState et useEffect, permet de gérer l’état et le cycle de vie des composants. La Context API est utilisée pour les informations globales de l’application, notamment l’utilisateur authentifié, le thème de l’interface et les notifications.



La navigation entre les différentes pages est assurée par react-router-dom. Des routes protégées permettent de contrôler l’accès aux interfaces selon l’état de connexion et les permissions de l’utilisateur.



2.2.2. Node.js et Express.js



Le Backend de CEMS a été développé avec Node.js et Express.js. Il expose les différentes fonctionnalités de l’application sous forme d’une API REST accessible par le Frontend à travers des requêtes HTTP.



Express.js assure notamment la définition des routes correspondant aux différentes ressources du système : utilisateurs, départements, demandes de congés, rôles, permissions, notifications et journaux d’activités.



Le traitement d’une requête suit principalement l’organisation suivante :



Route → Middleware → Controller → Model → MongoDB



Cette séparation permet d’organiser le code Backend et de distinguer le routage, les contrôles de sécurité, la logique de traitement et l’accès aux données.



2.2.3. MongoDB et Mongoose



La persistance des données est assurée par MongoDB, une base de données NoSQL orientée documents. Les données de CEMS sont organisées sous forme de collections correspondant notamment aux utilisateurs, départements, rôles, permissions, demandes de congés, notifications et journaux d’activités.



Mongoose assure l’interaction entre l’application Node.js et MongoDB. Les schémas Mongoose définissent la structure des documents, leurs types ainsi que les références existant entre certaines collections.



Cette organisation est particulièrement adaptée au modèle RBAC mis en œuvre dans CEMS, dans lequel un utilisateur est associé à un rôle et chaque rôle peut disposer de plusieurs permissions.



2.2.4. Axios



La communication entre le Frontend React et l’API Backend est réalisée avec Axios.



Les différentes actions effectuées depuis l’interface génèrent des requêtes HTTP GET, POST, PUT ou DELETE vers l’API REST. Un intercepteur Axios permet notamment d’intégrer automatiquement le jeton d’accès aux requêtes nécessitant une authentification.



Il intervient également dans le mécanisme de renouvellement de la session lorsque le jeton d’accès arrive à expiration.



2.2.5. Tailwind CSS



Tailwind CSS a été utilisé pour la conception graphique des interfaces de CEMS. Il permet de construire rapidement des composants visuels homogènes et des interfaces adaptées aux différentes dimensions d’écran.



Son utilisation a notamment permis de réaliser les tableaux, formulaires, boutons, fenêtres modales, tableaux de bord et différents éléments de navigation de l’application.



2.2.6. Sécurité de l'application



Plusieurs mécanismes ont été intégrés afin de sécuriser l’accès à CEMS.



L’authentification repose sur des JSON Web Tokens (JWT). Après une authentification réussie, un jeton d’accès de courte durée est généré. Un jeton de renouvellement permet de maintenir la session et est stocké dans un cookie HttpOnly.



Les mots de passe ne sont pas enregistrés directement dans la base de données. Ils sont préalablement hachés à l’aide de bcryptjs.



L’accès aux fonctionnalités est également contrôlé par un système RBAC – Role-Based Access Control. Les autorisations sont ainsi déterminées par le rôle et les permissions attribuées à l’utilisateur.



Enfin, Helmet participe au renforcement de la sécurité HTTP, tandis que les mécanismes de validation et de limitation des requêtes permettent de contrôler les données reçues par l’API.



3\. Principales interfaces graphiques



Cette partie présente les principales interfaces développées dans CEMS. Le choix porte sur les écrans les plus représentatifs du fonctionnement de l’application afin d’éviter de multiplier des captures similaires.



3.1. Interface d’authentification



\[INSÉRER ICI LA CAPTURE DE LA PAGE DE CONNEXION]



Figure 9 : Interface d’authentification de CEMS



L’interface d’authentification constitue le point d’entrée de CEMS. L’utilisateur renseigne son adresse électronique et son mot de passe afin d’accéder à l’application. Après validation des identifiants, le système établit la session et autorise l’accès aux fonctionnalités correspondant au rôle et aux permissions de l’utilisateur.



3.2. Tableau de bord



\[INSÉRER ICI LA CAPTURE DU DASHBOARD]



Figure 10 : Tableau de bord de CEMS



Le tableau de bord fournit une vue synthétique des principales informations gérées par CEMS. Il permet notamment de consulter les indicateurs RH et d’accéder rapidement aux principales fonctionnalités de gestion disponibles selon le profil connecté.



3.3. Interface de gestion des employés



\[INSÉRER ICI LA CAPTURE DE LA LISTE DES EMPLOYÉS]



Figure 11 : Interface de gestion des employés



Cette interface permet au Responsable RH de consulter les employés enregistrés dans le système et d’accéder aux différentes opérations de gestion. Les informations essentielles sont regroupées dans une présentation structurée afin de faciliter la consultation et la mise à jour des données relatives au personnel.



3.4. Interface de gestion des demandes de congé



\[INSÉRER ICI LA CAPTURE DES DEMANDES DE CONGÉ]



Figure 12 : Interface de gestion des demandes de congé



L’interface de gestion des congés centralise les demandes soumises par les employés. Elle permet au Responsable RH de consulter les informations relatives à chaque demande et d’identifier son état : Pending, Approved, Rejected ou Cancelled.



Le Responsable RH peut traiter une demande en l’approuvant ou en la refusant et peut ajouter un commentaire associé à sa décision. La modification du statut est ensuite enregistrée dans le système et communiquée à l’utilisateur concerné.



3.6. Interface de gestion des rôles et permissions



\[INSÉRER ICI LA CAPTURE RÔLES/PERMISSIONS]



Figure 13 : Interface de gestion des rôles et permissions



Cette interface est destinée à l’Administrateur et permet de gérer le contrôle d’accès de CEMS. Chaque rôle regroupe un ensemble de permissions définissant précisément les fonctionnalités auxquelles les utilisateurs associés peuvent accéder.



Ce mécanisme permet de distinguer les droits des différents profils sans créer une structure utilisateur différente pour chaque type d’acteur.





3.7. Interface des journaux d’activités



\[INSÉRER ICI LA CAPTURE ACTIVITY LOGS]



Figure 14 : Interface de consultation des journaux d’activités



L’interface des journaux d’activités permet à l’Administrateur de consulter les principales actions enregistrées par le système. Elle participe à la traçabilité des opérations en conservant notamment le type d’action effectué ainsi que les informations associées.



Cette fonctionnalité facilite le suivi des activités réalisées au sein de CEMS et contribue au contrôle des opérations sensibles.



4\. Difficultés rencontrées



La réalisation de CEMS a nécessité la mise en œuvre de plusieurs technologies et mécanismes complémentaires. Au cours du développement, certaines difficultés ont été rencontrées, principalement liées à la communication entre les différentes couches de l’application, à la sécurité et à la gestion des droits d’accès. Leur résolution a permis d’améliorer progressivement la stabilité et la fiabilité de la solution.



4.1. Gestion de l’authentification et des jetons JWT



L’une des principales difficultés concernait la gestion de l’authentification entre le Frontend React et l’API Backend. Le système repose sur un Access Token à durée de vie limitée ainsi qu’un Refresh Token, ce qui nécessite de gérer correctement l’expiration et le renouvellement de la session.



La difficulté consistait notamment à maintenir la session de l’utilisateur sans lui demander de se reconnecter après l’expiration de l’Access Token. Pour résoudre ce problème, un intercepteur Axios a été mis en place afin d’ajouter automatiquement le jeton aux requêtes authentifiées et de gérer son renouvellement. Le Refresh Token est également conservé dans un cookie HttpOnly afin de renforcer sa protection.



4.2. Mise en place du contrôle d’accès RBAC



La gestion de plusieurs profils utilisateurs a constitué une autre difficulté importante. Les fonctionnalités accessibles ne sont pas identiques pour un Employé, un Responsable RH ou un Administrateur.



La solution retenue repose sur un système RBAC (Role-Based Access Control) associant les utilisateurs à des rôles, eux-mêmes liés à différentes permissions. Des contrôles ont été intégrés au Backend afin de vérifier les autorisations avant l’exécution des opérations protégées. Côté Frontend, les routes et certains éléments de l’interface sont également adaptés aux permissions de l’utilisateur connecté.



Cette approche a permis d’éviter de gérer séparément plusieurs types d’utilisateurs tout en conservant un contrôle précis des droits d’accès.



4.3. Communication entre le Frontend et le Backend



La séparation de l’application en deux parties indépendantes, React pour le Frontend et Node.js/Express.js pour le Backend, a nécessité une attention particulière à la communication entre les deux environnements.



Certaines difficultés ont notamment concerné le format des données envoyées, la gestion des réponses HTTP et le traitement des erreurs retournées par l’API. La centralisation des appels avec Axios et l’utilisation d’un format cohérent pour les réponses de l’API ont permis d’uniformiser les échanges et de faciliter le traitement des erreurs côté interface.





4.4. Synchronisation des données de l’interface



La mise à jour des données affichées après certaines opérations, comme la création d’un employé ou le traitement d’une demande de congé, a également représenté un point d’attention. L’interface devait refléter les modifications effectuées sans nécessiter un rechargement complet de l’application.



La gestion de l’état avec les Hooks React et la Context API, associée aux appels API, a permis de mettre à jour dynamiquement les informations affichées et d’améliorer l’expérience utilisateur.



4.5. Conception d’une interface adaptée aux différents rôles



Enfin, la conception d’une interface commune tout en proposant des fonctionnalités différentes selon les droits de l’utilisateur a nécessité une organisation rigoureuse des composants et des routes.



L’utilisation de composants réutilisables, de routes protégées et du contrôle des permissions a permis d’adapter dynamiquement les éléments accessibles à chaque utilisateur. Cette organisation contribue également à faciliter la maintenance et l’évolution future de l’application.





5\. Conclusion



Ce chapitre a présenté la réalisation de CEMS – Canal Employee Management System à travers l’environnement utilisé et les principales interfaces développées.



La réalisation de l’application s’appuie sur un environnement Full Stack reposant principalement sur React.js pour le Frontend, Node.js et Express.js pour le Backend et MongoDB/Mongoose pour la gestion des données. Plusieurs bibliothèques complémentaires ont également été intégrées afin d’assurer la navigation, la communication avec l’API, la gestion des formulaires, la sécurité et le contrôle des accès.



Les principales interfaces présentées permettent d’illustrer le fonctionnement concret de la solution, depuis l’authentification jusqu’à la gestion des employés et des congés, en passant par le tableau de bord, les rôles et permissions et la traçabilité des activités. L’accès à ces fonctionnalités est adapté au profil de l’utilisateur grâce au mécanisme de contrôle d’accès basé sur les rôles et les permissions.



La réalisation obtenue répond ainsi aux principaux besoins fonctionnels définis au début du projet et concrétise les choix de conception présentés dans les chapitres précédents.





Conclusion générale



Ce projet de fin d’année, réalisé au sein de Canal Informatique, a permis de concevoir et de développer CEMS (Canal Employee Management System), une application Web destinée à centraliser et à simplifier la gestion des employés et de plusieurs processus liés aux ressources humaines.



Le travail a débuté par l’analyse du contexte et l’identification des besoins fonctionnels et non fonctionnels du système. Cette étape a permis de définir les différents profils utilisateurs ainsi que les principales fonctionnalités attendues, notamment la gestion des employés et des départements, le suivi des demandes de congé, la gestion des rôles et des permissions, les notifications, les rapports et la traçabilité des activités.



La phase de conception a ensuite permis de modéliser le fonctionnement de CEMS à travers différents diagrammes UML et de structurer les données nécessaires à l’application. Une attention particulière a été accordée à la gestion des droits d’accès grâce au modèle RBAC (Role-Based Access Control), permettant d’attribuer les fonctionnalités disponibles selon les rôles et permissions des utilisateurs.



Sur le plan technique, la solution repose sur une architecture Client-Serveur avec une communication basée sur une API REST. Le Frontend a été développé avec React.js, tandis que le Backend s’appuie sur Node.js et Express.js. La persistance des données est assurée par MongoDB, associée à Mongoose pour leur modélisation et leur manipulation. Plusieurs mécanismes ont également été intégrés afin de renforcer la sécurité de l’application, notamment l’authentification par JWT, le hachage des mots de passe avec bcryptjs et le contrôle des accès selon les permissions.



La réalisation de CEMS a abouti à une interface permettant aux différents utilisateurs d’accéder aux fonctionnalités correspondant à leurs responsabilités. Le tableau de bord offre notamment une vision synthétique des employés, des départements, des rôles et des demandes de congé à travers des indicateurs et des représentations graphiques.



Ce projet a constitué une expérience enrichissante permettant de mettre en pratique les connaissances acquises durant la formation en ingénierie informatique, particulièrement en matière d’analyse des besoins, de modélisation UML, de développement Web Full Stack, de conception d’API REST, de gestion de bases de données NoSQL et de sécurisation des accès.



Enfin, CEMS pourrait faire l’objet de plusieurs évolutions futures, telles que l’enrichissement des fonctionnalités de reporting, l’ajout de nouveaux modules RH, l’amélioration du système de notifications ou encore le déploiement de la solution dans un environnement de production. Ces perspectives permettraient de faire évoluer progressivement l’application vers une plateforme de gestion RH plus complète et adaptée aux besoins futurs de l’entreprise.





**Bibliographie et Webographie**



**Bibliographie**



**\[1] SOMMERVILLE, Ian. Software Engineering. 10th Edition, Pearson, 2015.**



**\[2] PRESSMAN, Roger S. et MAXIM, Bruce R. Software Engineering: A Practitioner’s Approach. 9th Edition, McGraw-Hill Education, 2019.**



**\[3] FOWLER, Martin. UML Distilled: A Brief Guide to the Standard Object Modeling Language. 3rd Edition, Addison-Wesley Professional, 2003.**



**\[4] GAMMA, Erich, HELM, Richard, JOHNSON, Ralph et VLISSIDES, John. Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley Professional, 1994.**



**\[5] FIELDING, Roy Thomas. Architectural Styles and the Design of Network-based Software Architectures. Doctoral Dissertation, University of California, Irvine, 2000.**





**Netographie**



**\[1] React – Documentation officielle**

**https://react.dev/**

**Consulté en 2026.**



**\[2] Node.js – Documentation officielle**

**https://nodejs.org/docs/latest/api/**

**Consulté en 2026.**



**\[3] Express.js – Documentation officielle**

**https://expressjs.com/**

**Consulté en 2026.**



**\[4] MongoDB – Documentation officielle**

**https://www.mongodb.com/docs/**

**Consulté en 2026.**



**\[5] Mongoose – Documentation officielle**

**https://mongoosejs.com/docs/**

**Consulté en 2026.**



**\[6] Axios – Documentation officielle**

**https://axios-http.com/docs/intro**

**Consulté en 2026.**



**\[7] React Router – Documentation officielle**

**https://reactrouter.com/**

**Consulté en 2026.**



**\[8] React Hook Form – Documentation officielle**

**https://react-hook-form.com/**

**Consulté en 2026.**



**\[9] Tailwind CSS – Documentation officielle**

**https://tailwindcss.com/docs**

**Consulté en 2026.**



**\[10] JSON Web Token (JWT)**

**https://www.jwt.io/introduction**

**Consulté en 2026.**



**\[11] Helmet – Documentation officielle**

**https://helmetjs.github.io/**

**Consulté en 2026.**



**\[12] PlantUML – Documentation officielle**

**https://plantuml.com/**

**Consulté en 2026.**

